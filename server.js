const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "db.json");
const port = Number(process.env.PORT || 4173);
const sessionTtlMs = 1000 * 60 * 60 * 24 * 14;
const dbVersion = 5;
const appUrl = process.env.APP_URL || `http://localhost:${port}`;

const planEntitlements = {
  free: {
    label: "Free",
    connectedAccounts: 0,
    trackedUrls: 5,
    aiAudits: 0,
    reports: 1,
    teamSeats: 1,
    features: ["manual_url_tracking", "basic_dashboard", "limited_discovery"]
  },
  pro: {
    label: "Pro",
    connectedAccounts: 8,
    trackedUrls: 50,
    aiAudits: 50,
    reports: 20,
    teamSeats: 1,
    features: ["oauth_connections", "scheduled_syncs", "ai_audits", "revenue_attribution", "reports", "alerts"]
  },
  studio: {
    label: "Studio",
    connectedAccounts: 25,
    trackedUrls: 250,
    aiAudits: 200,
    reports: 100,
    teamSeats: 8,
    features: ["oauth_connections", "scheduled_syncs", "ai_audits", "revenue_attribution", "reports", "alerts", "team_roles", "client_portal"]
  }
};

const stripePlanPriceEnv = {
  pro: "STRIPE_PRO_PRICE_ID",
  studio: "STRIPE_STUDIO_PRICE_ID"
};

const providerConfig = {
  youtube: {
    label: "YouTube",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    clientIdEnv: "YOUTUBE_CLIENT_ID",
    clientSecretEnv: "YOUTUBE_CLIENT_SECRET",
    scopes: ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/yt-analytics.readonly"],
    authParams: { access_type: "offline", prompt: "consent", include_granted_scopes: "true" }
  },
  instagram: {
    label: "Instagram",
    authUrl: "https://www.facebook.com/v21.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v21.0/oauth/access_token",
    clientIdEnv: "META_CLIENT_ID",
    clientSecretEnv: "META_CLIENT_SECRET",
    scopes: ["instagram_basic", "instagram_manage_insights", "pages_show_list", "pages_read_engagement"]
  },
  facebook: {
    label: "Facebook",
    authUrl: "https://www.facebook.com/v21.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v21.0/oauth/access_token",
    clientIdEnv: "META_CLIENT_ID",
    clientSecretEnv: "META_CLIENT_SECRET",
    scopes: ["pages_show_list", "pages_read_engagement", "read_insights"]
  },
  tiktok: {
    label: "TikTok",
    authUrl: "https://www.tiktok.com/v2/auth/authorize/",
    tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
    clientIdEnv: "TIKTOK_CLIENT_KEY",
    clientSecretEnv: "TIKTOK_CLIENT_SECRET",
    scopes: ["user.info.basic", "video.list"]
  },
  twitch: {
    label: "Twitch",
    authUrl: "https://id.twitch.tv/oauth2/authorize",
    tokenUrl: "https://id.twitch.tv/oauth2/token",
    clientIdEnv: "TWITCH_CLIENT_ID",
    clientSecretEnv: "TWITCH_CLIENT_SECRET",
    scopes: ["channel:read:subscriptions", "analytics:read:games", "clips:edit"]
  },
  kick: {
    label: "Kick",
    authUrl: process.env.KICK_AUTH_URL || "https://kick.com/oauth/authorize",
    tokenUrl: process.env.KICK_TOKEN_URL || "https://kick.com/api/oauth/token",
    clientIdEnv: "KICK_CLIENT_ID",
    clientSecretEnv: "KICK_CLIENT_SECRET",
    scopes: ["user:read", "channel:read", "chat:read"]
  }
};

const tokenEncryptionSecret = process.env.TOKEN_ENCRYPTION_KEY || "viralscope-local-dev-token-key-change-before-production";

function ensureDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ version: dbVersion, users: [], sessions: {}, oauthStates: {}, workspaces: [], metricSnapshots: [], urlEvents: [], syncRuns: [], aiRuns: [], waitlist: [], auditLog: [] }, null, 2));
  }
}

function defaultWorkspace(user) {
  return {
    id: user.workspaceId || crypto.randomUUID(),
    ownerId: user.id,
    name: `${user.name || "Creator"} workspace`,
    createdAt: new Date().toISOString(),
    settings: {
      timezone: "America/Chicago",
      brandName: "CommandCue",
      defaultCta: "Join the waitlist in my bio",
      aiTrainingAllowed: false,
      weeklyReport: "Monday morning"
    },
    trackedUrls: [],
    team: [{ userId: user.id, role: "owner", status: "active" }]
  };
}

function normalizeDb(db) {
  let changed = false;
  db.version = db.version || 1;
  db.users = Array.isArray(db.users) ? db.users : [];
  db.sessions = db.sessions || {};
  db.oauthStates = db.oauthStates || {};
  db.workspaces = Array.isArray(db.workspaces) ? db.workspaces : [];
  db.metricSnapshots = Array.isArray(db.metricSnapshots) ? db.metricSnapshots : [];
  db.urlEvents = Array.isArray(db.urlEvents) ? db.urlEvents : [];
  db.syncRuns = Array.isArray(db.syncRuns) ? db.syncRuns : [];
  db.aiRuns = Array.isArray(db.aiRuns) ? db.aiRuns : [];
  db.waitlist = Array.isArray(db.waitlist) ? db.waitlist : [];
  db.auditLog = Array.isArray(db.auditLog) ? db.auditLog : [];

  db.users.forEach((user) => {
    if (!user.createdAt) {
      user.createdAt = new Date().toISOString();
      changed = true;
    }
    if (!user.plan) {
      user.plan = "free";
      changed = true;
    }
    if (user.plan === "enterprise") {
      user.plan = "studio";
      changed = true;
    }
    if (!user.role) {
      user.role = "owner";
      changed = true;
    }
    if (!user.workspaceId) {
      user.workspaceId = crypto.randomUUID();
      changed = true;
    }
    if (!db.workspaces.some((workspace) => workspace.id === user.workspaceId)) {
      db.workspaces.push(defaultWorkspace(user));
      changed = true;
    }
  });

  if (db.version !== dbVersion) {
    db.version = dbVersion;
    changed = true;
  }
  return changed;
}

