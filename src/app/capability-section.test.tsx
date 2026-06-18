import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CapabilitySection } from "./capability-section";

/* Artifacts render twice — desktop stage and mobile inline scene — so
   queries expect at least one accessible instance. */
describe("CapabilitySection", () => {
  it("renders the five jobs and stages each artifact when its job is selected", () => {
    render(<CapabilitySection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Win deals your team would otherwise lose\./i,
      }),
    ).toHaveAttribute("id", "capabilities-heading");

    const phases = [
      "Define your ICP",
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

    // Define is open by default — the ICP profile staged
    expect(
      screen.getByRole("button", { name: /Define your ICP/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getAllByRole("complementary", { name: "Ideal customer profile" })
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Mid-market health systems with stalled procurement/i,
      ).length,
    ).toBeGreaterThan(0);

    // Find — the account brief
    fireEvent.click(
      screen.getByRole("button", { name: /Find the right accounts/i }),
    );
    expect(
      screen.getAllByText("Meridian Health Systems").length,
    ).toBeGreaterThan(0);

    // Shape — draft outreach
    fireEvent.click(
      screen.getByRole("button", { name: /Shape the opportunity/i }),
    );
    const outreach = screen.getAllByRole("complementary", {
      name: "Draft outreach",
    });
    expect(outreach.length).toBeGreaterThan(0);
    expect(outreach[0]).toHaveTextContent(/Before you build it in-house/i);
    expect(outreach[0]).toHaveTextContent(
      /Jordan cleared this exact review in six weeks at Apex/i,
    );

    // Move — next best action with its reasoning
    fireEvent.click(
      screen.getByRole("button", { name: /Move the deal forward/i }),
    );
    expect(
      screen.getAllByText(/Get Jordan and Raj in the same room/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Matches your last 3 healthcare wins/i).length,
    ).toBeGreaterThan(0);

    // Learn — playbook update with win and loss patterns
    fireEvent.click(
      screen.getByRole("button", { name: /Learn what to repeat/i }),
    );
    expect(
      screen.getAllByRole("complementary", { name: "Playbook update" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/4 of last 5 losses/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Playbook updated · flagged on 3 live deals reviewing cold/i,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /Learn what to repeat/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: /Find the right accounts/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
