import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductStatement } from "./product-statement";

describe("ProductStatement", () => {
  it("renders three full-width category cards for the sales agent line", () => {
    render(<ProductStatement />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /The sales agent for technical products/i,
      }),
    ).toHaveClass("sr-only");

    expect(screen.getByText("The sales agent for")).toBeInTheDocument();
    expect(screen.getByText("01.")).toBeInTheDocument();
    expect(screen.getByText("03.")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(
      document.querySelector(
        'img[src="/brand/illustrations/product-statement/21_key.svg"]',
      ),
    ).toBeTruthy();
    expect(
      document.querySelector(
        'img[src="/brand/illustrations/product-statement/18_anchor.svg"]',
      ),
    ).toBeTruthy();
    expect(
      document.querySelector(
        'img[src="/brand/illustrations/product-statement/07_sprout.svg"]',
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 3, name: /Technical products/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Regulated markets/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Early markets/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: /Multi-stakeholder deals/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: /High-trust categories/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/buyer is not the user and the deal turns on technical proof/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/credibility, compliance, and timing/i)).toBeInTheDocument();
    expect(
      screen.getByText(/turns every conversation and outcome into shared memory/i),
    ).toBeInTheDocument();
  });
});