function readDb() {
  ensureDb();
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  if (normalizeDb(db)) writeDb(db);
  return db;
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function parseCookies(req) {
  return Object.fromEntries((req.headers.cookie || "").split(";").filter(Boolean).map((part) => {
    const [key, ...value] = part.trim().split("=");
    return [key, decodeURIComponent(value.join("="))];
  }));
}

function getSession(req, db) {
  const authHeader = String(req.headers.authorization || "");
  const bearer = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7).trim() : "";
  const sid = parseCookies(req).vs_session || bearer;
  if (!sid || !db.sessions[sid]) return null;
  const session = db.sessions[sid];
  if (session.expiresAt < Date.now()) {
    delete db.sessions[sid];
    writeDb(db);
    return null;
  }
  const user = db.users.find((item) => item.id === session.userId);
  return user ? { sid, user } : null;
}

function sendJson(res, status, body, extraHeaders = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:" + port,
    "Access-Control-Allow-Credentials": "true",
    ...extraHeaders
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large."));
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const candidate = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), candidate);
}

function publicUser(user) {
  const entitlements = planEntitlements[user.plan] || planEntitlements.free;
  const oauthStatus = Object.entries(user.oauthTokens || {}).map(([slug, token]) => ({
    provider: slug,
    label: providerConfig[slug]?.label || slug,
    connectedAt: token.connectedAt,
    expiresAt: token.expiresAt,
    tokenStatus: token.tokenStatus || "connected",
    scopes: token.scopes || [],
    profile: token.profile || null
  }));
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    role: user.role || "owner",
    workspaceId: user.workspaceId,
    entitlements,
    connections: user.connections || [],
    oauthStatus
  };
}

function publicWorkspace(workspace) {
  if (!workspace) return null;
  return {
    id: workspace.id,
    name: workspace.name,
    createdAt: workspace.createdAt,
    settings: workspace.settings || {},
    trackedUrls: workspace.trackedUrls || [],
    team: (workspace.team || []).map((member) => ({ role: member.role, status: member.status }))
  };
}

function addAudit(db, user, action, detail = {}) {
  db.auditLog.unshift({
    id: crypto.randomUUID(),
    userId: user?.id || null,
    action,
    detail,
    createdAt: new Date().toISOString()
  });
  db.auditLog = db.auditLog.slice(0, 250);
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function compactNumber(value) {
  const number = Number(value || 0);
  if (number >= 1_000_000_000) return `${(number / 1_000_000_000).toFixed(1)}B`;
  if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
  if (number >= 1_000) return `${(number / 1_000).toFixed(1)}K`;
  return String(Math.round(number));
}

function createMetricSnapshot({ workspaceId, platform, source = "manual", metrics = {}, profile = null, analyticsPreview = null }) {
  return {
    id: crypto.randomUUID(),
    workspaceId,
    platform,
    source,
    capturedAt: new Date().toISOString(),
    metrics: {
      views: numberOrNull(metrics.views),
      subscribers: numberOrNull(metrics.subscribers),
      followers: numberOrNull(metrics.followers),
      likes: numberOrNull(metrics.likes),
      comments: numberOrNull(metrics.comments),
      shares: numberOrNull(metrics.shares),
      watchTimeMinutes: numberOrNull(metrics.watchTimeMinutes),
      averageViewDuration: numberOrNull(metrics.averageViewDuration),
      clicks: numberOrNull(metrics.clicks),
      revenue: numberOrNull(metrics.revenue)
    },
    profile,
    analyticsPreview
  };
}

function latestSnapshotsForWorkspace(db, workspaceId) {
  const latest = new Map();
  db.metricSnapshots
    .filter((snapshot) => snapshot.workspaceId === workspaceId)
    .sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt))
    .forEach((snapshot) => {
      if (!latest.has(snapshot.platform)) latest.set(snapshot.platform, snapshot);
    });
  return Array.from(latest.values());
}

function summarizeMetrics(db, workspaceId) {
  const snapshots = latestSnapshotsForWorkspace(db, workspaceId);
  const totals = snapshots.reduce(
    (sum, snapshot) => {
      sum.views += snapshot.metrics.views || 0;
      sum.followers += snapshot.metrics.subscribers || snapshot.metrics.followers || 0;
      sum.engagements += (snapshot.metrics.likes || 0) + (snapshot.metrics.comments || 0) + (snapshot.metrics.shares || 0);
      sum.clicks += snapshot.metrics.clicks || 0;
      sum.revenue += snapshot.metrics.revenue || 0;
      return sum;
    },
    { views: 0, followers: 0, engagements: 0, clicks: 0, revenue: 0 }
  );
  return {
    totals,
    display: {
      views: compactNumber(totals.views),
      followers: compactNumber(totals.followers),
      engagements: compactNumber(totals.engagements),
      clicks: compactNumber(totals.clicks),
      revenue: `$${compactNumber(totals.revenue)}`
    },
    latest: snapshots,
    history: db.metricSnapshots
      .filter((snapshot) => snapshot.workspaceId === workspaceId)
      .sort((a, b) => new Date(a.capturedAt) - new Date(b.capturedAt))
      .slice(-90)
  };
}

function buildAiContext(db, user) {
  const workspace = db.workspaces.find((item) => item.id === user.workspaceId);
  const summary = summarizeMetrics(db, user.workspaceId);
  return {
    creator: { name: user.name, plan: user.plan },
    workspace: { name: workspace?.name || "Creator workspace", settings: workspace?.settings || {} },
    metrics: summary,
    recentSyncs: db.syncRuns.filter((item) => item.workspaceId === user.workspaceId).slice(0, 5),
    trackedUrls: workspace?.trackedUrls || [],
    recentClicks: db.urlEvents.filter((item) => item.workspaceId === user.workspaceId).slice(-25)
  };
}

