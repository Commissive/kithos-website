import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KithosIntroSection } from "./kithos-intro-section";

describe("KithosIntroSection", () => {
  it("introduces Kithos with a centred product thesis", () => {
    render(<KithosIntroSection />);

    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(document.querySelector(".kithos-intro__frame")).not.toBeNull();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /platform for commercial reasoning/i,
      }),
    ).toBeInTheDocument();
  });
});
