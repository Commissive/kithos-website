"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  PageColumn,
  PageGrid,
  PageShell,
  SectionEyebrow,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import { CapabilityArtifact } from "./capability-artifact";
import { GridBandCellVertices } from "./grid-band-cell";
import "./capability-section.css";

const CAPABILITY_SUBHEAD =
  "Kithos understands your product, reasons across your market and buyers, and points your team at winnable opportunities.";

const CAPABILITIES = [
  {
    id: "capability-find",
    phase: "Find the right accounts",
    body: "Kithos identifies the segments, signals, and accounts worth your team's attention.",
    artifact: {
      kind: "brief",
      label: "Account brief",
      source: "Kithos",
      updated: "2h ago",
      account: "Meridian Health Systems",
      industry: "Healthcare",
      stage: "Evaluation",
      meta: [
        { label: "Employees", value: "4,800" },
        { label: "HQ", value: "Chicago, IL" },
        { label: "ARR band", value: "$250M–$500M" },
      ],
      signals: [
        {
          tag: "Procurement",
          text: "The workflow RFP that stalled last year reopened Monday — and the new CFO ran this exact rollout at Apex before she joined.",
          when: "2d",
        },
        {
          tag: "Build risk",
          text: "Two RevOps analyst roles posted last week — Meridian may be staffing to build this in-house if the deal drifts.",
          when: "6d",
        },
        {
          tag: "Authority",
          text: "The CFO owns the margin mandate the RFP is funded against.",
          when: "4mo",
        },
      ],
      stakeholders: [
        {
          initials: "JL",
          name: "Jordan Lee",
          title: "Chief Financial Officer",
          role: "Economic buyer",
          status: "Engaged",
          tone: "hot",
        },
        {
          initials: "AM",
          name: "Aisha Malik",
          title: "VP Revenue Operations",
          role: "Champion",
          status: "Warm",
          tone: "warm",
        },
        {
          initials: "RK",
          name: "Raj Kumar",
          title: "Director, IT Security",
          role: "Gatekeeper",
          status: "Unknown",
          tone: "cold",
        },
      ],
    },
  },
  {
    id: "capability-shape",
    phase: "Shape the opportunity",
    body: "Kithos researches the account and buying group, identifies the strongest reason to engage, and frames the approach most likely to earn a conversation.",
    artifact: {
      kind: "outreach",
      label: "Draft outreach",
      source: "Gmail",
      from: "alex@kithos.ai",
      to: [
        {
          name: "Aisha Malik",
          email: "aisha.malik@meridianhealth.org",
        },
      ],
      subject: "Before you build it in-house",
      body: [
        "Hi Aisha — saw the workflow RFP reopened, and that you're hiring two RevOps analysts. If the plan is to run it in-house, the step that usually stalls is the security review — and Meridian's bar there is high.",
        "Jordan cleared this exact review in six weeks at Apex. Happy to send the SOC 2 evidence pack that got her security team to yes — it might save your new analysts the first quarter.",
      ],
      highlight: "the security review",
      footer: "Drafted from the account brief · within your messaging guardrails",
    },
  },
  {
    id: "capability-move",
    phase: "Move the deal forward",
    body: "Kithos keeps the full deal context in view, prepares your team for every interaction, and surfaces the risks and next moves that advance it.",
    artifact: {
      kind: "move",
      label: "Next best action",
      source: "Kithos",
      priority: "Recommended",
      confidence: 91,
      action: "Get Jordan and Raj in the same room before the security review — not after.",
      evidence: [
        "Raj blocks cold security reviews",
        "Jordan can frame it as margin risk",
        "Matches your last 3 healthcare wins",
      ],
      because:
        "When the economic buyer frames security before IT reviews it cold, your healthcare deals clear review 2.4× faster — cold reviews stalled 4 of your last 5 losses here.",
      similar: "Northwell · closed 38 days after a CFO + Security intro",
    },
  },
  {
    id: "capability-learn",
    phase: "Learn what to repeat",
    body: "Kithos captures what happened and why, identifies the patterns that work and applies them to every account and opportunity that follows.",
    artifact: {
      kind: "pattern",
      label: "Playbook update",
      source: "Kithos",
      period: "Across 14 closed healthcare deals",
      headline: "The economic buyer frames security before IT reviews it",
      stat: "clears review 2.4× faster",
      patterns: [
        {
          tone: "win",
          text: "CFO frames security as a margin risk, up front",
          evidence: "5 of last 6 wins",
        },
        {
          tone: "loss",
          text: "IT reviews the vendor cold, no exec air-cover",
          evidence: "4 of last 5 losses",
        },
      ],
      applied: "Playbook updated · flagged on 3 live deals reviewing cold",
    },
  },
] as const;