function fallbackAiResult({ mode, question, action, context }) {
  const latestYouTube = context.metrics.latest.find((item) => item.platform === "YouTube");
  const views = context.metrics.display.views || "your current view baseline";
  const clicks = context.metrics.display.clicks || "your tracked clicks";
  const urlCount = context.trackedUrls.length;
  const deep = mode === "deep";
  const actionLabel = action || "channel_audit";
  return {
    summary: `${deep ? "Deep" : "Fast"} audit: CommandCue reviewed ${views} in recent platform signals, ${clicks} from owned paths, and ${urlCount} tracked URL${urlCount === 1 ? "" : "s"}. The strongest move is to turn the best-performing topic into a tighter content cluster with a clear conversion path.${question ? ` Focus question: "${question}".` : ""}`,
    recommendations: [
      {
        title: "Package the proven topic harder",
        body: latestYouTube
          ? `Use ${latestYouTube.profile?.title || "your YouTube channel"} data to create a sharper title promise, cleaner thumbnail, and first 15-second hook around the same audience pain.`
          : "Use the top demo topic as the anchor, then write one searchable YouTube title and two short-form hooks from the same idea."
      },
      {
        title: "Make the URL path obvious",
        body: urlCount
          ? "Move the highest-value tracked URL into the pinned comment, bio hub, and first description block so CommandCue can attribute more traffic."
          : "Add one tracked URL for the next upload so the AI can connect attention to clicks, leads, and sponsor proof."
      },
      {
        title: "Build one weekly repeatable system",
        body: "Publish one main video, cut three Shorts/Reels, schedule one live or community prompt, then compare lift score and URL clicks after 48 hours."
      }
    ],
    calendar: [
      { day: "Mon", title: "Short: the analytics signal creators miss", platform: "TikTok + Reels", status: "Ready" },
      { day: "Tue", title: "YouTube: your analytics are lying until you track this", platform: "YouTube", status: "Optimize title" },
      { day: "Thu", title: "Carousel: 5 signals sponsors actually care about", platform: "Instagram", status: "Draft" }
    ],
    report: {
      name: actionLabel === "report" ? "AI performance memo" : "AI channel audit",
      audience: "Creator",
      detail: "Summarizes traffic, clicks, packaging risks, content cluster ideas, and next best actions.",
      status: "Generated"
    },
    nextActions: [
      "Sync YouTube metrics before the next audit.",
      "Add one tracked URL to the next upload.",
      "Test the strongest title against the current baseline."
    ]
  };
}

function encryptionKey() {
  return crypto.createHash("sha256").update(tokenEncryptionSecret).digest();
}

function encryptValue(value) {
  if (value == null) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  return {
    alg: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    value: encrypted.toString("base64")
  };
}

function decryptValue(payload) {
  if (!payload || typeof payload === "string") return payload || null;
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(payload.iv, "base64"));
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(payload.value, "base64")), decipher.final()]);
  return decrypted.toString("utf8");
}

function createSession(res, db, user) {
  const sid = crypto.randomBytes(24).toString("hex");
  db.sessions[sid] = { userId: user.id, expiresAt: Date.now() + sessionTtlMs };
  writeDb(db);
  res.setHeader("Set-Cookie", `vs_session=${encodeURIComponent(sid)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(sessionTtlMs / 1000)}`);
  return sid;
}

function providerSlug(value) {
  return String(value || "").toLowerCase();
}

function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

function stripeConfigured(plan) {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env[stripePlanPriceEnv[plan]]);
}

function stripeRequest(endpoint, params) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams(params).toString();
    const request = https.request(
      {
        hostname: "api.stripe.com",
        path: endpoint,
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          const parsed = data ? JSON.parse(data) : {};
          if (response.statusCode >= 400) {
            reject(new Error(parsed.error?.message || "Stripe request failed."));
            return;
          }
          resolve(parsed);
        });
      }
    );
    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

function httpsJson(urlString, options = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(urlString);
    const body = options.body || null;
    const request = https.request(
      {
        hostname: target.hostname,
        path: `${target.pathname}${target.search}`,
        method: options.method || "GET",
        headers: {
          ...(options.headers || {}),
          ...(body ? { "Content-Length": Buffer.byteLength(body) } : {})
        }
      },
      (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          const parsed = data ? JSON.parse(data) : {};
          if (response.statusCode >= 400) {
            reject(new Error(parsed.error_description || parsed.error?.message || parsed.error || "Provider request failed."));
            return;
          }
          resolve(parsed);
        });
      }
    );
    request.on("error", reject);
    if (body) request.write(body);
    request.end();
  });
}

function postJson(urlString, payload, headers = {}) {
  return httpsJson(urlString, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}

function postForm(urlString, params, headers = {}) {
  const body = new URLSearchParams(params).toString();
  return httpsJson(urlString, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    }
  });
}

async function exchangeOAuthCode(provider, slug, code, redirectUri) {
  const params = {
    client_id: process.env[provider.clientIdEnv],
    client_secret: process.env[provider.clientSecretEnv],
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code"
  };
  if (slug === "tiktok") {
    params.client_key = params.client_id;
    delete params.client_id;
  }
  return postForm(provider.tokenUrl, params);
}

