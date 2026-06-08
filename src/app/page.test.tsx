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
    const heroFrame = container.querySelector(
      'section[aria-labelledby="hero-headline"] .hero__frame',
    );
    expect(heroFrame).not.toBeNull();
    expect(
      container.querySelector(
        'section[aria-labelledby="hero-headline"] img[aria-hidden="true"]',
      ),
    ).toBeNull();
    expect(heroFrame?.querySelectorAll(".hero__scrim")).toHaveLength(0);
    expect(heroFrame?.querySelector(".hero__grid")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__grid-gutter--start")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__grid-gutter--end")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__grid-vline--trail-start")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__headline-band")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__headline-copy")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__content")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__tiles")).not.toBeNull();
    expect(heroFrame?.querySelectorAll(".hero__tile")).toHaveLength(4);
    expect(heroFrame?.querySelectorAll("[data-hero-rise]")).toHaveLength(3);
    expect(
      within(hero as HTMLElement).getByText(/platform for commercial reasoning/i),
    ).toBeInTheDocument();
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
