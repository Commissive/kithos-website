# /v2 hero illustration

The `/v2` hero (`src/app/v2/page.tsx` → `Hero`) renders a full-bleed
painted background with a grain overlay and a bottom dissolve into the
page (the getmodern.ai treatment). The site is light-only. Drop the
asset here:

| File | Required |
|---|---|
| `atmos.webp` | **yes** |

Presence is auto-detected server-side — no code change needed. If the
file is absent, the hero falls back to the warm CSS wash.

**Asset guidance**
- Dimensions: ~2400×1400 (≈16:9, covers ultrawide). `object-cover`
  crops; the focal point should sit in the upper third
  (`object-position: 50% 28%`). Keep important content out of the
  bottom third — it dissolves into `--bg`.
- Format: `.webp` (or `.avif`), heavily optimized — this is a
  decorative background, target < ~250 KB.
- Palette: warm, low-saturation, must keep the **left ~46rem light
  enough** for dark headline/body text to stay legible (Modern keeps
  the painting pale where the type sits). Lean into the signal-yellow
  hue (`#F4D916`) rather than Modern's terracotta so it reads as
  Kithos, not a clone.

After adding the file, hard-reload `/v2` — no code change needed
(the `<img>` already points here).
