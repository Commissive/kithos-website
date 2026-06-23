# Kithos Brand Kit

Volume 01 · 2026

---

## What's in this kit

**`kithos-brand-kit.pdf`** — the seven-page brand specification.
Read this first. Everything below follows the rules in there.

**`mark/`** — the mark on its own. Use for tight contexts (avatars, badges, favicons).
- `mark-primary` — forest on transparent. The default.
- `mark-inverse` — bone on transparent. For dark surfaces.
- `mark-mono` — ink on transparent. For single-colour print.
- `mark-two-tone` — forest pentagons + terracotta squares. Decorative only.

**`wordmark/`** — wordmark on its own (Fraunces, outlined to paths). Use only when the mark is already established nearby.
- `wordmark-forest` — default.
- `wordmark-bone` — for dark surfaces.
- `wordmark-ink` — for single-colour print.

**`lockup/`** — mark + wordmark together. Use this most of the time.
- `lockup-horizontal-*` — mark left, wordmark right, gap = 1u (one square side).
- `lockup-stacked-*` — mark above, wordmark below, shared vertical axis. Use for narrow surfaces and vertical layouts.

**`icons/`** — packaged icons for specific contexts.
- `app-icon/` — iOS / Android app icon at 1024, 512, 256, 180, 128, 64. Rounded-square container, bone mark on forest.
- `favicon/` — browser favicon at 16, 32, 48, 64, 180.
- `social/` — square and circular social avatars at 1080 and 400.

## The rules in one paragraph

The mark is forest. The wordmark is Fraunces, outlined to paths, never re-set. The two go together at 1u (the side of one square in the mark) apart. Keep 1u of clear space around any lockup. Don't recolour, rotate, stretch, add effects, or place in a container. Terracotta is the accent — links, CTAs, callouts. Ink is for type and hairlines. Bone holds the page. See `kithos-brand-kit.pdf` for everything else.

## File formats

- **SVG** — vector source. Use for web, print, anything that scales. Open in any browser, Figma, Illustrator.
- **PNG** — raster. Use when SVG isn't supported. Pre-rendered at common sizes; for arbitrary sizes, re-export from the SVG.

## Colour values (quick reference)

| Name       | Hex      | RGB                 | OKLCH                       | Role        |
|------------|----------|---------------------|-----------------------------|-------------|
| Forest     | #1F3A2F  | rgb(31, 58, 47)     | oklch(0.323 0.039 166.1)    | Primary     |
| Terracotta | #B05B3B  | rgb(176, 91, 59)    | oklch(0.566 0.120 40.9)     | Accent      |
| Ink        | #1E1A17  | rgb(30, 26, 23)     | oklch(0.221 0.009 59.2)     | Structure   |
| Bone       | #F5EFE2  | rgb(245, 239, 226)  | oklch(0.953 0.018 86.1)     | Background  |

## Typefaces

- **Fraunces** (variable) — wordmark only. Axes: opsz 144, wght 600, SOFT 30, WONK 1. Letter-spacing −25/1000 em. In production, outlined to paths.
- **Hanken Grotesk** — the web type system. Headlines, body, UI, labels, and eyebrows. Weights 400 (display + prose) and 500 (labels, buttons). Loaded via Next.js in `src/app/layout.tsx`.

Schibsted Grotesk and IBM Plex Mono were retired from the web implementation — display hierarchy is size and tracking on Hanken, not a second face.

## Responsive tokens

The `tokens/` folder ships a **mobile-first** CSS variable system:

```css
@import "kithos-brand-kit/tokens/index.css";
```

- **Spacing** — 1u = 16px scale with 5u/7.5u rhythm extensions and composed aliases (gutter, touch target, nav pad).
- **Type** — fluid `clamp()` on marketing tiers; fixed body size; fluid UI scale.
- **Layout** — page shell, section rhythm, copy measures, nav shell, and control sizing with `md` / `lg` breakpoint steps.
- **Breakpoints** — `--bp-sm` through `--bp-2xl` for JS; use literal `rem` in `@media`.

