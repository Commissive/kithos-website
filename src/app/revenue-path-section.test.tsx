import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RevenuePathSection } from "./revenue-path-section";

class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

describe("RevenuePathSection", () => {
  it("keeps the section heading band and scroll-linked panels below it", () => {
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });
    Object.defineProperty(globalThis, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });

    render(<RevenuePathSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /A reasoning layer for the revenue workflow/i,
      }),
    ).toHaveAttribute("id", "revenue-path-heading");
    expect(
      screen.getByText(
        /Kithos builds a working understanding of your market/i,
      ),
    ).toBeInTheDocument();

    const nav = screen.getByRole("navigation", {
      name: /commercial reasoning/i,
    });

    const panelIds = ["knowledge", "accounts", "path", "outcomes"] as const;
    const navLabels: Record<(typeof panelIds)[number], string> = {
      knowledge: "Knowledge",
      accounts: "Accounts",
      path: "Path",
      outcomes: "Outcomes",
    };

    for (const id of panelIds) {
      expect(document.getElementById(id)).toBeInTheDocument();
      expect(within(nav).getByRole("link", { name: navLabels[id] })).toHaveAttribute(
        "href",
        `#${id}`,
      );
    }

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Kithos builds a commercial understanding of your market, accounts, buyers, and past outcomes/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /Collects the raw context/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: /Curates the context/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Find the accounts worth pursuing/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/worth your team's attention/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/real reason to engage/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Understand the path through each account/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/move the conversation forward/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Kithos is always learning/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/starts sharper than the last/i),
    ).toBeInTheDocument();
  });
});
