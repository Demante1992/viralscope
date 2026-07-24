const platforms = [
  { name: "YouTube", short: "YT", className: "platform-youtube", connected: true, health: 98, followers: "412K" },
  { name: "Instagram", short: "IG", className: "platform-instagram", connected: true, health: 92, followers: "287K" },
  { name: "TikTok", short: "TT", className: "platform-tiktok", connected: true, health: 96, followers: "528K" },
  { name: "Twitch", short: "TW", className: "platform-twitch", connected: true, health: 91, followers: "96K" },
  { name: "Kick", short: "K", className: "platform-kick", connected: false, health: 0, followers: "Not linked" },
  { name: "Facebook", short: "FB", className: "platform-facebook", connected: false, health: 0, followers: "Not linked" },
  { name: "Website", short: "URL", className: "platform-website", connected: true, health: 89, followers: "6 tracked" }
];

const chartSeries = {
  YouTube: { color: "#ff5b52", values: [24, 35, 42, 38, 54, 68, 71, 69, 84, 91, 103, 110] },
  Instagram: { color: "#ff8b64", values: [18, 27, 36, 45, 42, 51, 60, 66, 63, 75, 78, 86] },
  TikTok: { color: "#4fe2d2", values: [32, 40, 39, 56, 63, 79, 95, 104, 112, 124, 138, 151] },
  Twitch: { color: "#7b5cff", values: [12, 14, 19, 23, 27, 31, 38, 35, 44, 49, 53, 58] },
  Kick: { color: "#7ee044", values: [4, 5, 8, 10, 14, 18, 22, 24, 27, 31, 34, 39] },
  Facebook: { color: "#77a8ff", values: [10, 13, 16, 15, 19, 21, 24, 26, 28, 30, 29, 34] },
  Website: { color: "#f4bc50", values: [7, 12, 15, 20, 24, 31, 37, 41, 48, 55, 61, 67] }
};

const topContent = [
  { platform: "TikTok", title: "Morning routine reset with linked product kit", views: "3.2M", engagement: "14.8%", clicks: "42.1K", lift: 92, liftBreakdown: { velocity: 96, engagement: 91, clicks: 94, retention: 86, revenue: 88, reason: "High share speed, strong saves, and above-average bio-link clicks." } },
  { platform: "YouTube", title: "How I plan a month of creator content in one afternoon", views: "1.8M", engagement: "9.4%", clicks: "26.7K", lift: 84, liftBreakdown: { velocity: 82, engagement: 78, clicks: 86, retention: 88, revenue: 81, reason: "Strong watch time and search fit, with packaging still leaving room to improve CTR." } },
  { platform: "Instagram", title: "Carousel: 7 mistakes that kill watch-through rate", views: "928K", engagement: "11.2%", clicks: "18.4K", lift: 78, liftBreakdown: { velocity: 73, engagement: 87, clicks: 75, retention: 72, revenue: 69, reason: "Excellent saves and shares, but weaker conversion path than short-form video." } },
  { platform: "Twitch", title: "Live Q&A stream with sponsor command clicks", views: "214K", engagement: "16.9%", clicks: "12.8K", lift: 81, liftBreakdown: { velocity: 76, engagement: 93, clicks: 84, retention: 79, revenue: 83, reason: "Chat command activity and watch duration lifted the score." } },
  { platform: "Kick", title: "Creator collab stream replay and chat highlights", views: "118K", engagement: "13.1%", clicks: "6.4K", lift: 63, liftBreakdown: { velocity: 61, engagement: 72, clicks: 58, retention: 64, revenue: 53, reason: "Good early engagement, but smaller audience size and lower click volume." } },
  { platform: "Website", title: "Creator toolkit landing page traffic from all bios", views: "184K", engagement: "6.7%", clicks: "61.9K", lift: 75, liftBreakdown: { velocity: 68, engagement: 63, clicks: 96, retention: 74, revenue: 86, reason: "Click and revenue attribution are strong, even though social engagement is lower." } },
  { platform: "Facebook", title: "Long-form community clip repost", views: "306K", engagement: "5.8%", clicks: "7.2K", lift: 44, liftBreakdown: { velocity: 42, engagement: 39, clicks: 47, retention: 51, revenue: 38, reason: "Reach is decent, but weak engagement and low attributed value pull the score down." } }
];

const channelPreviewData = {
  YouTube: {
    theme: "youtube",
    brand: "Video Studio",
    handle: "@curiositybelow",
    name: "Curiosity Below",
    avatar: "CB",
    tabs: ["Videos", "Shorts", "Live", "Playlists", "About"],
    stats: [
      ["14.8M", "Views"],
      ["412K", "Subscribers"],
      ["8.7%", "CTR"],
      ["61%", "Retention"]
    ],
    posts: ["Analytics Are Lying", "Creator Audit", "Viral Signals", "Sponsor Fix"]
  },
  Instagram: {
    theme: "instagram",
    brand: "Social Profile",
    handle: "@curiositybelow",
    name: "Curiosity Below",
    avatar: "CB",
    tabs: ["Posts", "Reels", "Tagged", "Insights"],
    stats: [
      ["287K", "Followers"],
      ["4.2M", "Reach"],
      ["11.2%", "Engagement"],
      ["18.4K", "Profile clicks"]
    ],
    posts: ["7 Signals", "Behind Build", "Dashboard Reel", "Brand Deals"]
  },
  TikTok: {
    theme: "tiktok",
    brand: "Shorts Feed",
    handle: "@curiositybelow",
    name: "Curiosity Below",
    avatar: "CB",
    tabs: ["Videos", "Trending", "Sounds", "Shop"],
    stats: [
      ["528K", "Followers"],
      ["3.2M", "Top video"],
      ["42.1K", "Bio clicks"],
      ["14.8%", "Engagement"]
    ],
    posts: ["Mistake #1", "AI Dashboard", "Growth Hack", "Creator Stack"]
  },
  Twitch: {
    theme: "twitch",
    brand: "Live Channel",
    handle: "curiositybelow",
    name: "Curiosity Below Live",
    avatar: "LIVE",
    tabs: ["Home", "About", "Schedule", "Videos", "Chat"],
    stats: [
      ["96K", "Followers"],
      ["4.8K", "Avg viewers"],
      ["12.8K", "Command clicks"],
      ["1.9K", "Subs"]
    ],
    posts: ["Live Audit", "Chat Spikes", "Clip Pack", "Q&A"]
  },
  Kick: {
    theme: "kick",
    brand: "Stream Hub",
    handle: "curiositybelow",
    name: "Curiosity Below",
    avatar: "K",
    tabs: ["Live", "Clips", "Schedule", "Chat"],
    stats: [
      ["68K", "Followers"],
      ["2.1K", "Avg viewers"],
      ["6.4K", "Link clicks"],
      ["39", "Outlier score"]
    ],
    posts: ["Collab Stream", "Live Clip", "Challenge", "Recap"]
  },
  Facebook: {
    theme: "facebook",
    brand: "Page Insights",
    handle: "@curiositybelow",
    name: "Curiosity Below",
    avatar: "FB",
    tabs: ["Posts", "Videos", "Reels", "Community"],
    stats: [
      ["306K", "Views"],
      ["74K", "Followers"],
      ["5.8%", "Engagement"],
      ["7.2K", "Clicks"]
    ],
    posts: ["Community Clip", "Long Form", "Page Reel", "Poll"]
  },
  Website: {
    theme: "website",
    brand: "Owned Site",
    handle: "curiositybelow.com",
    name: "Curiosity Below Hub",
    avatar: "URL",
    tabs: ["Landing", "Links", "Shop", "Newsletter"],
    stats: [
      ["184K", "Visits"],
      ["61.9K", "Clicks"],
      ["8.4%", "Conversion"],
      ["$7.5K", "Value"]
    ],
    posts: ["Creator Toolkit", "Live Kit", "Newsletter", "Offer Page"]
  }
};

let urls = [
  { url: "pulsepilot.io/creator-toolkit", source: "All social bios", clicks: "61.9K", change: "+19%" },
  { url: "pulsepilot.io/live-kit", source: "Twitch chat command", clicks: "12.8K", change: "+27%" },
  { url: "shop.example.com/summer-edit", source: "TikTok caption", clicks: "42.1K", change: "+34%" },
  { url: "newsletter.example.com/join", source: "YouTube description", clicks: "18.6K", change: "+12%" }
];

let alerts = [
  { title: "TikTok share spike", body: "Your product kit video is being shared 2.4x faster than the account baseline.", severity: "hot", time: "Live" },
  { title: "Twitch chat command surge", body: "The !kit command drove 3.1K clicks during the first 22 minutes of the stream.", severity: "live", time: "2m" },
  { title: "Retention drop at 00:38", body: "Three YouTube videos lose viewers near the first sponsor mention.", severity: "warn", time: "8m" },
  { title: "Website conversion gap", body: "Instagram sends high-intent clicks, but the mobile landing page is 18% slower than usual.", severity: "watch", time: "13m" }
];

let activityFeed = [
  { type: "Spike", title: "TikTok share velocity crossed 2.4x baseline", time: "Now", status: "hot" },
  { type: "Sync", title: "YouTube Studio metrics refreshed", time: "3m", status: "live" },
  { type: "AI", title: "Coach found 3 packaging opportunities", time: "7m", status: "ai" },
  { type: "URL", title: "Bio hub clicks are pacing 19% above normal", time: "11m", status: "live" }
];

let liveOpsState = {
  title: "All systems watching",
  body: "YouTube, TikTok, Instagram, Twitch, and URL traffic are being monitored for spikes.",
  status: "Monitoring 8 sources"
};

const audienceSegments = [
  { label: "18-24", value: 22, color: "#2ed3b7" },
  { label: "25-34", value: 38, color: "#ff7161" },
  { label: "35-44", value: 24, color: "#f4bc50" },
  { label: "45+", value: 16, color: "#69a7ff" }
];

const coachPrompts = [
  "Review my latest upload",
  "Find my next viral angle",
  "Fix this title and thumbnail",
  "Build a 7-day growth plan"
];

const recommendations = {
  fast: [
    {
      title: "Repackage the latest YouTube video",
      body: "The topic is proven on TikTok, but the YouTube title is broad. Lead with the outcome and add one curiosity gap."
    },
    {
      title: "Turn Twitch chat spikes into Shorts",
      body: "Clip the 3 moments where chat command clicks peaked and publish them as short-form hooks within 24 hours."
    },
    {
      title: "A/B test thumbnails before upload",
      body: "Use a face or product close-up against a simple high-contrast promise. Avoid dense text on mobile."
    }
  ],
  deep: [
    {
      title: "Competitor outlier map",
      body: "Track 12 adjacent creators and flag videos that outperform their channel baseline by 2x or more, then extract format patterns."
    },
    {
      title: "Search and suggested strategy",
      body: "Pair one searchable weekly upload with two trend-led uploads. Use keywords with high intent and manageable competition."
    },
    {
      title: "Retention repair",
      body: "Your sponsor transition creates a recurring drop. Move the value proof before the ad read and add a visual reset at 00:35."
    }
  ]
};

const labFeatures = [
  {
    source: "Trend radar",
    title: "Outlier finder",
    body: "Surface videos, Reels, TikToks, and streams beating their normal baseline so creators can spot formats early."
  },
  {
    source: "Packaging",
    title: "Title and thumbnail lab",
    body: "Generate title variants, thumbnail briefs, mobile previews, and click-through predictions before publishing."
  },
  {
    source: "SEO",
    title: "Keyword opportunity score",
    body: "Show search volume, competition, intent, and suggested metadata for YouTube, Reels captions, and website posts."
  },
  {
    source: "Coach",
    title: "AI channel reviewer",
    body: "Use connected account data to audit latest posts, diagnose stalls, compare competitors, and write next-step growth plans."
  }
];

let outliers = [
  {
    platform: "YouTube",
    niche: "Creator Education",
    title: "I audited 100 creator channels. These 5 patterns won.",
    creator: "Niche Mentor",
    multiplier: "4.8x",
    velocity: "+312K views in 24h",
    score: 94
  },
  {
    platform: "TikTok",
    niche: "Creator Education",
    title: "The analytics mistake that kills brand deals",
    creator: "Growth Desk",
    multiplier: "3.6x",
    velocity: "+88K shares",
    score: 88
  },
  {
    platform: "Twitch",
    niche: "Gaming",
    title: "Live coaching stream turns into a clip machine",
    creator: "StreamLab Pro",
    multiplier: "2.9x",
    velocity: "+41% chat velocity",
    score: 81
  }
];

let competitors = [
  { name: "Niche Mentor", subs: "812K", views: "+2.4M", cadence: "4 uploads/wk", score: 91 },
  { name: "Growth Desk", subs: "504K", views: "+1.1M", cadence: "Daily shorts", score: 86 },
  { name: "StreamLab Pro", subs: "219K", views: "+384K", cadence: "3 streams/wk", score: 78 }
];

let packagingTests = [
  {
    variant: "A",
    title: "I Built a Creator Dashboard That Shows What Actually Grows",
    angle: "Outcome-led, broad appeal",
    ctr: 7.8,
    score: 82
  },
  {
    variant: "B",
    title: "Your Analytics Are Lying Until You Track These 7 Signals",
    angle: "Curiosity plus pain point",
    ctr: 10.9,
    score: 93
  },
  {
    variant: "C",
    title: "How I Find Viral Ideas Before Recording Anything",
    angle: "Process-led creator promise",
    ctr: 9.4,
    score: 88
  }
];

let keywordRows = [
  { keyword: "creator analytics", volume: "High", competition: "Medium", intent: "Strategy", score: 87 },
  { keyword: "youtube channel audit", volume: "Medium", competition: "Low", intent: "Problem aware", score: 91 },
  { keyword: "how to grow on tiktok", volume: "Very high", competition: "High", intent: "Discovery", score: 72 },
  { keyword: "content creator dashboard", volume: "Medium", competition: "Low", intent: "Tool research", score: 84 }
];

let alertRules = [
  { name: "Outlier spike", threshold: "2.5x channel baseline", target: "Any connected platform", status: "Active" },
  { name: "Thumbnail underperforming", threshold: "CTR below 5% after 2K impressions", target: "YouTube", status: "Active" },
  { name: "Stream clip opportunity", threshold: "Chat velocity above 140/min", target: "Twitch and Kick", status: "Draft" }
];

let collections = [
  { name: "Sponsor integration fixes", count: "8 items", detail: "Retention notes, title tests, and examples" },
  { name: "Shorts from live streams", count: "12 clips", detail: "Twitch and Kick moments ready for edit" },
  { name: "Competitor outliers", count: "19 videos", detail: "Winning formats by niche and hook type" }
];

let integrations = [
  { platform: "YouTube", status: "Live sync", scope: "Videos, Studio analytics, comments", freshness: "3 min ago" },
  { platform: "Instagram", status: "Live sync", scope: "Reels, posts, profile clicks", freshness: "8 min ago" },
  { platform: "TikTok", status: "Live sync", scope: "Videos, sounds, shares", freshness: "5 min ago" },
  { platform: "Twitch", status: "Live sync", scope: "Streams, chat, commands", freshness: "2 min ago" },
  { platform: "Kick", status: "Needs auth", scope: "Streams and clips", freshness: "Not connected" },
  { platform: "Website", status: "Tracking", scope: "UTMs, referrals, conversions", freshness: "Real time" }
];

const demoState = {
  platforms: platforms.map((item) => ({ ...item })),
  urls: urls.map((item) => ({ ...item })),
  alerts: alerts.map((item) => ({ ...item })),
  activityFeed: activityFeed.map((item) => ({ ...item })),
  liveOpsState: { ...liveOpsState },
  integrations: integrations.map((item) => ({ ...item })),
  recommendations: JSON.parse(JSON.stringify(recommendations)),
  channelPreviewData: JSON.parse(JSON.stringify(channelPreviewData))
};

let uploadScores = [
  { name: "Hook clarity", score: 89, note: "The opening promise is specific and fast." },
  { name: "Title strength", score: 93, note: "Variant B creates the strongest curiosity gap." },
  { name: "Thumbnail readability", score: 78, note: "Readable on desktop, needs simpler mobile text." },
  { name: "Keyword fit", score: 86, note: "Good match for channel audit and creator analytics queries." },
  { name: "Posting window", score: 91, note: "Tuesday evening matches the strongest repeat-viewer window." },
  { name: "Revenue path", score: 74, note: "Add a clearer pinned comment and tracked sponsor link." }
];

let revenueStreams = [
  { name: "Sponsor links", value: "$18.4K", source: "YouTube + Twitch", lift: "+12%" },
  { name: "Affiliate sales", value: "$11.7K", source: "TikTok + website", lift: "+24%" },
  { name: "Newsletter leads", value: "$6.2K", source: "Instagram + Shorts", lift: "+9%" },
  { name: "Merch and courses", value: "$7.5K", source: "Website", lift: "+16%" },
  { name: "Stream subs", value: "$4.1K", source: "Twitch + Kick", lift: "+7%" },
  { name: "Brand pipeline", value: "$31K", source: "Media kit", lift: "+18%" }
];

let calendarItems = [
  { day: "Mon", title: "Short: analytics mistake killing brand deals", platform: "TikTok + Reels", status: "Ready" },
  { day: "Tue", title: "YouTube: your analytics are lying until...", platform: "YouTube", status: "Optimize title" },
  { day: "Wed", title: "Live audit stream with !kit command", platform: "Twitch", status: "Scheduled" },
  { day: "Thu", title: "Carousel: 7 signals sponsors care about", platform: "Instagram", status: "Draft" },
  { day: "Fri", title: "Clip package from live audit stream", platform: "Shorts", status: "Auto-generate" },
  { day: "Sun", title: "Newsletter recap with creator dashboard CTA", platform: "Website", status: "Planned" }
];

let reports = [
  { name: "Sponsor recap", audience: "Brand partner", detail: "Views, clicks, conversions, retention, CPM value", status: "Draft" },
  { name: "Editor brief", audience: "Production team", detail: "Top hooks, clip moments, thumbnail guidance", status: "Shared" },
  { name: "Monthly growth memo", audience: "Creator manager", detail: "Wins, risks, experiments, next bets", status: "Ready" }
];

let creatorOsScores = [
  { name: "Growth", score: 88, detail: "Traffic velocity, repeat viewers, and outlier rate are trending up." },
  { name: "Monetization", score: 76, detail: "Strong sponsor and affiliate paths, but owned products need clearer CTAs." },
  { name: "Audience quality", score: 91, detail: "Low suspicious activity and high comment depth across core platforms." },
  { name: "Consistency", score: 83, detail: "Publishing cadence is solid; stream-to-short turnaround is the weak spot." },
  { name: "Platform risk", score: 69, detail: "Too much discovery depends on TikTok and YouTube Shorts." },
  { name: "Sponsor readiness", score: 87, detail: "Media kit, conversion proof, and brand-safe topics are nearly launch-ready." }
];

let funnelLinks = [
  { step: "Bio hub", tool: "Link-in-bio", visits: "184K", conversion: "33.6%", insight: "TikTok drives volume, Instagram sends higher buying intent." },
  { step: "Email capture", tool: "Newsletter", visits: "18.2K", conversion: "9.8%", insight: "Pinned YouTube comments convert 1.4x better than descriptions." },
  { step: "Digital product", tool: "Checkout", visits: "7.4K", conversion: "4.1%", insight: "Bundle offer beats single template by 27%." },
  { step: "Sponsor CTA", tool: "Tracked links", visits: "61.9K", conversion: "6.7%", insight: "Live chat commands outperform static captions." }
];

let brandDeals = [
  { brand: "Notion-style sponsor", stage: "Negotiation", value: "$12K", next: "Send audience quality report" },
  { brand: "AI editing app", stage: "Brief due", value: "$7.5K", next: "Approve 2 Shorts hooks" },
  { brand: "Creator gear partner", stage: "Outreach", value: "$18K", next: "Share media kit and rate card" },
  { brand: "Newsletter placement", stage: "Won", value: "$4.2K", next: "Reconcile clicks Friday" }
];

let ownedAudience = [
  { channel: "Newsletter", count: "42.8K", growth: "+18%", health: 86, note: "Open rate 48%, click rate 9.8%, strongest source is YouTube." },
  { channel: "Memberships", count: "2.1K", growth: "+7%", health: 78, note: "Churn risk rises after 45 days without exclusive live content." },
  { channel: "Discord", count: "16.4K", growth: "+12%", health: 82, note: "Daily active members are up after live audit streams." },
  { channel: "Shop customers", count: "8.9K", growth: "+21%", health: 74, note: "Repeat purchase path needs better post-video follow-up." }
];

let audienceQuality = [
  { label: "Authentic engagement", score: 94, detail: "Comment depth and saves look natural across Instagram and TikTok." },
  { label: "Suspicious growth", score: 8, detail: "Low risk. Two small follower spikes need review after giveaways." },
  { label: "Audience fit", score: 89, detail: "Creator tools, AI workflows, and analytics topics dominate high-intent viewers." },
  { label: "Geo concentration", score: 72, detail: "US and Canada lead revenue, but UK viewers are growing fastest." }
];

let listeningSignals = [
  { source: "Reddit + YouTube comments", topic: "Creators distrust vanity metrics", sentiment: "+34%", action: "Make a post about metrics that predict income." },
  { source: "TikTok comments", topic: "People want channel audits", sentiment: "+48%", action: "Launch audit waitlist CTA in bio hub." },
  { source: "Discord", topic: "Confusion around sponsor rates", sentiment: "-12%", action: "Publish rate calculator and brand deal checklist." },
  { source: "Search trends", topic: "ViewStats alternative", sentiment: "+21%", action: "Target comparison keywords with landing page." }
];

let repurposeJobs = [
  { source: "Wed live audit", output: "8 Shorts + 3 Reels", status: "Ready to cut", score: 92 },
  { source: "YouTube analytics upload", output: "Newsletter + carousel", status: "Draft hooks", score: 86 },
  { source: "TikTok outlier", output: "Long-form outline", status: "Needs title", score: 81 },
  { source: "Sponsor Q&A", output: "Media kit proof block", status: "Approved", score: 88 }
];

let agentSteps = [
  { step: "Read channel context", result: "Found 7 connected sources and 3 content formats with repeatable lift." },
  { step: "Diagnose latest posts", result: "YouTube packaging lags behind TikTok topic strength by roughly 18%." },
  { step: "Create actions", result: "Prepared title test, stream clips, alert rule, and calendar plan." }
];

const operationalDemoState = {
  uploadScores: JSON.parse(JSON.stringify(uploadScores)),
  revenueStreams: JSON.parse(JSON.stringify(revenueStreams)),
  calendarItems: JSON.parse(JSON.stringify(calendarItems)),
  reports: JSON.parse(JSON.stringify(reports)),
  creatorOsScores: JSON.parse(JSON.stringify(creatorOsScores)),
  funnelLinks: JSON.parse(JSON.stringify(funnelLinks)),
  brandDeals: JSON.parse(JSON.stringify(brandDeals)),
  ownedAudience: JSON.parse(JSON.stringify(ownedAudience)),
  audienceQuality: JSON.parse(JSON.stringify(audienceQuality)),
  listeningSignals: JSON.parse(JSON.stringify(listeningSignals)),
  repurposeJobs: JSON.parse(JSON.stringify(repurposeJobs)),
  outliers: JSON.parse(JSON.stringify(outliers)),
  competitors: JSON.parse(JSON.stringify(competitors)),
  packagingTests: JSON.parse(JSON.stringify(packagingTests)),
  keywordRows: JSON.parse(JSON.stringify(keywordRows)),
  alertRules: JSON.parse(JSON.stringify(alertRules)),
  collections: JSON.parse(JSON.stringify(collections)),
  agentSteps: JSON.parse(JSON.stringify(agentSteps))
};

