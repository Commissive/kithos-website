import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CapabilitySection } from "./capability-section";

/* Artifacts render twice — desktop stage and mobile inline scene — so
   queries expect at least one accessible instance. */
describe("CapabilitySection", () => {
  it("renders the four jobs and stages each artifact when its job is selected", () => {
    render(<CapabilitySection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Win deals your team would otherwise lose\./i,
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

    // Find is open by default — account brief staged
    expect(
      screen.getByRole("button", { name: /Find the right accounts/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Find the right accounts/i,
      }),
    ).toBeInTheDocument();
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
    expect(outreach[0]).toHaveTextContent(/Re: Ops reorg and RevOps hiring/i);
    expect(outreach[0]).toHaveTextContent(
      /Jordan Lee led a similar workflow rollout at Apex Systems/i,
    );

    // Move — meeting prep
    fireEvent.click(
      screen.getByRole("button", { name: /Move the deal forward/i }),
    );
    expect(
      screen.getAllByRole("complementary", { name: "Meeting prep" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Open with").length).toBeGreaterThan(0);

    // Learn — next best action with its reasoning
    fireEvent.click(
      screen.getByRole("button", { name: /Learn what to repeat/i }),
    );
    expect(
      screen.getAllByText(
        /Schedule 30 minutes with Jordan Lee and Aisha Malik/i,
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/Similar deal won/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /Learn what to repeat/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: /Find the right accounts/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
