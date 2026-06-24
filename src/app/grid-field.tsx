import "./grid-field.css";

/* GridField — the site's grid-mosaic motif as a reusable primitive: a field of
   square cells with a deterministic subset spanning two rows (taller
   rectangles), gaps reading as faint rules. First built in the hero; see
   [[project-grid-pattern]].

   Theme it per surface with CSS vars on the element:
     --grid-field-cell     cell size (square)        default 2.75rem
     --grid-field-surface  cell fill                 default --snow
     --grid-field-line     gap / rule colour         default faint forest
     --grid-field-lit      lit-cell fill (depth)     default --grid-field-surface
   A `litRatio` fraction of cells take `data-lit` and lift to --grid-field-lit,
   giving the mosaic depth (as in the hero). The cell count overfills the
   largest plausible area; a clipping parent (overflow: hidden) trims the
   excess. Deterministic so SSR and CSR match. */

type Cell = { tall: boolean; lit: boolean };

function buildPattern(
  count: number,
  tallRatio: number,
  litRatio: number,
  seed: number,
): Cell[] {
  let s = seed % 0x7fffffff;
  const next = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from({ length: count }, () => ({
    tall: next() < tallRatio,
    lit: next() < litRatio,
  }));
}

type GridFieldProps = {
  className?: string;
  /** Number of cells rendered (overfill the area; the parent clips). */
  cellCount?: number;
  /** Fraction of cells that span two rows as taller rectangles. */
  tallRatio?: number;
  /** Fraction of cells lifted to --grid-field-lit for depth. */
  litRatio?: number;
  /** Seed for the deterministic shape pattern. */
  seed?: number;
};

export function GridField({
  className,
  cellCount = 160,
  tallRatio = 0.32,
  litRatio = 0,
  seed = 0x9e3779b1,
}: GridFieldProps) {
  const pattern = buildPattern(cellCount, tallRatio, litRatio, seed);
  return (
    <div
      aria-hidden
      className={["grid-field", className].filter(Boolean).join(" ")}
    >
      {pattern.map(({ tall, lit }, i) => (
        <span
          key={i}
          className="grid-field__cell"
          data-tall={tall ? "" : undefined}
          data-lit={lit ? "" : undefined}
        />
      ))}
    </div>
  );
}