const oauthProviders = {
  YouTube: {
    method: "Google OAuth 2.0",
    status: "Supported",
    scopes: ["YouTube analytics", "channel data", "video metadata", "comments"],
    note: "Requires a Google Cloud OAuth client, consent screen, and backend token exchange."
  },
  Instagram: {
    method: "Meta OAuth",
    status: "Basic login supported",
    scopes: ["Basic Meta login", "profile identity", "Pro connector", "insights after review"],
    note: "Connects with basic Meta login now. Instagram media and insight sync unlock after Meta Page/Instagram permissions are approved."
  },
  TikTok: {
    method: "TikTok Login Kit",
    status: "Supported",
    scopes: ["profile", "video list", "video metrics", "creator insights"],
    note: "Requires TikTok developer app approval and registered redirect URLs."
  },
  Twitch: {
    method: "Twitch OAuth",
    status: "Supported",
    scopes: ["channel analytics", "streams", "clips", "chat events"],
    note: "Best implemented with authorization code flow through a backend."
  },
  Kick: {
    method: "Kick developer auth",
    status: "Possible / evolving",
    scopes: ["channel data", "streams", "chat", "clips"],
    note: "Kick developer access is newer; production support depends on approved API access and available scopes."
  },
  Facebook: {
    method: "Meta OAuth",
    status: "Basic login supported",
    scopes: ["Basic Meta login", "profile identity", "Page access after review", "insights after review"],
    note: "Connects with basic Meta login now. Page posts, video metrics, and insights need Meta advanced access/app review."
  },
  Website: {
    method: "Tracking snippet or URL",
    status: "No OAuth needed",
    scopes: ["UTM traffic", "referrals", "clicks", "conversions"],
    note: "Use a tracking script, pixel, server events, or campaign URL import."
  }
};

let selectedPlatform = "YouTube";
let previewPlatform = "YouTube";
const previewActiveTabs = {};
let activeRange = 30;
let chartMode = "line";
let chartPoints = [];
let chartHover = null;
let chartAnimationFrame = 0;
let activeChartPlatforms = new Set(Object.keys(chartSeries));
let coachMode = "fast";
let currentUser = null;
let currentWorkspace = null;
let metricsSummary = null;
let latestAiRun = null;
let sessionToken = window.localStorage.getItem("viralscopeSessionToken") || "";
const sessionSnapshotKey = "viralscopeSessionSnapshot";
let authMode = "login";
let selectedPlan = "pro";
let billingInterval = "monthly";
let upgradeContext = "OAuth connections";
let activeSettingsId = "profile";
let onboardingStep = 0;
let onboardingComplete = window.localStorage.getItem("viralscopeOnboardingComplete") === "true";
let onboardingState = {
  creatorType: "Education",
  goal: "Grow views",
  platforms: ["YouTube", "TikTok", "Instagram"],
  url: "https://curiositybelow.com/start"
};
const API_BASE = window.location.protocol === "file:" ? "http://localhost:4173" : "";

const $ = (selector) => document.querySelector(selector);

const planCatalog = {
  free: {
    name: "Free",
    badge: "Start",
    monthly: 0,
    yearly: 0,
    audience: "Creators validating a channel, offer, or traffic source.",
    cta: "Stay on Free",
    includes: ["Manual URL tracking", "Basic dashboard", "Limited discovery previews", "Campaign link notes"],
    locked: ["OAuth sync", "AI deep audits", "Revenue attribution", "Client reports"]
  },
  pro: {
    name: "Pro",
    badge: "Best for creators",
    monthly: 29,
    yearly: 23,
    audience: "Serious creators who want one command center for growth.",
    cta: "Upgrade to Pro",
    includes: ["OAuth platform connections", "Scheduled syncs", "AI channel audits", "Competitor and outlier scans", "Revenue attribution", "Shareable reports"],
    locked: ["Team role controls"]
  },
  studio: {
    name: "Studio",
    badge: "Teams",
    monthly: 79,
    yearly: 63,
    audience: "Creators with editors, sponsors, managers, or multiple brands.",
    cta: "Upgrade to Studio",
    includes: ["Everything in Pro", "Team seats", "Client reporting room", "Advanced approvals", "White-label media kits", "Priority sync monitoring"],
    locked: []
  }
};

const featureRows = [
  ["Manual URL tracking", "yes", "yes", "yes"],
  ["OAuth account connections", "no", "yes", "yes"],
  ["AI audits and recommendations", "limited", "yes", "yes"],
  ["Competitor and outlier alerts", "no", "yes", "yes"],
  ["Revenue attribution", "no", "yes", "yes"],
  ["Shareable client reports", "no", "yes", "yes"],
  ["Team seats and approvals", "no", "no", "yes"]
];

const upgradeReasons = {
  "OAuth connections": "OAuth connections require secure account linking, encrypted token storage, scheduled syncs, API monitoring, and reconnect flows.",
  "automation rules": "Automation rules run in the background, watch connected data, and trigger alerts when a creator metric crosses your chosen threshold.",
  "Deep AI channel audits": "Deep audits need richer channel history, recent post context, trend comparison, and more AI analysis time than the free preview.",
  "Growth Lab idea generation": "Growth Lab generates platform-specific ideas from your performance patterns, competitor signals, and saved creator goals.",
  "Creator OS audits": "Creator OS audits combine analytics, packaging, revenue, operations, and audience quality into a scored growth system.",
  "outlier discovery scans": "Outlier scans continuously compare your content and competitors against baselines to find breakout formats early.",
  "competitor tracking": "Competitor tracking stores watchlists, monitors public performance changes, and turns their outliers into useful strategy notes.",
  "title and thumbnail testing": "Testing tools compare packaging options against channel baselines, predicted CTR, and audience fit.",
  "AI repurposing packs": "Repurposing packs convert long videos, streams, and posts into platform-native clips, captions, hooks, and follow-up ideas.",
  "Strategy Vault collections": "Strategy Vault saves playbooks, experiments, and repeatable growth systems across campaigns and platforms.",
  "the AI command center": "The AI command center needs connected account context, recent content data, and deeper reasoning over your creator history.",
  "the pre-publish optimizer": "The optimizer reviews packaging, retention risk, audience fit, and launch timing before content goes live.",
  "revenue attribution": "Revenue attribution connects content activity to offers, links, sponsors, subs, leads, and downstream conversion events.",
  "funnel optimization": "Funnel optimization maps attention into email, product, sponsor, and community outcomes across your owned channels.",
  "media kit generation": "Media kits pull current audience, performance, niche, and campaign data into sponsor-ready reports.",
  "AI calendar generation": "AI calendar generation turns your goals and performance signals into a weekly publishing plan.",
  "shareable client reports": "Client reports package metrics, insights, and next moves into a polished external view.",
  "audience quality scans": "Audience scans examine engagement health, geography, repeat viewers, and suspicious traffic patterns.",
  "owned-audience sync": "Owned-audience sync connects email, website, and community activity so you can see what platforms actually convert.",
  "social listening scans": "Social listening scans monitor keywords, sentiment, comments, and trend shifts that matter to your niche.",
  "AI launch campaign generation": "AI launch campaigns turn product positioning, creator niche, beta goals, and platform strategy into launch scripts, descriptions, CTAs, and rollout assets.",
  "Stripe billing and paid plan activation": "Production billing needs Stripe products, checkout sessions, webhook verification, plan entitlements, invoice history, and customer portal access.",
  "YouTube metric sync": "YouTube metric sync uses authenticated channel tokens, analytics scopes, backend snapshot storage, and refresh jobs to keep dashboards current.",
  "additional tracked URLs": "Free workspaces include a small number of tracked URLs. Paid plans raise limits for campaigns, sponsor links, funnels, and client reporting."
};

let launchReadiness = [
  { area: "Product prototype", score: 94, status: "Ready", detail: "Core UI, tabs, charts, Pro gating, onboarding, alerts, reports, and AI surfaces are demo-ready." },
  { area: "Authentication", score: 78, status: "Prototype", detail: "Demo login exists. Production needs hosted auth, password reset, email verification, and protected routes." },
  { area: "Stripe billing", score: 64, status: "Next build", detail: "Paywall journey is designed. Production needs Stripe products, checkout sessions, webhooks, and customer portal." },
  { area: "OAuth providers", score: 52, status: "Blocked by setup", detail: "Flow is mapped. Each provider needs developer apps, scopes, callback URLs, review, token storage, and refresh jobs." },
  { area: "Data platform", score: 58, status: "Next build", detail: "Prototype data is local/static. Launch needs database tables, event pipeline, analytics jobs, and backup strategy." },
  { area: "Legal and trust", score: 46, status: "Needs owner", detail: "Privacy policy, terms, cookie notice, data deletion, AI usage disclosure, and OAuth scope explanations are required." }
];

let launchStack = [
  { title: "YouTube OAuth", type: "Provider", status: "App required", action: "Create Google Cloud OAuth client, request YouTube Analytics scopes, and configure redirect URL." },
  { title: "Instagram and Facebook", type: "Provider", status: "Review required", action: "Create Meta app, connect Business/Creator accounts, request Insights/Page permissions, and prepare app review notes." },
  { title: "TikTok", type: "Provider", status: "Review required", action: "Create TikTok developer app, request login and analytics scopes, and document content insights use case." },
  { title: "Twitch", type: "Provider", status: "Supported", action: "Create Twitch app, add OAuth callback, request channel analytics and clips scopes." },
  { title: "Kick", type: "Provider", status: "Evolving", action: "Confirm current API access, available scopes, and whether production approval is available for analytics." },
  { title: "Stripe checkout", type: "Payment", status: "Ready to wire", action: "Create Free, Pro, and Studio products, add checkout session endpoint, webhook listener, and customer portal." },
  { title: "Usage limits", type: "Billing", status: "Needed", action: "Define plan limits for connected accounts, reports, AI audits, alert rules, and team seats." },
  { title: "Security storage", type: "Trust", status: "Needed", action: "Encrypt OAuth tokens, isolate user data, rotate secrets, and log token refresh failures." }
];

const marketingLaunch = [
  { channel: "Curiosity Below bio", priority: "Day 1", idea: "Add CommandCue as the top creator-tool link with a short promise: track every platform in one command center." },
  { channel: "YouTube Short", priority: "Day 1", idea: "Show the before/after: scattered analytics tabs versus CommandCue's unified dashboard and AI coach." },
  { channel: "Pinned comment", priority: "Day 1", idea: "Pin a founder-style note asking creators what platform they struggle to understand most." },
  { channel: "Long-form demo", priority: "Week 1", idea: "Walk through connecting a channel, reading lift score, finding outliers, and generating a content plan." },
  { channel: "Waitlist landing page", priority: "Week 1", idea: "Collect emails by niche and platform so launch messaging can be personalized." },
  { channel: "Creator beta group", priority: "Week 2", idea: "Invite 10-25 small creators to test URL tracking first, then graduate Pro OAuth once approved." }
];

