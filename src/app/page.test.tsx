import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

class MockResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

function mockBrowserObservers() {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: MockResizeObserver,
  });
  Object.defineProperty(globalThis, "ResizeObserver", {
    writable: true,
    value: MockResizeObserver,
  });
}

describe("Home hero", () => {
  it("renders the hero as a two-column copy/grid layout with the headline and primary CTA", () => {
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
    mockBrowserObservers();

    const { container } = render(<Home />);

    const headline = screen.getByRole("heading", {
      level: 1,
      // \s instead of literal spaces — the headline glues words with &nbsp;.
      name: /repeatable\srevenue\.\s*without\sthe\sguesswork\./i,
    });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveClass("type-hero");
    expect(headline.querySelectorAll(".hero__headline-line")).toHaveLength(2);
    expect(headline.querySelectorAll(".hero__headline-line")[1]).toHaveTextContent(
      "Without the guesswork.",
    );
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
    // Two columns: the copy block and the decorative grid field.
    expect(heroFrame?.querySelector(".hero__copy")).not.toBeNull();
    expect(heroFrame?.querySelector(".hero__grid")).not.toBeNull();
    expect(
      container.querySelector(".site-grid-vline--content-start"),
    ).not.toBeNull();
    expect(
      container.querySelector(".site-grid-vline--content-end"),
    ).not.toBeNull();
    // The headline, pill, and lead all live inside the copy column.
    const heroCopy = heroFrame?.querySelector(".hero__copy");
    expect(heroCopy?.querySelector("#hero-headline")).not.toBeNull();
    expect(heroCopy?.querySelector(".hero__lead")).not.toBeNull();
    // Pill, headline, and lead each rise in.
    expect(heroFrame?.querySelectorAll("[data-hero-rise]")).toHaveLength(3);
    expect(heroFrame?.querySelector(".hero__pill")).toHaveTextContent(
      "The platform for commercial reasoning.",
    );
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
    mockBrowserObservers();

    const { container } = render(<Home />);
    const nav = screen.getByRole("navigation", { name: /primary/i });

    expect(nav).toHaveClass("nav-site");
    expect(nav.querySelector(".nav-site__inner")).not.toBeNull();
    expect(document.querySelector(".nav-site__spacer")).not.toBeNull();
    expect(nav.querySelector(".nav-site__brand")).not.toBeNull();
    // Two access CTAs live in the nav now: the inline desktop button and the
    // one inside the mobile menu. Both are the accent "Get early access".
    const navButtons = within(nav).getAllByRole("button", {
      name: /get early access/i,
    });
    expect(navButtons.length).toBeGreaterThanOrEqual(1);
    expect(
      navButtons.some((button) =>
        /bg-\[var\(--accent\)\]/.test(button.className),
      ),
    ).toBe(true);
    expect(container.querySelector('[class*="border-x"]')).toBeNull();
  });
});
