import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  CapabilityPillCloud,
  packRowsBalanced,
  resolvePillRows,
} from "./capability-pill-cloud";

const EIGHT_ITEMS = [
  "Account discovery",
  "Company research",
  "Stakeholder mapping",
  "Signal detection",
  "Market context",
  "Competitive context",
  "Timing and relevance checks",
  "Account-specific reasoning",
] as const;

const RESEARCH_ROWS = [
  ["Company research", "Timing and relevance checks", "Market context"],
  ["Account discovery", "Stakeholder mapping", "Signal detection"],
  ["Competitive context", "Account-specific reasoning"],
] as const;

describe("resolvePillRows", () => {
  it("places the three specified labels on the first row", () => {
    const rows = resolvePillRows(EIGHT_ITEMS, RESEARCH_ROWS);
    expect(rows[0]).toEqual([1, 6, 4]);
    expect(rows).toHaveLength(3);
  });
});

describe("packRowsBalanced", () => {
  it("pairs long and short labels when no explicit rows are given", () => {
    const rows = packRowsBalanced(EIGHT_ITEMS);
    expect(rows).toHaveLength(4);
    expect(rows.every((row) => row.length === 2)).toBe(true);
  });
});

describe("CapabilityPillCloud", () => {
  it("renders explicit rows with all capability grid cells", () => {
    const { container } = render(
      <CapabilityPillCloud items={EIGHT_ITEMS} rows={RESEARCH_ROWS} />,
    );
    const rows = container.querySelectorAll(".capability-grid__row");
    expect(rows).toHaveLength(3);
    expect(rows[0]?.querySelectorAll(".capability-grid__cell")).toHaveLength(3);
    expect(screen.getByText("Market context")).toBeInTheDocument();
  });
});
