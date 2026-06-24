import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextMoveSection } from "./next-move-section";

describe("NextMoveSection", () => {
  it("renders a section header and three semantic pillar illustrations", () => {
    const { container } = render(<NextMoveSection />);

    const region = screen.getByRole("region", {
      name: /make better decisions before more activity/i,
    });
    expect(region).toBeInTheDocument();

    expect(screen.getByText("Commercial decisions")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /make better decisions before more activity/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/so more of your team’s effort turns into revenue/i))
      .toHaveClass("section-heading-support");
    expect(
      screen.getByText(
        /kithos is built around the decisions that determine where your team spends its time/i,
      ),
    ).toBeInTheDocument();
    expect(container.querySelector(".section-heading-row")).not.toBeNull();
    expect(container.querySelector(".next-move__statement")).toBeNull();

    const pillars = container.querySelectorAll(".next-move__pillar");
    expect(pillars).toHaveLength(3);

    for (const pillar of pillars) {
      expect(pillar.querySelector(".next-move__pillar-index")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-fig")).toBeNull();
      expect(pillar.querySelector(".next-move__pillar-art svg")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-copy")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-title")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-body")).not.toBeNull();
    }

    expect(screen.queryByText(/FIG 0\./)).toBeNull();

    expect(
      container.querySelector(".next-move-wire--bright"),
    ).not.toBeNull();

    expect(screen.getByRole("heading", { level: 3, name: /start with context/i }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /decide with evidence/i }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /learn from outcomes/i }))
      .toBeInTheDocument();

    expect(container.querySelector(".next-move__card--aside")).toBeNull();
    expect(screen.queryByText("The decision problem")).toBeNull();
  });
});
