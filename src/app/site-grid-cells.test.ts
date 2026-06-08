import { describe, expect, it } from "vitest";
import {
  buildGridCells,
  filterPanelGridCells,
  pickGridCellColor,
} from "./site-grid-cells";

describe("site-grid-cells", () => {
  it("picks stable accent colors per cell coordinate", () => {
    const first = pickGridCellColor(3, 2, "var(--bone)");
    const second = pickGridCellColor(3, 2, "var(--bone)");

    expect(first).toBe(second);
  });

  it("filters cells to the panel between gutter and trail columns", () => {
    const cells = buildGridCells(8, 2, "var(--bone)");
    const panel = filterPanelGridCells(cells, 8, 2, 2);

    expect(panel.every((cell) => cell.col > 2 && cell.col <= 6)).toBe(true);
    expect(panel.some((cell) => cell.col <= 2)).toBe(false);
    expect(panel.some((cell) => cell.col > 6)).toBe(false);
  });

  it("builds a full grid matrix for the requested dimensions", () => {
    const cells = buildGridCells(4, 3, "var(--bone)");

    expect(cells).toHaveLength(12);
    expect(cells[0]).toMatchObject({ col: 1, row: 1 });
    expect(cells[11]).toMatchObject({ col: 4, row: 3 });
  });
});
