import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkingWithKithosSection } from "./working-with-kithos-section";

describe("WorkingWithKithosSection", () => {
  it("renders the understanding-led heading and the three ledger rows", () => {
    render(<WorkingWithKithosSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /It knows your business end to end\./i,
      }),
    ).toHaveAttribute("id", "working-with-kithos-heading");
    expect(screen.getByText(/^Working with Kithos$/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /living picture of your company, your customers, and your whole commercial lifecycle/i,
      ),
    ).toBeInTheDocument();

    for (const title of ["Never starts cold", "Never forgets"]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("heading", { level: 3, name: "Acts on your say-so." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a blank prompt/i)).toBeInTheDocument();
    expect(screen.getByText(/Patterns become playbook/i)).toBeInTheDocument();

    // The hero cell's closing line is its own anchored paragraph.
    const anchor = screen.getByText("Nothing reaches a buyer without you.");
    expect(anchor.tagName).toBe("P");
    expect(anchor).toHaveClass("working-with-kithos__hero-anchor");

    // The old framing must be gone.
    expect(screen.queryByText(/Outcomes feed the next move/i)).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 3, name: /^Research$/i }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 2, name: /one loop/i }),
    ).toBeNull();
  });
});
