# Kithos design tokens

Mobile-first responsive token system for web surfaces. Import the full bundle:

```css
@import "kithos-brand-kit/tokens/index.css";
```

Or import layers individually:

| File | Role |
|------|------|
| `breakpoints.css` | `--bp-sm` … `--bp-2xl` reference values for JS / `matchMedia` |
| `spacing.css` | 1u scale (4px–128px), composed aliases (`--space-gutter`, `--space-touch`) |
| `type.css` | Fluid display scale + body/data tiers + `.type-*` utility classes |
| `layout.css` | Page shell, section rhythm, measures, nav shell, controls, component spacing |
| `colors.css` | Brand palette (forest, terracotta, ink, snow, bone) |

## Breakpoints (mobile-first)

Use literal `rem` values in `@media` — custom properties cannot drive media conditions.

| Token | Value | Typical use |
|-------|-------|-------------|
| `--bp-sm` | 40rem | Landscape phones |
| `--bp-md` | 48rem | Tablets, two-column layouts |
| `--bp-lg` | 64rem | Laptops, 12-col grid |
| `--bp-xl` | 80rem | Desktops |
| `--bp-2xl` | 96rem | Large desktops |

```css
/* Base = mobile */
.card { padding: var(--space-1-5); }

@media (min-width: 48rem) {
  .card { padding: var(--space-2); }
}
```

## Spacing scale

Base unit **1u = 16px** (one mark square). Extended rhythm steps **5u (80px)** and **7.5u (120px)** support marketing section pacing.

Composed tokens:

- `--space-gutter` — 20px page inline gutter
- `--space-touch` — 44px minimum interactive height
- `--space-nav-pad` — 10px navigation vertical inset
- `--space-pill-pad` — 12px pill/badge padding

## Type scale

Display tiers (Schibsted) use **fluid `clamp()`** sizes on mobile, capping at Volume 01 desktop values:

- Display: 32px → 48px
- Section: 24px → 36px
- Rule: 20px → 32px
- Subhead: 17px → 22px

Body prose (`--text-body`) stays fixed at 15px; compact UI (`--text-ui`) scales fluidly to the same cap. Mono tiers (Plex) stay fixed.

Token aliases `--text-display-2` through `--text-display-5` remain for CSS variables; markup uses semantic `.type-*` classes.

### Composed type tokens

| Token | Role |
|-------|------|
| `--text-section-heading` | Section titles — `.type-statement` (fluid; `md` opens up) |
| `--text-subhead` | **Canonical subhead scale** (17px→22px, `2.5vw`) — `.type-subhead`, card titles |
| `--text-body` | Canonical prose size (15px) — `.body`, legal copy, card/FAQ prose |
| `--text-ui` | Compact UI — fluid **13px → 15px** (`2vw`); pills, buttons, nav/footer CTAs, meta, labels, form fields |
| `--text-section-support` | Baked into `.section-heading-support` → `var(--text-subhead)` |
| `--text-card-title` | Card titles (`.type-card-title`) → `var(--text-subhead)` |
| `--text-skip-link` | Skip navigation link (14px mono-body) |
| `--lh-ui`, `--track-ui` | Shared metrics for `.ui`, labels, form inputs, and `--control-font-size*` (buttons) |

**Hero exception:** headline size in `hero.css` uses grid-cell-relative `clamp()` (`--hero-type-hero-size`). Hero subhead uses `.section-heading-support` (same token as section support copy).

## Layout rhythm

Section padding defaults to **48px** edges on mobile, stepping to **80px** at `md` and **120px** at `lg`:

- `--section-header-pad-top` / `-bottom`
- `--section-pad-step-sm` / `-lg`
- `--page-gutter` (fluid `clamp` on ultra-wide), `--page-shell-max`, `--page-max`

### Copy & container measures

| Token | Role |
|-------|------|
| `--measure-prose` | Marketing body copy (52ch) |
| `--measure-legal` | Legal pages via `.page-grid-prose--legal` (65ch) |
| `--measure-cta` | Footer early-access band (`5 × --space-8`, +`--space-4` at `lg`) |
| `--measure-tagline` | Footer tagline (32ch) |
| `--modal-max-width` | Access modal cap (`min(36rem, viewport − gutters)`) |
| `--modal-viewport-max-h` | Modal/shell max height (`100svh` / `100dvh` − gap) |
| `--problem-meta-grid-cols` | Content-sized meta rail + fluid copy track |

## Component spacing

Responsive padding, margin, and gap tokens for recurring UI blocks. Mobile values are `:root` defaults; `md` (48rem) and `lg` (64rem) override in `layout.css`.

| Token group | Examples |
|-------------|----------|
| Section headings | `--section-heading-row-gap`, `--section-heading-col-gap` |
| Reasoning steps | `--reasoning-cards-gap`, `--reasoning-card-pad` |
| FAQ | `--faq-trigger-pad-block`, `--faq-answer-pad-bottom`, `--faq-contact-margin-top` |
| Access modal | `--modal-pad-*`, `--modal-form-gap-*`, `--modal-footer-pad-*` |
| Footer | `--footer-content-gap`, `--footer-card-pad-*`, `--footer-cta-margin-top` |

JSON mirrors for tooling live alongside each CSS file (`layout.json` includes `componentSpacing`).
