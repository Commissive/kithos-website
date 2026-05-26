import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ObservabilityLayerSection } from "./observability-layer-section";

describe("ObservabilityLayerSection", () => {
  it("exposes the section heading as the accessible name", () => {
    render(<ObservabilityLayerSection />);
    expect(
      screen.getByRole("region", {
        name: /the observability layer for sales/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the supporting statement text within the section heading", () => {
    render(<ObservabilityLayerSection />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /the observability layer for sales/i,
    });
    expect(heading).toHaveTextContent(
      /engineered for teams turning product conviction into market traction/i,
    );
  });

  it("renders only the statement heading and no step list", () => {
    render(<ObservabilityLayerSection />);
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
  });
});