const platformIcons = {
  YouTube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 7.4c-.2-.9-.9-1.6-1.8-1.8C17.6 5.2 12 5.2 12 5.2s-5.6 0-7.2.4c-.9.2-1.6.9-1.8 1.8-.4 1.6-.4 4.6-.4 4.6s0 3 .4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.2.4 7.2.4s5.6 0 7.2-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.6.4-4.6s0-3-.4-4.6Z"/><path class="icon-cutout" d="m10.2 15.1 5-3.1-5-3.1v6.2Z"/></svg>`,
  Instagram: `<svg class="instagram-logo" viewBox="0 0 24 24" aria-hidden="true"><rect class="line-logo" x="4.2" y="4.2" width="15.6" height="15.6" rx="4.4"/><circle class="line-logo" cx="12" cy="12" r="3.7"/><circle cx="16.8" cy="7.3" r="1.1"/></svg>`,
  TikTok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 3.5h3.1c.2 1.4 1 2.6 2.1 3.4.8.6 1.6.9 2.5 1v3.2c-1.7-.1-3.2-.7-4.6-1.7v6.4c0 3-2.4 5.3-5.5 5.3-3 0-5.3-2.2-5.3-5 0-2.9 2.4-5.1 5.3-5.1.5 0 1 .1 1.4.2v3.3c-.4-.2-.8-.3-1.3-.3-1.2 0-2.1.8-2.1 1.9s.9 1.9 2 1.9c1.3 0 2.3-.8 2.3-2.4V3.5Z"/></svg>`,
  Twitch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h16v10.7l-4.3 4.3h-4.1L9.7 21H7v-2.5H3.5V6.3L5 3.5Z"/><path class="icon-cutout" d="M8.2 6.5h10.2v6.3l-2.1 2.1h-4.1l-2.4 2.1v-2.1H8.2V6.5Z"/><path d="M11.1 8.5h1.7v4.4h-1.7V8.5Zm4.1 0h1.7v4.4h-1.7V8.5Z"/></svg>`,
  Kick: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4h5.1v5h2.1l3.6-5h5.2l-5.7 7.4L20.8 20h-5.6l-3.7-5.5H9.6V20H4.5V4Z"/></svg>`,
  Facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.1V6.7c0-.7.5-1 1.1-1H18V2.5h-3.5c-3.4 0-4.8 2-4.8 4.7v.9H7v3.6h2.7v9.8h4.5v-9.8h3.3l.6-3.6h-3.9Z"/></svg>`,
  Website: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path class="icon-cutout stroke-only" d="M3.7 12h16.6M12 3c2.5 2.4 3.7 5.4 3.7 9S14.5 18.6 12 21c-2.5-2.4-3.7-5.4-3.7-9S9.5 5.4 12 3Z"/></svg>`
};

const navIcons = {
  overview: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13.5 12 5l8 8.5"/><path d="M6.5 12v7h11v-7"/><path d="M10 19v-5h4v5"/></svg>`,
  analytics: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 3.4-4.2 3.1 2.5L19 7"/><circle cx="10.4" cy="10.8" r="1"/><circle cx="13.5" cy="13.3" r="1"/><circle cx="19" cy="7" r="1"/></svg>`,
  growth: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16.5c5.2-.2 8.8-3.1 11-8.7"/><path d="M11.5 8h3.8v3.8"/><path d="M5 20h14"/><path d="M7 20v-3.5M12 20v-6M17 20v-9"/></svg>`,
  monetization: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M16.5 7.5c-.8-1-2.2-1.7-4-1.7-2.3 0-4 1.1-4 2.9 0 4.2 8.2 2.1 8.2 6.4 0 1.8-1.8 3.1-4.3 3.1-2 0-3.6-.7-4.8-2"/><path d="M4 20h16"/></svg>`,
  operations: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><path d="M14 16h5M16.5 13.5v5"/></svg>`,
  channels: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="12" rx="2"/><path d="M8 20h8M12 16.5V20"/></svg>`,
  discovery: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/><path d="M10.5 7.5v6M7.5 10.5h6"/></svg>`,
  campaigns: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h4l9-5v11l-9-5H4v-1Z"/><path d="M8 14.5 9.5 20"/><path d="M20 10.5a4 4 0 0 1 0 6"/></svg>`,
  coach: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M4.8 7.2l2.1 2.1M17.1 14.7l2.1 2.1M3 12h3M18 12h3M4.8 16.8l2.1-2.1M17.1 9.3l2.1-2.1"/><circle cx="12" cy="12" r="4"/></svg>`,
  revenue: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M16.5 7.5c-.8-1-2.2-1.7-4-1.7-2.3 0-4 1.1-4 2.9 0 4.2 8.2 2.1 8.2 6.4 0 1.8-1.8 3.1-4.3 3.1-2 0-3.6-.7-4.8-2"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/><path d="M8 14h2M12 14h2M16 14h2M8 17h2M12 17h2"/></svg>`,
  audience: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c.7-3.4 2.6-5.2 5.5-5.2s4.8 1.8 5.5 5.2"/><circle cx="17" cy="10" r="2.3"/><path d="M15 15.4c2.5.2 4.2 1.8 5 4.6"/></svg>`,
  alerts: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 21 19H3L12 3Z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h9l3 3V20.5H6V3.5Z"/><path d="M14.5 3.5V7H18"/><path d="M9 12h6M9 15h6M9 18h3"/></svg>`
  ,
  launch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c3.2 1.5 5.2 4.2 5.5 7.6l3 2.4-2.8 1.1c-.5 1.6-1.4 3.1-2.6 4.3L12 21l-3.1-2.1c-1.2-1.2-2.1-2.7-2.6-4.3l-2.8-1.1 3-2.4c.3-3.4 2.3-6.1 5.5-7.6Z"/><circle class="icon-cutout" cx="12" cy="10" r="2.1"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"/><path d="M19.4 15a8.7 8.7 0 0 0 .1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L15 6.5h-4l-.4 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a8.7 8.7 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.4 2.6h4l.4-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2.2-1.5Z"/></svg>`
};

function renderNavIcons() {
  document.querySelectorAll("[data-nav-icon]").forEach((node) => {
    node.innerHTML = navIcons[node.dataset.navIcon] || "";
  });
}

function positionFloatingTooltip(trigger, tooltip) {
  if (!trigger || !tooltip) return;
  const margin = 16;
  const gap = 10;
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const width = tooltipRect.width || Math.min(340, window.innerWidth - margin * 2);
  const height = tooltipRect.height || 180;
  let left = triggerRect.left + triggerRect.width / 2 - width / 2;
  let top = triggerRect.bottom + gap;

  if (top + height > window.innerHeight - margin) {
    top = triggerRect.top - height - gap;
  }

  left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
  top = Math.max(margin, Math.min(top, window.innerHeight - height - margin));
  tooltip.style.setProperty("--tip-left", `${left}px`);
  tooltip.style.setProperty("--tip-top", `${top}px`);
}

function bindEdgeAwareTooltip(trigger, tooltipSelector) {
  const tooltip = trigger?.querySelector(tooltipSelector);
  if (!trigger || !tooltip || trigger.dataset.edgeTipReady) return;
  trigger.dataset.edgeTipReady = "true";
  const place = () => positionFloatingTooltip(trigger, tooltip);
  trigger.addEventListener("mouseenter", place);
  trigger.addEventListener("focus", place);
  trigger.addEventListener("focusin", place);
  trigger.addEventListener("pointerdown", place);
}

function renderPanelInfoTips() {
  document.querySelectorAll(".panel-header h3").forEach((heading) => {
    const key = heading.textContent.trim();
    const info = panelInfo[key];
    if (!info || heading.querySelector(".panel-info")) return;
    heading.insertAdjacentHTML(
      "beforeend",
      `
        <span class="panel-info" tabindex="0" aria-label="${info.title}: ${info.body}">
          <span class="panel-info-icon">i</span>
          <span class="panel-info-card" role="tooltip">
            <strong>${info.title}</strong>
            <span>${info.body}</span>
          </span>
        </span>
      `
    );
  });

  document.querySelectorAll(".panel-info:not([data-info-ready])").forEach((tip) => {
    tip.dataset.infoReady = "true";
    bindEdgeAwareTooltip(tip, ".panel-info-card");
    tip.addEventListener("click", (event) => {
      event.stopPropagation();
      positionFloatingTooltip(tip, tip.querySelector(".panel-info-card"));
      document.querySelectorAll(".panel-info.is-open").forEach((openTip) => {
        if (openTip !== tip) openTip.classList.remove("is-open");
      });
      tip.classList.toggle("is-open");
    });
    tip.addEventListener("focus", () => tip.classList.add("is-open"));
    tip.addEventListener("blur", () => tip.classList.remove("is-open"));
    tip.addEventListener("mouseleave", () => tip.classList.remove("is-open"));
  });
}

let discoveryResults = [
  { platform: "YouTube", name: "Dinner Lab Daily", handle: "@dinnerlabdaily", niche: "Dinner recipes and meal prep", followers: "842K", engagement: "8.8%", outlier: 94, match: "High-performing weeknight dinner videos" },
  { platform: "TikTok", name: "One Pan Dinner", handle: "@onepandinner", niche: "Fast family meals", followers: "1.2M", engagement: "13.4%", outlier: 91, match: "Short recipe hooks with strong saves" },
  { platform: "Instagram", name: "Dinner Table Club", handle: "@dinnertableclub", niche: "Comfort food reels", followers: "318K", engagement: "10.1%", outlier: 86, match: "Carousel-to-Reel repurposing" },
  { platform: "YouTube", name: "Budget Bites Nightly", handle: "@budgetbitesnightly", niche: "Budget dinner channels", followers: "604K", engagement: "7.9%", outlier: 82, match: "Search-friendly dinner ideas" },
  { platform: "Facebook", name: "Family Dinner Wins", handle: "@familydinnerwins", niche: "Community recipe page", followers: "456K", engagement: "6.4%", outlier: 76, match: "Share-heavy recipe posts" },
  { platform: "Twitch", name: "Cook Along Live", handle: "cookalonglive", niche: "Live cooking streams", followers: "96K", engagement: "11.7%", outlier: 79, match: "Live chat recipe requests" },
  { platform: "Kick", name: "Late Plate Live", handle: "lateplatelive", niche: "Late-night cooking streams", followers: "58K", engagement: "9.2%", outlier: 71, match: "Emerging live food niche" }
];

let watchlist = [];

const settingsItems = [
  { id: "profile", icon: "P", accent: "#2ed3b7", title: "Profile", detail: "Creator name, email, password reset, timezone, and notification defaults." },
  { id: "billing", icon: "$", accent: "#74d47b", title: "Billing", detail: "Plan status, invoices, payment method, cancellation, and Pro upgrade controls." },
  { id: "connections", icon: "↔", accent: "#69a7ff", title: "Connected accounts", detail: "OAuth providers, token health, scopes, reconnect, and disconnect flows." },
  { id: "team", icon: "+", accent: "#9b7cff", title: "Team access", detail: "Invite editors, managers, sponsors, or clients with role-based permissions." },
  { id: "privacy", icon: "◎", accent: "#ff7161", title: "Data privacy", detail: "Export data, delete account, revoke tokens, and manage AI training preferences." },
  { id: "brand", icon: "B", accent: "#f4bc50", title: "Brand kit", detail: "Saved colors, logo, report templates, default CTAs, and sponsor disclosure language." },
  { id: "memory", icon: "AI", accent: "#8ee8c7", title: "AI memory", detail: "Tell CommandCue your niche, offers, content style, competitors, and banned topics." },
  { id: "notifications", icon: "!", accent: "#e6c15b", title: "Notifications", detail: "Outlier alerts, weekly reports, revenue spikes, failed syncs, and deadline reminders." }
];

const panelInfo = {
  "Traffic by platform": {
    title: "Traffic timeline",
    body: "Compares view and traffic movement across connected platforms. Use the range and chart controls to spot momentum shifts, drops, and platform-specific spikes."
  },
  "Operating system score": {
    title: "Creator OS score",
    body: "A blended health score across growth, monetization, audience quality, consistency, platform risk, and sponsor readiness. Pro audits refresh the score from connected data."
  },
  "Connected channels": {
    title: "Source health",
    body: "Shows which platforms are connected, how recently they synced, and whether OAuth or URL tracking is powering the signal."
  },
  "Channel and page snapshots": {
    title: "Platform-native preview",
    body: "A quick preview of how each connected platform would appear inside CommandCue, including native stats, recent content, and connection status."
  },
  "Find channels and pages across platforms": {
    title: "Creator discovery",
    body: "Searches across platform-style datasets by niche, creator, or keyword. Useful for finding competitors, collaborators, and outlier formats to watch."
  },
  "Account and data connectors": {
    title: "Integration hub",
    body: "Tracks OAuth providers, scopes, sync freshness, and connector status. URL tracking stays free; authenticated platform connections are Pro."
  },
  "Top movers": {
    title: "Lift score",
    body: "Ranks content by blended velocity, engagement, retention, click-through, and revenue impact. Hover each lift score for its detailed breakdown."
  },
  "Channel growth coach": {
    title: "AI coach",
    body: "Fast mode gives quick tactical suggestions. Deep mode reviews connected channel patterns, latest posts, competitors, and revenue paths as a Pro workflow."
  },
  "Ask CommandCue to do the work": {
    title: "AI command center",
    body: "Turns a broad creator request into actions across audits, title tests, calendar planning, alerts, reports, and repurposing. This is a Pro automation layer."
  },
  "Best-in-class creator growth tools": {
    title: "Growth lab",
    body: "A workspace for experiments inspired by top creator tools: outlier discovery, keyword planning, title testing, channel audits, and reusable strategy assets."
  },
  "Outlier video discovery": {
    title: "Outlier radar",
    body: "Flags content beating a channel or niche baseline. The goal is to reveal formats, hooks, thumbnails, and timing patterns before a trend gets crowded."
  },
  "Creator comparison board": {
    title: "Competitive intelligence",
    body: "Compares adjacent creators by audience size, recent view movement, cadence, and opportunity score so you can benchmark against the right peers."
  },
  "Title and thumbnail testing": {
    title: "Packaging lab",
    body: "Scores title and thumbnail variants before publishing. Combines predicted CTR, clarity, curiosity, format fit, and mobile readability."
  },
  "Turn every upload into a content system": {
    title: "Repurpose studio",
    body: "Plans how one stream or upload becomes Shorts, Reels, carousels, newsletters, clips, and proof points. Great for squeezing more reach from every idea."
  },
  "Upload readiness score": {
    title: "Pre-publish optimizer",
    body: "Checks hook clarity, title strength, thumbnail readability, keyword fit, posting window, and revenue path before the post goes live."
  },
  "Keyword opportunity scores": {
    title: "SEO engine",
    body: "Scores topics by volume, competition, intent, and fit across YouTube, captions, search-driven posts, and landing pages."
  },
  "Video alert rules": {
    title: "Automation rules",
    body: "Lets Pro users define signals like outlier spikes, CTR drops, revenue jumps, chat velocity, and failed syncs, then trigger notifications or workflows."
  },
  "Saved collections": {
    title: "Strategy vault",
    body: "Stores reusable experiments, competitor examples, sponsor fixes, clip plans, and AI recommendations so your best research does not disappear."
  },
  "Which content turns attention into income": {
    title: "Revenue attribution",
    body: "Connects posts, streams, links, campaigns, and offers to sponsor value, affiliates, merch, newsletters, memberships, and brand pipeline movement."
  },
  "Link-in-bio and conversion paths": {
    title: "Bio funnel",
    body: "Maps how social traffic moves through bio links, email capture, checkout, sponsor CTAs, and tracked campaigns. Pro optimization suggests better CTA order."
  },
  "Sponsor pipeline and rate intelligence": {
    title: "Brand CRM",
    body: "Tracks sponsor stages, deliverables, estimated value, rate-card proof, next actions, and reportable outcomes for brand partners."
  },
  "AI-generated publishing plan": {
    title: "Content calendar",
    body: "Turns analytics and AI recommendations into a weekly cross-platform plan with status, platform mix, and timing opportunities."
  },
  "Shareable performance reports": {
    title: "Reports",
    body: "Builds sponsor, editor, manager, and client-ready summaries with top content, attribution, growth risks, and next recommended bets."
  },
  "Saved creators to compare later": {
    title: "Watchlist",
    body: "Keeps discovered creators, channels, and pages in one place so you can compare their outliers, formats, and growth patterns over time."
  },
  "Account, billing, team, and data controls": {
    title: "Settings",
    body: "Controls account profile, billing, connected platforms, team roles, data privacy, brand kit, AI memory, and notification preferences."
  },
  "Go-live readiness command deck": {
    title: "Launch readiness",
    body: "Separates what is demo-ready from what must be real before launch: OAuth apps, Stripe billing, auth, database storage, legal pages, and security controls."
  },
  "Production connection checklist": {
    title: "Production stack",
    body: "Shows each OAuth, payment, billing, and security task that needs production implementation before CommandCue can accept real customers."
  },
  "Creator acquisition plan": {
    title: "Launch marketing",
    body: "Turns the product into a practical rollout plan across your bio, Shorts, descriptions, pinned comments, long-form demos, and beta creator outreach."
  },
  "Who is leaning in": {
    title: "Audience depth",
    body: "Shows audience segments, best posting windows, repeat-viewer movement, and platform overlap so you know who is becoming a real fan."
  },
  "Authenticity, fit, and brand safety": {
    title: "Audience quality",
    body: "Evaluates authentic engagement, suspicious growth risk, audience fit, geography, and brand-safety signals for sponsor-ready reporting."
  },
  "Newsletter, community, shop, and memberships": {
    title: "Owned audience",
    body: "Tracks creator-owned channels that reduce platform risk: newsletter, membership, Discord/community, shop customers, and repeat revenue health."
  },
  "Tracked URLs": {
    title: "Website tracker",
    body: "Free URL tracking captures campaign links, bio links, landing pages, referrals, clicks, UTMs, and conversion movement without OAuth."
  },
  "Smart alerts": {
    title: "Opportunity radar",
    body: "Surfaces high-priority changes like share spikes, chat command surges, retention drops, slow landing pages, and conversion gaps."
  },
  "What your market is saying right now": {
    title: "Social listening",
    body: "Summarizes comments, communities, search trends, and sentiment so you can turn audience conversations into content and product ideas."
  }
};

function onboardingItems() {
  return [
    { title: "Run setup wizard", done: onboardingComplete },
    { title: "Track first URL", done: urls.some((item) => item.source === "Onboarding setup") },
    { title: "Pick creator goal", done: Boolean(onboardingState.goal) },
    { title: "Choose platforms", done: onboardingState.platforms.length > 0 }
  ];
}

function internalSearchItems() {
  const contentItems = currentUser ? liveContentRowsFromSnapshots() : topContent;
  return [
    ...platforms.map((item) => ({ type: "Channel", title: item.name, detail: item.connected ? item.followers : "OAuth needed", view: "analytics" })),
    ...contentItems.map((item) => ({ type: "Content", title: item.title, detail: `${item.platform} · ${item.views}`, view: "analytics" })),
    ...urls.map((item) => ({ type: "URL", title: item.url, detail: `${item.clicks} clicks`, view: "analytics" })),
    ...alerts.map((item) => ({ type: "Alert", title: item.title, detail: item.body, view: "operations" })),
    ...calendarItems.map((item) => ({ type: "Calendar", title: item.title, detail: `${item.day} · ${item.platform}`, view: "operations" })),
    ...reports.map((item) => ({ type: "Report", title: item.name, detail: item.audience, view: "monetization" })),
    ...launchReadiness.map((item) => ({ type: "Launch", title: item.area, detail: item.detail, view: "launch" })),
    ...launchStack.map((item) => ({ type: "Launch", title: item.title, detail: item.action, view: "launch" })),
    ...collections.map((item) => ({ type: "Collection", title: item.name, detail: item.detail, view: "growth" })),
    ...settingsItems.map((item) => ({ type: "Setting", title: item.title, detail: item.detail, view: "settings" }))
  ];
}

async function apiRequest(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (sessionToken) headers.Authorization = `Bearer ${sessionToken}`;
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers,
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) {
      sessionToken = "";
      window.localStorage.removeItem("viralscopeSessionToken");
    }
    const error = new Error(data.error || "Request failed.");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

function saveSessionSnapshot() {
  if (!currentUser) return;
  const snapshot = {
    user: currentUser,
    workspace: currentWorkspace,
    savedAt: new Date().toISOString()
  };
  window.localStorage.setItem(sessionSnapshotKey, JSON.stringify(snapshot));
}

function loadSessionSnapshot() {
  try {
    const snapshot = JSON.parse(window.localStorage.getItem(sessionSnapshotKey) || "null");
    if (!snapshot?.user) return null;
    return snapshot;
  } catch {
    return null;
  }
}

function hydrateSessionSnapshot() {
  const snapshot = loadSessionSnapshot();
  if (!snapshot) return false;
  currentUser = snapshot.user;
  currentWorkspace = snapshot.workspace || null;
  urls = (currentWorkspace?.trackedUrls || []).map((item) => ({ ...item, clicks: item.clicks || "0", change: "Tracking" }));
  metricsSummary = null;
  applyWorkspaceSourceState();
  updateAccountUi();
  return true;
}

async function logoutAccount() {
  try {
    await apiRequest("/api/auth/logout", { method: "POST", body: JSON.stringify({}) });
  } catch {
    // Local sign-out should still complete if the server session already expired.
  }
  sessionToken = "";
  currentUser = null;
  currentWorkspace = null;
  metricsSummary = null;
  window.localStorage.removeItem("viralscopeSessionToken");
  window.localStorage.removeItem(sessionSnapshotKey);
  $("#settingsDialog")?.close();
  restoreDemoState();
  updateAccountUi();
  renderAll();
  showToast("Logged out.");
}

function formatBadge(platform) {
  const item = platforms.find((entry) => entry.name === platform) || platforms[4];
  return `<span class="platform-badge ${item.className}" title="${item.name}">${platformIcons[item.name] || item.short}</span>`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  const duration = String(message).length > 120 ? 5200 : 2600;
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), duration);
}

function renderOAuthSetupRequired(errorData = {}) {
  const provider = oauthProviders[selectedPlatform];
  const required = errorData.requiredEnv || [];
  const isMeta = selectedPlatform === "Instagram" || selectedPlatform === "Facebook";
  const redirectLines = isMeta
    ? [
        errorData.redirectUri,
        errorData.redirectUri?.replace(/\/(instagram|facebook)$/, selectedPlatform === "Instagram" ? "/facebook" : "/instagram")
      ].filter(Boolean)
    : [errorData.redirectUri || "Set APP_URL first"];
  $("#oauthPreview").innerHTML = `
    <header>
      <div>
        <p class="eyebrow">${provider.method}</p>
        <h4>${selectedPlatform} setup required</h4>
      </div>
      <span class="data-pill">Needs keys</span>
    </header>
    <p>${isMeta ? "Add one Meta app's credentials in Netlify. Basic login works first; Page, post, and Instagram insights unlock after Meta advanced access/app review." : "Add the provider credentials in Netlify, redeploy, then try OAuth again."}</p>
    <div class="setup-callout">
      <strong>${redirectLines.length > 1 ? "Redirect URIs" : "Redirect URI"}</strong>
      <code>${redirectLines.join("\n")}</code>
      <strong>Netlify variables</strong>
      <code>${required.length ? required.join(" + ") : "Provider client ID + secret"}</code>
      ${isMeta ? "<strong>Meta permissions now</strong><code>public_profile</code><strong>Advanced permissions later</strong><code>pages_show_list + pages_read_engagement + instagram_basic + instagram_manage_insights + read_insights</code>" : ""}
    </div>
  `;
}

function addActivity(type, title, status = "live") {
  activityFeed.unshift({ type, title, time: "Now", status });
  activityFeed = activityFeed.slice(0, 6);
  renderActivityFeed();
}

function setLiveOps(title, body, status) {
  liveOpsState = { title, body, status };
  renderActivityFeed();
}

function setButtonWorking(button, isWorking, label = "Working") {
  if (!button) return;
  if (isWorking) {
    button.dataset.idleText = button.textContent.trim();
    button.classList.add("is-working");
    button.disabled = true;
    button.innerHTML = `<span class="button-spinner"></span>${label}`;
    return;
  }
  button.classList.remove("is-working");
  button.disabled = false;
  if (button.dataset.idleText) button.textContent = button.dataset.idleText;
}

function renderActivityFeed() {
  if (!$("#activityFeed")) return;
  $("#syncStateTitle").textContent = liveOpsState.title;
  $("#syncStateBody").textContent = liveOpsState.body;
  $("#liveStatusText").textContent = liveOpsState.status;
  $("#activityFeed").innerHTML = activityFeed
    .map(
      (item) => `
        <div class="activity-item ${item.status}">
          <span>${item.type}</span>
          <strong>${item.title}</strong>
          <small>${item.time}</small>
        </div>
      `
    )
    .join("");
}

function updateAccountUi() {
  const button = $("#accountButton");
  if (!currentUser) {
    button.textContent = "Log in";
    button.classList.remove("pro");
    return;
  }
  const plan = currentUser.plan === "studio" ? "Studio" : currentUser.plan === "pro" ? "Pro" : "Free";
  button.textContent = `${currentUser.name} · ${plan}`;
  button.classList.toggle("pro", ["pro", "studio"].includes(currentUser.plan));
  renderOnboarding();
}

function copyInto(target, source) {
  target.splice(0, target.length, ...source.map((item) => ({ ...item })));
}

function resetOperationalSurfaces() {
  uploadScores = operationalDemoState.uploadScores.map((item) => ({ ...item }));
  revenueStreams = operationalDemoState.revenueStreams.map((item) => ({ ...item }));
  calendarItems = operationalDemoState.calendarItems.map((item) => ({ ...item }));
  reports = operationalDemoState.reports.map((item) => ({ ...item }));
  creatorOsScores = operationalDemoState.creatorOsScores.map((item) => ({ ...item }));
  funnelLinks = operationalDemoState.funnelLinks.map((item) => ({ ...item }));
  brandDeals = operationalDemoState.brandDeals.map((item) => ({ ...item }));
  ownedAudience = operationalDemoState.ownedAudience.map((item) => ({ ...item }));
  audienceQuality = operationalDemoState.audienceQuality.map((item) => ({ ...item }));
  listeningSignals = operationalDemoState.listeningSignals.map((item) => ({ ...item }));
  repurposeJobs = operationalDemoState.repurposeJobs.map((item) => ({ ...item }));
  outliers = operationalDemoState.outliers.map((item) => ({ ...item }));
  competitors = operationalDemoState.competitors.map((item) => ({ ...item }));
  packagingTests = operationalDemoState.packagingTests.map((item) => ({ ...item }));
  keywordRows = operationalDemoState.keywordRows.map((item) => ({ ...item }));
  alertRules = operationalDemoState.alertRules.map((item) => ({ ...item }));
  collections = operationalDemoState.collections.map((item) => ({ ...item }));
  agentSteps = operationalDemoState.agentSteps.map((item) => ({ ...item }));
}

function restoreDemoState() {
  copyInto(platforms, demoState.platforms);
  urls = demoState.urls.map((item) => ({ ...item }));
  alerts = demoState.alerts.map((item) => ({ ...item }));
  activityFeed = demoState.activityFeed.map((item) => ({ ...item }));
  liveOpsState = { ...demoState.liveOpsState };
  integrations = demoState.integrations.map((item) => ({ ...item }));
  recommendations.fast = demoState.recommendations.fast.map((item) => ({ ...item }));
  recommendations.deep = demoState.recommendations.deep.map((item) => ({ ...item }));
  resetOperationalSurfaces();
  Object.entries(demoState.channelPreviewData).forEach(([platform, data]) => {
    channelPreviewData[platform] = JSON.parse(JSON.stringify(data));
  });
}

function inferPlatformFromUrl(url = "", fallback = "") {
  const value = `${fallback} ${url}`.toLowerCase();
  if (value.includes("youtube.com") || value.includes("youtu.be") || value.includes("youtube")) return "YouTube";
  if (value.includes("instagram.com") || value.includes("instagram")) return "Instagram";
  if (value.includes("tiktok.com") || value.includes("tiktok")) return "TikTok";
  if (value.includes("twitch.tv") || value.includes("twitch")) return "Twitch";
  if (value.includes("kick.com") || value.includes("kick")) return "Kick";
  if (value.includes("facebook.com") || value.includes("facebook") || value.includes("fb.com")) return "Facebook";
  return fallback && platforms.some((item) => item.name === fallback) ? fallback : "Website";
}

function platformScope(platform, mode) {
  const scopes = {
    YouTube: mode === "oauth" ? "Videos, Studio analytics, comments" : "Channel URL, referrals, campaign clicks",
    Instagram: mode === "oauth" ? "Reels, posts, profile clicks" : "Profile URL, referrals, campaign clicks",
    TikTok: mode === "oauth" ? "Videos, sounds, shares" : "Profile URL, referrals, campaign clicks",
    Twitch: mode === "oauth" ? "Streams, chat, commands" : "Channel URL, referrals, campaign clicks",
    Kick: mode === "oauth" ? "Streams and clips" : "Channel URL, referrals, campaign clicks",
    Facebook: mode === "oauth" ? "Pages, posts, insights" : "Page URL, referrals, campaign clicks",
    Website: "UTMs, referrals, conversions"
  };
  return scopes[platform] || "Tracked URL and referrals";
}

function setMetricText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function applyEmptyMetricState() {
  if (!currentUser || metricsSummary?.latest?.length) return;
  setMetricText("totalViews", "0");
  setMetricText("heroViews", "0");
  setMetricText("engagements", "0");
  setMetricText("siteClicks", urls.length ? "0" : "0");
  setMetricText("revenue", "$0");
}

function workspaceHasSourceData() {
  return connectedPlatformSignals().length > 0 || urls.length > 0 || Boolean(metricsSummary?.latest?.length);
}

function renderDashboardBrief() {
  const signals = connectedPlatformSignals();
  const primary = primaryPlatformSignal();
  const sourceCount = signals.length;
  setMetricText("heroSources", String(sourceCount));

  const title = $("#dashboardBriefTitle");
  const body = $("#dashboardBriefBody");
  if (!title || !body) return;

  if (!currentUser) {
    title.textContent = "Preview the command center, then create a workspace.";
    body.textContent = "Sample metrics show the full product shape. Real accounts start clean and unlock tools as sources are connected.";
    return;
  }

  if (!sourceCount) {
    title.textContent = "Connect a source to unlock your first command.";
    body.textContent = "Start with YouTube OAuth or a tracked URL. CommandCue will then focus the dashboard around your real data.";
    return;
  }

  const latestTitle = primary?.latestContent?.[0]?.title;
  title.textContent = `${primary.platform} is ready for today’s brief.`;
  body.textContent = latestTitle
    ? `Latest pull: ${latestTitle}. Review Analytics for performance and Growth Lab for next actions.`
    : `${sourceCount} source${sourceCount === 1 ? "" : "s"} connected. Run sync checks to enrich metrics, thumbnails, and recommendations.`;
}

function renderWorkspaceEmptyState() {
  const node = $("#workspaceEmptyState");
  if (!node) return;
  node.classList.toggle("empty-state-hidden", !currentUser || workspaceHasSourceData());
}

function connectedPlatformSignals() {
  const trackedUrls = urls.map((item) => ({ ...item, source: inferPlatformFromUrl(item.url, item.source) }));
  return platforms
    .map((platform) => {
      const snapshot = (metricsSummary?.latest || []).find((item) => item.platform === platform.name);
      const oauth = (currentUser?.oauthStatus || []).find((item) => item.label === platform.name || item.provider === platform.name.toLowerCase());
      const platformUrls = trackedUrls.filter((item) => item.source === platform.name || (platform.name === "Website" && item.source === "Website"));
      const profile = snapshot?.profile || oauth?.profile || null;
      const metrics = snapshot?.metrics || {};
      const latestContent = snapshot?.latestContent?.length ? snapshot.latestContent : oauth?.latestContent || [];
      const connected = Boolean(snapshot || oauth || platformUrls.length);
      return {
        platform: platform.name,
        label: platform.name,
        connected,
        snapshot,
        oauth,
        profile,
        metrics,
        latestContent,
        trackedUrls: platformUrls,
        sourceMode: snapshot ? (snapshot.source === "oauth-sync" ? "Live sync" : "Snapshot") : oauth ? "OAuth ready" : platformUrls.length ? "URL tracking" : "Not connected",
        syncedAt: snapshot?.capturedAt || oauth?.connectedAt || null
      };
    })
    .filter((signal) => signal.connected);
}

function primaryPlatformSignal() {
  return connectedPlatformSignals().find((signal) => signal.snapshot || signal.oauth) || connectedPlatformSignals()[0] || null;
}

function signalAudienceCount(signal) {
  return signal.metrics?.subscribers || signal.metrics?.followers || signal.profile?.subscribers || signal.profile?.followers || 0;
}

function signalViewCount(signal) {
  return signal.metrics?.views || signal.profile?.views || 0;
}

function signalLatestTitle(signal) {
  return signal.latestContent?.[0]?.title || `${signal.platform} content`;
}

function applyGenericPreviewFromSignal(signal) {
  const preview = channelPreviewData[signal.platform];
  if (!preview) return;
  const views = signalViewCount(signal);
  const audience = signalAudienceCount(signal);
  preview.name = signal.profile?.title || preview.name.replace(" source", " account");
  preview.handle = signal.profile?.handle || signal.profile?.customUrl || signal.trackedUrls[0]?.url || preview.handle;
  preview.avatarImage = signal.profile?.thumbnail || null;
  preview.latestContent = signal.latestContent || [];
  preview.posts = signal.latestContent?.length
    ? signal.latestContent.slice(0, 4).map((item) => item.title)
    : signal.trackedUrls.length
      ? signal.trackedUrls.slice(0, 4).map((item) => item.url)
      : ["Connected", "Ready to sync", "Profile loaded", "Metrics next"];
  preview.stats = [
    [compactDisplayNumber(views), signal.platform === "Website" ? "Visits" : "Views"],
    [compactDisplayNumber(audience), signal.platform === "YouTube" ? "Subscribers" : "Followers"],
    [signal.snapshot ? "Synced" : signal.oauth ? "Ready" : "URL", signal.snapshot ? "Metrics" : "Source"],
    [signal.syncedAt ? new Date(signal.syncedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "Pending", "Updated"]
  ];
}

function liveContentRowsFromSnapshots() {
  const snapshotRows = (metricsSummary?.latest || []).flatMap((snapshot) => {
    const content = Array.isArray(snapshot.latestContent) ? snapshot.latestContent : [];
    return content.slice(0, 8).map((item, index) => {
      const analytics = item.analytics || {};
      const views = analytics.views ?? item.views ?? 0;
      const likes = analytics.likes ?? item.likes ?? 0;
      const comments = analytics.comments ?? item.comments ?? 0;
      const engagementRate = views ? Math.min(99, ((likes + comments) / views) * 100) : 0;
      const lift = Math.max(42, Math.min(98, Math.round(62 + engagementRate * 2.4 + Math.max(0, 8 - index) * 2)));
      return {
        platform: snapshot.platform,
        title: item.title || `${snapshot.platform} content ${index + 1}`,
        views: compactDisplayNumber(views),
        engagement: `${engagementRate.toFixed(1)}%`,
        clicks: compactDisplayNumber(snapshot.metrics?.clicks || 0),
        lift,
        liftBreakdown: {
          velocity: Math.min(99, lift + 4),
          engagement: Math.min(99, Math.round(engagementRate * 8) || lift - 8),
          clicks: snapshot.metrics?.clicks ? Math.min(99, lift + 2) : 54,
          retention: snapshot.analyticsPreview?.averageViewDuration ? Math.min(99, Math.round(snapshot.analyticsPreview.averageViewDuration / 2)) : 72,
          revenue: snapshot.metrics?.revenue ? Math.min(99, lift + 1) : 58,
          reason: "Generated from the latest OAuth snapshot: views, engagement, sync freshness, and available analytics signals."
        }
      };
    });
  });
  if (snapshotRows.length) return snapshotRows;

  return (currentUser?.oauthStatus || [])
    .filter((status) => status.tokenStatus !== "reconnect_required")
    .map((status) => ({
      platform: status.label || status.provider,
      title: `${status.profile?.title || status.label || "Connected channel"} is ready for first sync`,
      views: compactDisplayNumber(status.profile?.views || 0),
      engagement: "Pending",
      clicks: "0",
      lift: 64,
      liftBreakdown: {
        velocity: 62,
        engagement: 58,
        clicks: 52,
        retention: 60,
        revenue: 48,
        reason: "OAuth is connected, but the first metric sync has not populated full content analytics yet."
      }
    }));
}

function buildConnectedWorkspaceNarrative() {
  const liveSnapshots = metricsSummary?.latest || [];
  const oauthStatuses = (currentUser?.oauthStatus || []).filter((status) => status.tokenStatus !== "reconnect_required");
  const connectedPlatforms = platforms.filter((item) => item.connected);
  const latestYouTube = liveSnapshots.find((item) => item.platform === "YouTube");
  const latestVideo = latestYouTube?.latestContent?.[0] || oauthStatuses.find((status) => status.label === "YouTube")?.latestContent?.[0];
  if (!connectedPlatforms.length) return;

  liveOpsState = {
    title: "Connected signals online",
    body: `${connectedPlatforms.map((item) => item.name).join(", ")} ${connectedPlatforms.length === 1 ? "is" : "are"} feeding the workspace. ${latestVideo?.title ? `Latest YouTube pull: ${latestVideo.title}.` : "Run sync to pull the newest content metrics."}`,
    status: `${connectedPlatforms.length} connected source${connectedPlatforms.length === 1 ? "" : "s"}`
  };

  activityFeed = [
    ...(liveSnapshots.length
      ? liveSnapshots.map((snapshot) => ({
          type: "Sync",
          title: `${snapshot.platform} metrics refreshed from ${snapshot.source === "oauth-sync" ? "OAuth" : "backend snapshot"}`,
          time: new Date(snapshot.capturedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          status: "live"
        }))
      : oauthStatuses.map((status) => ({
          type: "OAuth",
          title: `${status.label || status.provider} connected and ready for first metric sync`,
          time: "Now",
          status: "live"
        }))),
    ...urls.slice(0, 3).map((item) => ({
      type: "URL",
      title: `${item.source} URL tracking active`,
      time: "Now",
      status: "live"
    }))
  ].slice(0, 6);

  alerts = liveSnapshots.length
    ? liveSnapshots.flatMap((snapshot) => {
        const latest = snapshot.latestContent?.[0];
        const views = snapshot.metrics?.views || snapshot.profile?.views || 0;
        const followers = snapshot.metrics?.subscribers || snapshot.metrics?.followers || snapshot.profile?.subscribers || 0;
        return [
          {
            title: `${snapshot.platform} sync complete`,
            body: `${snapshot.profile?.title || snapshot.platform} is connected with ${compactDisplayNumber(views)} total views and ${compactDisplayNumber(followers)} audience count.`,
            severity: "live",
            time: "Now"
          },
          latest
            ? {
                title: "Latest content ready for audit",
                body: `"${latest.title}" is now available for content review, repurposing, and AI coaching.`,
                severity: "ai",
                time: "New"
              }
            : null
        ].filter(Boolean);
      }).slice(0, 5)
    : oauthStatuses.length
      ? oauthStatuses.map((status) => ({
          title: `${status.label || status.provider} OAuth connected`,
          body: `${status.profile?.title || status.label || "This account"} is authenticated. Run a sync to populate latest content, charts, AI coach context, and alert baselines.`,
          severity: "live",
          time: "Now"
        })).slice(0, 5)
      : alerts;

  if (latestVideo) {
    recommendations.fast = [
      {
        title: `Audit "${latestVideo.title.slice(0, 54)}${latestVideo.title.length > 54 ? "..." : ""}"`,
        body: "Use the connected YouTube snapshot to tighten the title, pick a Shorts angle, and compare the first-hour signal against your channel baseline."
      },
      ...(demoState.recommendations?.fast || [])
    ].slice(0, 3);
  }
}

function applySnapshotChartSeries(snapshot) {
  const series = chartSeries[snapshot.platform];
  if (!series) return;
  const views = snapshot.metrics?.views || snapshot.profile?.views || 0;
  const finalValue = Math.max(1, Math.round(views / 1000));
  const startValue = Math.max(1, Math.round(finalValue * 0.58));
  series.values = Array.from({ length: 12 }, (_, index) => {
    const progress = index / 11;
    const wobble = Math.sin(index * 1.7) * Math.max(1, finalValue * 0.035);
    return Math.max(1, Math.round(startValue + (finalValue - startValue) * progress + wobble));
  });
  activeChartPlatforms.add(snapshot.platform);
}

function applyConnectedOperationalSurfaces() {
  resetOperationalSurfaces();
  if (!currentUser) return;
  const signals = connectedPlatformSignals();
  if (!signals.length) return;
  const primary = primaryPlatformSignal() || signals[0];
  const connectedNames = signals.map((signal) => signal.platform);
  const latestTitle = signalLatestTitle(primary);
  const totalViews = (metricsSummary?.totals?.views || signals.reduce((sum, signal) => sum + signalViewCount(signal), 0));
  const totalRevenue = metricsSummary?.totals?.revenue || 0;
  const totalClicks = Number(String(metricsSummary?.totals?.clicks || 0).replace(/\D/g, "")) || urls.reduce((sum, item) => sum + (parseFloat(String(item.clicks).replace(/[^\d.]/g, "")) || 0), 0);
  const audienceCount = signals.reduce((sum, signal) => sum + signalAudienceCount(signal), 0);
  const latestUpload = primary.latestContent?.[0];

  uploadScores = [
    { name: "Connected data quality", score: primary.snapshot ? 92 : 76, note: `${primary.platform} is ${primary.snapshot ? "syncing metrics" : "authenticated and ready for first sync"}.` },
    { name: "Latest content signal", score: latestUpload ? 88 : 64, note: latestUpload ? `"${latestTitle}" is available for review.` : "Connect/sync recent content to unlock deeper upload scoring." },
    { name: "Audience baseline", score: audienceCount ? 84 : 58, note: `${compactDisplayNumber(audienceCount)} audience signals available across ${connectedNames.join(", ")}.` },
    { name: "Revenue path", score: totalRevenue ? 82 : 61, note: totalRevenue ? "Revenue snapshots are attached to connected content." : "Add tracked sponsor or offer links to strengthen attribution." },
    ...operationalDemoState.uploadScores.slice(2, 4)
  ].slice(0, 6);

  revenueStreams = [
    { name: `${primary.platform} attention`, value: totalRevenue ? `$${compactDisplayNumber(totalRevenue)}` : "$0", source: `${compactDisplayNumber(totalViews)} connected views`, lift: primary.snapshot ? "+Live" : "Pending" },
    { name: "Tracked URL clicks", value: compactDisplayNumber(totalClicks), source: urls.length ? `${urls.length} tracked source${urls.length === 1 ? "" : "s"}` : "No tracked URLs yet", lift: urls.length ? "+Ready" : "Add URL" },
    { name: "Audience proof", value: compactDisplayNumber(audienceCount), source: connectedNames.join(" + "), lift: "+Profile" },
    ...operationalDemoState.revenueStreams.slice(3)
  ].slice(0, 6);

  calendarItems = [
    { day: "Mon", title: `Audit: ${latestTitle}`, platform: primary.platform, status: primary.snapshot ? "Ready" : "Sync first" },
    { day: "Tue", title: `Repurpose ${primary.platform} winner into Shorts/Reels`, platform: connectedNames.includes("YouTube") ? "Shorts + Reels" : primary.platform, status: latestUpload ? "Draft hooks" : "Plan" },
    { day: "Wed", title: "Refresh connected metrics and alert baselines", platform: connectedNames.join(" + "), status: "Scheduled" },
    ...operationalDemoState.calendarItems.slice(3)
  ].slice(0, 6);

  reports = [
    { name: `${primary.platform} performance report`, audience: "Creator owner", detail: `${primary.sourceMode}, ${compactDisplayNumber(totalViews)} views, ${compactDisplayNumber(audienceCount)} audience baseline, latest item: ${latestTitle}.`, status: primary.snapshot ? "Ready" : "Needs sync" },
    { name: "Connected sources summary", audience: "Team", detail: `${connectedNames.length} connected source${connectedNames.length === 1 ? "" : "s"}: ${connectedNames.join(", ")}.`, status: "Live" },
    ...operationalDemoState.reports.slice(1)
  ].slice(0, 4);

  creatorOsScores = operationalDemoState.creatorOsScores.map((item) => {
    if (item.name === "Growth") return { ...item, score: primary.snapshot ? 88 : 74, detail: `${primary.platform} ${primary.snapshot ? "metrics" : "OAuth"} are now feeding the command center.` };
    if (item.name === "Monetization") return { ...item, score: totalRevenue ? 82 : 68, detail: totalRevenue ? "Connected revenue is available for attribution." : "Attribution is waiting on tracked offers or sponsor links." };
    if (item.name === "Platform risk") return { ...item, score: Math.min(92, 60 + connectedNames.length * 8), detail: `${connectedNames.length} source${connectedNames.length === 1 ? "" : "s"} connected. Add more platforms to lower dependency risk.` };
    if (item.name === "Sponsor readiness") return { ...item, score: primary.snapshot ? 86 : 72, detail: "Connected source proof can now power media kits and sponsor reports." };
    return item;
  });

  funnelLinks = [
    { step: "Connected source", tool: primary.platform, visits: compactDisplayNumber(totalViews), conversion: primary.snapshot ? "Synced" : "Ready", insight: `${primary.platform} is now the top-of-funnel source for workspace analysis.` },
    { step: "Tracked URLs", tool: "Campaign links", visits: compactDisplayNumber(totalClicks), conversion: urls.length ? "Active" : "Pending", insight: urls.length ? "URL clicks can now be reconciled against connected content." : "Add a bio, sponsor, or landing URL to connect attention to action." },
    ...operationalDemoState.funnelLinks.slice(2)
  ].slice(0, 4);

  brandDeals = [
    { brand: `${primary.platform} sponsor proof`, stage: primary.snapshot ? "Ready" : "Needs sync", value: totalRevenue ? `$${compactDisplayNumber(totalRevenue)}` : "TBD", next: `Attach ${primary.platform} performance report and latest content proof.` },
    ...operationalDemoState.brandDeals.slice(1)
  ];

  ownedAudience = [
    { channel: `${primary.platform} audience`, count: compactDisplayNumber(audienceCount), growth: primary.snapshot ? "+Live" : "Ready", health: primary.snapshot ? 86 : 72, note: `${primary.profile?.title || primary.platform} is available as a connected audience source.` },
    ...operationalDemoState.ownedAudience.slice(1)
  ];

  audienceQuality = [
    { label: "Connected account trust", score: primary.oauth ? 92 : 76, detail: `${primary.platform} uses OAuth-backed identity, which is stronger than URL-only tracking.` },
    { label: "Audience fit", score: audienceCount ? 86 : 68, detail: audienceCount ? `${compactDisplayNumber(audienceCount)} followers/subscribers can be used for sponsor and content-fit analysis.` : "Audience sizing will improve after the first full metric sync." },
    ...operationalDemoState.audienceQuality.slice(2)
  ];

  listeningSignals = [
    { source: `${primary.platform} latest content`, topic: latestTitle, sentiment: primary.snapshot ? "+Live" : "Pending", action: `Review comments, hooks, and audience questions from ${primary.platform}.` },
    ...operationalDemoState.listeningSignals.slice(1)
  ];

  repurposeJobs = [
    { source: latestTitle, output: `${primary.platform} -> Shorts, Reels, newsletter, sponsor proof`, status: latestUpload ? "Ready to cut" : "Needs content sync", score: latestUpload ? 90 : 68 },
    ...operationalDemoState.repurposeJobs.slice(1)
  ];

  outliers = [
    { platform: primary.platform, niche: "Connected workspace", title: latestTitle, creator: primary.profile?.title || currentUser.name, multiplier: primary.snapshot ? "Live" : "Ready", velocity: `${compactDisplayNumber(totalViews)} views tracked`, score: primary.snapshot ? 86 : 70 },
    ...operationalDemoState.outliers.slice(1)
  ];

  competitors = [
    { name: primary.profile?.title || `${primary.platform} account`, subs: compactDisplayNumber(audienceCount), views: compactDisplayNumber(totalViews), cadence: primary.snapshot ? "Synced account" : "OAuth ready", score: primary.snapshot ? 88 : 72 },
    ...operationalDemoState.competitors.slice(1)
  ];

  packagingTests = [
    { variant: "A", title: latestTitle, angle: "Current connected title", ctr: primary.snapshot ? 8.4 : 6.2, score: primary.snapshot ? 82 : 68 },
    { variant: "B", title: `${primary.platform} audit: what is actually growing right now`, angle: "Outcome-led rewrite from connected data", ctr: primary.snapshot ? 10.6 : 7.4, score: primary.snapshot ? 91 : 76 },
    ...operationalDemoState.packagingTests.slice(2)
  ];

  keywordRows = [
    { keyword: `${primary.platform.toLowerCase()} analytics`, volume: "Connected", competition: "Workspace", intent: "Audit", score: primary.snapshot ? 88 : 74 },
    { keyword: `${primary.profile?.title || currentUser.name} channel audit`, volume: "Owned", competition: "Low", intent: "Brand search", score: 82 },
    ...operationalDemoState.keywordRows.slice(2)
  ];

  alertRules = [
    { name: `${primary.platform} sync health`, threshold: primary.snapshot ? "Alert if stale > 24h" : "Alert when first sync completes", target: primary.platform, status: "Active" },
    ...operationalDemoState.alertRules.slice(1)
  ];

  collections = [
    { name: `${primary.platform} growth queue`, count: primary.latestContent?.length ? `${primary.latestContent.length} items` : "1 source", detail: `${primary.sourceMode} saved for audits, reports, and repurposing.` },
    ...operationalDemoState.collections.slice(1)
  ];

  agentSteps = [
    { step: "Read connected account", result: `${primary.platform} is available with ${primary.sourceMode.toLowerCase()} status.` },
    { step: "Build workspace context", result: `${compactDisplayNumber(totalViews)} views, ${compactDisplayNumber(audienceCount)} audience baseline, and ${urls.length} tracked URLs are in scope.` },
    { step: "Create actions", result: `Prepared content audit, report draft, calendar items, attribution checks, and alert rules from ${primary.platform}.` }
  ];
}

function applyWorkspaceSourceState() {
  if (!currentUser) {
    restoreDemoState();
    return;
  }

  Object.entries(demoState.channelPreviewData).forEach(([platform, data]) => {
    channelPreviewData[platform] = {
      ...JSON.parse(JSON.stringify(data)),
      name: platform === "Website" ? "Owned traffic hub" : `${platform} source`,
      handle: "Not connected yet",
      avatar: data.avatar,
      stats: [
        ["0", platform === "Website" ? "Visits" : "Views"],
        ["0", platform === "YouTube" ? "Subscribers" : "Followers"],
        ["No sync", "OAuth"],
        ["0", "Clicks"]
      ],
      posts: ["Waiting for data", "Add OAuth", "Track a URL", "First sync"]
    };
  });

  copyInto(platforms, demoState.platforms.map((item) => ({
    ...item,
    connected: false,
    health: 0,
    followers: "Not linked"
  })));
  integrations = demoState.integrations.map((item) => ({
    ...item,
    status: "Needs auth",
    scope: platformScope(item.platform, "url"),
    freshness: "Not connected"
  }));

  const trackedUrls = urls.map((item) => ({
    ...item,
    source: inferPlatformFromUrl(item.url, item.source)
  }));
  urls = trackedUrls;

  trackedUrls.forEach((item) => {
    const platform = platforms.find((entry) => entry.name === item.source) || platforms.find((entry) => entry.name === "Website");
    if (!platform) return;
    platform.connected = true;
    platform.health = Math.max(platform.health, 72);
    platform.followers = "URL tracking";
    const preview = channelPreviewData[platform.name];
    if (preview) {
      preview.name = `${platform.name} tracked source`;
      preview.handle = item.url;
      preview.stats = [
        ["0", platform.name === "Website" ? "Visits" : "Views"],
        ["0", "Clicks"],
        ["URL", "Tracking"],
        ["No sync", "OAuth"]
      ];
      preview.posts = ["Waiting for clicks", "Campaign ready", "OAuth later", "First report"];
    }
  });

  const oauthStatuses = [
    ...(currentUser.oauthStatus || []),
    ...(currentUser.connections || [])
      .filter((name) => !(currentUser.oauthStatus || []).some((status) => status.label === name))
      .map((name) => ({ label: name, provider: name.toLowerCase(), tokenStatus: "connected", profile: null }))
  ];

  oauthStatuses.forEach((status) => {
    const name = status.label || status.provider;
    const platform = platforms.find((entry) => entry.name === name);
    if (!platform) return;
    const profile = status.profile || {};
    const preview = channelPreviewData[platform.name];
    platform.connected = true;
    platform.health = status.tokenStatus === "reconnect_required" ? 64 : Math.max(platform.health, 92);
    const followerCount = profile.subscribers ?? profile.followers;
    platform.followers = followerCount != null ? compactDisplayNumber(followerCount) : "OAuth sync";
    if (preview) {
      preview.name = profile.title || preview.name.replace(" source", " account");
      preview.handle = profile.handle || (profile.id ? `Channel ${profile.id}` : "OAuth connected");
      preview.avatar = platform.name === "YouTube" && profile.title
        ? profile.title.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()
        : preview.avatar;
      preview.stats = [
        [compactDisplayNumber(profile.views || 0), platform.name === "Website" ? "Visits" : "Views"],
        [compactDisplayNumber(profile.subscribers || profile.followers || 0), platform.name === "YouTube" ? "Subscribers" : "Followers"],
        [status.tokenStatus === "reconnect_required" ? "Reconnect" : "Connected", "OAuth"],
        [status.expiresAt ? "Ready" : "Pending", "First sync"]
      ];
      preview.latestContent = status.latestContent || [];
      preview.posts = status.tokenStatus === "reconnect_required"
        ? ["Reconnect needed", "Token expired", "Open OAuth", "Resume sync"]
        : ["OAuth connected", "Ready to sync", "Channel profile", "Metrics next"];
    }
  });

  integrations = integrations.map((item) => {
    const hasOAuth = (currentUser.connections || []).includes(item.platform);
    const trackedCount = trackedUrls.filter((url) => url.source === item.platform).length;
    if (hasOAuth) {
      return { ...item, status: "OAuth connected", scope: platformScope(item.platform, "oauth"), freshness: "Ready to sync" };
    }
    if (trackedCount) {
      return { ...item, status: "URL tracking", scope: `${trackedCount} tracked ${trackedCount === 1 ? "source" : "sources"}`, freshness: "Real time" };
    }
    return item;
  });

  const connectedCount = platforms.filter((item) => item.connected).length;
  alerts = [];
  activityFeed = trackedUrls.map((item) => ({
    type: "URL",
    title: `${item.source} source added: ${item.url}`,
    time: "Now",
    status: "live"
  })).slice(0, 6);
  liveOpsState = connectedCount
    ? {
        title: "Workspace tracking is ready",
        body: `${connectedCount} source${connectedCount === 1 ? "" : "s"} connected for URL tracking. OAuth sync will unlock deeper metrics once provider credentials are live.`,
        status: `Tracking ${connectedCount} source${connectedCount === 1 ? "" : "s"}`
      }
    : {
        title: "Connect your first source",
        body: "Add a channel URL for free tracking, or upgrade/connect OAuth when live provider credentials are configured.",
        status: "No sources yet"
      };
  if ((currentUser.oauthStatus || []).some((status) => status.tokenStatus !== "reconnect_required")) {
    buildConnectedWorkspaceNarrative();
  }
  applyConnectedOperationalSurfaces();
  applyEmptyMetricState();
}

async function refreshSession() {
  try {
    const data = await apiRequest("/api/me");
    if (!data.user) throw new Error("No saved session.");
    currentUser = data.user;
    currentWorkspace = data.workspace || null;
    updateAccountUi();
    urls = (currentWorkspace?.trackedUrls || []).map((item) => ({ ...item, clicks: item.clicks || "0", change: "Tracking" }));
    applyWorkspaceSourceState();
    saveSessionSnapshot();
    await refreshTrackedUrls();
    await refreshMetricsSummary();
    renderAll();
  } catch {
    if (hydrateSessionSnapshot()) {
      renderAll();
      return;
    }
    currentUser = null;
    currentWorkspace = null;
    metricsSummary = null;
    restoreDemoState();
    updateAccountUi();
  }
}

async function ensureCurrentSession({ showLogin = true, message = "Log in to continue.", forceRefresh = false } = {}) {
  if (currentUser && sessionToken && !forceRefresh) return true;
  if (sessionToken) {
    await refreshSession();
    if (currentUser && sessionToken) return true;
  }
  const rememberedEmail = window.localStorage.getItem("viralscopeLastEmail") || loadSessionSnapshot()?.user?.email || "";
  if (rememberedEmail) {
    try {
      const data = await apiRequest("/api/auth/resume", {
        method: "POST",
        body: JSON.stringify({ email: rememberedEmail })
      });
      if (data.sessionToken) {
        sessionToken = data.sessionToken;
        window.localStorage.setItem("viralscopeSessionToken", sessionToken);
      }
      currentUser = data.user;
      currentWorkspace = data.workspace || currentWorkspace;
      saveSessionSnapshot();
      updateAccountUi();
      return true;
    } catch {
      sessionToken = "";
      window.localStorage.removeItem("viralscopeSessionToken");
    }
  }
  if (showLogin) {
    openAuthDialog("login");
    showToast(message);
  }
  return false;
}

async function refreshLaunchReadiness(showResult = false) {
  try {
    const data = await apiRequest("/api/launch/readiness");
    if (Array.isArray(data.checks)) launchReadiness = data.checks;
    if (Array.isArray(data.providerStatus)) {
      launchStack = [
        ...data.providerStatus.map((provider) => ({
          title: `${provider.label} OAuth`,
          type: "Provider",
          status: provider.status,
          action: provider.configured
            ? `${provider.label} credentials are present. Next: complete app review, callback testing, and token refresh storage.`
            : `Add ${provider.label} developer credentials, approved scopes, and callback URLs before production launch.`
        })),
        {
          title: "Stripe checkout",
          type: "Payment",
          status: data.billing?.stripeReady ? "Credentials present" : "Ready to wire",
          action: data.billing?.stripeReady
            ? "Stripe keys are configured. Next: create checkout sessions, webhooks, invoices, and customer portal."
            : "Create Stripe products, checkout session endpoint, webhook listener, and customer portal."
        },
        {
          title: "Data storage",
          type: "Trust",
          status: data.database?.mode === "local-json" ? "Local only" : "Production database",
          action: data.database?.mode === "local-json"
            ? "Move from local JSON into a hosted database with migrations, backups, and event tables."
            : "Production database mode is configured. Validate backups and migration process."
        }
      ];
    }
    renderLaunchCenter();
    if (showResult) showToast("Launch readiness refreshed from backend.");
  } catch (error) {
    if (showResult) showToast(error.message);
  }
}

function applyMetricsSummary() {
  if (!metricsSummary?.latest?.length) return;
  if (metricsSummary.display?.views) {
    $("#totalViews").textContent = metricsSummary.display.views;
    $("#heroViews").textContent = metricsSummary.display.views;
  }
  if (metricsSummary.display?.engagements) $("#engagements").textContent = metricsSummary.display.engagements;
  if (metricsSummary.display?.clicks) $("#siteClicks").textContent = metricsSummary.display.clicks;
  if (metricsSummary.display?.revenue) $("#revenue").textContent = metricsSummary.display.revenue;

  metricsSummary.latest.forEach((snapshot) => {
    const platform = platforms.find((item) => item.name === snapshot.platform);
    if (platform) {
      platform.connected = true;
      platform.health = snapshot.source === "oauth-sync" ? 99 : Math.max(platform.health, 91);
      const followerCount = snapshot.metrics?.subscribers ?? snapshot.metrics?.followers;
      if (followerCount != null) platform.followers = compactDisplayNumber(followerCount);
    }
    applySnapshotChartSeries(snapshot);
    if (snapshot.platform === "YouTube" && snapshot.profile) {
      channelPreviewData.YouTube.name = snapshot.profile.title || channelPreviewData.YouTube.name;
      channelPreviewData.YouTube.handle = snapshot.profile.handle || channelPreviewData.YouTube.handle;
      channelPreviewData.YouTube.avatarImage = snapshot.profile.thumbnail || null;
      channelPreviewData.YouTube.latestContent = snapshot.latestContent || [];
      channelPreviewData.YouTube.stats = [
        [compactDisplayNumber(snapshot.metrics?.views || snapshot.profile.views || 0), "Views"],
        [compactDisplayNumber(snapshot.metrics?.subscribers || snapshot.profile.subscribers || 0), "Subscribers"],
        [snapshot.analyticsPreview?.error ? "Partial" : "Synced", "Analytics"],
        [new Date(snapshot.capturedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), "Last sync"]
      ];
    }
  });
  connectedPlatformSignals().forEach(applyGenericPreviewFromSignal);
  integrations = integrations.map((item) => {
    const snapshot = metricsSummary.latest.find((entry) => entry.platform === item.platform);
    if (!snapshot) return item;
    return {
      ...item,
      status: snapshot.source === "oauth-sync" ? "Live sync" : "Snapshot",
      scope: platformScope(item.platform, "oauth"),
      freshness: new Date(snapshot.capturedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };
  });
  buildConnectedWorkspaceNarrative();
  applyConnectedOperationalSurfaces();
}

function contentCardLabel(item) {
  const views = item?.analytics?.views ?? item?.views;
  const comments = item?.analytics?.comments ?? item?.comments;
  if (views != null) return `${compactDisplayNumber(views)} views`;
  if (comments != null) return `${compactDisplayNumber(comments)} comments`;
  return item?.type || "Content";
}

function contentPostsForTab(data, tab) {
  const content = data.latestContent || [];
  if (!content.length) return null;
  const filtered = tab === "Shorts"
    ? content.filter((item) => item.type === "Short")
    : tab === "Live"
      ? content.filter((item) => item.type === "Live")
      : tab === "Videos"
        ? content.filter((item) => item.type !== "Short" && item.type !== "Live")
        : content;
  const items = filtered.length ? filtered : content;
  return items.slice(0, 4).map((item) => ({
    title: item.title,
    meta: contentCardLabel(item),
    thumbnail: item.thumbnail || null,
    url: item.url || null
  }));
}

async function refreshMetricsSummary(showResult = false) {
  if (!currentUser) return;
  try {
    metricsSummary = await apiRequest("/api/metrics/summary");
    applyMetricsSummary();
    renderChannels();
    renderChannelPreview();
    renderContent();
    renderAlerts();
    renderActivityFeed();
    renderIntegrations();
    renderCoach();
    animateTrafficChart();
    if (showResult) showToast("Metric summary loaded from backend snapshots.");
  } catch (error) {
    if (showResult) showToast(error.message);
  }
}

async function refreshTrackedUrls() {
  if (!currentUser) return;
  try {
    const data = await apiRequest("/api/urls");
    urls = Array.isArray(data.urls) ? data.urls.map((item) => ({ ...item, clicks: item.clicks || "0", change: "Tracking" })) : [];
    applyWorkspaceSourceState();
    renderChannels();
    renderIntegrations();
    renderActivityFeed();
    renderChannelPreview();
    renderUrls();
  } catch (error) {
    urls = [];
    applyWorkspaceSourceState();
    renderChannels();
    renderIntegrations();
    renderActivityFeed();
    renderChannelPreview();
    renderUrls();
    showToast(error.message);
  }
}

function applyAiResult(result, mode = coachMode) {
  if (!result) return;
  if (result.summary) $("#coachSummary").textContent = result.summary;
  if (Array.isArray(result.recommendations) && result.recommendations.length) {
    recommendations[mode] = result.recommendations.map((item) => ({
      title: item.title || "AI recommendation",
      body: item.body || item.detail || "Review this recommendation."
    }));
    renderCoach();
  }
  if (Array.isArray(result.calendar) && result.calendar.length) {
    calendarItems = result.calendar.map((item) => ({
      day: item.day || "Next",
      title: item.title || "AI-planned content",
      platform: item.platform || "Multi-platform",
      status: item.status || "Planned"
    }));
    renderCalendar();
  }
  if (result.report) {
    reports.unshift({
      name: result.report.name || "AI report",
      audience: result.report.audience || "Creator",
      detail: result.report.detail || "AI-generated performance summary.",
      status: result.report.status || "Generated"
    });
    reports = reports.slice(0, 8);
    renderReports();
  }
}

function compactDisplayNumber(value) {
  const number = Number(value || 0);
  if (number >= 1_000_000_000) return `${(number / 1_000_000_000).toFixed(1)}B`;
  if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
  if (number >= 1_000) return `${(number / 1_000).toFixed(1)}K`;
  return String(Math.round(number));
}

function openAuthDialog(mode = "login") {
  authMode = mode;
  $("#authTitle").textContent = mode === "signup" ? "Create account" : mode === "recover" ? "Recover account" : "Log in";
  $("#authHelper").textContent = mode === "signup"
    ? "Create or restore the server-side prototype account for this email."
    : mode === "recover"
      ? "Set a new password for an account that still exists in the server store."
      : "Use your creator workspace email and password.";
  $("#toggleAuthMode").textContent = mode === "signup" || mode === "recover" ? "Back to log in" : "Create account";
  document.querySelector(".auth-name-field").classList.toggle("is-hidden", mode !== "signup");
  $("#recoverAuthMode").classList.toggle("is-hidden", mode === "recover");
  $("#authPassword").placeholder = mode === "recover" ? "New password, at least 8 characters" : "At least 8 characters";
  const rememberedEmail = window.localStorage.getItem("viralscopeLastEmail") || "";
  if (rememberedEmail && !$("#authEmail").value.trim()) $("#authEmail").value = rememberedEmail;
  const dialog = $("#authDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function planPrice(plan) {
  const amount = planCatalog[plan][billingInterval];
  if (!amount) return "$0";
  return `$${amount}`;
}

function planCadence(plan) {
  if (!planCatalog[plan][billingInterval]) return "";
  return billingInterval === "yearly" ? "/mo billed yearly" : "/mo";
}

function renderFeatureValue(value) {
  if (value === "yes") return `<span class="feature-yes">Included</span>`;
  if (value === "no") return `<span class="feature-no">Locked</span>`;
  return `<span class="feature-limited">Limited</span>`;
}

function renderUpgradeDialog() {
  const selected = planCatalog[selectedPlan];
  const price = planPrice(selectedPlan);
  const cadence = planCadence(selectedPlan);
  const annualTotal = selected[billingInterval] * 12;
  $("#upgradeTitle").textContent = `Unlock ${upgradeContext}`;
  $("#upgradeReason").textContent = upgradeReasons[upgradeContext] || `${upgradeContext} needs connected data, deeper AI processing, and workspace controls that are included with paid plans.`;
  $("#pricingOptions").innerHTML = Object.entries(planCatalog)
    .map(([id, plan]) => `
      <button type="button" class="pricing-card plan-card ${id === selectedPlan ? "selected" : ""} ${id === "pro" ? "featured" : ""}" data-plan="${id}">
        <span class="plan-badge">${plan.badge}</span>
        <strong>${planPrice(id)}<small>${planCadence(id)}</small></strong>
        <p>${plan.audience}</p>
        <ul>
          ${plan.includes.slice(0, 4).map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </button>
    `)
    .join("");
  $("#featureMatrix").innerHTML = `
    <div class="matrix-row matrix-head"><span>Feature</span><span>Free</span><span>Pro</span><span>Studio</span></div>
    ${featureRows.map((row) => `
      <div class="matrix-row">
        <span>${row[0]}</span>
        <span>${renderFeatureValue(row[1])}</span>
        <span>${renderFeatureValue(row[2])}</span>
        <span>${renderFeatureValue(row[3])}</span>
      </div>
    `).join("")}
  `;
  $("#checkoutPreview").innerHTML = `
    <span class="data-pill">Checkout preview</span>
    <h4>${selected.name} workspace</h4>
    <div class="checkout-price">${price}<small>${cadence}</small></div>
    <div class="checkout-line"><span>Billing</span><strong>${billingInterval === "yearly" ? "Yearly" : "Monthly"}</strong></div>
    <div class="checkout-line"><span>Due today</span><strong>${selectedPlan === "free" ? "$0" : billingInterval === "yearly" ? `$${annualTotal}` : price}</strong></div>
    <div class="checkout-line"><span>Payment</span><strong>${selectedPlan === "free" ? "Not needed" : "Stripe-ready mock"}</strong></div>
    <div class="mock-card">
      <span>•••• 4242</span>
      <small>${selectedPlan === "studio" ? "Team billing" : selectedPlan === "pro" ? "Creator billing" : "Free account"}</small>
    </div>
    <p>${selectedPlan === "free" ? "Free keeps manual tracking available. Paid plans unlock the command center features." : "In production this button will create a Stripe checkout session and return the user here after payment."}</p>
  `;
  document.querySelectorAll("[data-billing]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.billing === billingInterval);
  });
  $("#upgradePlan").textContent = selected.cta;
}

function openUpgradeDialog(featureName = "OAuth connections") {
  upgradeContext = featureName;
  if (selectedPlan === "free") selectedPlan = "pro";
  renderUpgradeDialog();
  const dialog = $("#upgradeDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function isProUser() {
  return ["pro", "studio"].includes(currentUser?.plan);
}

function requireProFeature(featureName = "this advanced feature") {
  if (isProUser()) return true;
  openUpgradeDialog(featureName);
  showToast(`${featureName} is included with Pro.`);
  return false;
}

function openRuleDialog() {
  if (!requireProFeature("automation rules")) return;
  applyRuleSignalDefaults();
  updateRulePreview();
  const dialog = $("#ruleDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

const ruleSignalDefaults = {
  "Views exceed baseline": { condition: "is greater than", threshold: "2.5x channel baseline" },
  "CTR drops below target": { condition: "is less than", threshold: "5% after 2K impressions" },
  "Chat velocity spikes": { condition: "is greater than", threshold: "140 messages/min" },
  "Revenue attribution jumps": { condition: "is greater than", threshold: "$500 in tracked revenue" },
  "Competitor outlier appears": { condition: "matches", threshold: "3x their 28-day median" },
  "Failed sync detected": { condition: "matches", threshold: "OAuth or API sync failure" }
};

function applyRuleSignalDefaults() {
  const defaults = ruleSignalDefaults[$("#ruleSignal").value];
  if (!defaults) return;
  $("#ruleCondition").value = defaults.condition;
  $("#ruleThreshold").value = defaults.threshold;
}

function updateRulePreview() {
  const name = $("#ruleName").value.trim() || "New alert rule";
  const platform = $("#rulePlatform").value;
  const signal = $("#ruleSignal").value;
  const condition = $("#ruleCondition").value;
  const threshold = $("#ruleThreshold").value.trim() || "custom threshold";
  const windowValue = $("#ruleWindow").value;
  const status = $("#ruleStatus").value;
  $("#rulePreviewTitle").textContent = name;
  $("#rulePreviewStatus").textContent = status;
  $("#rulePreviewText").textContent = `${platform} - ${signal} ${condition} ${threshold} during ${windowValue}.`;
}

function renderChannels() {
  $("#channelList").innerHTML = platforms
    .map((platform) => {
      const status = platform.connected ? `${platform.followers} followers` : "OAuth needed";
      const width = platform.connected ? platform.health : 8;
      return `
        <div class="channel-row">
          <div class="channel-title">
            ${formatBadge(platform.name)}
            <div>
              <strong>${platform.name}</strong>
              <small>${status}</small>
            </div>
          </div>
          <div class="progress" title="${platform.health}% health"><span style="width:${width}%"></span></div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".channel-row").forEach((row) => {
    row.addEventListener("click", () => {
      const name = row.querySelector("strong")?.textContent;
      if (!name || !chartSeries[name]) return;
      activeChartPlatforms = new Set([name, "Website"]);
      animateTrafficChart();
      showToast(`${name} is now isolated in the performance chart.`);
    });
  });
}

