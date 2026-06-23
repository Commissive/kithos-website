import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextMoveSection } from "./next-move-section";

describe("NextMoveSection", () => {
  it("renders a flowing intro statement and three semantic pillar illustrations", () => {
    const { container } = render(<NextMoveSection />);

    const region = screen.getByRole("region", {
      name: /better decisions, not more activity/i,
    });
    expect(region).toBeInTheDocument();

    const statement = container.querySelector(".next-move__statement");
    expect(statement).not.toBeNull();
    expect(statement?.tagName).toBe("H2");
    expect(statement?.querySelector(".next-move__statement-lead")).toHaveTextContent(
      "Better decisions, not more activity.",
    );
    expect(
      statement?.querySelector(".next-move__statement-support"),
    ).toHaveTextContent(/bring the right context/i);
    expect(container.querySelector(".section-heading-row")).toBeNull();

    const pillars = container.querySelectorAll(".next-move__pillar");
    expect(pillars).toHaveLength(3);

    for (const pillar of pillars) {
      expect(pillar.querySelector(".next-move__pillar-fig")).toBeNull();
      expect(pillar.querySelector(".next-move__pillar-mark")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-art svg")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-copy")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-title")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-body")).not.toBeNull();
    }

    expect(screen.queryByText(/FIG 0\./)).toBeNull();

    expect(
      container.querySelector(".next-move-wire--hover-cube"),
    ).not.toBeNull();
    expect(
      container.querySelector(".next-move-wire--hover-dial"),
    ).not.toBeNull();
    expect(
      container.querySelector(".next-move-wire--hover-scan"),
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
