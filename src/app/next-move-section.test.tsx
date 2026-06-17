import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextMoveSection } from "./next-move-section";

describe("NextMoveSection", () => {
  it("renders the eyebrow, headline row, subhead, body, and frame", () => {
    const { container } = render(<NextMoveSection />);

    const region = screen.getByRole("region", {
      name: /the hardest part of selling is the next move/i,
    });
    expect(region).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /the hardest part of selling is the next move/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("The decision problem")).toBeInTheDocument();

    expect(
      within(region).getByText(/Every market, account and buyer/i),
    ).toHaveClass("section-heading-support");
    expect(
      within(region).getByText(/Most sales tools record what happened/i),
    ).toHaveClass("type-rule");

    expect(container.querySelector(".next-move__frame")).not.toBeNull();
    expect(
      container.querySelector(".next-move__frame .next-move__body"),
    ).not.toBeNull();
    expect(container.querySelector(".next-move__grid")).toBeNull();
    expect(container.querySelector(".next-move__curves")).toBeNull();
  });
});
