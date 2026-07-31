# VigerCloudWebsite

Marketing website for **VigerCloud**, built with [Vite](https://vitejs.dev/), React, and
TypeScript. The landing page showcases the product and lets visitors request early access via a
waitlist signup form.

## Requirements

- Node.js 20+ (developed against Node 22)
- npm 10+

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:5173
```

## Available scripts

| Command          | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `npm run dev`    | Start the Vite dev server (hot reload) on port 5173.   |
| `npm run build`  | Type-check with `tsc` and build the production bundle. |
| `npm run preview`| Preview the production build locally.                  |
| `npm run lint`   | Run ESLint over the project.                           |
| `npm test`       | Run the Vitest unit/component test suite once.         |
| `npm run test:watch` | Run Vitest in watch mode.                          |

## Project structure

```
src/
  components/       React components (e.g. WaitlistForm)
  lib/              Pure, unit-tested logic (e.g. form validation)
  test/             Test setup (jest-dom matchers)
  App.tsx           Landing page composition
  main.tsx          App entry point
```
