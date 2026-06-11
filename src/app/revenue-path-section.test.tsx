import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RevenuePathSection } from "./revenue-path-section";

describe("RevenuePathSection", () => {
  it("renders the section heading and reasoning steps as section content", () => {
    render(<RevenuePathSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Kithos learns and gets better with every deal\./i,
      }),
    ).toHaveAttribute("id", "revenue-path-heading");
    expect(
      screen.getByText(
        /Kithos turns your market context and sales outcomes into a self-improving commercial system/i,
      ),
    ).toBeInTheDocument();

    const stepIds = ["knowledge", "action", "outcomes"] as const;
    for (const id of stepIds) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }

    expect(document.getElementById("accounts")).toBeNull();
    expect(document.getElementById("path")).toBeNull();

    expect(
      screen.getByRole("article", {
        name: /Research/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Research/i,
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
    expect(screen.getByText(/The context to win/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /^Act$/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The conviction to win/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Outcomes feed the next move/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Remember/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: /Prioritise the right accounts/i,
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: /Navigate the buying path/i,
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("navigation", { name: /commercial reasoning/i }),
    ).toBeNull();
  });
});
