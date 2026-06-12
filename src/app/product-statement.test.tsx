import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductStatement } from "./product-statement";

describe("ProductStatement", () => {
  it("renders the headline and three complexity archetypes", () => {
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

    for (const name of [
      "Regulated markets",
      "Technical products",
      "Industrial operations",
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }

    for (const why of [
      /Trust and process gate every deal/i,
      /Nothing sells until the problem is understood/i,
      /buyer is rarely the user/i,
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: why }),
      ).toBeInTheDocument();
    }

    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Applied AI & ML")).toBeInTheDocument();
    expect(screen.getByText("Construction")).toBeInTheDocument();
    expect(document.querySelectorAll(".ps-archetype__cell")).toHaveLength(14);
    expect(
      screen.getByText(/harder than the demo/i),
    ).toBeInTheDocument();
  });
});
