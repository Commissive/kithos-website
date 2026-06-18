import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STACK_GROUPS, STACK_INTEGRATIONS, StackLogoCloud } from "./stack-band";

describe("StackLogoCloud", () => {
  it("groups every integration under a workflow category", () => {
    const grouped = STACK_GROUPS.flatMap((group) => group.tools);
    expect(grouped.length).toBe(STACK_INTEGRATIONS.length);
    expect(new Set(grouped.map((tool) => tool.name)).size).toBe(grouped.length);
  });

  it("wires every integration into the network as a labelled logo node", () => {
    render(<StackLogoCloud />);

    expect(screen.getByRole("img", { name: "Salesforce" })).toHaveAttribute(
      "src",
      "/logos/integrations/salesforce.svg",
    );
    for (const name of ["Gong", "Granola", "ZoomInfo", "Monday.com"]) {
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
    }

    // One logo node per integration.
    expect(document.querySelectorAll(".stack-net__node")).toHaveLength(
      STACK_INTEGRATIONS.length,
    );
    expect(document.querySelectorAll(".stack-net__logo")).toHaveLength(
      STACK_INTEGRATIONS.length,
    );
  });
});
