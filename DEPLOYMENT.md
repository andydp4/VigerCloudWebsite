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

If using the standalone bundle directly (smaller footprint), copy `.next/standalone`, then
`.next/static` into `.next/standalone/.next/static` (and `public/` into `.next/standalone/public`
if a `public/` folder exists), and run `PORT=<port> HOSTNAME=0.0.0.0 node server.js`.

#### Hostinger quickstart (hPanel)

Prerequisite: the code must be on the branch Hostinger pulls. Either merge PR #1 into `main`, or
point the deploy at the feature branch.

Path 1 — hPanel "Setup Node.js App" (or Git deploy):
1. hPanel → Website → **Node.js** (or **Git**). Connect the GitHub repo/branch.
2. Application root: repo root. Node version: 18+.
3. Install command `npm ci`, build command `npm run build`, start command `npm run start`.
4. Add the environment variables below (hPanel → Node.js app → Environment variables).
5. Deploy, then open the app URL.

Path 2 — Hostinger VPS (SSH):
```bash
git clone <repo> && cd VigerCloudWebsite && git checkout <branch>
npm ci && npm run build
# create a local env file (.env) with the variables below, then:
PORT=3000 HOSTNAME=0.0.0.0 npm run start      # or run under pm2 / systemd
```
(Or use the Docker option below on a VPS.)

After deploy:
- Add your live domain(s) to Sanity CORS origins (see the CORS section) — e.g.
  `https://yourdomain` with **Allow credentials** on — or the Studio at `/studio` won't log in.
- Set `NEXT_PUBLIC_SITE_URL` to the live URL and set `NEXT_PUBLIC_APP_ENV` to the live value (see
  the environment-variables table) so the site is indexable and canonical URLs/sitemap are correct.

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
| `LEAD_DELIVERY_MODE` | yes | `test` = log only (no email). `live` = email enquiries to the support inbox via SMTP. |
| `LEAD_NOTIFICATION_EMAIL` | live only | Recipient for enquiries. Defaults to `support@vigercloud.com`. |
| `LEAD_FROM_EMAIL` | live only | Sender address (defaults to `SMTP_USER`). Must be allowed by your SMTP provider. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | live only | SMTP server (e.g. `smtp.hostinger.com` / `465` / `true`). |
| `SMTP_USER` / `SMTP_PASS` | live only | SMTP mailbox credentials (e.g. the `support@vigercloud.com` mailbox). |
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
5. **Private datasets (Sanity default):** set `SANITY_API_READ_TOKEN` in the runtime environment so
   the server can read published content. Without it, a private dataset returns nothing and the site
   falls back to built-in content. Alternatively make the dataset public
   (`npx sanity dataset visibility set <dataset> public`) — published marketing content is public
   anyway — and no token is needed.
6. **Seed initial content:** with a write token in `SANITY_API_WRITE_TOKEN`, run
   `node scripts/seed-sanity.mjs` to (re)create the baseline placeholder documents. It is idempotent
   (stable ids + createOrReplace).
7. **Freshness (ISR):** content-driven pages use `export const revalidate = 60`, so Studio edits
   appear within ~60s on the live site without a redeploy. Add a Sanity webhook to
   on-demand-revalidate if you need instant updates.

### CORS origins (required for the Studio to log in / load / save)

The Studio runs in the browser and calls the Sanity API, so each origin it runs from must be
allow-listed on the project. An origin is `scheme://host[:port]` — **no path, no trailing slash**
(e.g. `http://localhost:3000`, `https://vigercloud.com`, `https://staging.vigercloud.com`).

- Dashboard: https://www.sanity.io/manage → your project → **API → CORS origins → Add CORS origin**
  → enter the origin, tick **Allow credentials**, Save. Repeat per environment.
- CLI (after `npx sanity login`): `npx sanity cors add http://localhost:3000 --credentials`
  (list/remove with `npx sanity cors list` / `npx sanity cors delete <origin>`).

"Allow credentials" must be on because the Studio sends your auth session (and read token, if used).
CORS only permits browser requests; it does not itself grant data access.

## Lead / contact email delivery (Brief 05)

Contact and lead enquiries are emailed to `support@vigercloud.com` when `LEAD_DELIVERY_MODE=live`.
Delivery uses SMTP (Nodemailer), so it works with Hostinger's own email or any SMTP provider.

To enable on the live site:
1. Ensure the `support@vigercloud.com` mailbox exists (Hostinger email) and note its password, or
   create a mailbox/API user with your email provider.
2. Set the env vars: `LEAD_DELIVERY_MODE=live`, `SMTP_HOST` (Hostinger: `smtp.hostinger.com`),
   `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER=support@vigercloud.com`, `SMTP_PASS=<password>`.
   Optionally `LEAD_NOTIFICATION_EMAIL` (defaults to `support@vigercloud.com`) and `LEAD_FROM_EMAIL`.
3. Redeploy/restart. Submit the contact form; the email arrives at the support inbox with the
   enquirer set as **reply-to**, so support can reply directly.

If SMTP is missing/misconfigured in live mode, the API returns a 502 and the form shows a friendly
error (no enquiry is silently lost). Keep `test` mode anywhere you don't want real email sent.

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
