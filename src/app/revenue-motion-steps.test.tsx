import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RevenueMotionSteps } from "./revenue-motion-steps";

describe("RevenueMotionSteps", () => {
  it("exposes the section heading as the accessible name", () => {
    render(<RevenueMotionSteps />);
    expect(
      screen.getByRole("region", {
        name: /tools, context, and confidence for every deal/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders an ordered list with four step items", () => {
    render(<RevenueMotionSteps />);
    const list = screen.getByRole("list", { name: /revenue motion steps/i });
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders each step headline as h3", () => {
    render(<RevenueMotionSteps />);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /unify context into a commercial system of action/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /find the right accounts and move them forward/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /build the playbook as you sell/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /get your reps in/i,
      }),
    ).toBeInTheDocument();
  });

});
