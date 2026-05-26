import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

describe("Home hero", () => {
  it("keeps the hero headline and how-it-works link while using the new full-screen background", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => ({
        matches: false,
        media: "",
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });
    Object.defineProperty(globalThis, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });

    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /revenue/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute(
      "href",
      "#how-it-works",
    );
    expect(
      container.querySelector(
        'section[aria-labelledby="hero-headline"] img[aria-hidden="true"]',
      ),
    ).toHaveAttribute("src", "/hero/kithos-bg.png");
    expect(
      container.querySelector(
        'section[aria-labelledby="hero-headline"] > .page-shell',
      ),
    ).toBeNull();
    expect(
      container.querySelector(
        'section[aria-labelledby="hero-headline"] [data-hero-surface]',
      )?.className,
    ).toMatch(/top-\[calc\(var\(--nav-h\)\*-1\)\]/);

    expect(container.querySelectorAll('[style*="var(--hero-scrim-horizontal)"]')).toHaveLength(1);
    expect(container.querySelectorAll('[style*="var(--hero-scrim-vertical)"]')).toHaveLength(1);
  });

  it("renders the nav as a transparent overlay and removes shell border hairlines", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => ({
        matches: false,
        media: "",
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });
    Object.defineProperty(globalThis, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });

    const { container } = render(<Home />);
    const nav = screen.getByRole("navigation", { name: /primary/i });
    const navFrame = nav.querySelector("[data-nav-frame]");
    const navButton = within(nav).getByRole("button", { name: /get early access/i });

    expect(nav.className).not.toMatch(/border-b/);
    expect(navFrame?.className).toMatch(/lg:col-start-2/);
    expect(navFrame?.className).toMatch(/lg:col-span-10/);
    expect(navButton.className).toMatch(/bg-\[var\(--bone\)\]/);
    expect(container.querySelector('[class*="border-x"]')).toBeNull();
  });
});
