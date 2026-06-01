import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RevenuePathSection } from "./revenue-path-section";

describe("RevenuePathSection", () => {
  it("renders the section heading and reasoning steps as section content", () => {
    render(<RevenuePathSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /A reasoning layer for the revenue workflow/i,
      }),
    ).toHaveAttribute("id", "revenue-path-heading");
    expect(
      screen.getByText(
        /Market context, account motion, and outcomes/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Weigh fit, timing, evidence, buyer context/i),
    ).toBeInTheDocument();

    const stepIds = ["knowledge", "accounts", "path", "outcomes"] as const;
    for (const id of stepIds) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("article", {
        name: /Build commercial understanding/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Build commercial understanding/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Kithos gathers activity, assumptions, data, and signals/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/working understanding of your market, accounts, buyers, and past outcomes/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Prioritise the right accounts/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Navigate the buying path/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Learn from every outcome/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /commercial reasoning/i }),
    ).toBeNull();
  });
});
