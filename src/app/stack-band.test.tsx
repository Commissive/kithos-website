import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackMarquee } from "./stack-band";

describe("StackMarquee", () => {
  it("renders the integrations marquee with named tools", () => {
    render(<StackMarquee />);

    expect(screen.getByRole("img", { name: "Salesforce" })).toHaveAttribute(
      "src",
      "/logos/integrations/salesforce.svg",
    );
    expect(screen.getByRole("img", { name: "HubSpot" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Gmail" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Gong" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Notion" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Slack" })).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /Tools Kithos connects to/i }),
    ).toBeInTheDocument();
  });
});
