import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SplitStepCard } from "./split-step-card";

describe("SplitStepCard", () => {
  it("renders headline and body in separate regions", () => {
    render(
      <SplitStepCard
        stepIndex={2}
        headline="Build the playbook as you sell."
        body={[
          "Every reply should sharpen the next move.",
          "Kithos turns outcomes into shared commercial memory.",
          "The whole team can use what worked.",
        ]}
      />,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /build the playbook/i,
    );
    expect(
      screen.getByText(/every reply should sharpen/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the whole team can use what worked/i),
    ).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("places the body panel before the headline panel when flipped", () => {
    const { container } = render(
      <SplitStepCard
        flipped
        stepIndex={3}
        headline="Get your reps in."
        body={[
          "Know-how usually walks out the door.",
          "In Kithos, every outcome compounds into one base.",
          "New reps inherit it on day one.",
        ]}
      />,
    );
    const panels = container.querySelectorAll("article > div");
    expect(panels[0]).toHaveTextContent(/know-how usually walks/i);
    expect(panels[1]).toHaveTextContent(/get your reps in/i);
  });
});
