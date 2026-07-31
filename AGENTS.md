# AGENTS.md

## Project overview

VigerCloud marketing website — a single-page app built with Vite + React + TypeScript. The one
user-facing service is the frontend dev server. There is no backend or database; the waitlist form
is handled entirely client-side (submitting shows a confirmation state).

## Commands

Standard scripts are defined in `package.json` (`dev`, `build`, `preview`, `lint`, `test`,
`test:watch`). See `README.md` for the full table. Lint runs ESLint, tests run Vitest (jsdom), and
`build` runs `tsc` (type-check, `noEmit`) followed by `vite build`.

## Cursor Cloud specific instructions

- Start the app with `npm run dev`; it serves on port `5173` (configured with `host: true` in
  `vite.config.ts`, so it also binds on the network interface). The dev server is long-running —
  start it in a background/tmux session, not a blocking foreground call.
- Verify quickly without a browser: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/`
  should return `200`.
- `npm run build` does a real type-check first (`tsc`). A type error will fail the build even if the
  bundle would otherwise succeed, so run `npm run build` (not just `vite build`) to catch type
  regressions.
- The project uses classic ESLint config (`.eslintrc.cjs`) with ESLint 8, not the newer flat config.
- Testable logic is intentionally split into pure functions under `src/lib/` (e.g. `validation.ts`)
  so it can be unit-tested without rendering React; component behavior is covered with Testing
  Library under `src/components/`.
