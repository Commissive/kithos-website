import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  CONTENT_WIDTH_CARD_MIN_HEIGHT,
  ContentWidthCard,
} from "./content-width-card";

describe("ContentWidthCard", () => {
  it("renders step index, headline, and body", () => {
    render(
      <ContentWidthCard
        stepIndex={0}
        headline="Win deals you would otherwise lose."
        body="Know which opportunities deserve attention."
      />,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /win deals you would otherwise lose/i,
    );
    expect(
      screen.getByText(/know which opportunities deserve attention/i),
    ).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("spans the content column at full width", () => {
    const { container } = render(
      <ContentWidthCard
        stepIndex={0}
        headline="Win deals you would otherwise lose."
        body="Know which opportunities deserve attention."
      />,
    );
    const card = container.querySelector("article");
    expect(card).toHaveClass("w-full");
    expect(card).toHaveStyle({ minHeight: CONTENT_WIDTH_CARD_MIN_HEIGHT });
  });
});