function renderContent() {
  const filter = $("#platformFilter").value;
  const query = $("#searchInput").value.trim().toLowerCase();
  const contentSource = currentUser ? liveContentRowsFromSnapshots() : topContent;
  const filtered = contentSource.filter((item) => {
    const matchesPlatform = filter === "All" || item.platform === filter;
    const matchesQuery = !query || `${item.title} ${item.platform}`.toLowerCase().includes(query);
    return matchesPlatform && matchesQuery;
  });

  $("#contentList").innerHTML =
    filtered
      .map(
        (item, index) => `
          <div class="content-row">
            <div class="content-title">
              ${formatBadge(item.platform)}
              <div>
                <strong title="${item.title}">${item.title}</strong>
                <button class="lift-score" type="button" data-lift-index="${index}">
                  ${item.platform} · Lift score ${item.lift}/100
                </button>
              </div>
            </div>
            <div class="content-stats">
              <div><span>Views</span><strong>${item.views}</strong></div>
              <div><span>Engage</span><strong>${item.engagement}</strong></div>
              <div><span>Clicks</span><strong>${item.clicks}</strong></div>
            </div>
          </div>
        `
      )
      .join("") || `<div class="alert-item"><div class="alert-dot"></div><p>${currentUser ? "No content metrics yet. Add a tracked URL or connect OAuth to start building your real content leaderboard." : "No content matches this search yet."}</p></div>`;

  document.querySelectorAll("[data-lift-index]").forEach((button) => {
    const item = filtered[Number(button.dataset.liftIndex)];
    const breakdown = item.liftBreakdown;
    button.innerHTML += `
      <span class="lift-tooltip" role="tooltip">
        <strong>Lift score breakdown</strong>
        <span>${breakdown.reason}</span>
        <i>Velocity <b>${breakdown.velocity}</b></i>
        <i>Engagement <b>${breakdown.engagement}</b></i>
        <i>Click-through <b>${breakdown.clicks}</b></i>
        <i>Retention <b>${breakdown.retention}</b></i>
        <i>Revenue impact <b>${breakdown.revenue}</b></i>
      </span>
    `;
    bindEdgeAwareTooltip(button, ".lift-tooltip");
  });
}

