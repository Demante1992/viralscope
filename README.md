# ViralScope Creator Command Center

Local full-stack prototype with account login, Free/Pro plan gating, URL tracking, and OAuth-ready platform connection routes.

## Run locally

```powershell
& "C:\Users\ibroy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js
```

Then open:

```text
http://localhost:4173
```

Public landing page:

```text
http://localhost:4173/landing
```

Dashboard alias:

```text
http://localhost:4173/app
```

## Netlify launch path

This project now includes a Netlify-ready deployment layer:

- `netlify.toml` serves the static app and routes `/api/*` to a Netlify Function.
- `netlify/functions/api.mjs` is the modern Netlify Function entrypoint.
- `netlify/functions/_shared/api-core.cjs` adapts the existing API routes to Netlify Functions.
- Netlify Functions persist prototype data through Netlify Blobs using `NETLIFY_BLOBS_STORE` and `NETLIFY_BLOBS_DB_KEY`.

Recommended Netlify settings:

```text
Build command: leave blank
Publish directory: .
Functions directory: netlify/functions
```

Required production environment variables:

```text
APP_URL=https://your-netlify-site-or-domain.com
TOKEN_ENCRYPTION_KEY=use-a-long-random-secret
NETLIFY_BLOBS_STORE=viralscope-data
NETLIFY_BLOBS_DB_KEY=db.json
```

Optional but needed for live product features:

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_STUDIO_PRICE_ID=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
META_CLIENT_ID=
META_CLIENT_SECRET=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
KICK_CLIENT_ID=
KICK_CLIENT_SECRET=
```

For OAuth, register production redirect URLs like:

```text
https://your-netlify-site-or-domain.com/api/oauth/callback/youtube
https://your-netlify-site-or-domain.com/api/oauth/callback/instagram
https://your-netlify-site-or-domain.com/api/oauth/callback/facebook
https://your-netlify-site-or-domain.com/api/oauth/callback/tiktok
https://your-netlify-site-or-domain.com/api/oauth/callback/twitch
https://your-netlify-site-or-domain.com/api/oauth/callback/kick
```

## Product gating

- Free accounts can track URLs and campaign links.
- Pro accounts can connect platform accounts through OAuth-ready routes.
- If provider credentials are not configured, OAuth is simulated only for local demo. Netlify production returns a setup-required error instead of pretending the connection worked.

## Backend readiness APIs

- `GET /api/me` returns the logged-in user plus workspace metadata.
- `GET /api/billing/plans` returns Free, Pro, and Studio entitlements.
- `POST /api/billing/upgrade` creates a live Stripe Checkout Session when Stripe env vars are configured, or falls back to prototype activation when they are not.
- `POST /api/billing/confirm` confirms a returned Stripe Checkout Session and refreshes the user's plan.
- `POST /api/billing/portal` opens the Stripe customer portal once the user has a live Stripe customer.
- `GET /api/workspace` and `POST /api/workspace` provide workspace settings persistence.
- `GET /api/launch/readiness` powers the Launch Center with backend, Stripe, OAuth, database, and legal readiness checks.

## Data pipeline APIs

- `POST /api/sync/:provider` stores a metric snapshot for connected OAuth providers. YouTube, Instagram, and Facebook now fetch provider-specific profiles/recent content. YouTube still falls back to a realistic demo snapshot for local testing when no token exists.
- `GET /api/metrics/summary` returns latest platform snapshots, totals, display values, and recent history for the workspace.
- `GET /api/urls` lists tracked URLs for the current workspace.
- `POST /api/urls` creates a tracked URL and enforces plan limits.
- `POST /api/events/click` records a URL click event and stores a Website metric snapshot.

## AI coach backend

- `POST /api/ai/coach` runs a channel audit using stored metric snapshots, tracked URLs, recent clicks, workspace settings, and sync history.
- `POST /api/ai/action` powers quick actions such as title rewrites, content plans, competitor research, and report drafts.
- `GET /api/ai/runs` returns recent AI runs saved for the workspace.

If `OPENAI_API_KEY` is configured, the backend uses OpenAI's Responses API. If it is missing or a model call fails, ViralScope safely falls back to deterministic local recommendations so the product remains usable in demos.

```text
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

## Landing page and waitlist

- `GET /landing` serves the public ViralScope marketing page.
- `POST /api/waitlist` stores early access requests.
- `GET /api/waitlist/stats` returns waitlist count and platform breakdown.

The root route still serves the dashboard during prototype work. For production launch, flip `/` to `landing.html` and keep the app behind `/app` or an authenticated dashboard route.

## Real OAuth

Set the relevant environment variables from `.env.example`, register redirect URLs like:

```text
http://localhost:4173/api/oauth/callback/youtube
http://localhost:4173/api/oauth/callback/instagram
http://localhost:4173/api/oauth/callback/facebook
http://localhost:4173/api/oauth/callback/tiktok
http://localhost:4173/api/oauth/callback/twitch
http://localhost:4173/api/oauth/callback/kick
```

