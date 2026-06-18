import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackSection } from "./stack-section";

describe("StackSection", () => {
  it("renders a section heading and integrations logo cloud", () => {
    render(<StackSection />);

    expect(
      screen.getByRole("region", {
        name: /Kithos works from the context your team already creates/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Kithos works from the context your team already creates/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Accounts, conversations, emails, meeting notes, outcomes and internal knowledge/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Salesforce" })).toHaveAttribute(
      "src",
      "/logos/integrations/salesforce.svg",
    );
    expect(document.querySelector(".stack-section__column")).not.toBeNull();
    expect(document.querySelector(".stack-net")).not.toBeNull();
  });
});