See [`tokens/README.md`](./tokens/README.md) for the full reference.

---

Questions, additions, or corrections? Don't modify the assets — re-issue the kit.

Kithos · 2026


## Icons

A 48-icon system across two sets, both built on the same 24-grid with the same hand.

**Rules:** 24×24 viewBox · 1.5px stroke · round caps and joins · 2u inset (artwork in 20×20 safe area) · `currentColor` for stroke so icons inherit color from context · outline style (no fill) by default.

**Core set (24)** — foundational UI vocabulary:
- **UI** — search, settings, notification, user, more, add
- **Navigation** — home, accounts, pipeline, signal, briefing, agent
- **Actions** — send, edit, share, refresh, link, check
- **Status** — info, warning, error, success, loading, help

**Product set (24)** — app-specific entities and views:
- **Entities** — deal, meeting, call, email, note, task
- **Views** — list, grid, kanban, calendar, clock, bookmark
- **Sales** — target, champion, forecast, territory, intent, competitor
- **Data** — filter, sort, export, import, archive, pin

The `agent` icon uses the mark's cross-gutter motif directly. The `signal` icon echoes radiating arcs from a center dot. Brand-specific icons (agent, signal, target, intent, champion) leverage the mark's geometric DNA where possible.

All 48 individual icons live at `icons/ui/*.svg`. Drop them in directly — they inherit color through CSS:

```css
.icon { width: 24px; height: 24px; color: var(--forest); }
.icon-link:hover { color: var(--terracotta-hover); }
```

## Illustrations

Twenty-one line drawings following one strict discipline: outline only,
single stroke weight (7px on 1200×1200), 2–4 shapes per piece, recognizable
subjects resolved from the simplest possible primitives. Generous negative
space is the largest element in every composition. Terracotta appears on
nine of the twenty-one as stroke color — sun, sail, flame, what is held,
where a path leads — used where warmth naturally fits the subject.

The full set spans nature (sun on horizon, mountain, tree, moon, sprout),
sky (birds, kite), domestic objects (cup, candle, lantern, vessel, key),
architecture (archway, window, doorway, threshold), vessels and journey
(sailboat, anchor, path, flag), and gesture (hand offering).

Full standalone SVGs in [`illustrations/`](./illustrations/), brand kit
page 14. See [`illustrations/README.md`](./illustrations/README.md) for the
full file list and rules for extending the set. The discipline is the
system — any new illustration follows the same rules.

## Explainers

Eight illustrated concepts for landing pages and product tours, each built as a
production-ready responsive SVG. The full standalone files live in
[`explainers/`](./explainers/) — drop them into any HTML, React, or marketing
surface and they'll scale cleanly from card-sized previews to full-width hero
panels (each is `viewBox="0 0 1600 800"`, 2:1 ratio, transparent background).

Each illustration earns its composition from the concept it carries — not the
other way around. The set deliberately uses eight different compositional
metaphors so the family reads as varied rather than templated:

| # | Concept | Composition |
|---|---------|-------------|
| 01 | Sell with confidence              | Asymmetric focus — many possibilities, one decided |
| 02 | See where revenue is likely       | Topological landscape — height = likelihood |
| 03 | Sales, with less friction         | Radial, smooth bezier flow through your tools |
| 04 | Move the right deals forward      | Before/after — scattered fragments unified with momentum |
| 05 | Build the playbook as you sell    | Cyclic loop driving an accumulating stack |
| 06 | Tools, insights, confidence       | Diagonal trajectory with milestone markers |
| 07 | Get your reps in                  | Hub-and-spoke, new arrival highlighted |
| 08 | Scattered to self-improving       | Chaos vs. concentric iterations sharpening |

See [`explainers/README.md`](./explainers/README.md) for full usage docs, the
internal CSS class reference (so you can theme them site-wide), and notes on
each composition. The brand-kit PDF (page 15) shows the catalog at a glance.

These supersede the earlier three feature explainers (Research, Signal, Target
Universe). If you want those three rebuilt in the new style as well, the
patterns established here translate directly.
