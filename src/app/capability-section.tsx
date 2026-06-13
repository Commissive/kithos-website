"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingRow,
  SectionHeadingRowTitle,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import {
  CapabilityArtifact,
  type ArtifactPreview,
} from "./capability-artifact";
import { GridBandCellVertices } from "./grid-band-cell";
import "./capability-section.css";

const CAPABILITY_SUBHEAD =
  "Kithos does the reasoning work around every move, so your team spends its time selling.";

const CAPABILITIES = [
  {
    id: "capability-find",
    phase: "Find the right accounts",
    body: "Kithos works out where your product wins — which market, which profile, which accounts — then researches and ranks every target: who is involved, what changed, why now. Your team starts each week knowing where its time should go.",
    outputs: ["Market focus", "ICP refinement", "Ranked target accounts"],
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
    body: "Kithos works out why this account, why now — the pain, the trigger, the people who actually decide — then plans the approach: outreach in your market's language, honest qualification, prep for the first conversation. You approve, it sends.",
    outputs: ["Pain & trigger analysis", "Buyer maps", "Outreach plans", "Meeting prep"],
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
    body: "Every live deal gets a strategy — who to win over next, what proof they need, which objection is coming — and every conversation ends with the follow-up planned, drafted, and moving.",
    outputs: ["Deal strategy", "Stakeholder navigation", "Value cases", "Objection handling"],
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
    body: "Every reply, objection, win, and loss becomes memory. Kithos turns your own outcomes into the playbook — which accounts to chase, which moves close, which risks kill — so your best seller's judgment becomes the whole team's default.",
    outputs: ["Win & loss analysis", "Playbook updates", "Next best action"],
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

const INTRO_SELECTOR = "[data-capability-intro]";
const ROW_SELECTOR = "[data-capability-deck]";

export function CapabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const selectJob = (index: number) => {
    activeRef.current = index;
    setActive(index);

    // In pinned mode the scroll position owns the active job — move to its segment.
    const scrub = scrubRef.current;
    if (scrub) {
      const target =
        scrub.start +
        ((index + 0.5) / CAPABILITIES.length) * (scrub.end - scrub.start);
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const rows = gsap.utils.toArray<HTMLElement>(ROW_SELECTOR, root);

      const mm = gsap.matchMedia();
      const targets = [...intro, ...rows];

      // Pinned mode — the deck sticks while scroll progress walks the four jobs.
      mm.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const deck = track?.querySelector<HTMLElement>(
            "[data-capability-deck]",
          );
          if (!track || !deck) return;

          const scrub = ScrollTrigger.create({
            trigger: track,
            start: () =>
              `top ${Math.round(Number.parseFloat(getComputedStyle(deck).top)) || 0}`,
            end: () => `+=${track.offsetHeight - deck.offsetHeight}`,
            onUpdate: (self) => {
              const next = Math.min(
                CAPABILITIES.length - 1,
                Math.floor(self.progress * CAPABILITIES.length),
              );
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActive(next);
              }
            },
          });
          scrubRef.current = scrub;

          return () => {
            scrubRef.current = null;
            scrub.kill();
          };
        },
      );

      bindScrollReveal(mm, targets, () => {
        gsap.set(intro, { y: 18, autoAlpha: 0 });
        gsap.set(rows, { y: 14, autoAlpha: 0 });

        const introTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(intro, {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: "auto",
            });
          },
        });

        const rowBatch = ScrollTrigger.batch(rows, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
              overwrite: "auto",
            });
          },
        });

        return () => {
          introTrigger.kill();
          rowBatch.forEach((st) => st.kill());
        };
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
            <PageGridProse>
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow data-capability-intro>
                    What Kithos does
                  </SectionEyebrow>
                  <SectionHeadingRow>
                    <SectionHeadingRowTitle>
                      <SectionHeadingTitle
                        id="capabilities-heading"
                        data-capability-intro
                      >
                        Win deals your team would otherwise lose.
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport data-capability-intro>
                      {CAPABILITY_SUBHEAD}
                    </SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>
            </PageGridProse>

            <div ref={trackRef} className="capability-deck-track">
                <div className="capability-deck" data-capability-deck>
                  <div className="capability-deck__list">
                    {CAPABILITIES.map((capability, index) => {
                      const headingId = `${capability.id}-heading`;
                      const detailId = `${capability.id}-detail`;
                      const isActive = index === active;

                      return (
                        <div
                          key={capability.id}
                          id={capability.id}
                          className={`capability-deck__item${isActive ? " is-active" : ""}`}
                        >
                          <h3
                            id={headingId}
                            className="capability-deck__heading"
                          >
                            <button
                              type="button"
                              className="capability-deck__trigger"
                              aria-expanded={isActive}
                              aria-controls={detailId}
                              onClick={() => selectJob(index)}
                            >
                              <span
                                className="capability-deck__marker"
                                aria-hidden
                              />
                              <span className="capability-deck__job type-card-title">
                                {capability.phase}
                              </span>
                            </button>
                          </h3>
                          <div
                            id={detailId}
                            role="region"
                            aria-labelledby={headingId}
                            aria-hidden={!isActive}
                            className="capability-deck__detail"
                          >
                            <div className="capability-deck__detail-inner">
                              <p className="capability-deck__body body">
                                {capability.body}
                              </p>
                              <ul
                                className="capability-deck__outputs"
                                aria-label="What you get"
                              >
                                {capability.outputs.map((output) => (
                                  <li
                                    key={output}
                                    className="capability-deck__output"
                                  >
                                    {output}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="capability-deck__stage"
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
              </div>

              {/* Mobile/tablet — four sequential story panels; nothing is
                  hidden behind a tap. The interactive deck is desktop-only. */}
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
                    <ul
                      className="capability-deck__outputs"
                      aria-label="What you get"
                    >
                      {capability.outputs.map((output) => (
                        <li key={output} className="capability-deck__output">
                          {output}
                        </li>
                      ))}
                    </ul>
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
