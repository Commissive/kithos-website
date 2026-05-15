# How It Works — Remotion Clips

**Date:** 2026-05-15
**Status:** Approved (design), pending implementation plan

## Goal

Replace the static prose-only "How it works" cards (`src/app/page.tsx`,
`HowItWorks`) with four short editorial-precise motion clips, one per card,
that *demonstrate* each verb (focus / move / learn / improve) rather than
only describing it. Premium via restraint and a shared visual grammar.

## Decisions (locked)

- **Visual direction:** Editorial-precise — type-led, hairline geometry,
  ink + single accent-yellow resolution moment per clip. Stripe Sigma / FT
  charts / Linear changelog school. On-brand with the existing hero
  backdrop and hex mark.
- **Delivery:** Author in Remotion; render once at build time to WebM with
  an MP4 fallback. No Remotion JS shipped to the browser. Served from
  `/public` via `<video autoplay muted loop=false playsinline>`.
- **Why Remotion (not CSS):** deterministic frame-authored timing and fast
  iteration. The shared source *could* be re-cut for OG/decks later, but the
  captions are page-specific — treat reuse as a possible perk, not a
  workflow that shapes implementation.

## Motion grammar (all four clips obey this)

- Surface: transparent — the card's `--tint-*` shows through.
- Palette: `--ink` primary marks, `--ink-soft` secondary, `--accent`
  (#F4D916) used exactly once per clip, late, as the resolution moment.
- Geometry: 1.2px stroke, miter joins; vertices are 4px crosshairs, never
  dots. Hex motif (from the brand mark) recurs literally in clip 01
  (reticle) and as framing geometry in clip 04.
- In-clip type: mono caption only — 11px, tracking 0.1em, uppercase
  (matches the `--text-meta` token). No body text inside the video.
- Duration: 5.0s. Beat map: 0.0–1.2s setup · 1.2–3.4s transformation ·
  3.4–4.4s resolution (accent appears) · 4.4–5.0s hold.
- Easing: cubic-bezier(0.7, 0, 0.2, 1). No springs/bounce.
- Loop: play once on IntersectionObserver (threshold 0.4), hold final
  frame. No `loop`.
- Theme: render light + dark variants per clip (8 renders total). The site
  now themes **purely from OS `prefers-color-scheme`** via CSS media queries
  in `globals.css` (the manual toggle, `theme-init.js`, and localStorage
  persistence were removed). Clip theme therefore swaps with a plain
  `<source media="(prefers-color-scheme: dark)">` (and a matching `<img>`
  `srcset` for the reduced-motion poster) — no client JS or observer
  required. Live OS theme changes are handled by the browser for free.
- Reduced motion: `prefers-reduced-motion: reduce` → render the held final
  frame as a static poster `<img>`; no `<video>` mounted.
- Layout: 16:9, full card width, above the `01` numeral. New card vertical
  rhythm: clip → number+rule → headline → lead → body.

## The four clips

**01 · Focus the team.** (tint: mint) — ~14 faint account ticks scatter; 11
dim and shrink; a hex reticle converges and locks onto 3 marks that snap to
`--ink` with crosshairs. Accent ring + caption `FOCUS · 3 OF 7 IN SCOPE`.

**02 · Move the right deals forward.** (tint: peach) — account node (left),
goal marker (right). Three context fragments (`signal · objection · prior`)
fly in and dock into a connecting polyline drawing toward the goal; the
final next-move segment fires in accent. Caption `NEXT MOVE: INTRO + PROOF`.

**03 · Make learning travel.** (tint: sky) — one filled outcome mark in a
6-node account constellation; a line radiates node to node, each lighting
and staying lit; a 7th new-hire node fades in last and inherits the trace
via an accent link. Caption `MEMORY: SHARED ACROSS 7`.

**04 · Build a motion that improves.** (tint: sand) — five input ticks
(`account · meeting · objection · win · loss`) feed a cycle; the loop ring
contracts ×3 across revolutions while a step-bar climbs; the tightest pass
emits one sharpened next-move vector in accent. Caption
`MOTION v.04 · SHARPER`.

## Architecture / units

- **Remotion project** — isolated under `remotion/` at repo root (own
  `package.json` / Remotion deps so the Next app bundle stays clean).
  - `remotion/src/Root.tsx` — registers 4 compositions, each taking a
    `theme: "light" | "dark"` input prop; the render script renders each
    composition twice (once per theme) for the 8 outputs.
  - `remotion/src/theme.ts` — single source of the token values (ink,
    ink-soft, accent, per-clip tint) for light + dark, mirrored from
    `globals.css`. One module so a token change is one edit.
  - `remotion/src/grammar/` — shared primitives: `Mark`, `Crosshair`,
    `HexReticle`, `MonoCaption`, `useBeat()` (maps frame → setup /
    transform / resolve / hold), shared easing constant.
  - `remotion/src/clips/{Focus,Move,Travel,Improve}.tsx` — one file per
    clip, composes grammar primitives. Each understandable in isolation.
- **Render pipeline** — `remotion/render.mjs` (or npm script) renders all
  variants to `public/howitworks/{focus,move,travel,improve}-{light,dark}.{webm,mp4}`
  plus `-{light,dark}.poster.png` (final-frame stills for reduced-motion).
- **Site integration** — new `src/app/howitworks-clip.tsx` client component:
  IntersectionObserver-gated `<video>` with themed `<source>`s, poster img,
  and a `prefers-reduced-motion` branch that renders only the poster. Pure
  presentational — input is a clip id, no other deps. `HowItWorks` in
  `page.tsx` maps each feature to `<HowItWorksClip id=… />` above the
  numeral; prose unchanged.

## Data flow

`theme.ts` tokens → grammar primitives → clip composition → Remotion CLI
render (build/manual) → static files in `/public` → `<HowItWorksClip>`
selects file by id + theme + motion preference → `<video>`/`<img>`.

No runtime data. Render is an explicit step (manual script now; can be
wired into `build` later — out of scope for v1).

## Error handling / edge cases

- Video fails to load → poster `<img>` is the natural fallback (set as
  `<video poster>` and as a `<noscript>`/error fallback).
- Reduced motion → poster only, no network cost for video.
- Theme with no JS → `prefers-color-scheme` media on `<source>` handles it
  without client JS.
- Off-screen cards → IntersectionObserver defers play; nothing autoplays
  above the fold cost.

## Implementation risks (resolve in the plan)

- **Codec vs hairline strokes.** 1.2px miter strokes on flat tinted
  backgrounds are a worst case for VP9/H.264 (ringing, edge blur). Render at
  2× the display box (target ~1920×1080 for a ~640px card slot) and budget a
  high bitrate. The ≤80 KB/clip target is optimistic — treat ≤200 KB/clip as
  the real ceiling and re-evaluate after the first render. If quality can't
  hold, the escape hatch is inline SVG/Lottie (vector-sharp, theme-reactive)
  — a fallback, not the plan.
- **Remotion vs React 19.2 / Next 16.** Verify the current Remotion release
  supports React 19.2 before installing. The isolated `remotion/` package
  may pin its own React (18 if needed) — the plan must state the version
  explicitly rather than assume.

## Testing

- Visual: render all 8 clips, eyeball against the grammar (timing beats,
  single accent moment, hold frame) in both themes.
- Integration: dev server, scroll to `#how`, confirm each clip plays once
  on entry, holds, respects `prefers-reduced-motion` and dark mode (manual
  — this is presentational marketing UI; no unit suite added).
- Perf: confirm zero Remotion JS in the Next bundle; each clip ≤ ~80 KB.

## Out of scope (v1)

- Wiring render into CI/`build` (manual script for now).
- Repurposing clips for OG/social/decks (enabled by this design, separate
  work).
- Any change to the card prose or the other homepage sections.
