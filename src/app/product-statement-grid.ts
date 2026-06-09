export type ProductStatementStripLayout = {
  contentCols: number;
  rowColCells: number;
  contentRowCells: number;
  headlineRows: number;
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
  const styles = getComputedStyle(frame);

  return {
    contentCols: readCssInt(styles, "--ps-content-cols", 1),
    rowColCells: readCssInt(styles, "--ps-row-col-cells", 4),
    contentRowCells: readCssInt(styles, "--ps-content-row-cells", 3),
    headlineRows: readCssInt(styles, "--ps-headline-rows", 3),
  };
}

export function resolveProductStatementRowPlacement(
  index: number,
  articleCount: number,
  layout: ProductStatementStripLayout,
): ProductStatementRowPlacement {
  const { contentCols, rowColCells, contentRowCells } = layout;
  const stripCol = index % contentCols;
  const stripRow = Math.floor(index / contentCols);
  const stripRows = Math.ceil(articleCount / contentCols);

  const colStart = stripCol * rowColCells + 1;
  const rowStart = stripRow * contentRowCells + 1;

  return {
    gridColumn: `${colStart} / span ${rowColCells}`,
    gridRow: `${rowStart} / span ${contentRowCells}`,
    isStripColEnd: stripCol === contentCols - 1,
    isStripRowEnd: stripRow === stripRows - 1,
  };
}
