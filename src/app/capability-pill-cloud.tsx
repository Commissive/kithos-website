export type PillTone = {
  readonly bg: string;
  readonly color: string;
};

/** One tone per slot — forest, terracotta, ink, and bone from the brand kit. */
export const PILL_TONES: readonly PillTone[] = [
  { bg: "var(--forest-tint)", color: "var(--forest)" },
  { bg: "var(--terracotta-tint)", color: "var(--terracotta-pressed)" },
  { bg: "var(--forest-soft)", color: "var(--forest-pressed)" },
  { bg: "var(--terracotta-soft)", color: "var(--terracotta-deep)" },
  { bg: "var(--forest)", color: "var(--bone)" },
  { bg: "var(--terracotta-pressed)", color: "var(--bone)" },
  { bg: "var(--bone-deeper)", color: "var(--ink)" },
  { bg: "var(--forest-muted)", color: "var(--bone)" },
];

/**
 * Pair longest labels with shortest so each row has similar visual weight.
 * Yields even rows (typically pairs) that read as a steady band across the column.
 */
export function resolvePillRows(
  items: readonly string[],
  rowsByLabel?: readonly (readonly string[])[],
): number[][] {
  if (!rowsByLabel || rowsByLabel.length === 0) {
    return packRowsBalanced(items);
  }

  const indexByLabel = new Map(items.map((label, index) => [label, index]));

  return rowsByLabel.map((row) =>
    row.map((label) => {
      const index = indexByLabel.get(label);
      if (index === undefined) {
        throw new Error(`Unknown pill label: ${label}`);
      }
      return index;
    }),
  );
}

export function packRowsBalanced(labels: readonly string[]): number[][] {
  if (labels.length === 0) return [];

  const byLength = labels
    .map((label, index) => ({ index, length: label.length }))
    .sort((a, b) => b.length - a.length);

  const rows: number[][] = [];
  let lo = 0;
  let hi = byLength.length - 1;

  while (lo <= hi) {
    if (lo === hi) {
      rows.push([byLength[lo]!.index]);
      lo += 1;
      continue;
    }

    rows.push([byLength[lo]!.index, byLength[hi]!.index]);
    lo += 1;
    hi -= 1;
  }

  return rows;
}


function ContentPill({
  label,
  tone,
}: {
  label: string;
  tone: PillTone;
}) {
  return (
    <span
      className="pill-cloud__pill ui font-sans"
      style={{ backgroundColor: tone.bg, color: tone.color }}
    >
      {label}
    </span>
  );
}

export function CapabilityPillCloud({
  items,
  rows: rowsByLabel,
}: {
  items: readonly string[];
  rows?: readonly (readonly string[])[];
}) {
  const rows = resolvePillRows(items, rowsByLabel);

  return (
    <div className="pill-cloud" role="list">
      {rows.map((indices, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="pill-cloud__row"
          data-count={indices.length}
          role="presentation"
        >
          {indices.map((itemIndex) => {
            const label = items[itemIndex];
            if (!label) return null;

            return (
              <span key={label} className="pill-cloud__item" role="listitem">
                <ContentPill
                  label={label}
                  tone={PILL_TONES[itemIndex % PILL_TONES.length]!}
                />
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** @deprecated Use packRowsBalanced — kept for tests migrating off width-only packing. */
export function packRowsByWidth(
  labels: readonly string[],
  _maxRowUnits = 54,
): number[][] {
  return packRowsBalanced(labels);
}
