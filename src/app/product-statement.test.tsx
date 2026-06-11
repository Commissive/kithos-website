import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductStatement } from "./product-statement";

describe("ProductStatement", () => {
  it("renders the section headline and environment scroll strip", () => {
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
    expect(
      screen.getByRole("list", { name: /Complex buying environments/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(14);
    expect(document.querySelectorAll(".pseg-scroll__cell")).toHaveLength(28);
    expect(
      document.querySelector(".pseg-scroll__marquee"),
    ).toHaveAttribute("style", "--pseg-marquee-duration: 48s;");
    expect(
      document.querySelectorAll('.pseg-scroll__cell:not([aria-hidden="true"])'),
    ).toHaveLength(14);
    expect(screen.getAllByText("Finance")).toHaveLength(2);
    expect(screen.getAllByText("Applied AI & ML")).toHaveLength(2);
    expect(screen.getAllByText("Defence")).toHaveLength(2);
    expect(screen.getAllByText("Construction")).toHaveLength(2);
    expect(
      document.querySelector(".product-statement__frame"),
    ).not.toBeNull();
    expect(
      document.querySelector(".product-statement__headline-copy"),
    ).not.toBeNull();
    expect(screen.queryByRole("heading", { level: 3, name: /Technical products/i })).toBeNull();
  });
});