YouTube and Meta are the first production-hardened providers.

YouTube:

- Uses Google web-server OAuth.
- Requests `access_type=offline` so refresh tokens can be issued.
- Requests `https://www.googleapis.com/auth/youtube.readonly`.
- Requests `https://www.googleapis.com/auth/yt-analytics.readonly`.
- Exchanges authorization codes server-side.
- Stores access and refresh tokens encrypted.
- Refreshes expired access tokens server-side before metric sync.
- Fetches the authenticated channel profile through `youtube.channels.list`.
- Attempts a 28-day YouTube Analytics preview through `youtubeanalytics.reports.query`.

Before using live YouTube OAuth on Netlify:

1. Create a Google Cloud project.
2. Enable YouTube Data API v3 and YouTube Analytics API.
3. Configure OAuth consent screen.
4. Create an OAuth Web application client.
5. Add this authorized redirect URI:

```text
https://useviralscope.netlify.app/api/oauth/callback/youtube
```

6. Add yourself as a test user while the Google consent screen is in testing mode.
7. Set these Netlify environment variables:

```text
APP_URL=https://useviralscope.netlify.app
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
TOKEN_ENCRYPTION_KEY=
```

8. Redeploy the site, log into a Pro ViralScope account, and click the YouTube OAuth connection.

For local YouTube OAuth testing, also add this redirect URI to the same Google OAuth client:

```text
http://localhost:4173/api/oauth/callback/youtube
```

Other providers share the same start/callback structure and can be hardened next with provider-specific token exchange, profile fetch, token refresh, and app review requirements.

Meta Instagram/Facebook OAuth:

- Uses one Meta app for both Instagram and Facebook.
- Requests `public_profile` for the first production-safe OAuth connection.
- Exchanges authorization codes server-side.
- Attempts to exchange Meta's short-lived user token for a longer-lived user token.
- Stores basic profile metadata immediately.
- If advanced Meta permissions are available, fetches managed Pages from Graph API.
- For Instagram, finds the linked Instagram Business/Creator account from the selected Page when Page permissions are approved.
- Stores recent Instagram media or Facebook posts and an immediate metric snapshot when those permissions are available.
- Requires Meta advanced access/app review before real Page, post, and Instagram insight data can sync for production users.

Before using live Meta OAuth on Netlify:

1. Create or open a Meta app in Meta for Developers.
2. Add Facebook Login for Business or Facebook Login, depending on your app configuration.
3. Add these valid OAuth redirect URIs:

```text
https://useviralscope.netlify.app/api/oauth/callback/instagram
https://useviralscope.netlify.app/api/oauth/callback/facebook
```

4. Add yourself as a tester/admin while the Meta app is in development mode.
5. Make sure the Facebook account you test with manages the Page connected to the Instagram Creator/Business account.
6. Set these Netlify environment variables:

```text
APP_URL=https://useviralscope.netlify.app
META_CLIENT_ID=
META_CLIENT_SECRET=
TOKEN_ENCRYPTION_KEY=
```

7. Redeploy the site, log into a Pro ViralScope account, then connect Instagram or Facebook.

The current starter flow intentionally avoids requesting `pages_show_list`, `pages_read_engagement`, `read_insights`, `instagram_basic`, and `instagram_manage_insights` during the first OAuth attempt. Those richer scopes can be added after Meta app review/advanced access is approved. If they are requested too early, Meta can show an "Invalid Scopes" error before the user returns to ViralScope.

For local Meta OAuth testing, also add:

```text
http://localhost:4173/api/oauth/callback/instagram
http://localhost:4173/api/oauth/callback/facebook
```

Meta app review is required before real non-tester users can grant production permissions.

## Real Stripe

Add these values from Stripe before production billing work:

```text
APP_URL=https://your-production-domain.com
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_STUDIO_PRICE_ID=
```

Create recurring Stripe Prices for Pro and Studio, then map their Price IDs into the env vars above. The backend creates Stripe Checkout Sessions in subscription mode when all required Stripe values are configured. If any Stripe value is missing, the app safely falls back to prototype upgrade mode.

Checkout return handling:

```text
https://your-production-domain.com/?checkout=success&session_id={CHECKOUT_SESSION_ID}
https://your-production-domain.com/?checkout=cancelled
```

On return, the browser calls `POST /api/billing/confirm` so the account can update immediately even if the webhook is still in flight.

Register this webhook endpoint in Stripe:

```text
https://your-production-domain.com/api/stripe/webhook
```

Handled events:

- `checkout.session.completed` unlocks the selected plan from Stripe metadata.
- `customer.subscription.created` and `customer.subscription.updated` reconcile active/trialing plans from Stripe subscription status and Price IDs.
- `customer.subscription.deleted` moves the user back to Free.
- `invoice.payment_failed` marks billing as `payment_failed` for account follow-up.

The customer portal endpoint is available at `POST /api/billing/portal` once a Stripe customer exists. Pro users reach it through Billing settings.
