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
    "Build lists from fit and intent—not guesswork.",
    "Understand what each company does before you reach out.",
  ],
};

describe("BorderedThreeColumnCard", () => {
  it("renders statement headline, benefit paragraphs, and illustration", () => {
    render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(
      screen.getByRole("heading", { name: /deep research/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByText("How it works")).not.toBeInTheDocument();
    expect(screen.getByText(/develop deep product expertise/i)).toHaveClass(
      "text-[var(--ink-muted)]",
    );
    expect(screen.getByText(/Build lists from fit/i)).toHaveClass(
      "three-col-feature__benefit-body",
    );
    expect(
      screen.getByRole("img", { name: /research and market context/i }),
    ).toHaveAttribute("src", "/brand/illustrations/deep-research.webp");
  });

  it("uses the bordered two-column layout shell", () => {
    const { container } = render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(container.querySelector(".three-col-feature")).toBeTruthy();
    expect(container.querySelector(".capability-grid")).toBeFalsy();
    expect(container.querySelector(".three-col-feature__col--benefits")).toBeTruthy();
    expect(container.querySelector("ul")).toBeFalsy();
    expect(screen.getByText(/accounts worth the chase/i)).toHaveClass(
      "three-col-feature__benefit-lead",
    );
    expect(container.querySelectorAll(".three-col-feature__col")).toHaveLength(2);
  });

  it("joins stacked rows in one shell without gap", () => {
    const { container } = render(
      <BorderedThreeColumnCardStack features={[RESEARCH, RESEARCH]} />,
    );
    expect(container.querySelector(".three-col-feature-stack")).toBeTruthy();
    expect(container.querySelectorAll(".three-col-feature")).toHaveLength(2);
    expect(container.querySelectorAll(".three-col-feature-stack > .three-col-feature")).toHaveLength(2);
  });
});
