import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  STACK_INTEGRATIONS,
  STACK_LOGO_PLACEMENTS,
  StackLogoCloud,
} from "./stack-band";

function uniqueGridSlots(
  placements: readonly {
    col: number;
    row: number;
    colMobile: number;
    rowMobile: number;
  }[],
  mode: "desktop" | "mobile",
) {
  const keys = placements.map((placement) =>
    mode === "desktop"
      ? `${placement.col},${placement.row}`
      : `${placement.colMobile},${placement.rowMobile}`,
  );

  return new Set(keys).size === keys.length;
}

describe("StackLogoCloud", () => {
  it("assigns each integration a unique grid cell on desktop and mobile", () => {
    expect(STACK_INTEGRATIONS.length).toBe(STACK_LOGO_PLACEMENTS.length);
    expect(uniqueGridSlots(STACK_LOGO_PLACEMENTS, "desktop")).toBe(true);
    expect(uniqueGridSlots(STACK_LOGO_PLACEMENTS, "mobile")).toBe(true);
  });

  it("renders a static logo cloud with named tools", () => {
    render(<StackLogoCloud />);

    expect(screen.getByRole("img", { name: "Salesforce" })).toHaveAttribute(
      "src",
      "/logos/integrations/salesforce.svg",
    );
    expect(screen.getByRole("img", { name: "HubSpot" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Gmail" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Gong" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Granola" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Notion" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Slack" })).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /Tools Kithos connects to/i }),
    ).toBeInTheDocument();
    expect(document.querySelector(".stack-band__field")).not.toBeNull();
    expect(document.querySelectorAll(".stack-band__cell")).toHaveLength(13);
    expect(document.querySelector(".stack-band__tile")).toBeNull();
  });
});
