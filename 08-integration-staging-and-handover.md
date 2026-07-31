# Brief 08 — Integration, Staging and Handover

## Goal
Merge the parallel work into a verified staging release and prepare a safe handover/launch package.

## Scope
- Integrate workstreams, resolve design/content conflicts and run full user journeys.
- Deploy to Hostinger staging only after domain/DNS/mail-impact checks.
- Verify forms, analytics, consent, SEO, performance, responsive layouts, keyboard flows, reduced motion, error pages and security controls.
- Produce Hostinger deployment, rollback, environment-variable, content-admin and operational guides.

## Acceptance checks
- Build, lint, type checks, unit/integration tests and browser acceptance tests pass.
- No placeholder content/assets, exposed secrets, broken links or unverified external routes remain.
- A staging sign-off records known assumptions and production launch actions; production is not changed without approval.