const STAGE_TINTS = [
  "var(--forest-tint)",
  "var(--terracotta-tint)",
  "var(--bone-shade)",
  "color-mix(in oklch, var(--forest-soft) 42%, var(--snow))",
] as const;

const REVEAL_SELECTOR = "[data-capability-reveal]";

export function CapabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [canRotate, setCanRotate] = useState(false);

  const advance = () =>
    setActive((prev) => (prev + 1) % CAPABILITIES.length);

  // Auto-advance unless motion is reduced — the carousel runs on both mobile
  // and desktop. The advance is driven by the active step's progress bar
  // finishing (see `onAnimationEnd` below), so the visible bar is the clock.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanRotate(!motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  // Scale the fixed-design product card down to fit the panel width — so the
  // full card reads as a responsive preview on mobile rather than reflowing
  // tall. Desktop has room, so the scale clamps to 1 (no shrink).
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const deck = root.querySelector<HTMLElement>(".capability-deck");
    const scene = root.querySelector<HTMLElement>(".capability-deck__scene");
    const card = scene?.querySelector<HTMLElement>(".capability-artifact");
    if (!deck || !scene || !card) return;
    const apply = () => {
      const scale = Math.min(1, scene.clientWidth / (card.offsetWidth || 1));
      deck.style.setProperty("--card-scale", scale.toFixed(4));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(scene);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR, root);
      const mm = gsap.matchMedia();

      bindScrollReveal(mm, targets, () => {
        gsap.set(targets, { y: 16, autoAlpha: 0 });

        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(targets, {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: "auto",
            });
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="capability-section relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            {/* Single column on mobile (heading → panel → steps); a two-
                column grid on desktop. Same carousel either way. */}
            <div className="capability-deck">
              <SectionHeadingStack className="capability-deck__intro">
                <SectionEyebrow data-capability-reveal>
                  What Kithos does
                </SectionEyebrow>
                <SectionHeadingTitle
                  id="capabilities-heading"
                  data-capability-reveal
                >
                  Win deals your team would otherwise lose.
                </SectionHeadingTitle>
                <SectionHeadingSupport data-capability-reveal>
                  {CAPABILITY_SUBHEAD}
                </SectionHeadingSupport>
              </SectionHeadingStack>

              <div
                className="capability-deck__stage"
                data-capability-reveal
                style={{ "--stage-tint": STAGE_TINTS[active] } as CSSProperties}
              >
                <GridBandCellVertices prefix="capability-stage" />
                {CAPABILITIES.map((capability, index) => (
                  <div
                    key={capability.id}
                    aria-hidden={index !== active}
                    className={`capability-deck__scene${
                      index === active ? " is-active" : ""
                    }`}
                  >
                    <CapabilityArtifact artifact={capability.artifact} />
                  </div>
                ))}
              </div>

              <ol className="capability-deck__steps" data-capability-reveal>
                {CAPABILITIES.map((capability, index) => {
                  const headingId = `${capability.id}-heading`;
                  const detailId = `${capability.id}-detail`;
                  const isActive = index === active;

                  return (
                    <li
                      key={capability.id}
                      id={capability.id}
                      className={`capability-deck__step${isActive ? " is-active" : ""}`}
                    >
                      <h3
                        id={headingId}
                        className="capability-deck__step-heading"
                      >
                        <button
                          type="button"
                          className="capability-deck__step-trigger"
                          aria-expanded={isActive}
                          aria-controls={detailId}
                          onClick={() => setActive(index)}
                        >
                          <span className="capability-deck__step-title body">
                            {capability.phase}
                          </span>
                          <span
                            className="capability-deck__step-index ui"
                            aria-hidden
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={detailId}
                        role="region"
                        aria-labelledby={headingId}
                        aria-hidden={!isActive}
                        className="capability-deck__step-detail"
                      >
                        <div className="capability-deck__step-detail-inner">
                          <p className="capability-deck__step-body body">
                            {capability.body}
                          </p>
                        </div>
                      </div>
                      {isActive && canRotate ? (
                        <span
                          className="capability-deck__progress"
                          aria-hidden
                          onAnimationEnd={advance}
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
