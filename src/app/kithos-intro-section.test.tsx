import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KithosIntroSection } from "./kithos-intro-section";

describe("KithosIntroSection", () => {
  it("introduces Kithos with a centred product thesis", () => {
    render(<KithosIntroSection />);

    expect(screen.getByText("What Kithos is")).toBeInTheDocument();
    expect(document.querySelector(".kithos-intro__frame")).not.toBeNull();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Kithos understands your product and reasons across your market/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/focus on winnable opportunities/i),
    ).toBeInTheDocument();
  });
});
