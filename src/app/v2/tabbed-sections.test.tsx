import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TabbedSections } from "./tabbed-sections";

/* Semantic-structure tests for TabbedSections. We assert the shape
   that screen readers and crawlers depend on (region name, ordered
   list, heading levels) rather than visual layout — visual layout
   is covered by Playwright snapshots against a real browser. */

describe("TabbedSections", () => {
  it("exposes the pentagon heading as the section's accessible name", () => {
    render(<TabbedSections />);
    const section = screen.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    expect(section).toBeInTheDocument();
  });

  it("renders an ordered list with exactly five step items", () => {
    render(<TabbedSections />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(5);
  });

  it("uses h2 for the section heading and h3 for each step", () => {
    render(<TabbedSections />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent(/kithos gives you the tools/i);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s).toHaveLength(5);
  });

  it("renders headlines in the expected sequence", () => {
    render(<TabbedSections />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s[0]).toHaveTextContent(
      /unify context into a commercial system of action/i,
    );
    expect(h3s[1]).toHaveTextContent(/find the right accounts/i);
    expect(h3s[2]).toHaveTextContent(/move the right deals forward/i);
    expect(h3s[3]).toHaveTextContent(/build the playbook as you sell/i);
    expect(h3s[4]).toHaveTextContent(/get your reps in/i);
  });

  it("terminates every step headline with a period (copy consistency)", () => {
    render(<TabbedSections />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    for (const h of h3s) {
      expect(h.textContent?.trim().endsWith(".")).toBe(true);
    }
  });

  it("embeds the integration marquee in step 01 only", () => {
    render(<TabbedSections />);
    // The marquee track applies the `.integration-marquee` class; we
    // use it as a structural marker. If we restyle the marquee later
    // this assertion needs the same selector updated in lock-step.
    const marquees = document.querySelectorAll(".integration-marquee");
    expect(marquees).toHaveLength(1);
  });

  it("marks decorative SVGs and the number tile as aria-hidden", () => {
    render(<TabbedSections />);
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    for (const li of items) {
      const tile = li.querySelector('[aria-hidden="true"]');
      expect(tile).not.toBeNull();
    }
  });
});
