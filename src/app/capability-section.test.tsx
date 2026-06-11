import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CapabilitySection } from "./capability-section";

describe("CapabilitySection", () => {
  it("renders the concrete capability jobs and output previews", () => {
    render(<CapabilitySection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /From account research to the next conversation\./i,
      }),
    ).toHaveAttribute("id", "capabilities-heading");

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Know the account before you reach out/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Meeting prep/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Meridian Health Systems")).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Draft outreach" }),
    ).toHaveTextContent(/Re: Ops reorg and RevOps hiring/i);
    expect(
      screen.getByRole("complementary", { name: "Draft outreach" }),
    ).toHaveTextContent(/Jordan Lee led a similar workflow rollout at Apex Systems/i);
    expect(
      screen.getByRole("complementary", { name: "Meeting prep" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Schedule 30 minutes with Jordan Lee and Aisha Malik/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Jordan Lee").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/aisha.malik@meridianhealth.org/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Open with")).toBeInTheDocument();
    expect(screen.getByText(/Similar deal won/i)).toBeInTheDocument();
  });
});
