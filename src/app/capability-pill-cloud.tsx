import type { CSSProperties } from "react";

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
        throw new Error(`Unknown capability label: ${label}`);
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

function rowGridStyle(columnCount: number): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
  };
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
    <div
      className="capability-grid"
      role="group"
      aria-label="Capabilities"
    >
      {rows.map((indices, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="capability-grid__row"
          style={rowGridStyle(indices.length)}
        >
          {indices.map((itemIndex) => {
            const label = items[itemIndex];
            if (!label) return null;

            return (
              <div key={label} className="capability-grid__cell ui font-sans text-pretty">
                {label}
              </div>
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
