import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  BorderedThreeColumnCard,
  BorderedThreeColumnCardStack,
  type ThreeColumnFeatureContent,
} from "./bordered-three-column-card";

const RESEARCH = {
  step: 1,
  lead: "Research",
  support:
    "Kithos studies your business and market before shaping commercial moves.",
} as ThreeColumnFeatureContent;

describe("BorderedThreeColumnCard", () => {
  it("renders a principle-style card with concise body copy", () => {
    render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(
      screen.getByRole("heading", { name: /research/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /kithos studies your business and market before shaping commercial moves/i,
      ),
    ).toHaveClass("three-col-feature__copy");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("uses the standalone premium card shell", () => {
    const { container } = render(<BorderedThreeColumnCard feature={RESEARCH} />);
    const card = container.querySelector(".three-col-feature");
    const heading = screen.getByRole("heading", { name: /research/i });
    const body = container.querySelector(".three-col-feature__body");
    expect(card).toBeTruthy();
    expect(card?.className).toMatch(/bg-\[var\(--forest\)\]/);
    expect(card?.className).toMatch(/h-\[24rem\]/);
    expect(card?.className).toMatch(/lg:h-\[28\.125rem\]/);
    expect(container.querySelector(".three-col-feature__copy")).toBeTruthy();
    expect(body).toBeTruthy();
    expect(body?.className).toMatch(/mt-auto/);
    expect(heading).toHaveClass("whitespace-nowrap");
  });

  it("lays out three cards in a responsive grid", () => {
    const features = [
      RESEARCH,
      {
        step: 2,
        lead: "Reason",
        support:
          "Kithos weighs evidence and capacity to focus the next move.",
      } as ThreeColumnFeatureContent,
      {
        step: 3,
        lead: "Remember",
        support:
          "Kithos gives your team relevant context for sharper deal decisions.",
      } as ThreeColumnFeatureContent,
    ];
    const { container } = render(
      <BorderedThreeColumnCardStack features={features} />,
    );
    const stack = container.querySelector(".three-col-feature-grid");
    expect(stack).toBeTruthy();
    expect(container.querySelectorAll(".three-col-feature")).toHaveLength(3);
    expect(stack?.className).toMatch(/lg:grid-cols-3/);
    expect(stack?.className).not.toMatch(/three-col-feature-stack--rows/);
  });
});
