import { render, screen, within } from "@testing-library/react";
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

  it("renders an ordered list with four step items", () => {
    render(<ObservabilityLayerSection />);
    const list = screen.getByRole("list", { name: /observability layer steps/i });
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders each step headline as h3", () => {
    render(<ObservabilityLayerSection />);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /unify context into a commercial system of action/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /find the right accounts and move them forward/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /build the playbook as you sell/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /get your reps in/i,
      }),
    ).toBeInTheDocument();
  });
});
