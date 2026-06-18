import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SharedContextSection } from "./shared-context-section";

describe("SharedContextSection", () => {
  it("renders the headline and a three-step content grid", () => {
    render(<SharedContextSection />);

    const region = screen.getByRole("region", {
      name: /a single platform to define, coordinate and improve/i,
    });
    expect(region).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /a single platform to define, coordinate and improve/i,
      }),
    ).toBeInTheDocument();

    for (const title of ["Unify", "Reason", "Learn"]) {
      expect(
        within(region).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }

    expect(
      within(region).getByText(/Kithos brings together what matters/i),
    ).toBeInTheDocument();
    expect(
      within(region).getByText(/Every outcome updates the picture/i),
    ).toBeInTheDocument();
  });
});
