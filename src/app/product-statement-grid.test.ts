import { describe, expect, it } from "vitest";
import {
  readProductStatementStripLayout,
  resolveProductStatementRowPlacement,
} from "./product-statement-grid";

describe("product-statement-grid", () => {
  it("places strip articles on a 3-wide subgrid (4 columns at lg)", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-content-cols", "4");
    frame.style.setProperty("--ps-row-col-cells", "3");
    frame.style.setProperty("--ps-content-row-cells", "3");

    const layout = readProductStatementStripLayout(frame);

    expect(resolveProductStatementRowPlacement(0, 4, layout)).toEqual({
      gridColumn: "1 / span 3",
      gridRow: "1 / span 3",
      isStripColEnd: false,
      isStripRowEnd: true,
    });
    expect(resolveProductStatementRowPlacement(1, 4, layout)).toEqual({
      gridColumn: "4 / span 3",
      gridRow: "1 / span 3",
      isStripColEnd: false,
      isStripRowEnd: true,
    });
    expect(resolveProductStatementRowPlacement(2, 4, layout)).toEqual({
      gridColumn: "7 / span 3",
      gridRow: "1 / span 3",
      isStripColEnd: false,
      isStripRowEnd: true,
    });
    expect(resolveProductStatementRowPlacement(3, 4, layout)).toEqual({
      gridColumn: "10 / span 3",
      gridRow: "1 / span 3",
      isStripColEnd: true,
      isStripRowEnd: true,
    });
  });

  it("places strip articles on a 4×3 subgrid (2 columns)", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-content-cols", "2");
    frame.style.setProperty("--ps-row-col-cells", "4");
    frame.style.setProperty("--ps-content-row-cells", "3");

    const layout = readProductStatementStripLayout(frame);

    expect(resolveProductStatementRowPlacement(0, 4, layout)).toEqual({
      gridColumn: "1 / span 4",
      gridRow: "1 / span 3",
      isStripColEnd: false,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(1, 4, layout)).toEqual({
      gridColumn: "5 / span 4",
      gridRow: "1 / span 3",
      isStripColEnd: true,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(2, 4, layout)).toEqual({
      gridColumn: "1 / span 4",
      gridRow: "4 / span 3",
      isStripColEnd: false,
      isStripRowEnd: true,
    });
    expect(resolveProductStatementRowPlacement(3, 4, layout)).toEqual({
      gridColumn: "5 / span 4",
      gridRow: "4 / span 3",
      isStripColEnd: true,
      isStripRowEnd: true,
    });
  });
});
