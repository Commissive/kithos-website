import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  BorderedThreeColumnCard,
  type ThreeColumnFeatureContent,
} from "./bordered-three-column-card";
import { PILL_TONES } from "./capability-pill-cloud";

const RESEARCH: ThreeColumnFeatureContent = {
  step: 1,
  title: "Research",
  summary:
    "Kithos learns about your company and researches the market you operate in.",
  middleBody: [
    "It finds relevant accounts and studies what each company does.",
    "It gathers context before outreach, meetings, or deal decisions.",
  ],
  middleItems: ["Account discovery", "Company research"],
  outcome: [
    "Get a clearer view of which companies are worth pursuing.",
    "Better account selection before scarce sales time is spent.",
  ],
};

describe("BorderedThreeColumnCard", () => {
  it("renders title, lead summary, copy blocks, and coloured capability pills", () => {
    render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(
      screen.getByRole("heading", { name: /^research$/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByText("How it works")).not.toBeInTheDocument();
    expect(screen.getByText(/learns about your company/i)).toHaveClass("lead");
    expect(screen.getByText("Account discovery")).toHaveClass("pill-cloud__pill");
    const pill = screen.getByText("Account discovery");
    expect(pill).toHaveStyle({
      backgroundColor: PILL_TONES[0]!.bg,
      color: PILL_TONES[0]!.color,
    });
  });

  it("uses the bordered three-column layout shell", () => {
    const { container } = render(<BorderedThreeColumnCard feature={RESEARCH} />);
    expect(container.querySelector(".three-col-feature")).toBeTruthy();
    expect(container.querySelector(".pill-cloud")).toBeTruthy();
    expect(container.querySelector(".pill-cloud__row")).toBeTruthy();
    expect(container.querySelectorAll(".three-col-feature__col")).toHaveLength(3);
  });
});
