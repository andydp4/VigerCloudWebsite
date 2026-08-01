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
- Lead delivery stays in test mode until the Staging Gate (Brief 05). Switching to live requires
  confirmed providers/credentials and is deliberately unimplemented.
- **CMS (Sanity) is optional.** Pages read content through `src/lib/content.ts`, which returns Sanity
  data only when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (and not `placeholder`); otherwise, and on
  any Sanity fetch error, it falls back to the local arrays in `src/content/**`. So the site runs
  fully with no CMS credentials — don't treat a missing Sanity project as broken.
- Studio is embedded at `/studio`. When unconfigured it renders a setup notice (not the editor).
  Site chrome (header/footer) is intentionally hidden on `/studio` via `SiteChrome` (client,
  path-based). Sanity schemas are in `src/sanity/schemaTypes/`; the desk structure is
  `src/sanity/structure.ts`; Studio config is the root `sanity.config.ts`.
- Deployment: `next.config.mjs` uses `output: 'standalone'`. `npm run build` emits
  `.next/standalone/server.js`. A multi-stage `Dockerfile` and `DEPLOYMENT.md` cover Node/Hostinger
  and Docker. The Studio route bundle is large (~1.4MB) by nature — that's expected, not a
  regression.
