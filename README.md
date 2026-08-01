# Viger Cloud Website

Marketing website for **Viger Cloud** and its flagship product **Arcarna**, built with
[Next.js](https://nextjs.org/) (App Router) and TypeScript.

> Build briefs live in [`briefs/`](./briefs/). This app implements those briefs. See
> [`DECISIONS.md`](./DECISIONS.md) for confirmed/assumption/blocked status of open questions and
> [`CONTENT.md`](./CONTENT.md) for how content is structured and edited.

## Requirements

- Node.js 18.18+ (developed against Node 22)
- npm 10+

## Getting started

```bash
npm install                 # install dependencies
cp .env.example .env.local  # optional: adjust local config (no secrets required)
npm run dev                 # start the dev server at http://localhost:3000
```

## Scripts

| Command             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Start the Next.js dev server on **port 3000**.          |
| `npm run build`     | Production build (lints + type-checks + prerenders).    |
| `npm run start`     | Serve the production build.                             |
| `npm run lint`      | Run `next lint` (ESLint).                               |
| `npm run typecheck` | Type-check with `tsc --noEmit`.                         |
| `npm test`          | Run the Vitest unit/component/route suite.              |
| `npm run test:watch`| Run Vitest in watch mode.                               |

## What's implemented (by brief)

- **01 Foundation** — Next.js App Router shell, responsive nav + mobile menu, footer, skip link,
  focus styles, reduced-motion support, strict env validation (`src/lib/env.ts`), security headers
  (`next.config.mjs`), error/404 pages.
- **02 Brand & content** — Two non-mixable brand token sets (`viger`, `arcarna`) scoped by
  `[data-brand]`; typed content models in `src/content/**` with `sourceStatus` on every claim.
- **03 Corporate site** — Home, About, Products, Partners, Contact + statutory footer.
- **04 Arcarna** — Scroll-driven product story with targeted motion and a fully-functional
  reduced-motion version (same DOM).
- **05 Pricing & leads** — Solo/Team/Growth/Scale plans, monthly/annual toggle, comparison table,
  and accessible lead forms validated on client and server (`/api/lead`), **test mode** only.
- **06 Compliance & SEO** — Legal templates, canonical metadata, `sitemap.xml`, `robots.txt`
  (staging/system no-indexed), consent-aware analytics interface.
- **07 Content admin** — **Sanity** Studio embedded at `/studio`, schemas mirroring the content
  models, read through `src/lib/content.ts`. **Optional**: without a project id the site uses
  built-in fallback content and `/studio` shows a setup notice.
- **08 Packaging** — `output: 'standalone'`, multi-stage `Dockerfile`, and `DEPLOYMENT.md` for
  Node/Hostinger/Docker deploys.

### Content editing & CMS

Content lives as typed data in `src/content/**` and is served via `src/lib/content.ts`. Connect a
Sanity project (set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`) to edit it in the
Studio at `/studio`. See [`CONTENT.md`](./CONTENT.md) and [`DEPLOYMENT.md`](./DEPLOYMENT.md).

### Deferred (see `DECISIONS.md`)

- Actual Hostinger staging/production **deploy** (needs confirmed domains + provider access).
- Migrating comparison rows / Arcarna scenes into Sanity (still edited in `src/content/**`).

## Important

Company details, pricing figures, legal wording, contact destinations and brand assets are
**placeholders** pending confirmation. They are visibly labelled on the site and tracked in
`DECISIONS.md`. Do not treat them as final. Never commit secrets — configure providers via
environment variables.

## Project structure

```
src/
  app/            App Router routes, API route, /studio, sitemap/robots, error pages
  components/     Header, footer, chrome, lead form, pricing table, reveal, badges
  content/        Typed content models + local fallback data (Brief 02)
  lib/            env, metadata, lead schema, analytics, content accessor (CMS+fallback)
  sanity/         Sanity env, client, schemas, desk structure (Brief 07)
  styles/         Global tokens + component/form/arcarna/pricing CSS
  test/           Test setup
sanity.config.ts  Embedded Studio config
Dockerfile        Standalone container image (Brief 08)
briefs/           The source build briefs
```