function renderUrls() {
  $("#urlList").innerHTML = urls
    .map(
      (item) => `
        <div class="url-item">
          <div>
            <strong>${item.url}</strong>
            <small>${item.source} · ${item.change} this week</small>
          </div>
          <span class="url-metric">${item.clicks}</span>
        </div>
      `
    )
    .join("") || `<div class="url-item"><div><strong>No tracked URLs yet</strong><small>Add a website, channel, bio link, or campaign URL to start collecting real source data.</small></div><span class="url-metric">0</span></div>`;
}

function renderAlerts() {
  $("#alertList").innerHTML =
    alerts
      .map(
        (alert) => `
          <div class="alert-item ${alert.severity || "watch"}">
            <div class="alert-dot"></div>
            <div>
              <strong>${alert.title}</strong>
              <p>${alert.body}</p>
            </div>
            <span class="alert-time">${alert.time || "New"}</span>
          </div>
        `
      )
      .join("") || `<div class="alert-item"><div class="alert-dot"></div><p>You're all clear. New anomalies and opportunities will appear here.</p></div>`;
}

function renderCoach() {
  $("#coachPrompts").innerHTML = coachPrompts
    .map((prompt) => `<button class="coach-prompt" type="button" data-prompt="${prompt}">${prompt}</button>`)
    .join("");

  $("#recommendationList").innerHTML = recommendations[coachMode]
    .map(
      (item) => `
        <div class="recommendation-card">
          <strong>${item.title}</strong>
          <p>${item.body}</p>
        </div>
      `
    )
    .join("");

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      $("#coachQuestion").value = button.dataset.prompt;
      runCoachAnalysis();
    });
  });
}

function renderLab() {
  $("#labGrid").innerHTML = labFeatures
    .map(
      (item) => `
        <article class="lab-card">
          <span>${item.source}</span>
          <strong>${item.title}</strong>
          <p>${item.body}</p>
        </article>
      `
    )
    .join("");
}

function renderCreatorOs() {
  const overall = Math.round(creatorOsScores.reduce((sum, item) => sum + item.score, 0) / creatorOsScores.length);
  $("#osScore").textContent = overall;
  $("#creatorOsGrid").innerHTML = creatorOsScores
    .map(
      (item) => `
        <article class="os-score-card">
          <div>
            <strong>${item.name}</strong>
            <p>${item.detail}</p>
          </div>
          <span>${item.score}</span>
          <div class="score-bar"><span style="width:${item.score}%"></span></div>
        </article>
      `
    )
    .join("");
}

