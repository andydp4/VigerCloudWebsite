# AGENTS.md

## Project overview

Marketing website for **Viger Cloud** and its flagship product **Arcarna**, built with **Next.js
(App Router) + TypeScript**. Single frontend service (no separate backend/database); lead capture is
a Next.js route handler (`src/app/api/lead/route.ts`) running in **test mode** (validates + logs,
never delivers to external providers yet).

The build is driven by the numbered briefs in `briefs/`. Status of open questions and deferred work
is tracked in `DECISIONS.md`; content structure/editing is in `CONTENT.md`.

## Commands

Standard scripts are in `package.json` (`dev`, `build`, `start`, `lint`, `typecheck`, `test`). See
`README.md` for the table. `npm run build` also lints and type-checks.

## Cursor Cloud specific instructions

- Dev server runs on **port 3000** (`npm run dev`) — note this differs from the earlier Vite
  scaffold (5173). It's long-running; start it in a background/tmux session, not a blocking call.
- Health check without a browser: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`
  should return `200`.
- No secrets or external services are needed to run or test. `.env.example` documents optional
  config; real provider credentials are intentionally absent and tracked as blocked in
  `DECISIONS.md`. Never commit secrets.
- Content is **structured data** in `src/content/**` (typed by `src/content/types.ts`), not prose in
  components. Edit content there; every record has a `sourceStatus`
  (`confirmed|assumption|placeholder|blocked`) rendered as a visible badge. Prices are always
  structured fields — never free text.
- Two brand token sets must not be mixed: corporate pages use the default `[data-brand="viger"]`
  scope (set on `<html>`); the Arcarna route and Arcarna legal pages set `[data-brand="arcarna"]` on
  a wrapper. Semantic `--brand-*` vars are only defined inside a brand scope by design.
- Indexing is environment-gated in `src/lib/env.ts`: only `NEXT_PUBLIC_APP_ENV=production` allows
  indexing; staging/system return `robots: disallow /`. Don't "fix" staging showing as no-indexed —
  that's intended (Brief 06).
- Client components that read the URL (`LeadForm` uses `useSearchParams`) must be wrapped in a
  `<Suspense>` boundary on their page, or the build fails. Existing pages already do this.
- Lead delivery: `LEAD_DELIVERY_MODE=test` (default) logs only; `live` emails enquiries to
  `support@vigercloud.com` via SMTP (`src/lib/email.ts`, Nodemailer). Live mode needs `SMTP_HOST`,
  `SMTP_USER`, `SMTP_PASS` (+ optional `SMTP_PORT`/`SMTP_SECURE`, `LEAD_NOTIFICATION_EMAIL`,
  `LEAD_FROM_EMAIL`); without them the API returns 502 in live mode. The enquirer is set as the
  email reply-to. Recipient/routing is data-driven via `contactRoutes` in `src/content/site.ts`.
- **CMS (Sanity) is optional.** Pages read content through `src/lib/content.ts`, which returns Sanity
  data only when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (and not `placeholder`); otherwise, and on
  any Sanity fetch error, it falls back to the local arrays in `src/content/**`. So the site runs
  fully with no CMS credentials — don't treat a missing Sanity project as broken.
- The Sanity dataset is **private** by default, so the server-side client (`src/sanity/client.ts`)
  reads with `SANITY_API_READ_TOKEN`. If that token is missing at runtime, a private dataset returns
  nothing and the site silently falls back to local content — so "CMS content not showing" usually
  means the token isn't set (or the dataset should be made public). Content-driven pages use
  `export const revalidate = 60` (ISR), so Studio edits appear within ~60s, not instantly.
- Seed/reset baseline CMS content with `node scripts/seed-sanity.mjs` (needs a write token in
  `SANITY_API_WRITE_TOKEN`; idempotent via stable ids).
- Studio is embedded at `/studio`. When unconfigured it renders a setup notice (not the editor).
  Site chrome (header/footer) is intentionally hidden on `/studio` via `SiteChrome` (client,
  path-based). Sanity schemas are in `src/sanity/schemaTypes/`; the desk structure is
  `src/sanity/structure.ts`; Studio config is the root `sanity.config.ts`.
- Deployment: `next.config.mjs` uses `output: 'standalone'`. `npm run build` emits
  `.next/standalone/server.js`. A multi-stage `Dockerfile` and `DEPLOYMENT.md` cover Node/Hostinger
  and Docker. The Studio route bundle is large (~1.4MB) by nature — that's expected, not a
  regression.
