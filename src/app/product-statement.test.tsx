import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductStatement } from "./product-statement";

class MockResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

describe("ProductStatement", () => {
  it("renders the section headline and four category rows", () => {
    Object.defineProperty(window, "ResizeObserver", {
      writable: true,
      value: MockResizeObserver,
    });
    Object.defineProperty(globalThis, "ResizeObserver", {
      writable: true,
      value: MockResizeObserver,
    });

    render(<ProductStatement />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Engineered for teams selling into complex buying environments/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Where the right account is not always obvious and generic outreach is often punished/i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("The sales agent for")).not.toBeInTheDocument();
    expect(screen.queryByText("01.")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(document.querySelectorAll(".product-statement__row")).toHaveLength(4);
    expect(document.querySelectorAll(".product-statement__icon")).toHaveLength(0);
    expect(
      document.querySelector(".product-statement__frame"),
    ).not.toBeNull();
    expect(
      document.querySelector(".product-statement__headline-copy"),
    ).not.toBeNull();
    expect(document.querySelector(".product-statement__grid-cells")).toBeNull();
    expect(document.querySelector(".product-statement__grid")).toBeNull();
    expect(
      document.querySelector(".product-statement__grid-vline--content-start"),
    ).not.toBeNull();
    expect(
      document.querySelector(".product-statement__grid-vline--content-end"),
    ).not.toBeNull();
    expect(
      screen.getByRole("heading", { level: 3, name: /Technical products/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Regulated markets/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Emerging categories/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Operational workflow/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /technical evaluation, unclear budget ownership, and buyer education shape the sale/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/buyers care about risk, compliance, data handling, and credibility/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/who buys, and what turns interest into revenue/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /buying depends on change management and multiple internal users/i,
      ),
    ).toBeInTheDocument();
  });
});