function renderOutliers() {
  const niche = $("#nicheFilter").value;
  const filtered = outliers.filter((item) => item.niche === niche || niche === "Creator Education");
  $("#outlierGrid").innerHTML = filtered
    .map(
      (item) => `
        <article class="outlier-card">
          <div class="thumbnail-preview">${item.multiplier} OUTLIER</div>
          <h4>${item.title}</h4>
          <p>${item.creator} is outperforming its normal baseline. Save the format, hook, and thumbnail pattern before the trend cools.</p>
          <div class="score-bar"><span style="width:${item.score}%"></span></div>
          <div class="outlier-meta">
            <span class="data-pill">${item.platform}</span>
            <span class="data-pill">${item.velocity}</span>
            <span class="data-pill">Score ${item.score}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderRepurpose() {
  $("#repurposeGrid").innerHTML = repurposeJobs
    .map(
      (item) => `
        <article class="repurpose-card">
          <span class="data-pill">${item.status}</span>
          <strong>${item.source}</strong>
          <p>${item.output}</p>
          <div class="score-bar"><span style="width:${item.score}%"></span></div>
          <small>Repurpose score ${item.score}</small>
        </article>
      `
    )
    .join("");
}

function renderCompetitors() {
  $("#competitorTable").innerHTML = competitors
    .map(
      (item) => `
        <div class="competitor-row">
          <div>
            <strong>${item.name}</strong>
            <small>${item.subs} subscribers - ${item.views} recent views - ${item.cadence}</small>
            <div class="score-bar"><span style="width:${item.score}%"></span></div>
          </div>
          <span class="competitor-score">${item.score}</span>
        </div>
      `
    )
    .join("");
}

function renderPackaging() {
  const best = Math.max(...packagingTests.map((item) => item.score));
  $("#packagingGrid").innerHTML = packagingTests
    .map(
      (item) => `
        <article class="packaging-card ${item.score === best ? "winner" : ""}">
          <div class="thumbnail-preview">Variant ${item.variant}</div>
          <h4>${item.title}</h4>
          <p>${item.angle}</p>
          <div class="score-bar"><span style="width:${item.score}%"></span></div>
          <div class="score-meta">
            <span class="data-pill">Predicted CTR ${item.ctr}%</span>
            <span class="data-pill">Score ${item.score}</span>
            ${item.score === best ? '<span class="data-pill">Winner</span>' : ""}
          </div>
        </article>
      `
    )
    .join("");
}

function renderKeywords() {
  $("#keywordList").innerHTML = keywordRows
    .map(
      (item) => `
        <div class="keyword-row">
          <div>
            <strong>${item.keyword}</strong>
            <small>Volume: ${item.volume} - Competition: ${item.competition} - Intent: ${item.intent}</small>
            <div class="score-bar"><span style="width:${item.score}%"></span></div>
          </div>
          <span class="keyword-score">${item.score}</span>
        </div>
      `
    )
    .join("");
}

function renderRules() {
  $("#ruleList").innerHTML = alertRules
    .map(
      (item, index) => `
        <div class="rule-card">
          <span class="rule-icon">${item.status === "Active" ? "!" : "✎"}</span>
          <div>
            <strong>${item.name}</strong>
            <small>${item.target} - ${item.threshold}</small>
            <div class="rule-flow">
              <span>Signal</span><i></i><span>Check</span><i></i><span>Notify</span>
            </div>
          </div>
          <div class="rule-actions">
            <span class="data-pill">${item.status}</span>
            <button class="text-button" type="button" data-rule-edit="${index}">Edit</button>
          </div>
        </div>
      `
    )
    .join("");

  document.querySelectorAll("[data-rule-edit]").forEach((button) => {
    button.addEventListener("click", () => showToast("Rule editor would open here."));
  });
}

function renderCollections() {
  $("#collectionList").innerHTML = collections
    .map(
      (item) => `
        <div class="collection-card">
          <div>
            <strong>${item.name}</strong>
            <small>${item.detail}</small>
          </div>
          <span class="data-pill">${item.count}</span>
        </div>
      `
    )
    .join("");
}

function renderIntegrations() {
  $("#integrationGrid").innerHTML = integrations
    .map(
      (item) => `
        <article class="integration-card ${item.status === "Live sync" || item.status === "Tracking" ? "is-live" : ""}">
          ${formatBadge(item.platform)}
          <strong>${item.platform}</strong>
          <p>${item.scope}</p>
          <div class="score-meta">
            <span class="data-pill sync-pill"><i></i>${item.status}</span>
            <span class="data-pill">${item.freshness}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderChannelPreview() {
  const data = channelPreviewData[previewPlatform];
  const activeTab = previewActiveTabs[previewPlatform] || data.tabs[0];
  const profileName = data.name.replace(" source", "").replace(" account", "");
  const tabCopy = {
    Videos: {
      title: "Latest uploads",
      body: "Long-form videos, CTR, retention, comments, and revenue attribution will live here after sync.",
      posts: data.posts
    },
    Shorts: {
      title: "Short-form pulse",
      body: "Shorts, Reels, TikToks, swipe-through hooks, share velocity, and remix ideas will be grouped here.",
      posts: ["Hook winners", "Share spikes", "Loop rate", "Clip candidates"]
    },
    Live: {
      title: "Live stream performance",
      body: "Stream sessions, chat velocity, commands, clips, subs, and sponsor moments will appear here.",
      posts: ["Chat velocity", "Clip moments", "Sponsor commands", "Viewer peaks"]
    },
    Playlists: {
      title: "Series and content clusters",
      body: "Playlists help reveal repeatable formats, binge paths, search clusters, and next-video funnels.",
      posts: ["Growth series", "Audit playlist", "Sponsor proof", "Beginner path"]
    },
    About: {
      title: "Channel profile",
      body: `${profileName} profile, handle, bio context, links, audience fit, and brand-safe positioning.`,
      posts: ["Bio context", "Tracked links", "Audience fit", "Brand safety"]
    },
    Posts: {
      title: "Post grid",
      body: "Feed posts, saves, shares, profile actions, and sponsor CTA paths are grouped in this view.",
      posts: data.posts
    },
    Reels: {
      title: "Reels performance",
      body: "Short-form reach, replays, shares, and follow-through signals for Instagram Reels.",
      posts: ["Reach spike", "Replay lift", "Save rate", "CTA clicks"]
    },
    Tagged: {
      title: "Tagged content",
      body: "Collabs, creator mentions, UGC, sponsor tags, and cross-posted proof can be reviewed here.",
      posts: ["Collabs", "Mentions", "UGC", "Sponsor tags"]
    },
    Insights: {
      title: "Native insights",
      body: "Connected platform insights, profile clicks, audience movement, and best posting windows.",
      posts: ["Reach", "Profile clicks", "Audience", "Best window"]
    }
  };
  const tabState = tabCopy[activeTab] || {
    title: `${activeTab} snapshot`,
    body: `${activeTab} data for ${previewPlatform} will appear here as the connector deepens.`,
    posts: data.posts
  };
  const contentPosts = contentPostsForTab(data, activeTab);
  const postCards = contentPosts || tabState.posts.map((post) => ({ title: post, meta: activeTab }));
  $("#previewSwitcher").innerHTML = Object.keys(channelPreviewData)
    .map(
      (platform) => `
        <button type="button" class="${platform === previewPlatform ? "active" : ""}" data-preview-platform="${platform}">
          ${formatBadge(platform)}
          <span>${platform}</span>
        </button>
      `
    )
    .join("");

  $("#profilePreview").innerHTML = `
    <section class="preview-shell ${data.theme}">
      <div class="preview-topbar">
        <span class="preview-brand">${formatBadge(previewPlatform)}${data.brand}</span>
        <div class="preview-tabs">
          ${data.tabs.map((tab) => `<button type="button" class="${tab === activeTab ? "active" : ""}" data-preview-tab="${tab}">${tab}</button>`).join("")}
        </div>
      </div>
      <div class="preview-profile">
        <div class="preview-avatar">${data.avatarImage ? `<img src="${data.avatarImage}" alt="" />` : data.avatar}</div>
        <div>
          <h4>${data.name}</h4>
          <p>${data.handle}</p>
        </div>
      </div>
      <div class="preview-stat-grid">
        ${data.stats.map(([value, label]) => `<div class="preview-stat"><strong>${value}</strong><small>${label}</small></div>`).join("")}
      </div>
      <div class="preview-live-row">
        <div>
          <strong>${tabState.title}</strong>
          <p>${tabState.body}</p>
        </div>
        <span class="data-pill">${platforms.find((item) => item.name === previewPlatform)?.connected ? "Connected" : "Preview mode"}</span>
      </div>
      <div class="preview-post-grid">
        ${postCards.map((post, index) => `
          <article class="preview-post ${post.thumbnail ? "has-thumbnail" : ""}">
            ${post.thumbnail ? `<img src="${post.thumbnail}" alt="" />` : ""}
            <span class="preview-post-copy">
              <small>${post.meta || `${activeTab} ${index + 1}`}</small>
              <strong>${post.title}</strong>
            </span>
          </article>
        `).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-preview-platform]").forEach((button) => {
    button.addEventListener("click", () => {
      previewPlatform = button.dataset.previewPlatform;
      renderChannelPreview();
    });
  });
  document.querySelectorAll("[data-preview-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      previewActiveTabs[previewPlatform] = button.dataset.previewTab;
      renderChannelPreview();
    });
  });
}

function renderDiscovery() {
  const query = ($("#discoveryQuery")?.value || "").trim().toLowerCase();
  const platform = $("#discoveryPlatform")?.value || "All";
  const filtered = discoveryResults.filter((item) => {
    const matchesPlatform = platform === "All" || item.platform === platform;
    const haystack = `${item.name} ${item.handle} ${item.niche} ${item.match}`.toLowerCase();
    const words = query.split(/\s+/).filter(Boolean);
    const matchesQuery = !words.length || words.some((word) => haystack.includes(word.replace(/s$/, "")));
    return matchesPlatform && matchesQuery;
  });

  $("#discoveryResults").innerHTML =
    filtered
      .map(
        (item) => `
          <article class="discovery-card">
            <div class="discovery-card-header">
              ${formatBadge(item.platform)}
              <div>
                <h4>${item.name}</h4>
                <small>${item.handle} · ${item.niche}</small>
              </div>
            </div>
            <p>${item.match}</p>
            <div class="score-bar"><span style="width:${item.outlier}%"></span></div>
            <div class="discovery-metrics">
              <div><strong>${item.followers}</strong><small>Followers</small></div>
              <div><strong>${item.engagement}</strong><small>Engage</small></div>
              <div><strong>${item.outlier}</strong><small>Outlier</small></div>
            </div>
            <div class="score-meta">
              <span class="data-pill">${item.platform}</span>
              <button class="data-pill watchlist-action" type="button" data-watchlist="${item.name}">Add to watchlist</button>
            </div>
          </article>
        `
      )
      .join("") || `<div class="alert-item"><div class="alert-dot"></div><p>No matching creators yet. Try a broader niche or another platform.</p></div>`;

  document.querySelectorAll("[data-watchlist]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = discoveryResults.find((result) => result.name === button.dataset.watchlist);
      if (!item) return;
      if (!watchlist.some((saved) => saved.name === item.name)) watchlist.unshift(item);
      renderWatchlist();
      showToast(`${item.name} saved to watchlist.`);
    });
  });
}

function renderGlobalSearch() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const box = $("#globalSearchResults");
  if (!query) {
    box.classList.remove("show");
    box.innerHTML = "";
    return;
  }

  const results = internalSearchItems()
    .filter((item) => `${item.type} ${item.title} ${item.detail}`.toLowerCase().includes(query))
    .slice(0, 8);

  box.innerHTML =
    results
      .map(
        (item) => `
          <button class="search-result" type="button" data-search-view="${item.view}">
            <strong>${item.title}</strong>
            <small>${item.type} · ${item.detail}</small>
          </button>
        `
      )
      .join("") || `
        <button class="search-result" type="button" data-search-view="growth">
          <strong>Search creator discovery for "${query}"</strong>
          <small>No internal matches. Open cross-platform discovery.</small>
        </button>
      `;

  box.classList.add("show");
  document.querySelectorAll("[data-search-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.searchView;
      if (view === "growth") {
        $("#discoveryQuery").value = query;
        renderDiscovery();
      }
      setActiveView(view);
      box.classList.remove("show");
    });
  });
}

function renderOnboarding() {
  $("#onboardingSteps").innerHTML = onboardingItems()
    .map(
      (item, index) => `
        <div class="onboarding-step">
          <span>${item.done ? "Done" : `Step ${index + 1}`}</span>
          <strong>${item.title}</strong>
        </div>
      `
    )
    .join("");
}

function renderOnboardingPlatforms() {
  $("#onboardingPlatformGrid").innerHTML = platforms
    .filter((platform) => platform.name !== "Website")
    .map(
      (platform) => `
        <button type="button" class="platform-check ${onboardingState.platforms.includes(platform.name) ? "active" : ""}" data-onboarding-platform="${platform.name}">
          ${formatBadge(platform.name)}
          <span>${platform.name}</span>
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-onboarding-platform]").forEach((button) => {
    button.addEventListener("click", () => {
      const platform = button.dataset.onboardingPlatform;
      if (onboardingState.platforms.includes(platform)) {
        onboardingState.platforms = onboardingState.platforms.filter((item) => item !== platform);
      } else {
        onboardingState.platforms.push(platform);
      }
      renderOnboardingPlatforms();
      renderSetupSummary();
    });
  });
}

function renderSetupSummary() {
  const selected = onboardingState.platforms.length ? onboardingState.platforms.join(", ") : "No platforms selected";
  const url = $("#onboardingUrl")?.value.trim() || onboardingState.url;
  $("#setupSummary").innerHTML = `
    <div class="setup-summary-card">
      <span>Creator type</span>
      <strong>${onboardingState.creatorType}</strong>
    </div>
    <div class="setup-summary-card">
      <span>Main goal</span>
      <strong>${onboardingState.goal}</strong>
    </div>
    <div class="setup-summary-card">
      <span>Platforms</span>
      <strong>${selected}</strong>
    </div>
    <div class="setup-summary-card">
      <span>First URL</span>
      <strong>${url}</strong>
    </div>
  `;
}

function setOnboardingStep(step) {
  onboardingStep = Math.max(0, Math.min(4, step));
  document.querySelectorAll("[data-onboarding-step]").forEach((panel) => {
    panel.classList.toggle("active", Number(panel.dataset.onboardingStep) === onboardingStep);
  });
  $("#onboardingBack").disabled = onboardingStep === 0;
  $("#onboardingNext").textContent = onboardingStep === 4 ? "Launch workspace" : "Next";
  $("#onboardingProgress").innerHTML = Array.from({ length: 5 }, (_, index) => (
    `<span class="${index <= onboardingStep ? "active" : ""}"></span>`
  )).join("");
  if (onboardingStep === 4) renderSetupSummary();
}

function openOnboardingDialog() {
  renderOnboardingPlatforms();
  renderSetupSummary();
  setOnboardingStep(0);
  const dialog = $("#onboardingDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function completeOnboarding() {
  onboardingState.url = $("#onboardingUrl").value.trim() || onboardingState.url;
  onboardingComplete = true;
  window.localStorage.setItem("viralscopeOnboardingComplete", "true");
  if (onboardingState.url && !urls.some((item) => item.url === onboardingState.url.replace(/^https?:\/\//, ""))) {
    urls.unshift({
      url: onboardingState.url.replace(/^https?:\/\//, ""),
      source: "Onboarding setup",
      clicks: "Tracking",
      change: "New"
    });
  }
  creatorOsScores = creatorOsScores.map((item) => {
    if (item.name === "Growth") return { ...item, score: 84, detail: `Optimized for ${onboardingState.goal.toLowerCase()} across ${onboardingState.platforms.slice(0, 3).join(", ")}.` };
    if (item.name === "Platform risk") return { ...item, score: onboardingState.platforms.length >= 3 ? 78 : 62 };
    return item;
  });
  setLiveOps("Workspace initialized", `${onboardingState.creatorType} setup is ready with ${onboardingState.platforms.length} priority platforms and URL tracking.`, "Setup complete");
  addActivity("Setup", `${onboardingState.creatorType} workspace initialized`, "ai");
  renderUrls();
  renderCreatorOs();
  renderOnboarding();
  $("#onboardingDialog").close();
  showToast("Workspace setup complete.");
}

function renderWatchlist() {
  $("#watchlistGrid").innerHTML =
    watchlist
      .map(
        (item) => `
          <article class="watchlist-card">
            <div class="discovery-card-header">
              ${formatBadge(item.platform)}
              <div>
                <strong>${item.name}</strong>
                <small>${item.handle}</small>
              </div>
            </div>
            <p>${item.match}</p>
            <div class="score-meta">
              <span class="data-pill">${item.followers}</span>
              <span class="data-pill">Outlier ${item.outlier}</span>
            </div>
          </article>
        `
      )
      .join("") || `<div class="alert-item"><div class="alert-dot"></div><p>No saved creators yet. Add creators from Discovery to compare later.</p></div>`;
}

function renderSettings() {
  $("#settingsGrid").innerHTML = settingsItems
    .map(
      (item) => `
        <button class="settings-card" type="button" data-settings-open="${item.id}" style="--setting-accent:${item.accent}">
          <span class="settings-card-icon">${item.icon}</span>
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
          <span class="settings-card-action">Open settings</span>
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-settings-open]").forEach((button) => {
    button.addEventListener("click", () => openSettingsDialog(button.dataset.settingsOpen));
  });
}

function settingControls(id) {
  const userName = currentUser?.name || "Curiosity Below";
  const userEmail = currentUser?.email || "creator@example.com";
  const isPro = currentUser?.plan === "pro";
  const map = {
    profile: `
      <div class="settings-control"><label>Creator name</label><input value="${userName}" /></div>
      <div class="settings-control"><label>Email</label><input value="${userEmail}" /></div>
      <div class="settings-control"><label>Timezone</label><select><option>America/Chicago</option><option>America/New_York</option><option>America/Los_Angeles</option></select></div>
      <div class="settings-control"><label>Password</label><button class="secondary-button" type="button" id="settingsRecoverAccount">Reset password</button></div>
      <div class="settings-control"><label>Session</label><strong>${currentUser ? "Signed in" : "Guest"}</strong><button class="secondary-button" type="button" id="settingsLogout">Log out</button></div>
    `,
    billing: `
      <div class="settings-control"><label>Current plan</label><strong>${isPro ? "Pro active - $29/mo" : "Free"}</strong><button class="${isPro ? "secondary-button" : "primary-button"}" type="button" id="settingsUpgrade">${isPro ? "Manage billing" : "Upgrade to Pro"}</button></div>
      <div class="settings-control"><label>Payment method</label><strong>${isPro ? "Visa ending 4242" : "No payment method"}</strong><button class="secondary-button" type="button">${isPro ? "Update card" : "Add card"}</button></div>
      <div class="settings-control"><label>Invoices</label><button class="secondary-button" type="button">${isPro ? "Download latest invoice" : "No invoices yet"}</button></div>
      <div class="settings-control"><label>Billing alerts</label><div class="toggle-row"><span>Email receipts</span><i class="toggle-switch"></i></div></div>
    `,
    connections: `
      ${integrations.map((item) => `<div class="settings-control"><label>${item.platform}</label><strong>${item.status}</strong><span>${item.scope}</span><div class="settings-actions"><button class="secondary-button" type="button">Reconnect</button><button class="text-button" type="button">Disconnect</button></div></div>`).join("")}
    `,
    team: `
      <div class="settings-control"><label>Invite teammate</label><input placeholder="editor@example.com" /><select><option>Editor</option><option>Manager</option><option>Client viewer</option></select></div>
      <div class="settings-control"><label>Roles</label><strong>Owner, Editor, Analyst, Client</strong><span>Restrict billing, OAuth, and export permissions by role.</span></div>
      <div class="settings-control"><label>Pending invites</label><strong>2 invites</strong><button class="secondary-button" type="button">Review invites</button></div>
      <div class="settings-control"><label>Approval flow</label><div class="toggle-row"><span>Require owner approval for reports</span><i class="toggle-switch"></i></div></div>
    `,
    privacy: `
      <div class="settings-control"><label>Data export</label><button class="secondary-button" type="button">Export workspace data</button></div>
      <div class="settings-control"><label>AI training preference</label><div class="toggle-row"><span>Allow anonymized product learning</span><i class="toggle-switch"></i></div></div>
      <div class="settings-control"><label>Token security</label><button class="secondary-button" type="button">Revoke all OAuth tokens</button></div>
      <div class="settings-control"><label>Danger zone</label><button class="secondary-button" type="button">Request account deletion</button></div>
    `,
    brand: `
      <div class="settings-control"><label>Brand name</label><input value="CommandCue" /></div>
      <div class="settings-control"><label>Primary color</label><input value="#2ed3b7" /></div>
      <div class="settings-control"><label>Default CTA</label><input value="Join the waitlist in my bio" /></div>
      <div class="settings-control"><label>Sponsor disclosure</label><textarea>Some links may be affiliate or sponsor links. Results vary by creator and campaign.</textarea></div>
    `,
    memory: `
      <div class="settings-control"><label>Niche</label><input value="Creator analytics, growth strategy, AI tools" /></div>
      <div class="settings-control"><label>Offers</label><input value="Creator toolkit, newsletter, sponsorships" /></div>
      <div class="settings-control"><label>Competitors to watch</label><textarea>ViewStats, vidIQ, TubeBuddy, creator analytics newsletters</textarea></div>
      <div class="settings-control"><label>Banned topics</label><textarea>Do not recommend misleading growth hacks or spam engagement tactics.</textarea></div>
    `,
    notifications: `
      <div class="settings-control"><label>Outlier alerts</label><div class="toggle-row"><span>Notify when a post beats baseline by 2x</span><i class="toggle-switch"></i></div></div>
      <div class="settings-control"><label>Revenue spikes</label><div class="toggle-row"><span>Notify when attribution jumps 20%</span><i class="toggle-switch"></i></div></div>
      <div class="settings-control"><label>Weekly report</label><select><option>Monday morning</option><option>Friday afternoon</option><option>Never</option></select></div>
      <div class="settings-control"><label>Failed syncs</label><div class="toggle-row"><span>Notify immediately</span><i class="toggle-switch"></i></div></div>
    `
  };
  return map[id] || map.profile;
}

function renderSettingsModal() {
  const active = settingsItems.find((item) => item.id === activeSettingsId) || settingsItems[0];
  $("#settingsModalTitle").textContent = active.title;
  $("#settingsRail").innerHTML = settingsItems
    .map(
      (item) => `
        <button type="button" class="${item.id === activeSettingsId ? "active" : ""}" data-settings-section="${item.id}" style="--setting-accent:${item.accent}">
          <span class="settings-rail-icon">${item.icon}</span>
          <span>${item.title}</span>
        </button>
      `
    )
    .join("");
  $("#settingsDetail").style.setProperty("--setting-accent", active.accent);
  $("#settingsDetail").innerHTML = `
    <section class="settings-detail-hero">
      <h4>${active.title}</h4>
      <p>${active.detail}</p>
    </section>
    <section class="settings-control-grid">
      ${settingControls(active.id)}
    </section>
  `;

  document.querySelectorAll("[data-settings-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSettingsId = button.dataset.settingsSection;
      renderSettingsModal();
    });
  });
  $("#settingsUpgrade")?.addEventListener("click", () => {
    if (currentUser?.plan === "pro") {
      openBillingPortal();
      return;
    }
    openUpgradeDialog();
  });
  $("#settingsRecoverAccount")?.addEventListener("click", () => {
    $("#settingsDialog").close();
    openAuthDialog("recover");
  });
  $("#settingsLogout")?.addEventListener("click", async () => {
    await logoutAccount();
  });
}

function openSettingsDialog(id = "profile") {
  activeSettingsId = id;
  renderSettingsModal();
  const dialog = $("#settingsDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function renderOptimizer() {
  $("#optimizerGrid").innerHTML = uploadScores
    .map(
      (item) => `
        <article class="optimizer-card">
          <strong>${item.name}</strong>
          <span class="big-number">${item.score}</span>
          <div class="score-bar"><span style="width:${item.score}%"></span></div>
          <p>${item.note}</p>
        </article>
      `
    )
    .join("");
}

function renderRevenue() {
  $("#revenueGrid").innerHTML = revenueStreams
    .map(
      (item, index) => `
        <article class="revenue-card" style="--spark:${Math.min(96, 58 + index * 7)}%">
          <div class="revenue-icon">${index + 1}</div>
          <strong>${item.name}</strong>
          <span class="big-number">${item.value}</span>
          <p>${item.source}</p>
          <div class="mini-spark"><span></span></div>
          <div class="score-meta">
            <span class="data-pill">${item.lift}</span>
            <button class="text-button" type="button" data-revenue-drill="${item.name}">Drill in</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-revenue-drill]").forEach((button) => {
    button.addEventListener("click", () => showToast(`${button.dataset.revenueDrill} attribution details opened.`));
  });
}

function renderFunnel() {
  $("#funnelGrid").innerHTML = funnelLinks
    .map(
      (item, index) => `
        <article class="funnel-card">
          <div class="funnel-step">${index + 1}</div>
          <div>
            <strong>${item.step}</strong>
            <p>${item.insight}</p>
          </div>
          <div class="score-meta">
            <span class="data-pill">${item.tool}</span>
            <span class="data-pill">${item.visits}</span>
            <span class="data-pill">${item.conversion}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDeals() {
  $("#dealGrid").innerHTML = brandDeals
    .map(
      (item) => `
        <article class="deal-card">
          <div>
            <strong>${item.brand}</strong>
            <p>${item.next}</p>
          </div>
          <span class="big-number">${item.value}</span>
          <div class="score-meta">
            <span class="data-pill">${item.stage}</span>
            <button class="text-button" type="button" data-deal-open="${item.brand}">Open</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-deal-open]").forEach((button) => {
    button.addEventListener("click", () => showToast(`${button.dataset.dealOpen} sponsor workspace opened.`));
  });
}

function renderCalendar() {
  $("#calendarGrid").innerHTML = calendarItems
    .map(
      (item, index) => `
        <article class="calendar-card" style="--calendar-accent:${["#2ed3b7", "#ff7161", "#f4bc50", "#7b5cff", "#69a7ff", "#74d47b"][index % 6]}">
          <div class="calendar-date">
            <time>${item.day}</time>
            <span>${index + 1}</span>
          </div>
          <div class="calendar-body">
            <strong>${item.title}</strong>
            <p>${item.platform}</p>
            <div class="calendar-actions">
              <span class="data-pill">${item.status}</span>
              <button class="text-button" type="button" data-calendar-edit="${index}">Edit</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-calendar-edit]").forEach((button) => {
    button.addEventListener("click", () => showToast("Calendar item editor would open here."));
  });
}

function renderQuality() {
  $("#qualityGrid").innerHTML = audienceQuality
    .map(
      (item) => `
        <article class="quality-card">
          <strong>${item.label}</strong>
          <span class="big-number">${item.score}</span>
          <div class="score-bar"><span style="width:${Math.min(100, item.score)}%"></span></div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderOwnedAudience() {
  $("#ownedGrid").innerHTML = ownedAudience
    .map(
      (item) => `
        <article class="owned-card">
          <strong>${item.channel}</strong>
          <span class="big-number">${item.count}</span>
          <p>${item.note}</p>
          <div class="score-bar"><span style="width:${item.health}%"></span></div>
          <div class="score-meta">
            <span class="data-pill">${item.growth}</span>
            <span class="data-pill">Health ${item.health}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderListening() {
  $("#listeningGrid").innerHTML = listeningSignals
    .map(
      (item) => `
        <article class="listening-card">
          <span class="data-pill">${item.source}</span>
          <strong>${item.topic}</strong>
          <p>${item.action}</p>
          <div class="score-meta">
            <span class="data-pill">Sentiment ${item.sentiment}</span>
            <button class="text-button" type="button" data-listening-action="${item.topic}">Create action</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-listening-action]").forEach((button) => {
    button.addEventListener("click", () => showToast(`Action created from "${button.dataset.listeningAction}".`));
  });
}

