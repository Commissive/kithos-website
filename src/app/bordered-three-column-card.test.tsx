import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  BorderedThreeColumnCard,
  BorderedThreeColumnCardStack,
  type ThreeColumnFeatureContent,
} from "./bordered-three-column-card";

const RESEARCH: ThreeColumnFeatureContent = {
  step: 1,
  illustration: "/brand/illustrations/deep-research.webp",
  illustrationVariant: "photo",
  illustrationAlt:
    "Abstract view of research and market context turning into directed commercial action",
  lead: "Deep research.",
  support: [
    "Kithos learns your business and market to develop deep product expertise before attempting to influence your outreach, meetings, or deal decisions.",
  ],
  benefitLead: "Spend selling time on accounts worth the chase.",
  benefitParagraphs: [
    "Lists come from fit and intent—not scraped names and guesswork. You understand what each company does before you reach out.",
    "Every account sits in the market story buyers already believe.",
  ],
};

describe("BorderedThreeColumnCard", () => {
  it("renders capability copy without per-card imagery or benefits", () => {
    render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(
      screen.getByRole("heading", { name: /deep research/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/develop deep product expertise/i)).toHaveClass(
      "text-[var(--ink-muted)]",
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/Lists come from fit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/accounts worth the chase/i)).not.toBeInTheDocument();
  });

  it("uses the capability cell shell", () => {
    const { container } = render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(container.querySelector(".three-col-feature")).toBeTruthy();
    expect(container.querySelector(".three-col-feature__body")).toBeTruthy();
    expect(container.querySelector(".three-col-feature__col--benefits")).toBeFalsy();
  });

  it("lays out four capabilities in rows", () => {
    const features = [1, 2, 3, 4].map((step) => ({ ...RESEARCH, step }));
    const { container } = render(
      <BorderedThreeColumnCardStack features={features} />,
    );
    const stack = container.querySelector(
      ".three-col-feature-stack.three-col-feature-stack--rows",
    );
    expect(stack).toBeTruthy();
    expect(container.querySelectorAll(".three-col-feature")).toHaveLength(4);
    expect(stack?.className).not.toMatch(/grid-cols-2|grid-2x2/);
  });
});
