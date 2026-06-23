import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextMoveSection } from "./next-move-section";

describe("NextMoveSection", () => {
  it("renders a Linear-style intro statement and three illustrated pillars", () => {
    const { container } = render(<NextMoveSection />);

    const region = screen.getByRole("region", {
      name: /turn more commercial effort into customers and revenue/i,
    });
    expect(region).toBeInTheDocument();

    const statement = container.querySelector(".next-move__statement");
    expect(statement).not.toBeNull();
    expect(statement?.tagName).toBe("H2");
    expect(statement?.querySelector(".next-move__statement-lead")).toHaveTextContent(
      "Turn more commercial effort into customers and revenue.",
    );
    expect(
      statement?.querySelector(".next-move__statement-support"),
    ).toHaveTextContent(/kithos is built around the decisions/i);
    expect(container.querySelector(".section-heading-row")).toBeNull();

    const pillars = container.querySelectorAll(".next-move__pillar");
    expect(pillars).toHaveLength(3);

    for (const pillar of pillars) {
      expect(pillar.querySelector(".next-move__pillar-art svg")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-title")).not.toBeNull();
      expect(pillar.querySelector(".next-move__pillar-body")).not.toBeNull();
    }


    expect(screen.getByRole("heading", { level: 3, name: /where to focus/i }))
      .toBeInTheDocument();

    expect(container.querySelector(".next-move__card--aside")).toBeNull();
    expect(screen.queryByText("The decision problem")).toBeNull();
  });
});
