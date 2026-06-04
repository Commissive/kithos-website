# Kithos Illustrations — Line Drawings

Twenty-one line illustrations following one strict discipline:

- **Outline only.** No fills (except the bone background).
- **One stroke weight.** 7px on the 1200×1200 canvas, round caps, round joins.
- **Two to four shapes per piece.** Restraint over complexity.
- **Shape as object.** Each composition resolves into a recognizable thing built from the simplest possible primitives.
- **Generous negative space.** The empty area is the largest element in every piece.
- **Terracotta sparingly.** Used as stroke color (not fill) on 9 of 21 pieces where warmth fits the subject — sun, sail, flame, what is held, where a path leads. Same weight, same rules.

## Files

### Original eight (subjects from nature, sky, vessel, architecture)

| # | File | Subject | Terracotta |
|---|------|---------|------------|
| 01 | `01_sun_horizon.svg`  | Sun on horizon       | sun |
| 01b | `01_sun_horizon_birds.svg` | Sun on horizon with birds | sun |
| 02 | `02_birds.svg`        | Two birds in flight  | — |
| 03 | `03_cup_steam.svg`    | Cup with steam       | — |
| 04 | `04_kite.svg`         | Kite with tail       | — |
| 05 | `05_sailboat.svg`     | Sailboat             | sail |
| 06 | `06_archway.svg`      | Archway              | — |
| 07 | `07_sprout.svg`       | Sprout               | — |
| 08 | `08_mountain.svg`     | Mountain peak        | — |

### Extended set (objects, light, transition, symbol)

| # | File | Subject | Terracotta |
|---|------|---------|------------|
| 09 | `09_window.svg`       | Window with sun in pane | sun |
| 10 | `10_doorway.svg`      | Doorway with handle     | — |
| 11 | `11_lantern.svg`      | Hanging lantern         | flame |
| 12 | `12_tree.svg`         | Tree                    | — |
| 13 | `13_moon.svg`         | Crescent moon           | — |
| 14 | `14_hand.svg`         | Hand offering           | what is held |
| 15 | `15_vessel.svg`       | Vessel                  | — |
| 16 | `16_threshold.svg`    | Stepped threshold       | beyond |
| 17 | `17_path.svg`         | Winding path            | destination |
| 18 | `18_anchor.svg`       | Anchor                  | — |
| 19 | `19_candle.svg`       | Candle                  | flame |
| 20 | `20_flag.svg`         | Flag on pole            | flag |
| 21 | `21_key.svg`          | Key                     | — |

## Usage

Each SVG is `viewBox="0 0 1200 1200"`, bone background built in.

```html
<img src="/illustrations/04_kite.svg" alt="" class="illo" />
```

```css
.illo { width: 100%; max-width: 400px; height: auto; display: block; }
```

For runtime theming, inline the SVG and override via CSS:

```css
.kithos-illustration g[stroke] { stroke: var(--my-ink); }
```

## Extending the set

The discipline is the system. Any new illustration follows the same rules:
single stroke weight (7px), outline only, 2–4 shapes max, recognizable
subject, generous negative space, terracotta only where warmth fits the
subject.

The compositional moves used across the 21 illustrations: shape-as-object
(sun, kite), main shape + built around (cup, lantern), two shapes interacting
(sun on horizon, mountain), part of a shape (moon crescent, hand cup), shape
made from parts (sailboat, anchor, candle), repeated marks at different
scales (birds), continuous gesture (path).

Useful subject directions if the set grows: ladder, fan, bowl, wave, drop,
seed, cloud, knot, scale, compass, gate, well, pillar, leaf, feather.
