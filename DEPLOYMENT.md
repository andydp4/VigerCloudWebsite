# Deployment & Packaging (Brief 08)

This app is a standard **Next.js (App Router)** server app plus an embedded **Sanity Studio** at
`/studio`. It builds to a self-contained server via `output: 'standalone'`, so it runs on any Node
host (Hostinger, a container platform, etc.).

> Production launch is gated. Do **not** point production DNS/mail or enable live lead delivery
> until the Staging Gate sign-off (Brief 08) and the blocked items in `DECISIONS.md` are confirmed.

## Build artifacts

```bash
npm ci          # clean install from package-lock.json
npm run build   # produces .next/ incl. .next/standalone/server.js
```

`npm run build` runs lint + type-check + prerender. A successful build is the release gate.

## Run in production

### Option A — Node (Hostinger Node.js app / any Node host)

Hostinger's "Node.js app" runs a start command and provides `PORT`. Next reads `PORT`.

- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm run start` (i.e. `next start`, honours `PORT`)

If using the standalone bundle directly (smaller footprint), copy `.next/standalone`,
`.next/static` and `public/` to the server and run `node server.js`.

### Option B — Docker (portable)

```bash
docker build -t viger-cloud-website .
docker run -p 3000:3000 --env-file .env.production viger-cloud-website
```

The included `Dockerfile` is multi-stage and ships only the standalone server.

## Environment variables

Set these on the host (never commit real values). See `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, sitemap, robots. No trailing slash. |
| `NEXT_PUBLIC_APP_ENV` | yes | `staging` or `production`. Only `production` allows search indexing. |
| `LEAD_DELIVERY_MODE` | yes | Keep `test` until Staging Gate; `live` requires a provider (not yet implemented). |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | for CMS | Enables `/studio` and CMS-backed content. Without it, built-in fallback content is used. |
| `NEXT_PUBLIC_SANITY_DATASET` | for CMS | e.g. `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | optional | Defaults to `2024-10-01`. |
| `SANITY_API_READ_TOKEN` | optional | Server-only token for drafts/preview. Never expose. |

## Connecting Sanity (Brief 07)

1. Create a project at [sanity.io](https://www.sanity.io/) (needs a Sanity account — currently a
   blocked item, see `DECISIONS.md`).
2. Add its project id + dataset to the environment variables above.
3. Redeploy. Visit `/studio`, sign in, and populate content. Until the dataset has content, the
   site continues to use built-in fallback data, so there is never a blank page.
4. Schemas live in `src/sanity/schemaTypes/`; the content access seam is `src/lib/content.ts`.

## Staging → production checklist (Brief 08)

Before staging deploy:
- [ ] `npm run build` passes (lint + types + prerender).
- [ ] `npm test` passes.
- [ ] Confirm DNS/mail impact for the target domain before pointing records.
- [ ] `NEXT_PUBLIC_APP_ENV=staging` so staging is no-indexed (verify `robots.txt` disallows all).

Before production:
- [ ] Blocked items in `DECISIONS.md` are confirmed (legal entity, pricing, inbox destinations,
      providers, brand assets, domains).
- [ ] No placeholder/blocked content remains on public pages.
- [ ] Lead delivery provider configured and `LEAD_DELIVERY_MODE=live` verified in staging first.
- [ ] Staging sign-off recorded.

## Rollback

- Node host: redeploy the previous released commit/tag, or keep the prior `.next/standalone` bundle
  and restart against it.
- Docker: `docker run` the previous image tag.
- No destructive DB migrations exist (content lives in Sanity; the app holds no database).
