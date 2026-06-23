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
| `type.css` | Fluid display scale + body/UI tiers |
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

## Type scale

**Hanken Grotesk** is the single web typeface. Display tiers differ by size and tracking, not by font family. Fraunces remains wordmark-only (outlined SVG).

Fluid marketing tiers (mobile → desktop cap):

| Token | Class | Range |
|-------|-------|-------|
| `--text-hero` | `.type-hero` | 28px → 40px mobile; desktop container-query, **cap 48px** |
| `--text-section-heading` | `.type-statement` | 26px → 34px mobile; 34px → 46px at `md` |
| `--text-flow-statement` | `.type-statement--flow` | 26px → 48px mobile; 32px → 48px at `md`; lead + muted support in one block |
| `--text-display-4` | `.type-rule` | 20px → 32px |
| `--text-subhead` | `.type-subhead` | 17px → 20px |

Fixed / fluid body tiers:

| Token | Class | Size |
|-------|-------|------|
| `--text-body` | `.body` | 15px |
| `--text-ui` | `.ui` | 13px → 15px fluid |
| `--type-eyebrow` | `.label` | 11px uppercase |
| `--type-micro` | — | 10px uppercase (artifact meta) |

### Composed type tokens

| Token | Role |
|-------|------|
| `--text-section-support` | Baked into `.section-heading-support` → `var(--text-subhead)` |
| `--text-artifact-*` | Capability mock cards — aliases to subhead/ui/eyebrow/micro |
| `--text-stat` | Compounding section stat → `var(--text-subhead)` |
| `--lh-ui`, `--track-ui` | Shared metrics for `.ui`, form inputs, and controls |

### Markup rules

Use semantic utility classes — do not add raw `font-size` in component CSS:

- **Hero H1** → `.type-hero`
- **Section title** → `.type-statement` (via `SectionHeadingTitle`)
- **Section support / card title** → `.section-heading-support` or `.type-subhead`
- **Prose** → `.body`
- **Nav, buttons, forms** → `.ui`
- **Eyebrows** → `.label`

Legacy aliases `--text-display-2` through `--text-display-5` remain for CSS variables; prefer canonical tokens in new code.

## Layout rhythm

Section padding defaults to **48px** edges on mobile, stepping to **80px** at `md` and **120px** at `lg`:

- `--section-header-pad-top` / `-bottom`
- `--section-pad-step-sm` / `-lg`
- `--page-gutter` (fluid `clamp` on ultra-wide), `--page-shell-max`, `--page-max`

### Copy & container measures

| Token | Role |
|-------|------|
| `--measure-prose` | Marketing body copy (56ch) |
| `--measure-legal` | Legal pages via `.page-grid-prose--legal` (65ch) |
| `--measure-cta` | Footer early-access band |
| `--measure-tagline` | Footer tagline (36ch) |
| `--modal-max-width` | Access modal cap |
| `--modal-viewport-max-h` | Modal/shell max height |

## Component spacing

Responsive padding, margin, and gap tokens for recurring UI blocks. Mobile values are `:root` defaults; `md` (48rem) and `lg` (64rem) override in `layout.css`.

JSON mirrors for tooling live alongside each CSS file (`layout.json` includes `componentSpacing`).
