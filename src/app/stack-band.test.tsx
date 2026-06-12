import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STACK_GROUPS, STACK_INTEGRATIONS, StackLogoCloud } from "./stack-band";

describe("StackLogoCloud", () => {
  it("groups every integration under a workflow category", () => {
    const grouped = STACK_GROUPS.flatMap((group) => group.tools);
    expect(grouped.length).toBe(STACK_INTEGRATIONS.length);
    expect(new Set(grouped.map((tool) => tool.name)).size).toBe(grouped.length);
  });

  it("renders a centered wall of named tool cells", () => {
    render(<StackLogoCloud />);

    expect(
      screen.getByRole("list", { name: /Tools Kithos connects to/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Salesforce" })).toHaveAttribute(
      "src",
      "/logos/integrations/salesforce.svg",
    );
    expect(screen.getByRole("img", { name: "Gong" })).toBeInTheDocument();
    expect(screen.getByText("Gong")).toBeInTheDocument();
    expect(screen.getByText("Granola")).toBeInTheDocument();
    expect(screen.getByText("ZoomInfo")).toBeInTheDocument();
    expect(screen.getByText("Monday.com")).toBeInTheDocument();
    expect(document.querySelectorAll(".stack-cloud__cell")).toHaveLength(14);
  });
});
