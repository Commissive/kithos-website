import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CommercialContextSection } from "./commercial-context-section";

describe("CommercialContextSection", () => {
  it("renders the section heading and default pillar panel", () => {
    render(<CommercialContextSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "The Commercial Context Engine.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Kithos collects what your team knows, curates what matters/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: "Collects" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Kithos asks, searches, and extracts.",
      }),
    ).toBeInTheDocument();
  });

  it("switches pillar panels when a tab is selected", () => {
    render(<CommercialContextSection />);

    fireEvent.click(screen.getByRole("tab", { name: "Compounds" }));

    expect(screen.getByRole("tab", { name: "Compounds" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Kithos builds commercial memory.",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Kithos asks, searches, and extracts/i)).toBeNull();
  });
});
