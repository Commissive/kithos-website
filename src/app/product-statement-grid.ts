export type EnvironmentStripLayout = {
  stripCols: number;
  colSpan: number;
  rowSpan: number;
  itemsPerRow: number;
  stripColOffset: number;
  expandColCells: number;
};

export const ENVIRONMENT_SVG_CELL_UNIT = 100;

export type EnvironmentSvgCell = {
  label: string;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type EnvironmentSvgLayout = {
  width: number;
  height: number;
  itemsPerRow: number;
  rowCount: number;
  cells: EnvironmentSvgCell[];
};

export function buildEnvironmentSvgLayout(
  labels: readonly string[],
  itemsPerRow: number,
  cellUnit = ENVIRONMENT_SVG_CELL_UNIT,
): EnvironmentSvgLayout {
  const rows = groupEnvironmentIndicesByRow(labels.length, itemsPerRow);
  const rowCount = rows.length;
  const width = itemsPerRow * cellUnit;
  const height = rowCount * cellUnit;
  const cells: EnvironmentSvgCell[] = [];

  rows.forEach((rowIndices, rowIndex) => {
    const isPartialRow = rowIndices.length < itemsPerRow;
    const leadingSpacers = isPartialRow
      ? Math.floor((itemsPerRow - rowIndices.length) / 2)
      : 0;

    rowIndices.forEach((index, indexInRow) => {
      cells.push({
        label: labels[index],
        index,
        x: (leadingSpacers + indexInRow) * cellUnit,
        y: rowIndex * cellUnit,
        width: cellUnit,
        height: cellUnit,
      });
    });
  });

  return {
    width,
    height,
    itemsPerRow,
    rowCount,
    cells,
  };
}

export function groupEnvironmentIndicesByRow(
  total: number,
  itemsPerRow: number,
): number[][] {
  const rows: number[][] = [];

  for (let index = 0; index < total; index += itemsPerRow) {
    const row: number[] = [];
    const rowEnd = Math.min(index + itemsPerRow, total);

    for (let cellIndex = index; cellIndex < rowEnd; cellIndex += 1) {
      row.push(cellIndex);
    }

    rows.push(row);
  }

  return rows;
}

export function resolveExpandDirectionInRow(
  index: number,
  indexInRow: number,
  itemsInRow: number,
  layout: Pick<EnvironmentStripLayout, "expandColCells">,
): "left" | "right" | null {
  if (layout.expandColCells <= 0) return null;
  if (indexInRow === 0) return "right";
  if (indexInRow === itemsInRow - 1) return "left";

  return index % 2 === 0 ? "left" : "right";
}

export type EnvironmentCellPlacement = {
  gridColumn: string;
  gridRow: string;
  isStripColEnd: boolean;
  isStripRowEnd: boolean;
  colStart: number;
  colEnd: number;
};

function readCssInt(styles: CSSStyleDeclaration, name: string, fallback: number): number {
  const raw = styles.getPropertyValue(name).trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

export function readEnvironmentStripLayout(
  frame: HTMLElement,
): EnvironmentStripLayout {
  const layoutRoot = frame.closest(".product-statement") ?? frame;
  const styles = getComputedStyle(layoutRoot);

  const stripCols = readCssInt(styles, "--ps-strip-grid-cols", 12);
  const colSpan = readCssInt(styles, "--ps-env-col-span", 2);
  const rowSpan = readCssInt(styles, "--ps-env-row-span", 2);
  const stripColOffset = readCssInt(styles, "--ps-strip-grid-col-offset", 0);
  const expandColCells = readCssInt(styles, "--ps-card-expand-cols", 0);
  const itemsPerRowFromCss = readCssInt(styles, "--ps-items-per-row", 0);

  return {
    stripCols,
    colSpan,
    rowSpan,
    itemsPerRow:
      itemsPerRowFromCss > 0
        ? itemsPerRowFromCss
        : Math.max(1, Math.floor(stripCols / colSpan)),
    stripColOffset,
    expandColCells,
  };
}

/** @deprecated Use readEnvironmentStripLayout */
export function readProductStatementStripLayout(frame: HTMLElement) {
  const layout = readEnvironmentStripLayout(frame);
  return {
    contentCols: layout.itemsPerRow,
    rowColCells: layout.colSpan,
    contentRowCells: 1,
    headlineRows: readCssInt(
      getComputedStyle(frame.closest(".product-statement") ?? frame),
      "--ps-headline-rows",
      3,
    ),
    stripColOffset: layout.stripColOffset,
    expandColCells: layout.expandColCells,
  };
}

export function resolveEnvironmentCellPlacement(
  index: number,
  total: number,
  layout: EnvironmentStripLayout,
): EnvironmentCellPlacement {
  const { stripCols, colSpan, rowSpan, itemsPerRow, stripColOffset } = layout;
  const rowIndex = Math.floor(index / itemsPerRow);
  const rowCount = Math.ceil(total / itemsPerRow);
  const rowStart = rowIndex * rowSpan + 1;
  const indexInRow = index - rowIndex * itemsPerRow;
  const itemsInRow = Math.min(itemsPerRow, total - rowIndex * itemsPerRow);
  const isLastRow = rowIndex === rowCount - 1;
  const isPartialRow = isLastRow && itemsInRow < itemsPerRow;

  let colStart: number;
  if (isPartialRow) {
    const rowWidth = itemsInRow * colSpan;
    const leadingGap = Math.floor((stripCols - rowWidth) / 2);
    colStart = leadingGap + indexInRow * colSpan + 1;
  } else {
    colStart = stripColOffset + indexInRow * colSpan + 1;
  }

  const colEnd = colStart + colSpan - 1;
  const isRowColEnd = indexInRow === itemsInRow - 1;

  return {
    gridColumn: `${colStart} / span ${colSpan}`,
    gridRow: `${rowStart} / span ${rowSpan}`,
    isStripColEnd: isRowColEnd || colEnd >= stripCols,
    isStripRowEnd: rowIndex === rowCount - 1,
    colStart,
    colEnd,
  };
}

export function resolveExpandDirection(
  index: number,
  placement: Pick<EnvironmentCellPlacement, "colStart" | "colEnd">,
  layout: Pick<EnvironmentStripLayout, "stripCols" | "expandColCells">,
): "left" | "right" | null {
  if (layout.expandColCells <= 0) return null;

  const { colStart, colEnd } = placement;
  const { stripCols, expandColCells } = layout;

  if (colStart <= 1) return "right";
  if (colEnd >= stripCols) return "left";
  if (colStart - expandColCells < 1) return "right";
  if (colEnd + expandColCells > stripCols) return "left";

  return index % 2 === 0 ? "left" : "right";
}

/** @deprecated Use resolveEnvironmentCellPlacement */
export function resolveProductStatementRowPlacement(
  index: number,
  articleCount: number,
  layout: {
    contentCols: number;
    rowColCells: number;
    contentRowCells: number;
    stripColOffset: number;
  },
): EnvironmentCellPlacement {
  return resolveEnvironmentCellPlacement(index, articleCount, {
    stripCols: layout.contentCols * layout.rowColCells,
    colSpan: layout.rowColCells,
    rowSpan: layout.contentRowCells * 2 + 1,
    itemsPerRow: layout.contentCols,
    stripColOffset: layout.stripColOffset,
    expandColCells: 0,
  });
}
