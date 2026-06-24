import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CapabilitySection } from "./capability-section";

/* Artifacts render twice — desktop stage and mobile inline scene — so
   queries expect at least one accessible instance. */
describe("CapabilitySection", () => {
  it("renders the three win jobs and stages each artifact when its job is selected", () => {
    render(<CapabilitySection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Win the accounts you choose\./i,
      }),
    ).toHaveAttribute("id", "capabilities-heading");

    const phases = [
      "Earn the conversation",
      "Keep the deal moving",
      "Get sharper every close",
    ];
    for (const phase of phases) {
      expect(
        screen.getByRole("button", { name: new RegExp(phase, "i") }),
      ).toBeInTheDocument();
    }

    // Earn is open by default — draft outreach staged
    expect(
      screen.getByRole("button", { name: /Earn the conversation/i }),
    ).toHaveAttribute("aria-expanded", "true");
    const outreach = screen.getAllByRole("complementary", {
      name: "Draft outreach",
    });
    expect(outreach.length).toBeGreaterThan(0);
    expect(outreach[0]).toHaveTextContent(/Before you build it in-house/i);

    // Keep the deal moving — next best action
    fireEvent.click(
      screen.getByRole("button", { name: /Keep the deal moving/i }),
    );
    expect(
      screen.getAllByText(/Get Jordan and Raj in the same room/i).length,
    ).toBeGreaterThan(0);

    // Get sharper every close — playbook update
    fireEvent.click(
      screen.getByRole("button", { name: /Get sharper every close/i }),
    );
    expect(
      screen.getAllByRole("complementary", { name: "Playbook update" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/4 of last 5 losses/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /Get sharper every close/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: /Earn the conversation/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