function renderReports() {
  $("#reportGrid").innerHTML = reports
    .map(
      (item) => `
        <article class="report-card">
          <strong>${item.name}</strong>
          <p>${item.detail}</p>
          <div class="score-meta">
            <span class="data-pill">${item.audience}</span>
            <span class="data-pill">${item.status}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderLaunchCenter() {
  const score = Math.round(launchReadiness.reduce((sum, item) => sum + item.score, 0) / launchReadiness.length);
  $("#launchScore").textContent = `${score}%`;
  $("#launchMeterBar").style.width = `${score}%`;
  $("#launchGrid").innerHTML = launchReadiness
    .map(
      (item) => `
        <article class="launch-card">
          <div class="launch-card-top">
            <span class="data-pill">${item.status}</span>
            <strong>${item.score}%</strong>
          </div>
          <h4>${item.area}</h4>
          <p>${item.detail}</p>
          <div class="score-bar"><span style="width:${item.score}%"></span></div>
        </article>
      `
    )
    .join("");

  $("#launchStack").innerHTML = launchStack
    .map(
      (item) => `
        <article class="launch-stack-item">
          <span class="stack-type">${item.type}</span>
          <div>
            <strong>${item.title}</strong>
            <p>${item.action}</p>
          </div>
          <span class="data-pill">${item.status}</span>
        </article>
      `
    )
    .join("");

  $("#marketingGrid").innerHTML = marketingLaunch
    .map(
      (item) => `
        <article class="marketing-card">
          <span class="data-pill">${item.priority}</span>
          <strong>${item.channel}</strong>
          <p>${item.idea}</p>
          <button class="text-button" type="button" data-marketing-action="${item.channel}">Draft asset</button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-marketing-action]").forEach((button) => {
    button.addEventListener("click", () => showToast(`Launch asset queued for ${button.dataset.marketingAction}.`));
  });
}

function renderAgentSteps() {
  $("#agentSteps").innerHTML = agentSteps
    .map(
      (item, index) => `
        <div class="agent-step ${item.status || "complete"}">
          <span>Step ${index + 1}</span>
          <strong>${item.step}</strong>
          <p>${item.result}</p>
        </div>
      `
    )
    .join("");
}

function getChartValues(series) {
  if (activeRange === 7) return series.values.slice(-7);
  if (activeRange === 90) return series.values.map((value, index) => value + index * 4);
  return series.values;
}

function getVisibleChartKeys() {
  const keys = Object.keys(chartSeries).filter((key) => activeChartPlatforms.has(key));
  return keys.length ? keys : ["Website"];
}

function updateChartTooltip(point, canvas) {
  const tooltip = $("#chartTooltip");
  if (!point) {
    tooltip.classList.remove("show");
    return;
  }

  const rect = canvas.getBoundingClientRect();
  tooltip.innerHTML = `<strong>${point.key}: ${point.value}K</strong><span>${point.label} · ${activeRange}-day view</span>`;
  tooltip.style.left = `${point.x}px`;
  tooltip.style.top = `${point.y}px`;
  tooltip.classList.add("show");

  const tipRect = tooltip.getBoundingClientRect();
  const leftEdge = rect.left + point.x - tipRect.width / 2;
  if (leftEdge < rect.left) tooltip.style.left = `${tipRect.width / 2 + 8}px`;
  if (leftEdge + tipRect.width > rect.right) tooltip.style.left = `${rect.width - tipRect.width / 2 - 8}px`;
}

function drawTrafficChart(progress = 1) {
  const canvas = $("#trafficChart");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = Math.max(280, rect.width * 0.4) * dpr;
  ctx.scale(dpr, dpr);

  const width = canvas.width / dpr;
  const height = canvas.height / dpr;
  const padding = { top: 24, right: 20, bottom: 34, left: 42 };
  const hasRealMetrics = !currentUser || metricsSummary?.latest?.length;
  if (!hasRealMetrics) {
    chartPoints = [];
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--line");
    ctx.lineWidth = 1;
    ctx.font = "12px Inter, sans-serif";
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted");

    for (let i = 0; i <= 4; i += 1) {
      const y = padding.top + ((height - padding.top - padding.bottom) / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText("0", 18, y + 4);
    }

    ctx.font = "600 16px Inter, sans-serif";
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text");
    ctx.textAlign = "center";
    ctx.fillText("Waiting for real channel metrics", width / 2, height / 2 - 8);
    ctx.font = "13px Inter, sans-serif";
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted");
    ctx.fillText("Add URLs now, then connect OAuth to populate live analytics.", width / 2, height / 2 + 18);
    ctx.textAlign = "start";
    $("#chartLegend").innerHTML = Object.keys(chartSeries)
      .map(
        (key) => `
          <button type="button" class="${platforms.some((platform) => platform.name === key && platform.connected) ? "active" : ""}" data-chart-key="${key}">
            <i style="background:${chartSeries[key].color}"></i>${key}
          </button>
        `
      )
      .join("");
    return;
  }
  const keys = Object.keys(chartSeries);
  const visibleKeys = getVisibleChartKeys();
  const allValues = visibleKeys.flatMap((key) => getChartValues(chartSeries[key]));
  const max = Math.max(...allValues) * 1.14;
  chartPoints = [];

  ctx.clearRect(0, 0, width, height);
  const chartGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  chartGradient.addColorStop(0, "rgba(46, 211, 183, 0.08)");
  chartGradient.addColorStop(1, "rgba(255, 113, 97, 0.02)");
  ctx.fillStyle = chartGradient;
  ctx.fillRect(padding.left, padding.top, width - padding.left - padding.right, height - padding.top - padding.bottom);

  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--line");
  ctx.lineWidth = 1;
  ctx.font = "12px Inter, sans-serif";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted");

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + ((height - padding.top - padding.bottom) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(`${Math.round(max - (max / 4) * i)}K`, 8, y + 4);
  }

  visibleKeys.forEach((key) => {
    const series = chartSeries[key];
    const values = getChartValues(series);
    const step = (width - padding.left - padding.right) / (values.length - 1);
    const points = values.map((value, index) => ({
      key,
      value,
      label: `Point ${index + 1}`,
      x: padding.left + step * index,
      y: height - padding.bottom - ((value * progress) / max) * (height - padding.top - padding.bottom)
    }));

    chartPoints.push(...points);

    if (chartMode === "bars") {
      const barWidth = Math.max(5, (width - padding.left - padding.right) / (values.length * visibleKeys.length + 8));
      points.forEach((point, index) => {
        const groupOffset = (visibleKeys.indexOf(key) - (visibleKeys.length - 1) / 2) * barWidth;
        const x = point.x + groupOffset;
        const yBase = height - padding.bottom;
        const barHeight = Math.max(2, ((values[index] * progress) / max) * (height - padding.top - padding.bottom));
        const yTop = yBase - barHeight;
        ctx.fillStyle = series.color;
        ctx.globalAlpha = 0.74;
        ctx.fillRect(x - barWidth / 2, yTop, barWidth, barHeight);
        ctx.globalAlpha = 1;
        points[index].x = x;
        points[index].y = yTop;
      });
      return;
    }

    ctx.beginPath();
    points.forEach((point, index) => {
      const x = point.x;
      const y = point.y;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = series.color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    const lastPoint = points[points.length - 1];
    ctx.fillStyle = series.color;
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  if (chartHover) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartHover.x, padding.top);
    ctx.lineTo(chartHover.x, height - padding.bottom);
    ctx.stroke();
    ctx.fillStyle = chartSeries[chartHover.key].color;
    ctx.beginPath();
    ctx.arc(chartHover.x, chartHover.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f7f3ea";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  $("#chartLegend").innerHTML = keys
    .map(
      (key) => `
        <button type="button" class="${activeChartPlatforms.has(key) ? "active" : ""}" data-chart-key="${key}">
          <i style="background:${chartSeries[key].color}"></i>${key}
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-chart-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.chartKey;
      if (activeChartPlatforms.has(key) && activeChartPlatforms.size > 1) activeChartPlatforms.delete(key);
      else activeChartPlatforms.add(key);
      chartHover = null;
      updateChartTooltip(null, canvas);
      animateTrafficChart();
    });
  });
}

function animateTrafficChart() {
  window.cancelAnimationFrame(chartAnimationFrame);
  const start = performance.now();
  const duration = 620;

  function tick(now) {
    const elapsed = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    drawTrafficChart(eased);
    if (elapsed < 1) chartAnimationFrame = window.requestAnimationFrame(tick);
  }

  chartAnimationFrame = window.requestAnimationFrame(tick);
}

function handleChartPointer(event) {
  const canvas = $("#trafficChart");
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const nearest = chartPoints.reduce(
    (best, point) => {
      const distance = Math.hypot(point.x - x, point.y - y);
      return distance < best.distance ? { point, distance } : best;
    },
    { point: null, distance: Infinity }
  );

  chartHover = nearest.distance < 42 ? nearest.point : null;
  drawTrafficChart(1);
  updateChartTooltip(chartHover, canvas);
}

function drawAudienceChart() {
  const canvas = $("#audienceChart");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const size = Math.min(rect.width || 280, 320);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const center = size / 2;
  const radius = size * 0.36;
  let start = -Math.PI / 2;
  ctx.clearRect(0, 0, size, size);

  audienceSegments.forEach((segment) => {
    const angle = (segment.value / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(center, center, radius, start, start + angle);
    ctx.lineWidth = 28;
    ctx.strokeStyle = segment.color;
    ctx.stroke();
    start += angle;
  });

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text");
  ctx.textAlign = "center";
  ctx.font = "700 27px Inter, sans-serif";
  ctx.fillText("76%", center, center - 4);
  ctx.font = "12px Inter, sans-serif";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted");
  ctx.fillText("returning audience", center, center + 18);
}

async function openConnectDialog() {
  const hasSession = await ensureCurrentSession({
    message: "Log in to track URLs, or create a free account if you're new."
  });
  if (!hasSession) {
    return;
  }
  const dialog = $("#connectDialog");
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

function renderPlatformGrid() {
  $("#platformGrid").innerHTML = platforms
    .map(
      (platform) => `
        <button type="button" class="platform-option ${platform.name === selectedPlatform ? "selected" : ""}" data-platform="${platform.name}">
          ${formatBadge(platform.name)}
          <strong>${platform.name}</strong>
          <small>${platform.connected ? "Connected" : "Available"}</small>
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".platform-option").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPlatform = button.dataset.platform;
      renderPlatformGrid();
      renderOAuthPreview();
      animateTrafficChart();
    });
  });
}

function renderOAuthPreview() {
  const provider = oauthProviders[selectedPlatform];
  const slug = selectedPlatform.toLowerCase();
  const liveStatus = currentUser?.oauthStatus?.find((item) => item.provider === slug);
  const statusLabel = liveStatus
    ? liveStatus.tokenStatus === "reconnect_required"
      ? "Reconnect needed"
      : "Connected"
    : provider.status;
  $("#oauthPreview").innerHTML = `
    <header>
      <div>
        <p class="eyebrow">${provider.method}</p>
        <h4>${selectedPlatform} account connection</h4>
      </div>
      <span class="data-pill">${statusLabel}</span>
    </header>
    <p>${liveStatus?.profile?.title ? `Connected to ${liveStatus.profile.title}.` : provider.note}</p>
    <div class="scope-list">
      ${provider.scopes.map((scope) => `<span class="data-pill">${scope}</span>`).join("")}
    </div>
  `;
}

async function saveConnection(event) {
  event.preventDefault();
  if (!currentUser) {
    openAuthDialog("login");
    return;
  }
  const urlInput = $("#urlInput");
  const url = urlInput.value.trim();

  if (url) {
    const label = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const source = inferPlatformFromUrl(label, selectedPlatform);
    try {
      const data = await apiRequest("/api/urls", {
        method: "POST",
        body: JSON.stringify({ url: label, source })
      });
      urls = (data.urls || []).map((item) => ({ ...item, clicks: "0", change: "Tracking" }));
      metricsSummary = null;
      applyWorkspaceSourceState();
    } catch (error) {
      if (error.status === 402) {
        $("#connectDialog").close();
        openUpgradeDialog("additional tracked URLs");
        return;
      }
      urls.unshift({ url: label, source, clicks: "New", change: "Tracking" });
      applyWorkspaceSourceState();
      showToast(error.message);
    }
    urlInput.value = "";
  } else {
    applyWorkspaceSourceState();
  }

  $("#connectDialog").close();
  renderAll();
  showToast(url ? `${inferPlatformFromUrl(url, selectedPlatform)} URL tracking added. OAuth remains a Pro feature.` : "Add a URL or choose OAuth to connect a source.");
}

async function connectOAuth(event) {
  event.preventDefault();
  if (!(await ensureCurrentSession({ showLogin: false, forceRefresh: true }))) {
    $("#connectDialog").close();
    openAuthDialog("login");
    showToast("Log in to connect accounts.");
    return;
  }
  if (!["pro", "studio"].includes(currentUser.plan)) {
    $("#connectDialog").close();
    openUpgradeDialog();
    return;
  }
  const startOAuth = async () => apiRequest(`/api/oauth/start/${selectedPlatform.toLowerCase()}`);
  try {
    const data = await startOAuth();
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
      return;
    }
    if (data.user) currentUser = data.user;
    updateAccountUi();
    const platform = platforms.find((item) => item.name === selectedPlatform);
    if (platform) {
      platform.connected = true;
      platform.health = Math.max(platform.health, 90);
      platform.followers = platform.followers === "Not linked" ? "Syncing" : platform.followers;
    }
    integrations = integrations.map((item) =>
      item.platform === selectedPlatform ? { ...item, status: "OAuth connected", freshness: "Just now" } : item
    );
    $("#connectDialog").close();
    renderAll();
    setActiveView("analytics");
    showToast(data.message || `${selectedPlatform} OAuth connection started.`);
    return;
  } catch (error) {
    if (error.status === 401) {
      const resumed = await ensureCurrentSession({ showLogin: false, forceRefresh: true });
      if (resumed) {
        try {
          const data = await startOAuth();
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
            return;
          }
          if (data.user) currentUser = data.user;
          updateAccountUi();
          $("#connectDialog").close();
          renderAll();
          setActiveView("analytics");
          showToast(data.message || `${selectedPlatform} OAuth connection started.`);
          return;
        } catch (retryError) {
          error = retryError;
        }
      }
    }
    if (error.status === 402) {
      $("#connectDialog").close();
      openUpgradeDialog();
      return;
    }
    if (error.status === 401) {
      $("#connectDialog").close();
      openAuthDialog("login");
      showToast("Your saved session expired. Log in once, then connect the account.");
      return;
    }
    if (error.data?.setupRequired) {
      renderOAuthSetupRequired(error.data);
      showToast(`${selectedPlatform} OAuth needs Netlify credentials first.`);
      return;
    }
    showToast(error.message);
    return;
  }
}

function connectOAuthDemoFallback() {
  const platform = platforms.find((item) => item.name === selectedPlatform);
  if (platform && selectedPlatform !== "Website") {
    platform.connected = true;
    platform.health = Math.max(platform.health, 90);
    platform.followers = platform.followers === "Not linked" ? "Syncing" : platform.followers;
    integrations = integrations.map((item) =>
      item.platform === selectedPlatform
        ? { ...item, status: "OAuth connected", freshness: "Just now" }
        : item
    );
    $("#connectDialog").close();
    renderAll();
    setActiveView("analytics");
    showToast(`${selectedPlatform} OAuth connection simulated.`);
    return;
  }

  showToast("Website tracking uses a URL, pixel, or server event instead of OAuth.");
}

async function applyAuthResult(data, message) {
  if (data.sessionToken) {
    sessionToken = data.sessionToken;
    window.localStorage.setItem("viralscopeSessionToken", sessionToken);
  }
  if (data.user?.email) window.localStorage.setItem("viralscopeLastEmail", data.user.email);
  currentUser = data.user;
  currentWorkspace = data.workspace || currentWorkspace;
  urls = (currentWorkspace?.trackedUrls || []).map((item) => ({ ...item, clicks: item.clicks || "0", change: "Tracking" }));
  metricsSummary = null;
  applyWorkspaceSourceState();
  updateAccountUi();
  saveSessionSnapshot();
  await refreshMetricsSummary();
  renderAll();
  $("#authDialog").close();
  showToast(message);
}

