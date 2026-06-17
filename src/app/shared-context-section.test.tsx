import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SharedContextSection } from "./shared-context-section";

describe("SharedContextSection", () => {
  it("renders the headline and a three-step content grid", () => {
    render(<SharedContextSection />);

    const region = screen.getByRole("region", {
      name: /one shared context for every commercial decision/i,
    });
    expect(region).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /one shared context for every commercial decision/i,
      }),
    ).toBeInTheDocument();

    for (const title of ["Collate", "Decide", "Improve"]) {
      expect(
        within(region).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }

    // Card bodies are the original subhead clauses, split one per step.
    expect(
      within(region).getByText(/Kithos brings together what matters/i),
    ).toBeInTheDocument();
    expect(
      within(region).getByText(/Every outcome feeds back into the system/i),
    ).toBeInTheDocument();
  });
});