async function fetchYouTubeProfile(accessToken) {
  const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
  channelUrl.searchParams.set("part", "snippet,statistics");
  channelUrl.searchParams.set("mine", "true");
  const channelData = await httpsJson(channelUrl.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const channel = channelData.items?.[0];
  if (!channel) return null;
  return {
    id: channel.id,
    title: channel.snippet?.title || "YouTube channel",
    handle: channel.snippet?.customUrl || null,
    thumbnail: channel.snippet?.thumbnails?.default?.url || null,
    subscribers: channel.statistics?.subscriberCount || null,
    views: channel.statistics?.viewCount || null,
    videos: channel.statistics?.videoCount || null
  };
}

async function fetchYouTubeAnalyticsPreview(accessToken) {
  const end = new Date();
  const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
  const formatDate = (date) => date.toISOString().slice(0, 10);
  const analyticsUrl = new URL("https://youtubeanalytics.googleapis.com/v2/reports");
  analyticsUrl.searchParams.set("ids", "channel==MINE");
  analyticsUrl.searchParams.set("startDate", formatDate(start));
  analyticsUrl.searchParams.set("endDate", formatDate(end));
  analyticsUrl.searchParams.set("metrics", "views,likes,comments,shares,estimatedMinutesWatched,averageViewDuration");
  try {
    const data = await httpsJson(analyticsUrl.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return {
      range: `${formatDate(start)} to ${formatDate(end)}`,
      columns: data.columnHeaders?.map((item) => item.name) || [],
      totals: data.rows?.[0] || []
    };
  } catch (error) {
    return { range: `${formatDate(start)} to ${formatDate(end)}`, error: error.message };
  }
}

async function buildProviderProfile(slug, accessToken) {
  if (slug === "youtube") {
    const [profile, analyticsPreview] = await Promise.all([
      fetchYouTubeProfile(accessToken),
      fetchYouTubeAnalyticsPreview(accessToken)
    ]);
    return { profile, analyticsPreview };
  }
  return { profile: null, analyticsPreview: null };
}

function demoYouTubeSnapshot(workspaceId) {
  const views = 14_800_000 + Math.floor(Math.random() * 420_000);
  const subscribers = 412_000 + Math.floor(Math.random() * 8_000);
  const likes = 690_000 + Math.floor(Math.random() * 28_000);
  const comments = 72_000 + Math.floor(Math.random() * 4_000);
  const shares = 166_000 + Math.floor(Math.random() * 9_000);
  return createMetricSnapshot({
    workspaceId,
    platform: "YouTube",
    source: "demo-sync",
    metrics: {
      views,
      subscribers,
      likes,
      comments,
      shares,
      watchTimeMinutes: 2_400_000 + Math.floor(Math.random() * 110_000),
      averageViewDuration: 214
    },
    profile: {
      id: "youtube-demo",
      title: "Curiosity Below",
      handle: "@curiositybelow",
      subscribers: String(subscribers),
      views: String(views),
      videos: "184"
    },
    analyticsPreview: {
      range: "Demo 28 days",
      columns: ["views", "likes", "comments", "shares", "estimatedMinutesWatched", "averageViewDuration"],
      totals: [views, likes, comments, shares, 2_400_000, 214]
    }
  });
}

async function syncYouTubeMetrics(db, user) {
  const token = user.oauthTokens?.youtube;
  let snapshot;
  let mode = "demo";
  if (token?.accessToken && token.tokenStatus === "connected") {
    const accessToken = decryptValue(token.accessToken);
    const providerData = await buildProviderProfile("youtube", accessToken);
    const profile = providerData.profile || token.profile || {};
    const columns = providerData.analyticsPreview?.columns || [];
    const totals = providerData.analyticsPreview?.totals || [];
    const metricByColumn = Object.fromEntries(columns.map((column, index) => [column, totals[index]]));
    snapshot = createMetricSnapshot({
      workspaceId: user.workspaceId,
      platform: "YouTube",
      source: "oauth-sync",
      profile,
      analyticsPreview: providerData.analyticsPreview,
      metrics: {
        views: metricByColumn.views ?? profile.views,
        subscribers: profile.subscribers,
        likes: metricByColumn.likes,
        comments: metricByColumn.comments,
        shares: metricByColumn.shares,
        watchTimeMinutes: metricByColumn.estimatedMinutesWatched,
        averageViewDuration: metricByColumn.averageViewDuration
      }
    });
    user.oauthTokens.youtube = {
      ...token,
      profile,
      analyticsPreview: providerData.analyticsPreview,
      lastSyncedAt: snapshot.capturedAt,
      tokenStatus: providerData.analyticsPreview?.error ? "partial_sync" : "synced"
    };
    mode = "oauth";
  } else {
    snapshot = demoYouTubeSnapshot(user.workspaceId);
  }
  db.metricSnapshots.push(snapshot);
  db.metricSnapshots = db.metricSnapshots.slice(-1000);
  const syncRun = {
    id: crypto.randomUUID(),
    workspaceId: user.workspaceId,
    platform: "YouTube",
    mode,
    status: "complete",
    snapshotId: snapshot.id,
    startedAt: snapshot.capturedAt,
    finishedAt: new Date().toISOString()
  };
  db.syncRuns.unshift(syncRun);
  db.syncRuns = db.syncRuns.slice(0, 250);
  addAudit(db, user, "sync.youtube", { mode, snapshotId: snapshot.id });
  return { snapshot, syncRun };
}

function extractResponseText(response) {
  if (response.output_text) return response.output_text;
  const message = (response.output || []).find((item) => item.type === "message");
  return message?.content?.find((item) => item.type === "output_text")?.text || "";
}

async function generateAiResult({ mode, question, action, context }) {
  if (!process.env.OPENAI_API_KEY) {
    return { provider: "local", result: fallbackAiResult({ mode, question, action, context }) };
  }
  const prompt = [
    "You are CommandCue's AI growth coach for influencers and content creators.",
    "Use the provided analytics context. Return only valid JSON with keys: summary, recommendations, calendar, report, nextActions.",
    "recommendations must be an array of 3 objects with title and body.",
    "calendar must be an array of 3 objects with day, title, platform, status.",
    "report must have name, audience, detail, status.",
    `Mode: ${mode || "fast"}`,
    `Action: ${action || "channel_audit"}`,
    `Question: ${question || "Review the channel and recommend the next growth moves."}`,
    `Context JSON: ${JSON.stringify(context).slice(0, 12000)}`
  ].join("\n\n");
  try {
    const response = await postJson("https://api.openai.com/v1/responses", {
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: prompt
    }, {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    });
    const parsed = JSON.parse(extractResponseText(response));
    return { provider: "openai", responseId: response.id, result: parsed };
  } catch (error) {
    return {
      provider: "local-fallback",
      error: error.message,
      result: fallbackAiResult({ mode, question, action, context })
    };
  }
}

function saveAiRun(db, user, payload) {
  const run = {
    id: crypto.randomUUID(),
    workspaceId: user.workspaceId,
    userId: user.id,
    mode: payload.mode || "fast",
    action: payload.action || "channel_audit",
    question: payload.question || "",
    provider: payload.provider,
    responseId: payload.responseId || null,
    error: payload.error || null,
    result: payload.result,
    createdAt: new Date().toISOString()
  };
  db.aiRuns.unshift(run);
  db.aiRuns = db.aiRuns.slice(0, 250);
  addAudit(db, user, "ai.run_created", { runId: run.id, action: run.action, provider: run.provider });
  return run;
}

function verifyStripeSignature(rawBody, signatureHeader) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) return false;
  const parts = Object.fromEntries(signatureHeader.split(",").map((part) => {
    const [key, value] = part.split("=");
    return [key, value];
  }));
  const timestamp = parts.t;
  const expected = parts.v1;
  if (!timestamp || !expected) return false;
  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false;
  const signedPayload = `${timestamp}.${rawBody.toString("utf8")}`;
  const digest = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const digestBuffer = Buffer.from(digest, "hex");
  return expectedBuffer.length === digestBuffer.length && crypto.timingSafeEqual(expectedBuffer, digestBuffer);
}