async function submitAuth(event) {
  event.preventDefault();
  const payload = {
    name: $("#authName").value.trim(),
    email: $("#authEmail").value.trim(),
    password: $("#authPassword").value
  };
  if (payload.email) window.localStorage.setItem("viralscopeLastEmail", payload.email);
  const endpoint = authMode === "signup" ? "/api/auth/signup" : authMode === "recover" ? "/api/auth/recover" : "/api/auth/login";
  try {
    const data = await apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    await applyAuthResult(data, data.accountRecovered ? "Existing workspace restored. This password is now active." : authMode === "signup" ? "Free account created." : "Logged in.");
  } catch (error) {
    if (authMode === "signup" && error.status === 409) {
      try {
        const data = await apiRequest("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        await applyAuthResult(data, "Account already existed, so you were logged in.");
        return;
      } catch {
        openAuthDialog("login");
        showToast("That email already exists. Log in with your password.");
        return;
      }
    }
    if (authMode === "login" && (error.status === 401 || error.status === 404)) {
      openAuthDialog(error.status === 401 ? "recover" : "signup");
      if (error.status === 404) {
        $("#authHelper").textContent = "The saved browser session existed, but this deployed prototype server does not currently have that account. Create it again with this email to rebuild the server account.";
      }
      showToast(error.status === 401
        ? "Password mismatch. Use Recover account to set a new password."
        : "Server account not found. Create it again with this email to continue.");
      return;
    }
    showToast(error.message);
  }
}

async function upgradePlan(event) {
  event.preventDefault();
  if (selectedPlan === "free") {
    $("#upgradeDialog").close();
    showToast("Free plan selected. Manual URL tracking stays available.");
    return;
  }
  if (!(await ensureCurrentSession({ showLogin: false }))) {
    $("#upgradeDialog").close();
    openAuthDialog("signup");
    showToast("Create an account first, then checkout can continue.");
    return;
  }
  try {
    const data = await apiRequest("/api/billing/upgrade", {
      method: "POST",
      body: JSON.stringify({ plan: selectedPlan, interval: billingInterval, feature: upgradeContext })
    });
    if (data.checkoutUrl) {
      showToast("Opening secure Stripe checkout.");
      window.location.href = data.checkoutUrl;
      return;
    }
    currentUser = data.user;
    updateAccountUi();
    $("#upgradeDialog").close();
    showToast(`${planCatalog[selectedPlan].name} activated. ${upgradeContext} unlocked.`);
  } catch (error) {
    showToast(error.message);
  }
}

async function openBillingPortal() {
  if (!(await ensureCurrentSession())) {
    return;
  }
  try {
    const data = await apiRequest("/api/billing/portal", { method: "POST" });
    if (data.portalUrl) {
      showToast("Opening Stripe billing portal.");
      window.location.href = data.portalUrl;
      return;
    }
    showToast(data.message || "Billing portal will be available after a live Stripe checkout.");
  } catch (error) {
    showToast(error.message);
  }
}

async function simulateRefresh() {
  const button = $("#simulateRefresh");
  setButtonWorking(button, true, "Syncing");
  setLiveOps("Sync in progress", "Pulling newest creator metrics, URL clicks, and anomaly checks into the command center.", "Syncing sources");
  addActivity("Sync", "Started cross-platform metric refresh", "live");
  if (currentUser && currentUser.plan !== "free") {
    try {
      const providerSlugs = (currentUser.oauthStatus || [])
        .filter((status) => status.tokenStatus !== "reconnect_required" && status.tokenStatus !== "exchange_failed")
        .map((status) => status.provider);
      const syncTargets = providerSlugs.length ? providerSlugs : ["youtube"];
      let data = null;
      for (const slug of syncTargets) {
        data = await apiRequest(`/api/sync/${slug}`, { method: "POST", body: "{}" });
      }
      metricsSummary = data?.summary;
      if (data?.user) currentUser = data.user;
      applyMetricsSummary();
      renderAll();
      setLiveOps("Platform sync complete", `Saved ${syncTargets.length} metric snapshot${syncTargets.length === 1 ? "" : "s"} across connected OAuth providers.`, "Metrics saved");
      addActivity("Sync", `${syncTargets.map((slug) => slug[0].toUpperCase() + slug.slice(1)).join(", ")} snapshot${syncTargets.length === 1 ? "" : "s"} saved`, "live");
      setButtonWorking(button, false);
      showToast("Connected platform metrics synced into the backend pipeline.");
      return;
    } catch (error) {
      if (error.status === 402) {
        setButtonWorking(button, false);
        requireProFeature("platform metric sync");
        return;
      }
      addActivity("Sync", `Backend sync fell back to demo: ${error.message}`, "watch");
    }
  }
  const bumps = [
    ["totalViews", "15.1M"],
    ["engagements", "944K"],
    ["siteClicks", "191K"],
    ["revenue", "$43.8K"],
    ["heroViews", "15.1M"]
  ];
  bumps.forEach(([id, value], index) => {
    window.setTimeout(() => {
      const node = document.getElementById(id);
      node.textContent = value;
      node.closest(".metric-card")?.classList.add("metric-flash");
      node.animate([{ transform: "translateY(-2px)" }, { transform: "translateY(0)" }], { duration: 240 });
      window.setTimeout(() => node.closest(".metric-card")?.classList.remove("metric-flash"), 900);
    }, index * 80);
  });
  await new Promise((resolve) => window.setTimeout(resolve, 900));
  alerts.unshift({
    title: "Fresh sync complete",
    body: "The latest YouTube and TikTok metrics have been folded into the dashboard.",
    severity: "live",
    time: "Now"
  });
  renderAlerts();
  integrations = integrations.map((item) => ({
    ...item,
    freshness: item.status === "Needs auth" ? item.freshness : "Just now"
  }));
  renderIntegrations();
  setLiveOps("Fresh signals online", "Metrics, alerts, and integration freshness have been updated across the workspace.", "Live sync complete");
  addActivity("Alert", "Fresh sync complete across YouTube, TikTok, and URLs", "hot");
  setButtonWorking(button, false);
  showToast("Metrics refreshed with the newest mock sync.");
}

async function runCoachAnalysis() {
  if (coachMode === "deep" && !requireProFeature("Deep AI channel audits")) return;
  const button = $("#runCoach");
  setButtonWorking(button, true, "Analyzing");
  const question = $("#coachQuestion").value.trim() || "Review my latest post and give me a growth plan.";
  const modeLabel = coachMode === "deep" ? "Deep strategy" : "Fast audit";
  $("#coachSummary").innerHTML = `
    <span class="analysis-progress">
      <i></i><strong>${modeLabel} running</strong>
      Reading latest posts, traffic spikes, retention risk, and revenue paths.
    </span>
  `;
  setLiveOps("AI coach analyzing", "CommandCue is reviewing connected signals and building the next recommendation set.", "AI analysis running");
  addActivity("AI", `${modeLabel} started for "${question.slice(0, 48)}"`, "ai");
  if (currentUser) {
    try {
      const data = await apiRequest("/api/ai/coach", {
        method: "POST",
        body: JSON.stringify({ mode: coachMode, question })
      });
      latestAiRun = data.run;
      applyAiResult(data.result, coachMode);
      setLiveOps("AI coach finished", `AI run saved using ${data.provider}. Recommendations are ready.`, "Monitoring 8 sources");
      addActivity("AI", `${modeLabel} saved to AI run history`, "ai");
      setButtonWorking(button, false);
      showToast(data.provider === "openai" ? "AI coach finished with OpenAI." : "AI coach finished with local backend fallback.");
      return;
    } catch (error) {
      if (error.status === 402) {
        setButtonWorking(button, false);
        requireProFeature("Deep AI channel audits");
        return;
      }
      addActivity("AI", `Backend AI fell back to local UI: ${error.message}`, "watch");
    }
  }
  await new Promise((resolve) => window.setTimeout(resolve, 850));
  $("#coachSummary").textContent =
    `${modeLabel}: I reviewed your connected channel signals, latest high-lift posts, stream clicks, and stalled videos. ` +
    `For "${question}", the highest-impact move is to repackage the proven TikTok angle for YouTube, clip the Twitch spike, and test a cleaner thumbnail promise.`;

  const dynamicCard = {
    title: "Next best action",
    body: coachMode === "deep"
      ? "Create a 3-video cluster around the strongest audience pain point, then compare retention by hook style and thumbnail format."
      : "Publish one Short from the Twitch spike today, then update the latest YouTube title with a sharper outcome."
  };

  recommendations[coachMode] = [dynamicCard, ...recommendations[coachMode].slice(0, 2)];
  renderCoach();
  setLiveOps("AI coach finished", "New recommendations are ready and the activity stream has been updated.", "Monitoring 8 sources");
  addActivity("AI", "Coach produced a next-best-action recommendation", "ai");
  setButtonWorking(button, false);
  showToast("AI coach finished the channel review.");
}

async function runAiQuickAction(action) {
  const proActions = {
    calendar: "AI content planning",
    competitors: "AI competitor research",
    report: "AI report drafting"
  };
  if (proActions[action] && !requireProFeature(proActions[action])) return;
  if (currentUser) {
    try {
      const data = await apiRequest("/api/ai/action", {
        method: "POST",
        body: JSON.stringify({ action, mode: coachMode, question: $("#coachQuestion").value.trim() })
      });
      latestAiRun = data.run;
      applyAiResult(data.result, coachMode);
      showToast(`${action} AI action saved via ${data.provider}.`);
      return;
    } catch (error) {
      if (error.status === 402) {
        requireProFeature(proActions[action] || "this AI action");
        return;
      }
      showToast(error.message);
    }
  }

  const actions = {
    title: {
      message: "Title rewrite created.",
      card: { title: "AI title rewrite", body: "Your Analytics Are Lying Until You Track These 7 Creator Signals" }
    },
    calendar: {
      message: "Calendar plan created.",
      card: { title: "AI calendar plan", body: "Publish one main YouTube upload, three Shorts, one live audit, and one newsletter recap this week." }
    },
    competitors: {
      message: "Competitor search queued.",
      card: { title: "AI competitor set", body: "Track Dinner Lab Daily, Growth Desk, and Niche Mentor for outlier packaging patterns." }
    },
    report: {
      message: "Report draft created.",
      card: { title: "AI report draft", body: "Prepared a sponsor-ready recap with views, clicks, conversions, retention, and next campaign ideas." }
    }
  };
  const selected = actions[action];
  if (!selected) return;
  recommendations[coachMode] = [selected.card, ...recommendations[coachMode].slice(0, 2)];
  renderCoach();
  showToast(selected.message);
}

function renderAll() {
  renderChannels();
  renderContent();
  renderUrls();
  renderAlerts();
  renderActivityFeed();
  renderOnboarding();
  renderCreatorOs();
  renderCoach();
  renderLab();
  renderOutliers();
  renderRepurpose();
  renderCompetitors();
  renderPackaging();
  renderKeywords();
  renderRules();
  renderCollections();
  renderIntegrations();
  renderChannelPreview();
  renderDiscovery();
  renderWatchlist();
  renderSettings();
  renderOptimizer();
  renderRevenue();
  renderFunnel();
  renderDeals();
  renderCalendar();
  renderReports();
  renderLaunchCenter();
  renderQuality();
  renderOwnedAudience();
  renderListening();
  renderAgentSteps();
  renderPlatformGrid();
  renderOAuthPreview();
  renderPanelInfoTips();
  renderDashboardBrief();
  renderWorkspaceEmptyState();
  animateTrafficChart();
  drawAudienceChart();
}

function setActiveView(view) {
  document.querySelectorAll("[data-view-section]").forEach((section) => {
    const views = section.dataset.viewSection.split(" ");
    section.classList.toggle("is-hidden", !views.includes(view));
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => {
    animateTrafficChart();
    drawAudienceChart();
  }, 80);
}

function handleBillingReturn() {
  const params = new URLSearchParams(window.location.search);
  const checkout = params.get("checkout");
  const sessionId = params.get("session_id");
  const billing = params.get("billing");
  const oauth = params.get("oauth");
  const provider = params.get("provider");
  if (checkout === "success") {
    showToast("Checkout completed. Confirming your plan with Stripe.");
    if (sessionId) {
      apiRequest("/api/billing/confirm", {
        method: "POST",
        body: JSON.stringify({ sessionId })
      })
        .then((data) => {
          if (data.sessionToken) {
            sessionToken = data.sessionToken;
            window.localStorage.setItem("viralscopeSessionToken", sessionToken);
          }
          if (data.user) currentUser = data.user;
          if (data.workspace) currentWorkspace = data.workspace;
          updateAccountUi();
          saveSessionSnapshot();
          renderAll();
          showToast(currentUser?.plan === "pro" || currentUser?.plan === "studio" ? "Paid plan confirmed." : "Checkout is still processing.");
        })
        .catch((error) => showToast(error.message))
        .finally(refreshSession);
    } else {
      refreshSession();
    }
    refreshLaunchReadiness();
  }
  if (checkout === "cancelled") {
    showToast("Checkout cancelled. Your current plan stayed the same.");
  }
  if (billing === "portal-return") {
    showToast("Returned from billing portal.");
    refreshSession();
  }
  if (oauth === "connected") {
    showToast(`${provider || "Platform"} connected. Metrics will sync into CommandCue.`);
    refreshSession().then(renderAll);
  }
  if (oauth === "failed") {
    showToast(`${provider || "Platform"} OAuth failed. Check credentials, scopes, and app review status.`);
  }
  if (checkout || billing || oauth) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  renderNavIcons();
  hydrateSessionSnapshot();
  renderAll();
  await refreshSession();
  await refreshLaunchReadiness();
  handleBillingReturn();

  $("#themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    animateTrafficChart();
    drawAudienceChart();
  });

  $("#platformFilter").addEventListener("change", renderContent);
  $("#searchInput").addEventListener("input", () => {
    renderContent();
    renderGlobalSearch();
  });
  $("#searchInput").addEventListener("focus", renderGlobalSearch);
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-box")) $("#globalSearchResults").classList.remove("show");
  });
  $("#runDiscovery").addEventListener("click", renderDiscovery);
  $("#discoveryQuery").addEventListener("input", renderDiscovery);
  $("#discoveryPlatform").addEventListener("change", renderDiscovery);
  $("#clearWatchlist").addEventListener("click", () => {
    watchlist = [];
    renderWatchlist();
    showToast("Watchlist cleared.");
  });
  $("#startOnboarding").addEventListener("click", openOnboardingDialog);
  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-choice]");
      if (!button) return;
      group.querySelectorAll("[data-choice]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      onboardingState[group.dataset.choiceGroup] = button.dataset.choice;
      renderSetupSummary();
    });
  });
  $("#onboardingBack").addEventListener("click", () => setOnboardingStep(onboardingStep - 1));
  $("#onboardingNext").addEventListener("click", () => {
    if (onboardingStep === 3) onboardingState.url = $("#onboardingUrl").value.trim() || onboardingState.url;
    if (onboardingStep === 4) {
      completeOnboarding();
      return;
    }
    setOnboardingStep(onboardingStep + 1);
  });
  $("#onboardingUrl").addEventListener("input", renderSetupSummary);
  $("#saveSettings").addEventListener("click", () => openSettingsDialog(activeSettingsId));
  $("#saveSettingsModal").addEventListener("click", (event) => {
    event.preventDefault();
    $("#settingsDialog").close();
    showToast("Settings saved for prototype.");
  });
  $("#openConnect").addEventListener("click", openConnectDialog);
  $("#openConnectSmall").addEventListener("click", openConnectDialog);
  $("#openUrlTracker").addEventListener("click", openConnectDialog);
  $("#addUrlInline").addEventListener("click", openConnectDialog);
  $("#emptyConnectSource")?.addEventListener("click", openConnectDialog);
  $("#emptyTrackUrl")?.addEventListener("click", openConnectDialog);
  $("#emptyOpenLaunch")?.addEventListener("click", () => setActiveView("launch"));
  $("#saveConnection").addEventListener("click", saveConnection);
  $("#connectOAuth").addEventListener("click", connectOAuth);
  $("#accountButton").addEventListener("click", async () => {
    if (!(await ensureCurrentSession())) return;
    if (["pro", "studio"].includes(currentUser.plan)) openSettingsDialog("billing");
    else openUpgradeDialog();
  });
  $("#toggleAuthMode").addEventListener("click", () => openAuthDialog(authMode === "login" ? "signup" : "login"));
  $("#recoverAuthMode").addEventListener("click", () => openAuthDialog("recover"));
  $("#submitAuth").addEventListener("click", submitAuth);
  $("#upgradePlan").addEventListener("click", upgradePlan);
  $("#upgradeDialog").addEventListener("click", (event) => {
    const planButton = event.target.closest("[data-plan]");
    if (planButton) {
      selectedPlan = planButton.dataset.plan;
      renderUpgradeDialog();
      return;
    }
    const billingButton = event.target.closest("[data-billing]");
    if (billingButton) {
      billingInterval = billingButton.dataset.billing;
      renderUpgradeDialog();
    }
  });
  $("#runLaunchChecks").addEventListener("click", () => {
    setLiveOps("Launch checks running", "Reviewing OAuth, billing, legal, data, and marketing readiness for production launch.", "Launch audit");
    addActivity("Launch", "Ran go-live readiness checks", "now");
    refreshLaunchReadiness(true);
  });
  $("#openLaunchPaywall").addEventListener("click", () => openUpgradeDialog("Stripe billing and paid plan activation"));
  $("#generateLaunchCampaign").addEventListener("click", () => {
    if (!requireProFeature("AI launch campaign generation")) return;
    marketingLaunch.unshift({
      channel: "Founder launch script",
      priority: "Today",
      idea: "Record a 35-second demo: scattered analytics, CommandCue unified dashboard, AI audit, then waitlist CTA."
    });
    renderLaunchCenter();
    showToast("Launch campaign generated.");
  });
  document.querySelectorAll("[data-ai-action]").forEach((button) => {
    button.addEventListener("click", () => runAiQuickAction(button.dataset.aiAction));
  });
  $("#simulateRefresh").addEventListener("click", simulateRefresh);
  $("#clearAlerts").addEventListener("click", () => {
    alerts = [];
    renderAlerts();
    showToast("Alerts cleared.");
  });
  $("#runCoach").addEventListener("click", runCoachAnalysis);
  $("#generateIdeas").addEventListener("click", () => {
    if (!requireProFeature("Growth Lab idea generation")) return;
    labFeatures.unshift({
      source: "Fresh idea",
      title: "Stream-to-upload flywheel",
      body: "Detect live moments with high chat velocity, generate Shorts, then route viewers to a full YouTube breakdown and tracked URL."
    });
    renderLab();
    showToast("New growth lab idea generated.");
  });
  $("#runOsAudit").addEventListener("click", () => {
    if (!requireProFeature("Creator OS audits")) return;
    creatorOsScores = creatorOsScores.map((item) => ({
      ...item,
      score: Math.min(98, item.score + Math.floor(Math.random() * 7))
    }));
    renderCreatorOs();
    showToast("Creator OS audit refreshed.");
  });
  $("#scanOutliers").addEventListener("click", () => {
    if (!requireProFeature("outlier discovery scans")) return;
    const niche = $("#nicheFilter").value;
    outliers.unshift({
      platform: niche === "Gaming" ? "Kick" : "YouTube",
      niche,
      title: niche === "Gaming" ? "Streamer turns one challenge into 11 viral clips" : `Why ${niche.toLowerCase()} channels are growing faster this week`,
      creator: "Radar Match",
      multiplier: `${(Math.random() * 2 + 2.4).toFixed(1)}x`,
      velocity: "+Fresh scan",
      score: Math.floor(Math.random() * 12) + 84
    });
    renderOutliers();
    showToast(`${niche} outliers refreshed.`);
  });
  $("#nicheFilter").addEventListener("change", renderOutliers);
  $("#addCompetitor").addEventListener("click", () => {
    if (!requireProFeature("competitor tracking")) return;
    competitors.unshift({
      name: `Creator ${competitors.length + 1}`,
      subs: `${Math.floor(Math.random() * 700 + 120)}K`,
      views: `+${(Math.random() * 2 + 0.4).toFixed(1)}M`,
      cadence: "Tracked weekly",
      score: Math.floor(Math.random() * 16) + 76
    });
    renderCompetitors();
    showToast("Competitor added to the comparison board.");
  });
  $("#runPackagingTest").addEventListener("click", () => {
    if (!requireProFeature("title and thumbnail testing")) return;
    packagingTests = packagingTests.map((item) => ({
      ...item,
      ctr: Number((item.ctr + Math.random() * 1.8 - 0.5).toFixed(1)),
      score: Math.min(98, Math.max(70, item.score + Math.floor(Math.random() * 9 - 3)))
    }));
    renderPackaging();
    showToast("Packaging test updated with new predictions.");
  });
  $("#buildRepurposePack").addEventListener("click", () => {
    if (!requireProFeature("AI repurposing packs")) return;
    repurposeJobs.unshift({
      source: "Fresh creator command",
      output: "12 Shorts, 4 clips, 1 newsletter, 1 carousel",
      status: "Generated",
      score: 94
    });
    renderRepurpose();
    showToast("Repurpose pack generated.");
  });
  $("#keywordTopic").addEventListener("input", () => {
    const topic = $("#keywordTopic").value.trim() || "creator growth";
    keywordRows = [
      { keyword: topic, volume: "Medium", competition: "Low", intent: "Tool research", score: 88 },
      { keyword: `${topic} tips`, volume: "High", competition: "Medium", intent: "How-to", score: 82 },
      { keyword: `${topic} audit`, volume: "Medium", competition: "Low", intent: "Problem aware", score: 91 },
      { keyword: `best ${topic} tools`, volume: "High", competition: "High", intent: "Comparison", score: 76 }
    ];
    renderKeywords();
  });
  $("#createRule").addEventListener("click", () => {
    openRuleDialog();
  });
  $("#ruleSignal").addEventListener("change", () => {
    applyRuleSignalDefaults();
    updateRulePreview();
  });
  ["ruleName", "rulePlatform", "ruleSignal", "ruleCondition", "ruleThreshold", "ruleWindow", "ruleNotify", "ruleStatus"].forEach((id) => {
    $(`#${id}`).addEventListener("input", updateRulePreview);
    $(`#${id}`).addEventListener("change", updateRulePreview);
  });
  $("#saveRule").addEventListener("click", (event) => {
    event.preventDefault();
    alertRules.unshift({
      name: $("#ruleName").value.trim() || "New alert rule",
      threshold: `${$("#ruleSignal").value} ${$("#ruleCondition").value} ${$("#ruleThreshold").value.trim() || "custom threshold"} during ${$("#ruleWindow").value}`,
      target: $("#rulePlatform").value,
      status: $("#ruleStatus").value
    });
    $("#ruleDialog").close();
    renderRules();
    showToast("Alert rule created.");
  });
  $("#saveCollection").addEventListener("click", () => {
    if (!requireProFeature("Strategy Vault collections")) return;
    collections.unshift({
      name: "Current AI growth plan",
      count: "4 items",
      detail: "Coach recommendation, keyword cluster, packaging winner, and outlier reference"
    });
    renderCollections();
    showToast("Collection saved to the strategy vault.");
  });
  $("#syncIntegrations").addEventListener("click", async () => {
    const button = $("#syncIntegrations");
    setButtonWorking(button, true, "Syncing");
    setLiveOps("Connector sync running", "Checking token health, source freshness, and failed provider states.", "Connector sync");
    addActivity("Sync", "Integration hub sync started", "live");
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    integrations = integrations.map((item) => ({
      ...item,
      status: item.status === "Needs auth" ? "Needs auth" : "Live sync",
      freshness: item.status === "Needs auth" ? item.freshness : "Just now"
    }));
    renderIntegrations();
    setLiveOps("Connector sync complete", "Connected sources are current. Kick and Facebook still need authorization.", "Monitoring 8 sources");
    addActivity("Sync", "Connected integrations refreshed", "live");
    setButtonWorking(button, false);
    showToast("Connected integrations synced.");
  });
  $("#runCommand").addEventListener("click", async () => {
    if (!requireProFeature("the AI command center")) return;
    const button = $("#runCommand");
    setButtonWorking(button, true, "Running");
    const command = $("#commandInput").value.trim() || "Build a growth plan.";
    agentSteps = [
      { step: "Understand request", result: `Parsing command: "${command}"`, status: "running" },
      { step: "Audit channel", result: "Waiting for signal map.", status: "queued" },
      { step: "Create assets", result: "Waiting for strategy output.", status: "queued" },
      { step: "Schedule next actions", result: "Waiting for calendar handoff.", status: "queued" }
    ];
    renderAgentSteps();
    setLiveOps("AI command running", "CommandCue is turning the command into audit, strategy, asset, and schedule actions.", "AI command running");
    addActivity("AI", "Command center started a multi-step workflow", "ai");
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    agentSteps = [
      { step: "Understand request", result: `Parsed command: "${command}"` },
      { step: "Audit channel", result: "Checked latest uploads, outlier map, retention risks, revenue paths, and competitor movement." },
      { step: "Create assets", result: "Generated title test, keyword cluster, clip plan, alert rule, and sponsor-safe report outline." },
      { step: "Schedule next actions", result: "Added the best YouTube upload and two short-form clips to the publishing plan." }
    ];
    calendarItems.unshift({
      day: "Next",
      title: "AI command output: package and publish winning angle",
      platform: "YouTube + Shorts",
      status: "AI planned"
    });
    renderAgentSteps();
    renderCalendar();
    setLiveOps("AI command completed", "The workflow created strategy outputs and placed the next publishing action into the calendar.", "Monitoring 8 sources");
    addActivity("AI", "Command center completed a strategy workflow", "ai");
    setButtonWorking(button, false);
    showToast("AI command completed.");
  });
  $("#optimizeUpload").addEventListener("click", () => {
    if (!requireProFeature("the pre-publish optimizer")) return;
    uploadScores = uploadScores.map((item) => ({
      ...item,
      score: Math.min(98, item.score + Math.floor(Math.random() * 7))
    }));
    renderOptimizer();
    showToast("Upload optimizer improved the readiness score.");
  });
  $("#reconcileRevenue").addEventListener("click", () => {
    if (!requireProFeature("revenue attribution")) return;
    revenueStreams.unshift({
      name: "New sponsor match",
      value: "$9.8K",
      source: "YouTube outlier + media kit",
      lift: "+New"
    });
    renderRevenue();
    showToast("Revenue attribution reconciled.");
  });
  $("#optimizeFunnel").addEventListener("click", () => {
    if (!requireProFeature("funnel optimization")) return;
    funnelLinks.unshift({
      step: "New primary CTA",
      tool: "Bio hub",
      visits: "Ready",
      conversion: "+Projected",
      insight: "Move newsletter signup above sponsor links for warmer long-term revenue."
    });
    renderFunnel();
    showToast("Funnel optimization plan created.");
  });
  $("#createMediaKit").addEventListener("click", () => {
    if (!requireProFeature("media kit generation")) return;
    reports.unshift({
      name: "Sponsor-ready media kit",
      audience: "Brand partner",
      detail: "Audience quality, platform reach, rate card, conversion proof, and case studies.",
      status: "Ready"
    });
    renderReports();
    showToast("Media kit generated.");
  });
  $("#generateCalendar").addEventListener("click", () => {
    if (!requireProFeature("AI calendar generation")) return;
    calendarItems = [
      { day: "Mon", title: "Outlier reaction Short with AI-generated hook", platform: "TikTok + Reels", status: "Ready" },
      { day: "Tue", title: "Main upload: your analytics are lying", platform: "YouTube", status: "Optimized" },
      { day: "Wed", title: "Live channel audit and clip capture", platform: "Twitch + Kick", status: "Scheduled" },
      { day: "Thu", title: "Carousel: what sponsors actually measure", platform: "Instagram", status: "Draft" },
      { day: "Fri", title: "Shorts pack from live stream", platform: "YouTube Shorts", status: "Auto-cut" },
      { day: "Sun", title: "Newsletter and tracked offer recap", platform: "Website", status: "Planned" }
    ];
    renderCalendar();
    showToast("AI calendar generated.");
  });
  $("#createReport").addEventListener("click", () => {
    if (!requireProFeature("shareable client reports")) return;
    reports.unshift({
      name: "Executive growth snapshot",
      audience: "Client",
      detail: "One-page summary with top content, revenue attribution, next bets, and risks.",
      status: "Ready"
    });
    renderReports();
    showToast("Report created.");
  });
  $("#scanAudienceQuality").addEventListener("click", () => {
    if (!requireProFeature("audience quality scans")) return;
    audienceQuality = audienceQuality.map((item) => ({
      ...item,
      score: item.label === "Suspicious growth" ? Math.max(3, item.score - 1) : Math.min(98, item.score + 2)
    }));
    renderQuality();
    showToast("Audience quality scan complete.");
  });
  $("#syncOwnedAudience").addEventListener("click", () => {
    if (!requireProFeature("owned-audience sync")) return;
    ownedAudience = ownedAudience.map((item) => ({
      ...item,
      health: Math.min(98, item.health + 2)
    }));
    renderOwnedAudience();
    showToast("Owned audience channels synced.");
  });
  $("#scanListening").addEventListener("click", () => {
    if (!requireProFeature("social listening scans")) return;
    listeningSignals.unshift({
      source: "Cross-platform pulse",
      topic: "Creators want one dashboard for traffic and money",
      sentiment: "+52%",
      action: "Position CommandCue as the creator command center in launch content."
    });
    renderListening();
    showToast("Social listening scan updated.");
  });

  document.querySelectorAll("[data-coach-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.coachMode === "deep" && !requireProFeature("Deep AI channel audits")) return;
      document.querySelectorAll("[data-coach-mode]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      coachMode = button.dataset.coachMode;
      renderCoach();
    });
  });

  document.querySelectorAll(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.range) {
        document.querySelectorAll("[data-range]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        activeRange = Number(button.dataset.range);
      }

      if (button.dataset.chartMode) {
        document.querySelectorAll("[data-chart-mode]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        chartMode = button.dataset.chartMode;
      }

      chartHover = null;
      updateChartTooltip(null, $("#trafficChart"));
      animateTrafficChart();
    });
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveView(button.dataset.view);
    });
  });

  window.addEventListener("resize", () => {
    animateTrafficChart();
    drawAudienceChart();
  });

  $("#trafficChart").addEventListener("pointermove", handleChartPointer);
  $("#trafficChart").addEventListener("pointerleave", () => {
    chartHover = null;
    updateChartTooltip(null, $("#trafficChart"));
    drawTrafficChart(1);
  });

  setActiveView("overview");
});
