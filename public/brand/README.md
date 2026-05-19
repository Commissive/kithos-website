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
- **Hanken Grotesk** — body, UI, headlines. Weights 400, 500, 600, 700.
- **IBM Plex Mono** — data, technical labels, all-caps callouts. Weights 400, 500.

---

Questions, additions, or corrections? Don't modify the assets — re-issue the kit.

Kithos · 2026
