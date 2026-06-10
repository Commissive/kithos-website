export type ProductStatementStripLayout = {
  contentCols: number;
  rowColCells: number;
  contentRowCells: number;
  headlineRows: number;
  stripColOffset: number;
  expandColCells: number;
};

export type ProductStatementRowPlacement = {
  gridColumn: string;
  gridRow: string;
  isStripColEnd: boolean;
  isStripRowEnd: boolean;
};

function readCssInt(styles: CSSStyleDeclaration, name: string, fallback: number): number {
  const raw = styles.getPropertyValue(name).trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

export function readProductStatementStripLayout(
  frame: HTMLElement,
): ProductStatementStripLayout {
  const layoutRoot = frame.closest(".product-statement") ?? frame;
  const styles = getComputedStyle(layoutRoot);

  const contentCols = readCssInt(styles, "--ps-content-cols", 1);
  const rowColCells = readCssInt(styles, "--ps-row-col-cells", 4);
  const contentRowCells = readCssInt(styles, "--ps-content-row-cells", 2);
  const headlineRows = readCssInt(styles, "--ps-headline-rows", 3);
  const stripColOffset = readCssInt(styles, "--ps-strip-grid-col-offset", 0);
  const expandColCells = readCssInt(styles, "--ps-card-expand-cols", 0);

  return {
    contentCols,
    rowColCells,
    contentRowCells,
    headlineRows,
    stripColOffset,
    expandColCells,
  };
}

export function resolveProductStatementRowPlacement(
  index: number,
  articleCount: number,
  layout: ProductStatementStripLayout,
): ProductStatementRowPlacement {
  const { contentCols, rowColCells, contentRowCells } = layout;
  const cardRowSpan = contentRowCells * 2 + 1;
  const stripCol = index % contentCols;
  const stripRow = Math.floor(index / contentCols);
  const stripRows = Math.ceil(articleCount / contentCols);

  const colStart = stripCol * rowColCells + 1 + layout.stripColOffset;
  const rowStart = stripRow * cardRowSpan + 1;

  return {
    gridColumn: `${colStart} / span ${rowColCells}`,
    gridRow: `${rowStart} / span ${cardRowSpan}`,
    isStripColEnd: stripCol === contentCols - 1,
    isStripRowEnd: stripRow === stripRows - 1,
  };
}
