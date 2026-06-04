/* Vitest setup — extends `expect` with jest-dom matchers so tests
   can use `.toBeInTheDocument()`, `.toHaveTextContent()`, etc. */
import "@testing-library/jest-dom/vitest";

/** GSAP ScrollTrigger and matchMedia() require this in jsdom. */
function mockMatchMedia(matches = false) {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia(),
});
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: mockMatchMedia(),
});