function applyStripeCheckoutCompletion(db, sessionObject) {
  const userId = sessionObject.metadata?.userId || sessionObject.client_reference_id;
  const plan = planEntitlements[sessionObject.metadata?.plan] ? sessionObject.metadata.plan : "pro";
  const user = db.users.find((item) => item.id === userId);
  if (!user) return false;
  user.plan = plan;
  user.billing = {
    provider: "stripe",
    mode: "live",
    checkoutStatus: "complete",
    customerId: sessionObject.customer || user.billing?.customerId || null,
    subscriptionId: sessionObject.subscription || user.billing?.subscriptionId || null,
    checkoutSessionId: sessionObject.id,
    interval: sessionObject.metadata?.interval || user.billing?.interval || "monthly",
    upgradedAt: new Date().toISOString()
  };
  addAudit(db, user, "billing.checkout_completed", { plan, checkoutSessionId: sessionObject.id });
  return true;
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "http://localhost:" + port,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
    });
    res.end();
    return;
  }

  const db = readDb();
  const session = getSession(req, db);

  if (url.pathname === "/api/stripe/webhook" && req.method === "POST") {
    const rawBody = await readRawBody(req);
    if (!verifyStripeSignature(rawBody, req.headers["stripe-signature"])) {
      sendJson(res, 400, { error: "Invalid Stripe signature." });
      return;
    }
    let event;
    try {
      event = JSON.parse(rawBody.toString("utf8"));
    } catch {
      sendJson(res, 400, { error: "Invalid webhook payload." });
      return;
    }
    if (event.type === "checkout.session.completed") {
      applyStripeCheckoutCompletion(db, event.data.object);
      writeDb(db);
    }
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const userId = subscription.metadata?.userId;
      const user = db.users.find((item) => item.id === userId || item.billing?.subscriptionId === subscription.id);
      if (user) {
        user.plan = "free";
        user.billing = { ...(user.billing || {}), checkoutStatus: "cancelled", cancelledAt: new Date().toISOString() };
        addAudit(db, user, "billing.subscription_deleted", { subscriptionId: subscription.id });
        writeDb(db);
      }
    }
    sendJson(res, 200, { received: true });
    return;
  }

  if (url.pathname === "/api/me") {
    const workspace = session ? db.workspaces.find((item) => item.id === session.user.workspaceId) : null;
    sendJson(res, 200, { user: session ? publicUser(session.user) : null, workspace: publicWorkspace(workspace) });
    return;
  }

  if (url.pathname === "/api/billing/plans" && req.method === "GET") {
    sendJson(res, 200, { plans: planEntitlements });
    return;
  }

  if (url.pathname === "/api/waitlist" && req.method === "POST") {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const channel = String(body.channel || "").trim();
    const platform = String(body.platform || "YouTube").trim();
    const goal = String(body.goal || "Grow faster").trim();
    if (!email.includes("@")) {
      sendJson(res, 400, { error: "Use a valid email to join the waitlist." });
      return;
    }
    const existing = db.waitlist.find((item) => item.email === email);
    if (existing) {
      existing.name = name || existing.name;
      existing.channel = channel || existing.channel;
      existing.platform = platform || existing.platform;
      existing.goal = goal || existing.goal;
      existing.updatedAt = new Date().toISOString();
      addAudit(db, null, "waitlist.updated", { email, platform });
      writeDb(db);
      sendJson(res, 200, { entry: existing, count: db.waitlist.length, message: "You're already on the waitlist. I updated your details." });
      return;
    }
    const entry = {
      id: crypto.randomUUID(),
      email,
      name,
      channel,
      platform,
      goal,
      source: String(body.source || "landing").slice(0, 80),
      createdAt: new Date().toISOString()
    };
    db.waitlist.unshift(entry);
    addAudit(db, null, "waitlist.created", { email, platform });
    writeDb(db);
    sendJson(res, 201, { entry, count: db.waitlist.length, message: "You're on the CommandCue waitlist." });
    return;
  }

  if (url.pathname === "/api/waitlist/stats" && req.method === "GET") {
    sendJson(res, 200, {
      count: db.waitlist.length,
      platforms: db.waitlist.reduce((acc, item) => {
        acc[item.platform] = (acc[item.platform] || 0) + 1;
        return acc;
      }, {})
    });
    return;
  }

  if (url.pathname === "/api/auth/signup" && req.method === "POST") {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "Creator").trim() || "Creator";
    if (!email.includes("@") || password.length < 8) {
      sendJson(res, 400, { error: "Use a valid email and a password with at least 8 characters." });
      return;
    }
    if (db.users.some((user) => user.email === email)) {
      sendJson(res, 409, { error: "An account already exists for that email." });
      return;
    }
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: hashPassword(password),
      plan: "free",
      role: "owner",
      workspaceId: crypto.randomUUID(),
      connections: [],
      createdAt: new Date().toISOString()
    };
    const workspace = defaultWorkspace(user);
    db.users.push(user);
    db.workspaces.push(workspace);
    addAudit(db, user, "auth.signup", { email });
    const sessionToken = createSession(res, db, user);
    sendJson(res, 201, { user: publicUser(user), workspace: publicWorkspace(workspace), sessionToken });
    return;
  }

  if (url.pathname === "/api/auth/login" && req.method === "POST") {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const user = db.users.find((item) => item.email === email);
    if (!user || !verifyPassword(String(body.password || ""), user.passwordHash)) {
      sendJson(res, 401, { error: "Email or password did not match." });
      return;
    }
    let workspace = db.workspaces.find((item) => item.id === user.workspaceId);
    if (!workspace) {
      workspace = defaultWorkspace(user);
      db.workspaces.push(workspace);
    }
    addAudit(db, user, "auth.login", { email });
    const sessionToken = createSession(res, db, user);
    sendJson(res, 200, { user: publicUser(user), workspace: publicWorkspace(workspace), sessionToken });
    return;
  }

  if (url.pathname === "/api/auth/logout" && req.method === "POST") {
    if (session) delete db.sessions[session.sid];
    writeDb(db);
    sendJson(res, 200, { ok: true }, { "Set-Cookie": "vs_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0" });
    return;
  }

  if (url.pathname === "/api/auth/profile" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const body = await readBody(req);
    const name = String(body.name || "").trim();
    if (name.length < 2) {
      sendJson(res, 400, { error: "Creator name must be at least 2 characters." });
      return;
    }
    session.user.name = name;
    addAudit(db, session.user, "auth.profile_update", { name });
    writeDb(db);
    sendJson(res, 200, { user: publicUser(session.user) });
    return;
  }

  if (url.pathname === "/api/workspace" && req.method === "GET") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const workspace = db.workspaces.find((item) => item.id === session.user.workspaceId);
    sendJson(res, 200, { workspace: publicWorkspace(workspace) });
    return;
  }

  if (url.pathname === "/api/workspace" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const body = await readBody(req);
    const workspace = db.workspaces.find((item) => item.id === session.user.workspaceId);
    if (!workspace) {
      sendJson(res, 404, { error: "Workspace not found." });
      return;
    }
    if (body.name) workspace.name = String(body.name).trim().slice(0, 80) || workspace.name;
    workspace.settings = {
      ...(workspace.settings || {}),
      ...(body.settings || {})
    };
    addAudit(db, session.user, "workspace.update", { workspaceId: workspace.id });
    writeDb(db);
    sendJson(res, 200, { workspace: publicWorkspace(workspace) });
    return;
  }

  if (url.pathname === "/api/metrics/summary" && req.method === "GET") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    sendJson(res, 200, summarizeMetrics(db, session.user.workspaceId));
    return;
  }

  if (url.pathname === "/api/sync/youtube" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    if (session.user.plan === "free") {
      sendJson(res, 402, { error: "YouTube metric sync is a Pro feature.", upgradeRequired: true });
      return;
    }
    try {
      const result = await syncYouTubeMetrics(db, session.user);
      writeDb(db);
      sendJson(res, 200, { ...result, summary: summarizeMetrics(db, session.user.workspaceId), user: publicUser(session.user) });
      return;
    } catch (error) {
      const syncRun = {
        id: crypto.randomUUID(),
        workspaceId: session.user.workspaceId,
        platform: "YouTube",
        status: "failed",
        error: error.message,
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString()
      };
      db.syncRuns.unshift(syncRun);
      addAudit(db, session.user, "sync.youtube_failed", { error: error.message });
      writeDb(db);
      sendJson(res, 502, { error: error.message, syncRun });
      return;
    }
  }

  if (url.pathname === "/api/urls" && req.method === "GET") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const workspace = db.workspaces.find((item) => item.id === session.user.workspaceId);
    sendJson(res, 200, { urls: workspace?.trackedUrls || [] });
    return;
  }

  if (url.pathname === "/api/urls" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const body = await readBody(req);
    const rawUrl = String(body.url || "").trim();
    if (!rawUrl) {
      sendJson(res, 400, { error: "URL is required." });
      return;
    }
    const workspace = db.workspaces.find((item) => item.id === session.user.workspaceId);
    if (!workspace) {
      sendJson(res, 404, { error: "Workspace not found." });
      return;
    }
    const entitlements = planEntitlements[session.user.plan] || planEntitlements.free;
    workspace.trackedUrls = workspace.trackedUrls || [];
    if (workspace.trackedUrls.length >= entitlements.trackedUrls) {
      sendJson(res, 402, { error: `Your ${entitlements.label} plan supports ${entitlements.trackedUrls} tracked URLs.`, upgradeRequired: true });
      return;
    }
    const trackedUrl = {
      id: crypto.randomUUID(),
      url: rawUrl.replace(/^https?:\/\//, ""),
      source: String(body.source || "Manual").trim() || "Manual",
      createdAt: new Date().toISOString()
    };
    workspace.trackedUrls.unshift(trackedUrl);
    addAudit(db, session.user, "url.created", { urlId: trackedUrl.id });
    writeDb(db);
    sendJson(res, 201, { url: trackedUrl, urls: workspace.trackedUrls });
    return;
  }

  if (url.pathname === "/api/events/click" && req.method === "POST") {
    const body = await readBody(req);
    const workspaceId = String(body.workspaceId || session?.user?.workspaceId || "").trim();
    const urlId = String(body.urlId || "").trim();
    const urlValue = String(body.url || "").trim();
    if (!workspaceId || (!urlId && !urlValue)) {
      sendJson(res, 400, { error: "workspaceId plus urlId or url is required." });
      return;
    }
    const event = {
      id: crypto.randomUUID(),
      workspaceId,
      urlId: urlId || null,
      url: urlValue || null,
      source: String(body.source || "unknown").slice(0, 80),
      referrer: String(body.referrer || req.headers.referer || "").slice(0, 240),
      userAgent: String(req.headers["user-agent"] || "").slice(0, 240),
      createdAt: new Date().toISOString()
    };
    db.urlEvents.push(event);
    db.urlEvents = db.urlEvents.slice(-5000);
    const clickSnapshot = createMetricSnapshot({
      workspaceId,
      platform: "Website",
      source: "url-event",
      metrics: { clicks: db.urlEvents.filter((item) => item.workspaceId === workspaceId).length }
    });
    db.metricSnapshots.push(clickSnapshot);
    writeDb(db);
    sendJson(res, 201, { event });
    return;
  }

  if (url.pathname === "/api/ai/runs" && req.method === "GET") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    sendJson(res, 200, {
      runs: db.aiRuns.filter((run) => run.workspaceId === session.user.workspaceId).slice(0, 25)
    });
    return;
  }

  if (url.pathname === "/api/ai/coach" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const body = await readBody(req);
    const mode = body.mode === "deep" ? "deep" : "fast";
    if (mode === "deep" && session.user.plan === "free") {
      sendJson(res, 402, { error: "Deep AI channel audits are a Pro feature.", upgradeRequired: true });
      return;
    }
    const context = buildAiContext(db, session.user);
    const ai = await generateAiResult({
      mode,
      question: String(body.question || "").trim(),
      action: "channel_audit",
      context
    });
    const run = saveAiRun(db, session.user, { ...ai, mode, question: body.question, action: "channel_audit" });
    writeDb(db);
    sendJson(res, 200, { run, result: run.result, provider: run.provider });
    return;
  }

  if (url.pathname === "/api/ai/action" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const body = await readBody(req);
    const action = String(body.action || "title").trim();
    const proActions = new Set(["calendar", "competitors", "report", "launch"]);
    if (proActions.has(action) && session.user.plan === "free") {
      sendJson(res, 402, { error: "This AI action is a Pro feature.", upgradeRequired: true });
      return;
    }
    const context = buildAiContext(db, session.user);
    const ai = await generateAiResult({
      mode: body.mode === "deep" ? "deep" : "fast",
      question: String(body.question || `Create the best ${action} output for this creator.`).trim(),
      action,
      context
    });
    const run = saveAiRun(db, session.user, { ...ai, mode: body.mode || "fast", question: body.question || "", action });
    writeDb(db);
    sendJson(res, 200, { run, result: run.result, provider: run.provider });
    return;
  }

  if (url.pathname === "/api/billing/upgrade" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const body = await readBody(req);
    const requestedPlan = String(body.plan || "pro").toLowerCase();
    const plan = planEntitlements[requestedPlan] ? requestedPlan : "pro";
    if (plan === "free") {
      session.user.plan = "free";
      session.user.billing = { provider: "none", mode: "free", checkoutStatus: "not_required" };
      addAudit(db, session.user, "billing.free_selected", { feature: body.feature || null });
      writeDb(db);
      sendJson(res, 200, { user: publicUser(session.user), mode: "free" });
      return;
    }

    if (stripeConfigured(plan)) {
      const interval = body.interval === "yearly" ? "yearly" : "monthly";
      try {
        const checkoutSession = await stripeRequest("/v1/checkout/sessions", {
          mode: "subscription",
          success_url: `${appUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${appUrl}/?checkout=cancelled`,
          customer_email: session.user.email,
          client_reference_id: session.user.id,
          "line_items[0][price]": process.env[stripePlanPriceEnv[plan]],
          "line_items[0][quantity]": "1",
          "metadata[userId]": session.user.id,
          "metadata[plan]": plan,
          "metadata[interval]": interval,
          "metadata[feature]": String(body.feature || ""),
          "subscription_data[metadata][userId]": session.user.id,
          "subscription_data[metadata][plan]": plan,
          "subscription_data[metadata][interval]": interval
        });
        session.user.billing = {
          provider: "stripe",
          mode: "checkout",
          interval,
          checkoutStatus: "open",
          checkoutSessionId: checkoutSession.id,
          requestedPlan: plan,
          requestedAt: new Date().toISOString()
        };
        addAudit(db, session.user, "billing.checkout_created", { plan, interval, checkoutSessionId: checkoutSession.id });
        writeDb(db);
        sendJson(res, 200, { checkoutUrl: checkoutSession.url, checkoutSessionId: checkoutSession.id, mode: "stripe" });
        return;
      } catch (error) {
        sendJson(res, 502, { error: error.message });
        return;
      }
    }

    session.user.plan = plan;
    session.user.billing = {
      provider: "stripe",
      mode: "prototype",
      interval: body.interval === "yearly" ? "yearly" : "monthly",
      upgradedAt: new Date().toISOString(),
      checkoutStatus: "simulated"
    };
    addAudit(db, session.user, "billing.upgrade_simulated", { plan, interval: session.user.billing.interval, feature: body.feature || null });
    writeDb(db);
    sendJson(res, 200, { user: publicUser(session.user) });
    return;
  }

  if (url.pathname === "/api/billing/portal" && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const customerId = session.user.billing?.customerId;
    if (!process.env.STRIPE_SECRET_KEY || !customerId) {
      sendJson(res, 200, { mode: "prototype", message: "Stripe customer portal needs a live Stripe customer." });
      return;
    }
    try {
      const portalSession = await stripeRequest("/v1/billing_portal/sessions", {
        customer: customerId,
        return_url: `${appUrl}/?billing=portal-return`
      });
      sendJson(res, 200, { portalUrl: portalSession.url, mode: "stripe" });
      return;
    } catch (error) {
      sendJson(res, 502, { error: error.message });
      return;
    }
  }

  if (url.pathname === "/api/launch/readiness" && req.method === "GET") {
    const providerStatus = Object.entries(providerConfig).map(([slug, provider]) => {
      const hasClient = Boolean(process.env[provider.clientIdEnv]);
      const hasSecret = Boolean(process.env[provider.clientSecretEnv]);
      return {
        slug,
        label: provider.label,
        configured: hasClient && hasSecret,
        status: hasClient && hasSecret ? "Credentials present" : "Needs credentials",
        scopes: provider.scopes
      };
    });
    const stripeReady = Boolean(
      process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_WEBHOOK_SECRET &&
      process.env.STRIPE_PRO_PRICE_ID &&
      process.env.STRIPE_STUDIO_PRICE_ID
    );
    const databaseMode = path.basename(dbPath) === "db.json" ? "local-json" : "external";
    const tokenEncryptionReady = Boolean(process.env.TOKEN_ENCRYPTION_KEY);
    const aiReady = Boolean(process.env.OPENAI_API_KEY);
    const checks = [
      { area: "Product prototype", score: 94, status: "Ready", detail: "Core UI, tabs, charts, Pro gating, onboarding, launch center, alerts, reports, and AI surfaces are demo-ready." },
      { area: "Authentication", score: 82, status: "Prototype", detail: "Local sessions and profile persistence exist. Production still needs email verification, password reset, and managed auth hosting." },
      { area: "Stripe billing", score: stripeReady ? 78 : 64, status: stripeReady ? "Credentials present" : "Next build", detail: stripeReady ? "Stripe environment keys are present. Checkout sessions and webhooks still need final production testing." : "Paywall journey is designed. Production needs Stripe products, checkout sessions, webhooks, and customer portal." },
      { area: "OAuth providers", score: providerStatus.filter((item) => item.configured).length ? 72 : 54, status: "Provider setup", detail: `${providerStatus.filter((item) => item.configured).length}/${providerStatus.length} providers have credentials configured. YouTube now supports real token exchange, encrypted storage, and channel preview fetches.` },
      { area: "Data platform", score: databaseMode === "local-json" ? 58 : 82, status: databaseMode === "local-json" ? "Local only" : "Production database", detail: databaseMode === "local-json" ? "Prototype data persists locally. Launch needs a hosted database, backups, migrations, and event tables." : "External database mode is configured." },
      { area: "AI backend", score: aiReady ? 82 : 66, status: aiReady ? "Model configured" : "Local fallback", detail: aiReady ? "OpenAI Responses API is configured. Validate cost limits, logging policy, and prompt safety before launch." : "AI endpoints are live with deterministic local fallback. Add OPENAI_API_KEY for model-backed audits." },
      { area: "Landing and waitlist", score: db.waitlist.length ? 78 : 70, status: "Built", detail: `Public landing page and waitlist API are ready. Current waitlist count: ${db.waitlist.length}.` },
      { area: "Legal and trust", score: 46, status: "Needs owner", detail: "Privacy policy, terms, cookie notice, data deletion, AI disclosure, and OAuth scope explanations are required." }
    ];
    sendJson(res, 200, {
      checks,
      providerStatus,
      billing: {
        stripeReady,
        mode: stripeReady ? "configured" : "prototype",
        requiredEnv: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPE_PRO_PRICE_ID", "STRIPE_STUDIO_PRICE_ID"].map((name) => ({
          name,
          configured: Boolean(process.env[name])
        }))
      },
      database: { mode: databaseMode, path: "data/db.json" },
      security: { tokenEncryptionReady, tokenStorage: tokenEncryptionReady ? "env-key" : "local-dev-key" },
      ai: { ready: aiReady, provider: aiReady ? "openai" : "local" },
      waitlist: { count: db.waitlist.length },
      plans: planEntitlements
    });
    return;
  }

  const oauthStart = url.pathname.match(/^\/api\/oauth\/start\/([^/]+)$/);
  if (oauthStart && req.method === "GET") {
    if (!session) {
      sendJson(res, 401, { error: "Log in to connect accounts." });
      return;
    }
    if (session.user.plan !== "pro") {
      sendJson(res, 402, { error: "OAuth account connections are a Pro feature.", upgradeRequired: true });
      return;
    }
    const slug = providerSlug(oauthStart[1]);
    const provider = providerConfig[slug];
    if (!provider) {
      sendJson(res, 404, { error: "Provider is not configured." });
      return;
    }
    const clientId = process.env[provider.clientIdEnv];
    const clientSecret = process.env[provider.clientSecretEnv];
    if (!clientId || !clientSecret) {
      session.user.connections = Array.from(new Set([...(session.user.connections || []), provider.label]));
      session.user.oauthTokens = session.user.oauthTokens || {};
      session.user.oauthTokens[slug] = {
        connectedAt: new Date().toISOString(),
        tokenStatus: "demo_connected",
        scopes: provider.scopes,
        expiresAt: null,
        profile: { title: `${provider.label} demo account`, id: `${slug}-demo` },
        analyticsPreview: { range: "Demo mode", columns: [], totals: [] }
      };
      addAudit(db, session.user, "oauth.demo_connected", { provider: slug });
      writeDb(db);
      sendJson(res, 200, { demo: true, connected: provider.label, user: publicUser(session.user), message: "No provider credentials found, so demo OAuth was simulated." });
      return;
    }
    const state = crypto.randomBytes(18).toString("hex");
    db.oauthStates[state] = { userId: session.user.id, provider: slug, createdAt: Date.now() };
    writeDb(db);
    const redirectUri = `http://localhost:${port}/api/oauth/callback/${slug}`;
    const authUrl = new URL(provider.authUrl);
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", provider.scopes.join(" "));
    authUrl.searchParams.set("state", state);
    Object.entries(provider.authParams || {}).forEach(([key, value]) => {
      authUrl.searchParams.set(key, value);
    });
    if (slug === "tiktok") authUrl.searchParams.set("client_key", clientId);
    sendJson(res, 200, { redirectUrl: authUrl.toString() });
    return;
  }

  if (url.pathname === "/api/oauth/status" && req.method === "GET") {
    if (!session) {
      sendJson(res, 401, { error: "Log in to view OAuth status." });
      return;
    }
    sendJson(res, 200, { providers: publicUser(session.user).oauthStatus });
    return;
  }

  const oauthDisconnect = url.pathname.match(/^\/api\/oauth\/disconnect\/([^/]+)$/);
  if (oauthDisconnect && req.method === "POST") {
    if (!session) {
      sendJson(res, 401, { error: "Log in first." });
      return;
    }
    const slug = providerSlug(oauthDisconnect[1]);
    const provider = providerConfig[slug];
    if (!provider) {
      sendJson(res, 404, { error: "Provider is not configured." });
      return;
    }
    session.user.oauthTokens = session.user.oauthTokens || {};
    delete session.user.oauthTokens[slug];
    session.user.connections = (session.user.connections || []).filter((item) => item !== provider.label);
    addAudit(db, session.user, "oauth.disconnected", { provider: slug });
    writeDb(db);
    sendJson(res, 200, { user: publicUser(session.user), disconnected: provider.label });
    return;
  }

  const oauthCallback = url.pathname.match(/^\/api\/oauth\/callback\/([^/]+)$/);
  if (oauthCallback && req.method === "GET") {
    const slug = providerSlug(oauthCallback[1]);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    const provider = providerConfig[slug];
    const stored = db.oauthStates[state];
    if (!provider || !stored || !code) {
      redirect(res, "/?oauth=failed");
      return;
    }
    const user = db.users.find((item) => item.id === stored.userId);
    if (!user) {
      delete db.oauthStates[state];
      writeDb(db);
      redirect(res, "/?oauth=failed");
      return;
    }
    try {
      const redirectUri = `${appUrl}/api/oauth/callback/${slug}`;
      const tokenResponse = await exchangeOAuthCode(provider, slug, code, redirectUri);
      const accessToken = tokenResponse.access_token;
      const refreshToken = tokenResponse.refresh_token;
      const expiresAt = tokenResponse.expires_in ? Date.now() + Number(tokenResponse.expires_in) * 1000 : null;
      const providerData = accessToken ? await buildProviderProfile(slug, accessToken) : { profile: null, analyticsPreview: null };
      user.connections = Array.from(new Set([...(user.connections || []), provider.label]));
      user.oauthTokens = user.oauthTokens || {};
      user.oauthTokens[slug] = {
        connectedAt: new Date().toISOString(),
        tokenStatus: "connected",
        scopes: provider.scopes,
        expiresAt,
        accessToken: encryptValue(accessToken),
        refreshToken: refreshToken ? encryptValue(refreshToken) : user.oauthTokens[slug]?.refreshToken || null,
        tokenType: tokenResponse.token_type || "Bearer",
        profile: providerData.profile,
        analyticsPreview: providerData.analyticsPreview
      };
      addAudit(db, user, "oauth.connected", { provider: slug, hasRefreshToken: Boolean(refreshToken) });
      delete db.oauthStates[state];
      writeDb(db);
      redirect(res, `/?oauth=connected&provider=${encodeURIComponent(slug)}`);
    } catch (error) {
      if (user) {
        user.oauthTokens = user.oauthTokens || {};
        user.oauthTokens[slug] = {
          connectedAt: new Date().toISOString(),
          tokenStatus: "exchange_failed",
          error: error.message,
          scopes: provider.scopes
        };
      }
      delete db.oauthStates[state];
      writeDb(db);
      redirect(res, `/?oauth=failed&provider=${encodeURIComponent(slug)}`);
    }
    return;
  }

  sendJson(res, 404, { error: "Not found." });
}

function serveStatic(req, res, url) {
  if (url.pathname === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }
  let filePath = url.pathname === "/" ? path.join(root, "index.html") : path.join(root, decodeURIComponent(url.pathname));
  if (url.pathname === "/landing") filePath = path.join(root, "landing.html");
  if (url.pathname === "/app") filePath = path.join(root, "index.html");
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url).catch((error) => {
      console.error(error);
      sendJson(res, 500, { error: "Server error." });
    });
    return;
  }
  serveStatic(req, res, url);
});

server.listen(port, () => {
  console.log(`CommandCue running at http://localhost:${port}`);
});
