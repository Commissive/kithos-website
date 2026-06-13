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
  "Kithos does the reasoning work around every move, so your team spends its time selling.";

/** Dwell per move before the carousel advances. */
const ROTATE_MS = 5000;

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
          tag: "Leadership",
          text: "CFO joined four months ago; led a similar rollout at Apex Systems.",
          when: "4mo",
        },
        {
          tag: "Procurement",
          text: "Active RFP for workflow automation; legal review started Monday.",
          when: "2d",
        },
        {
          tag: "Hiring",
          text: "Ops reorg posted two RevOps analyst roles last week.",
          when: "6d",
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
      subject: "Re: Ops reorg and RevOps hiring",
      body: [
        "Hi Aisha — saw your team posted two RevOps analyst roles last week. That usually signals a push to tighten handoffs between Sales and Ops.",
        "Jordan Lee led a similar workflow rollout at Apex Systems before joining Meridian — happy to share what shortened their security review if a quick sync would help.",
      ],
      highlight: "two RevOps analyst roles",
      footer: "Personalized from account brief · Ready to send",
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
      confidence: 92,
      action: "Schedule 30 minutes with Jordan Lee and Aisha Malik",
      evidence: ["Both on RFP thread", "Similar deal won", "Champion warm"],
      because:
        "Exec alignment on workflow scope closed 3 of your last 5 comparable deals before security review.",
      similar: "Apex Systems · closed 41 days after CFO + Ops intro",
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
      period: "14 closed deals reviewed",
      headline: "CFO + Ops intro before security review",
      stat: "closes 2.4× faster",
      patterns: [
        {
          tone: "win",
          text: "Exec and Ops aligned before security review",
          evidence: "5 of last 6 wins",
        },
        {
          tone: "loss",
          text: "Single-threaded past evaluation stage",
          evidence: "4 of 5 losses",
        },
      ],
      applied: "Playbook updated · 3 live deals re-planned",
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
  const pausedRef = useRef(false);

  // Auto-advance only when the carousel is on screen (≥64rem) and motion is
  // allowed; tracks both so a resize or system-setting change flips it live.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 64rem)");
    const update = () => setCanRotate(wide.matches && !motion.matches);
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  // Timed switch through the four moves. Re-runs on `active` so a manual pick
  // resets the dwell; `pausedRef` holds it while the deck is hovered/focused.
  useEffect(() => {
    if (!canRotate) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % CAPABILITIES.length);
      }
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [canRotate, active]);

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
            <div
              className="capability-deck"
              onMouseEnter={() => {
                pausedRef.current = true;
              }}
              onMouseLeave={() => {
                pausedRef.current = false;
              }}
              onFocusCapture={() => {
                pausedRef.current = true;
              }}
              onBlurCapture={() => {
                pausedRef.current = false;
              }}
            >
              <div className="capability-deck__lead">
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
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div
                className="capability-deck__stage"
                data-capability-reveal
                style={
                  { "--stage-tint": STAGE_TINTS[active] } as CSSProperties
                }
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
            </div>

            {/* Mobile/tablet — four sequential story panels; the timed
                carousel is desktop-only. */}
            <div className="capability-panels">
              {CAPABILITIES.map((capability, index) => (
                <article
                  key={capability.id}
                  aria-labelledby={`${capability.id}-panel-heading`}
                  className="capability-panel"
                  style={
                    { "--stage-tint": STAGE_TINTS[index] } as CSSProperties
                  }
                >
                  <h3
                    id={`${capability.id}-panel-heading`}
                    className="capability-panel__job type-card-title"
                  >
                    <span className="capability-panel__marker" aria-hidden />
                    {capability.phase}
                  </h3>
                  <p className="capability-panel__body body">
                    {capability.body}
                  </p>
                  <div className="capability-panel__scene">
                    <CapabilityArtifact artifact={capability.artifact} />
                  </div>
                </article>
              ))}
            </div>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
