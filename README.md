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

### Deferred (see `DECISIONS.md`)

- **07 (full):** Sanity CMS. First release uses typed content modules; prices are always structured.
- **08:** Hostinger staging/production deployment (needs confirmed domains + provider access).

## Important

Company details, pricing figures, legal wording, contact destinations and brand assets are
**placeholders** pending confirmation. They are visibly labelled on the site and tracked in
`DECISIONS.md`. Do not treat them as final. Never commit secrets — configure providers via
environment variables.

## Project structure

```
src/
  app/            App Router routes, API route, sitemap/robots, error pages
  components/     Header, footer, lead form, pricing table, reveal, badges
  content/        Typed content models + data (Brief 02/07)
  lib/            env validation, metadata, lead schema, analytics
  styles/         Global tokens + component/form/arcarna/pricing CSS
  test/           Test setup
briefs/           The source build briefs
```
