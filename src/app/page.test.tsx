import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

describe("Home hero", () => {
  it("keeps the hero headline and primary CTA inside a framed inset background", () => {
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
    const hero = container.querySelector(
      'section[aria-labelledby="hero-headline"]',
    );
    expect(hero).not.toBeNull();
    expect(
      within(hero as HTMLElement).getByRole("button", {
        name: /get early access/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /learn more/i })).toBeNull();
    expect(
      container.querySelector(
        'section[aria-labelledby="hero-headline"] img[aria-hidden="true"]',
      ),
    ).toHaveAttribute("src", "/hero/bg-purp.png");
    const heroFrame = container.querySelector(
      'section[aria-labelledby="hero-headline"] .hero__frame',
    );
    expect(heroFrame).not.toBeNull();
    expect(
      container.querySelector(
        'section[aria-labelledby="hero-headline"] [data-hero-surface]',
      ),
    ).toBeTruthy();
    expect(heroFrame?.querySelector("img[aria-hidden]")).toBeTruthy();

    expect(heroFrame?.querySelectorAll(".hero__scrim--horizontal")).toHaveLength(1);
    expect(heroFrame?.querySelectorAll(".hero__scrim--vertical")).toHaveLength(1);
  });

  it("renders a fixed site nav bar and removes shell border hairlines", () => {
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

    expect(nav).toHaveClass("nav-site");
    expect(nav.querySelector(".nav-site__inner")).not.toBeNull();
    expect(document.querySelector(".nav-site__spacer")).not.toBeNull();
    expect(nav.querySelector(".nav-site__brand")).not.toBeNull();
    const navButton = within(nav).getByRole("button", {
      name: /get early access/i,
    });
    expect(navButton.className).toMatch(/bg-\[var\(--accent\)\]/);
    expect(container.querySelector('[class*="border-x"]')).toBeNull();
  });
});
