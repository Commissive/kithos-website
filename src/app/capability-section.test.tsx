import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CapabilitySection } from "./capability-section";

describe("CapabilitySection", () => {
  it("renders the four jobs and stages each artifact when its job is selected", () => {
    render(<CapabilitySection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Four jobs, one system\./i,
      }),
    ).toHaveAttribute("id", "capabilities-heading");

    const phases = [
      "Find the right accounts",
      "Shape the opportunity",
      "Move the deal forward",
      "Learn what to repeat",
    ];
    for (const phase of phases) {
      expect(
        screen.getByRole("button", { name: new RegExp(phase, "i") }),
      ).toBeInTheDocument();
    }

    // Find is open by default — account brief on stage
    expect(
      screen.getByRole("button", { name: /Find the right accounts/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Find the right accounts/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Meridian Health Systems")).toBeInTheDocument();

    // Shape — draft outreach
    fireEvent.click(
      screen.getByRole("button", { name: /Shape the opportunity/i }),
    );
    const outreach = screen.getByRole("complementary", {
      name: "Draft outreach",
    });
    expect(outreach).toHaveTextContent(/Re: Ops reorg and RevOps hiring/i);
    expect(outreach).toHaveTextContent(
      /Jordan Lee led a similar workflow rollout at Apex Systems/i,
    );
    expect(
      screen.getByText(/aisha.malik@meridianhealth.org/i),
    ).toBeInTheDocument();

    // Move — meeting prep
    fireEvent.click(
      screen.getByRole("button", { name: /Move the deal forward/i }),
    );
    expect(
      screen.getByRole("complementary", { name: "Meeting prep" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Open with")).toBeInTheDocument();

    // Learn — next best action with its reasoning
    fireEvent.click(
      screen.getByRole("button", { name: /Learn what to repeat/i }),
    );
    expect(
      screen.getByText(/Schedule 30 minutes with Jordan Lee and Aisha Malik/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Similar deal won/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Learn what to repeat/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: /Find the right accounts/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
