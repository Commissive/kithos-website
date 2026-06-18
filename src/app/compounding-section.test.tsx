import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CompoundingSection } from "./compounding-section";

describe("CompoundingSection", () => {
  it("renders the heading and subhead", () => {
    render(<CompoundingSection />);

    expect(
      screen.getByRole("region", {
        name: /gets sharper with every outcome/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Build a revenue motion that gets sharper with every outcome/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Compounding")).toBeInTheDocument();
    expect(
      screen.getByText(/The patterns become shared commercial memory/i),
    ).toBeInTheDocument();
  });

  it("follows one concrete pattern from observed to rule to applied", () => {
    render(<CompoundingSection />);

    const record = screen.getByRole("list", {
      name: /One pattern becomes shared commercial memory/i,
    });

    expect(
      within(record).getByText(/Observed across six opportunities/i),
    ).toBeInTheDocument();
    expect(within(record).getByText(/stalled/i)).toHaveTextContent("2.3×");
    expect(
      within(record).getByText(
        /Confirm budget ownership before introducing procurement/i,
      ),
    ).toBeInTheDocument();

    // The rule is applied across three concrete live surfaces.
    const surfaces = within(record).getByRole("list", {
      name: /Surfaces now applying this rule/i,
    });
    expect(within(surfaces).getAllByRole("listitem")).toHaveLength(3);
    expect(
      within(surfaces).getByText("Account scoring"),
    ).toBeInTheDocument();
    expect(
      within(surfaces).getByText("Next-step recommendations"),
    ).toBeInTheDocument();
  });
});
