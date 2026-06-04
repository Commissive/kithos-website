# Kithos website

Marketing site for **Kithos** — the commercial reasoning system for B2B teams
selling into complex buying environments. Built with the Next.js App Router,
React 19, Tailwind CSS v4, and GSAP for scroll-driven motion.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS v4
- **Animation:** GSAP + `@gsap/react` (`useGSAP`)
- **Testing:** Vitest + Testing Library (unit/component), Playwright (e2e,
  accessibility, visual regression)
- **Fonts:** Schibsted Grotesk, Hanken Grotesk, IBM Plex Mono via `next/font`

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The early-access form needs a backend to receive submissions. See
[`docs/early-access-setup.md`](docs/early-access-setup.md) for the full setup.

| Variable | Required | Description |
| --- | --- | --- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Yes (for the form) | Google Apps Script web-app URL that appends to the Sheet and emails a notification. |
| `EARLY_ACCESS_SHARED_SECRET` | Recommended | Shared secret verified by the Apps Script to reject spoofed posts. |

Without `GOOGLE_SHEETS_WEBHOOK_URL` the form returns a friendly error instead of
silently dropping submissions.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npm run test` | Run unit/component tests once (Vitest). |
| `npm run test:watch` | Vitest in watch mode. |
| `npm run test:e2e` | Run Playwright e2e + a11y + visual tests. |
| `npm run test:e2e:update` | Update Playwright visual snapshots. |
| `npm run optimize:images` | Recompress hero PNGs in `public/hero/`. |

## Project structure

```
src/app/            App Router routes, sections, and components
  api/early-access/ Route handler for the early-access form
  page.tsx          Home page composition
  layout.tsx        Root layout, metadata, JSON-LD, fonts
  *.tsx / *.css      Co-located sections (hero, problem, revenue path, …)
  *.test.tsx         Co-located unit/component tests
e2e/                Playwright specs (home, a11y, visual) + snapshots
public/             Static assets (favicons, OG images, hero imagery)
docs/               Setup and design docs
```

## Testing

```bash
npm run test         # unit/component
npm run test:e2e     # Playwright (starts its own dev server)
```

Visual snapshots live in `e2e/*-snapshots/`. After an intentional visual change,
regenerate them with `npm run test:e2e:update` and review the diff before
committing.

## CI

GitHub Actions runs lint, unit tests, production build, and Playwright e2e on
every push to `main`/`master` and on pull requests (`.github/workflows/ci.yml`).

## Deployment

Deploy on [Vercel](https://vercel.com). Set `GOOGLE_SHEETS_WEBHOOK_URL` and
`EARLY_ACCESS_SHARED_SECRET` in the project's environment variables, then push to
the production branch. Images are optimized at runtime by Next.js
(`next/image`), so no extra build step is required.
