import { describe, expect, it } from "vitest";
import {
  buildEnvironmentSvgLayout,
  groupEnvironmentIndicesByRow,
  readEnvironmentStripLayout,
  resolveEnvironmentCellPlacement,
  resolveExpandDirection,
  resolveExpandDirectionInRow,
} from "./product-statement-grid";

const SAMPLE_LABELS = [
  "Finance",
  "Compliance",
  "Manufacturing",
  "Procurement",
  "Applied AI & ML",
  "Data Infrastructure",
  "Developer Tools",
  "Supply Chain",
  "Legal",
  "Healthcare",
  "Energy",
  "Defence",
  "Cybersecurity",
  "Construction",
] as const;

describe("product-statement-grid", () => {
  it("places environment cells 6×2 on the 12-column desktop strip", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-strip-grid-cols", "12");
    frame.style.setProperty("--ps-env-col-span", "2");
    frame.style.setProperty("--ps-env-row-span", "2");

    const layout = readEnvironmentStripLayout(frame);

    expect(layout.itemsPerRow).toBe(6);

    expect(resolveEnvironmentCellPlacement(0, 14, layout)).toEqual({
      gridColumn: "1 / span 2",
      gridRow: "1 / span 2",
      isStripColEnd: false,
      isStripRowEnd: false,
      colStart: 1,
      colEnd: 2,
    });

    expect(resolveEnvironmentCellPlacement(5, 14, layout)).toEqual({
      gridColumn: "11 / span 2",
      gridRow: "1 / span 2",
      isStripColEnd: true,
      isStripRowEnd: false,
      colStart: 11,
      colEnd: 12,
    });

    expect(resolveEnvironmentCellPlacement(6, 14, layout)).toEqual({
      gridColumn: "1 / span 2",
      gridRow: "3 / span 2",
      isStripColEnd: false,
      isStripRowEnd: false,
      colStart: 1,
      colEnd: 2,
    });
  });

  it("centres a partial final row on the desktop strip", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-strip-grid-cols", "12");
    frame.style.setProperty("--ps-env-col-span", "2");
    frame.style.setProperty("--ps-env-row-span", "2");

    const layout = readEnvironmentStripLayout(frame);

    expect(resolveEnvironmentCellPlacement(12, 14, layout)).toEqual({
      gridColumn: "5 / span 2",
      gridRow: "5 / span 2",
      isStripColEnd: false,
      isStripRowEnd: true,
      colStart: 5,
      colEnd: 6,
    });

    expect(resolveEnvironmentCellPlacement(13, 14, layout)).toEqual({
      gridColumn: "7 / span 2",
      gridRow: "5 / span 2",
      isStripColEnd: true,
      isStripRowEnd: true,
      colStart: 7,
      colEnd: 8,
    });
  });

  it("places environment cells 4×2 on the 8-column tablet strip", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-strip-grid-cols", "8");
    frame.style.setProperty("--ps-env-col-span", "2");
    frame.style.setProperty("--ps-env-row-span", "2");

    const layout = readEnvironmentStripLayout(frame);

    expect(layout.itemsPerRow).toBe(4);

    expect(resolveEnvironmentCellPlacement(0, 14, layout)).toEqual({
      gridColumn: "1 / span 2",
      gridRow: "1 / span 2",
      isStripColEnd: false,
      isStripRowEnd: false,
      colStart: 1,
      colEnd: 2,
    });

    expect(resolveEnvironmentCellPlacement(3, 14, layout)).toEqual({
      gridColumn: "7 / span 2",
      gridRow: "1 / span 2",
      isStripColEnd: true,
      isStripRowEnd: false,
      colStart: 7,
      colEnd: 8,
    });

    expect(resolveEnvironmentCellPlacement(12, 14, layout)).toEqual({
      gridColumn: "3 / span 2",
      gridRow: "7 / span 2",
      isStripColEnd: false,
      isStripRowEnd: true,
      colStart: 3,
      colEnd: 4,
    });
  });

  it("resolves expand direction from strip edges", () => {
    const layout = {
      stripCols: 12,
      expandColCells: 1,
    };

    expect(
      resolveExpandDirection(
        0,
        { colStart: 1, colEnd: 2 },
        layout,
      ),
    ).toBe("right");

    expect(
      resolveExpandDirection(
        5,
        { colStart: 11, colEnd: 12 },
        layout,
      ),
    ).toBe("left");

    expect(
      resolveExpandDirection(
        2,
        { colStart: 5, colEnd: 6 },
        layout,
      ),
    ).toBe("left");

    expect(
      resolveExpandDirection(
        3,
        { colStart: 7, colEnd: 8 },
        layout,
      ),
    ).toBe("right");

    expect(resolveExpandDirection(0, { colStart: 1, colEnd: 2 }, { ...layout, expandColCells: 0 })).toBeNull();
  });

  it("groups environment indices into rows", () => {
    expect(groupEnvironmentIndicesByRow(14, 6)).toEqual([
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11],
      [12, 13],
    ]);
    expect(groupEnvironmentIndicesByRow(14, 4)).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13],
    ]);
    expect(groupEnvironmentIndicesByRow(14, 2)).toHaveLength(7);
  });

  it("reads items per row from css when provided", () => {
    const frame = document.createElement("div");
    frame.className = "product-statement";
    frame.style.setProperty("--ps-items-per-row", "6");

    expect(readEnvironmentStripLayout(frame).itemsPerRow).toBe(6);
  });

  it("builds svg layout as a single scroll row", () => {
    const layout = buildEnvironmentSvgLayout(SAMPLE_LABELS, SAMPLE_LABELS.length);

    expect(layout.width).toBe(1400);
    expect(layout.height).toBe(100);
    expect(layout.rowCount).toBe(1);
    expect(layout.cells).toHaveLength(14);
    expect(layout.cells[0]).toMatchObject({ label: "Finance", x: 0, y: 0 });
    expect(layout.cells[13]).toMatchObject({
      label: "Construction",
      x: 1300,
      y: 0,
    });
  });

  it("resolves expand direction within a row", () => {
    const layout = { expandColCells: 1 };

    expect(resolveExpandDirectionInRow(0, 0, 6, layout)).toBe("right");
    expect(resolveExpandDirectionInRow(5, 5, 6, layout)).toBe("left");
    expect(resolveExpandDirectionInRow(2, 2, 6, layout)).toBe("left");
    expect(resolveExpandDirectionInRow(3, 3, 6, layout)).toBe("right");
    expect(resolveExpandDirectionInRow(0, 0, 2, { expandColCells: 0 })).toBeNull();
  });
});
