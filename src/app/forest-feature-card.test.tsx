import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  FOREST_FEATURE_CARD_MAX_WIDTH,
  FOREST_FEATURE_CARD_MIN_HEIGHT,
  FOREST_FEATURE_CARD_WIDE_MAX_WIDTH,
  ForestFeatureCard,
  ForestFeatureCardWide,
} from "./forest-feature-card";

describe("ForestFeatureCard", () => {
  it("renders step index, headline, and body", () => {
    render(
      <ForestFeatureCard
        stepIndex={0}
        headline="Unify context into a commercial system of action."
        body="Context lives across CRM fields."
      />,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /unify context/i,
    );
    expect(screen.getByText(/context lives across crm fields/i)).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("uses a taller vertical rectangle at the standard width", () => {
    const { container } = render(
      <ForestFeatureCard
        stepIndex={0}
        headline="Win deals you would otherwise lose."
        body="Know which opportunities deserve attention."
      />,
    );
    const card = container.querySelector("article");
    expect(card).toHaveStyle({
      width: FOREST_FEATURE_CARD_MAX_WIDTH,
      minHeight: FOREST_FEATURE_CARD_MIN_HEIGHT,
    });
  });
});

describe("ForestFeatureCardWide", () => {
  it("uses 2.5× the standard card max width", () => {
    const { container } = render(
      <ForestFeatureCardWide
        stepIndex={1}
        headline="Find the right accounts."
        body="Teams waste time on accounts that were never likely to move."
      />,
    );
    const card = container.querySelector("article");
    expect(card).toHaveStyle({ maxWidth: FOREST_FEATURE_CARD_WIDE_MAX_WIDTH });
    expect(FOREST_FEATURE_CARD_WIDE_MAX_WIDTH).toBe(
      `${parseFloat(FOREST_FEATURE_CARD_MAX_WIDTH) * 2.5}rem`,
    );
  });
});
