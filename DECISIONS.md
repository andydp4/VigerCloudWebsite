# Decision Log & Open Questions (Brief 00)

This log tracks decisions and unknowns. Every item is **confirmed**, **assumption**, or **blocked**.
Nothing marked *blocked* or *placeholder* may be published as final. No one should invent legal
copy, credentials, pricing entitlements, or final logo files.

## Confirmed

| # | Decision | Notes |
|---|----------|-------|
| C1 | Framework: **Next.js (App Router) + TypeScript** | Mandated by Brief 01. |
| C2 | Package manager: **npm** | No pre-existing lockfile; npm chosen for ubiquity. |
| C3 | Lead delivery stays in **test mode** until Staging Gate | No CRM/email until approved (Brief 05). |
| C4 | Two non-mixable brand token sets (`viger`, `arcarna`) | Scoped via `[data-brand]` (Brief 02). |
| C5 | Prices displayed **exclude VAT** | Wording present site-wide (Brief 05). |
| C6 | CMS: **Sanity** (embedded Studio at `/studio`) | Brief 07 preferred. Optional with local fallback via `src/lib/content.ts`. |
| C7 | Deployment: **Next.js standalone** output + Docker | Portable Node hosting incl. Hostinger (Brief 08). |
| C8 | Lead/contact enquiries email to **support@vigercloud.com** | Confirmed. Sent via SMTP in `live` mode (`src/lib/email.ts`). |

## Assumptions (safe to proceed, confirm before launch)

| # | Assumption | Owner |
|---|-----------|-------|
| A1 | Sitemap/route structure: Home, About, Products, Arcarna, Pricing, Partners, Contact, Legal | Content |
| A2 | Contact routes: trial, demo, general, pricing, partner, support, press, privacy | Content |
| A3 | Arcarna is the flagship; other products are clearly non-GA | Product |
| A4 | Consent-gated analytics; no analytics before consent | Compliance |

## Blocked (needs confirmed input)

| # | Blocked item | Needed from |
|---|--------------|-------------|
| B1 | Registered legal name, company number, address, VAT treatment | Legal/Finance |
| B2 | Approved page copy and product claims | Marketing |
| B3 | Final pricing figures and plan entitlements | Product/Finance |
| B4 | ~~Contact/privacy inbox destinations~~ → confirmed as support@vigercloud.com (C8). Per-route inboxes (partners@/press@/privacy@) optional later. | Operations |
| B4b | SMTP credentials for support@vigercloud.com (to actually send in live mode) | Operations (set as env vars, never in source) |
| B5 | CRM / email / booking / analytics providers + credentials | Operations (add as secrets, never in source) |
| B6 | Original brand assets, fonts, final logo files | Brand |
| B7 | Legal document wording (privacy ×2, cookies, terms, accessibility, security) | Legal |
| B8 | Domains + DNS/mail impact for `staging.vigercloud.com` / `vigercloud.com` | Operations |
| B9 | Cookie approach and target domains for consent | Compliance |

## Brief ownership & file boundaries

| Brief | Status in this repo | Primary paths |
|-------|--------------------|---------------|
| 01 Foundation | Implemented | `src/app/layout.tsx`, `next.config.mjs`, `src/lib/env.ts`, `src/styles/` |
| 02 Brand/content | Implemented | `src/styles/globals.css`, `src/content/**` |
| 03 Corporate site | Implemented | `src/app/(page routes)`, `src/components/Site*` |
| 04 Arcarna | Implemented | `src/app/arcarna`, `src/components/Reveal.tsx`, `src/styles/arcarna.css` |
| 05 Pricing/leads | Implemented (test mode) | `src/app/pricing`, `src/components/PricingTable.tsx`, `src/components/LeadForm.tsx`, `src/app/api/lead` |
| 06 Compliance/SEO | Implemented (templates) | `src/app/legal`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/metadata.ts`, `src/lib/analytics.ts` |
| 07 Content admin | Implemented (Sanity, optional + fallback) | `src/sanity/**`, `src/lib/content.ts`, `sanity.config.ts`, `CONTENT.md` |
| 08 Integration/handover | Packaging implemented; deploy pending | `next.config.mjs`, `Dockerfile`, `DEPLOYMENT.md` |

## Implemented since first release

- **Brief 07:** Sanity Studio embedded at `/studio` with schemas mirroring the content models. The
  CMS is **optional**: without a project id the site uses built-in fallback content and the studio
  shows a setup notice. Content is read through a single seam (`src/lib/content.ts`) so migrating
  fields to the CMS never touches pages. Prices remain structured data, never free text.
- **Brief 08 (packaging):** `output: 'standalone'`, a multi-stage `Dockerfile`, and `DEPLOYMENT.md`
  (Hostinger + Docker, env vars, staging→prod checklist, rollback).

## Still deferred / blocked

- **Sanity project creation** needs a Sanity account + project id/token (extends B5). Until then the
  site runs on fallback content — no blank pages.
- **Brief 08 (deploy):** actual Hostinger staging/production deploy, DNS/mail checks and launch
  require confirmed domains and provider access (B5, B8) and Staging Gate sign-off.
- Comparison-table rows and Arcarna narrative scenes remain in `src/content/**` for now (not yet
  modelled in Sanity); documented in `CONTENT.md`.
