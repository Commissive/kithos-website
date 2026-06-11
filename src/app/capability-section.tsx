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
    body: "Kithos researches every account in your market — who is involved, what changed, and why now — and surfaces the ones that look like your best wins. The picture stays current as the deal moves.",
    outputs: ["Account briefs", "Buying signals", "Stakeholder maps"],
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
    body: "First touches and follow-ups grounded in the account's context and what has worked for your team before — built for markets where generic outreach is punished.",
    outputs: ["First touch", "Follow-ups", "Objection handling"],
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
    body: "Meeting prep drawn from everything Kithos knows — the buyer, the business, the open questions — and the next step that keeps the deal in motion.",
    outputs: ["Meeting prep", "Talking points", "Next-step plans"],
    artifact: {
      kind: "prep",
      label: "Meeting prep",
      source: "Google Calendar",
      event: {
        date: "Thu 14 Mar",
        time: "10:30",
        title: "Meridian × Kithos — workflow scope",
        attendees: ["Jordan Lee", "Aisha Malik", "You"],
      },
      sections: [
        {
          label: "Open with",
          items: [
            "Reference their Q3 outage post-mortem — published last Tuesday",
            "Acknowledge the RevOps hiring push as a signal of internal urgency",
          ],
        },
        {
          label: "Ask",
          items: [
            "Who owns budget for cross-team workflow tooling this quarter?",
            "What would a successful pilot look like before legal signs off?",
          ],
        },
        {
          label: "Watch for",
          items: [
            "Security review timeline — gatekeeper not yet on calendar",
            "CFO may defer scope questions to VP RevOps until RFP shortlist",
          ],
        },
      ],
    },
  },
  {
    id: "capability-learn",
    phase: "Learn what to repeat",
    body: "Kithos commits replies, objections, wins, and losses to memory, then recommends what should happen next with its reasoning shown — so what worked once becomes how your team sells.",
    outputs: ["Next best action", "Win and loss patterns", "Deal risks"],
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
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const rows = gsap.utils.toArray<HTMLElement>(ROW_SELECTOR, root);

      const mm = gsap.matchMedia();
      const targets = [...intro, ...rows];

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
                        Four jobs, <em>one system.</em>
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport data-capability-intro>
                      {CAPABILITY_SUBHEAD}
                    </SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>

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
                        <h3 id={headingId} className="capability-deck__heading">
                          <button
                            type="button"
                            className="capability-deck__trigger"
                            aria-expanded={isActive}
                            aria-controls={detailId}
                            onClick={() => setActive(index)}
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
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
