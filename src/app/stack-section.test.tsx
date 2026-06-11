import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackSection } from "./stack-section";

describe("StackSection", () => {
  it("renders a section heading and integrations logo cloud", () => {
    render(<StackSection />);

    expect(
      screen.getByRole("region", { name: /Works with your stack/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Works with your stack/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
    expect(
      screen.getByText(/reads from the tools your team already uses/i),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Salesforce" })).toHaveAttribute(
      "src",
      "/logos/integrations/salesforce.svg",
    );
    expect(
      screen.getByRole("list", { name: /Tools Kithos connects to/i }),
    ).toBeInTheDocument();
  });
});
