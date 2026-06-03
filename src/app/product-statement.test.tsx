import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductStatement } from "./product-statement";

describe("ProductStatement", () => {
  it("renders the section headline and three category rows", () => {
    render(<ProductStatement />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Engineered for teams selling into complex buying environments/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Where the right account is not obvious, the buyer is not always the user/i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("The sales agent for")).not.toBeInTheDocument();
    expect(screen.queryByText("01.")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(document.querySelectorAll(".product-statement__row")).toHaveLength(3);
    expect(document.querySelectorAll(".product-statement__icon")).toHaveLength(3);
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
      screen.getByText(/workflow detail, product proof, and buyer education shape the sale/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/credibility, risk, compliance, and timing change how deals move/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/who buys, and what turns interest into revenue/i),
    ).toBeInTheDocument();
  });
});
