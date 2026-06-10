import { describe, expect, it } from "vitest";
import {
  readProductStatementStripLayout,
  resolveProductStatementRowPlacement,
} from "./product-statement-grid";

describe("product-statement-grid", () => {
  it("offsets strip articles when the card cluster is centred (lg)", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-content-cols", "2");
    frame.style.setProperty("--ps-row-col-cells", "4");
    frame.style.setProperty("--ps-content-row-cells", "2");
    frame.style.setProperty("--ps-strip-grid-col-offset", "2");

    const layout = readProductStatementStripLayout(frame);

    expect(resolveProductStatementRowPlacement(0, 4, layout)).toEqual({
      gridColumn: "3 / span 4",
      gridRow: "1 / span 5",
      isStripColEnd: false,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(1, 4, layout)).toEqual({
      gridColumn: "7 / span 4",
      gridRow: "1 / span 5",
      isStripColEnd: true,
      isStripRowEnd: false,
    });
  });

  it("places strip articles on an 8-wide 2×2 subgrid (lg)", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-content-cols", "2");
    frame.style.setProperty("--ps-row-col-cells", "4");
    frame.style.setProperty("--ps-content-row-cells", "2");

    const layout = readProductStatementStripLayout(frame);

    expect(resolveProductStatementRowPlacement(0, 4, layout)).toEqual({
      gridColumn: "1 / span 4",
      gridRow: "1 / span 5",
      isStripColEnd: false,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(1, 4, layout)).toEqual({
      gridColumn: "5 / span 4",
      gridRow: "1 / span 5",
      isStripColEnd: true,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(2, 4, layout)).toEqual({
      gridColumn: "1 / span 4",
      gridRow: "6 / span 5",
      isStripColEnd: false,
      isStripRowEnd: true,
    });
    expect(resolveProductStatementRowPlacement(3, 4, layout)).toEqual({
      gridColumn: "5 / span 4",
      gridRow: "6 / span 5",
      isStripColEnd: true,
      isStripRowEnd: true,
    });
  });

  it("places strip articles on a 4×2 subgrid (2 columns)", () => {
    const frame = document.createElement("div");
    frame.style.setProperty("--ps-content-cols", "2");
    frame.style.setProperty("--ps-row-col-cells", "4");
    frame.style.setProperty("--ps-content-row-cells", "2");

    const layout = readProductStatementStripLayout(frame);

    expect(resolveProductStatementRowPlacement(0, 4, layout)).toEqual({
      gridColumn: "1 / span 4",
      gridRow: "1 / span 5",
      isStripColEnd: false,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(1, 4, layout)).toEqual({
      gridColumn: "5 / span 4",
      gridRow: "1 / span 5",
      isStripColEnd: true,
      isStripRowEnd: false,
    });
    expect(resolveProductStatementRowPlacement(2, 4, layout)).toEqual({
      gridColumn: "1 / span 4",
      gridRow: "6 / span 5",
      isStripColEnd: false,
      isStripRowEnd: true,
    });
    expect(resolveProductStatementRowPlacement(3, 4, layout)).toEqual({
      gridColumn: "5 / span 4",
      gridRow: "6 / span 5",
      isStripColEnd: true,
      isStripRowEnd: true,
    });
  });
});
