"use client";

import { useRef } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import {
  CapabilityArtifact,
  type ArtifactPreview,
} from "./capability-artifact";
import "./capability-section.css";

const CAPABILITY_SUBHEAD =
  "Kithos does the reasoning work around every move, so your team spends its time selling.";

/* Micro-glyphs — same drawn-instrument vocabulary as the workflow diagrams. */
function glyphProps() {
  return {
    viewBox: "0 0 28 28",
    "aria-hidden": true as const,
    className: "capability-glyph",
  };
}

function GlyphReticle() {
  return (
    <svg {...glyphProps()}>
      <line x1={0} y1={14} x2={28} y2={14} />
      <line x1={14} y1={0} x2={14} y2={28} />
      <rect x={10.5} y={10.5} width={7} height={7} className="is-fill" />
      <path d="M5 8 v-3 h3" fill="none" />
      <path d="M20 5 h3 v3" fill="none" />
      <path d="M23 20 v3 h-3" fill="none" />
      <path d="M8 23 h-3 v-3" fill="none" />
    </svg>
  );
}

function GlyphPath() {
  return (
    <svg {...glyphProps()}>
      <path d="M3 24 V14 H14 V5 H25" fill="none" />
      <rect x={1} y={22} width={4} height={4} />
      <rect x={12} y={12} width={4} height={4} />
      <rect x={23} y={3} width={4} height={4} className="is-fill" />
    </svg>
  );
}

function GlyphBrief() {
  return (
    <svg {...glyphProps()}>
      <rect x={4} y={2.5} width={20} height={23} fill="none" />
      <line x1={8} y1={9} x2={20} y2={9} />
      <line x1={8} y1={14} x2={20} y2={14} />
      <line x1={8} y1={19} x2={15} y2={19} />
      <rect x={17} y={17.5} width={3} height={3} className="is-fill" />
    </svg>
  );
}

function GlyphNext() {
  return (
    <svg {...glyphProps()}>
      <line x1={18} y1={2} x2={18} y2={26} strokeDasharray="2.5 2.5" />
      <line x1={2} y1={14} x2={22} y2={14} />
      <path d="M19 10 l4 4 -4 4" fill="none" />
      <rect x={0.5} y={12} width={4} height={4} className="is-fill" />
    </svg>
  );
}

const CAPABILITIES = [
  {
    id: "capability-research",
    title: "Know the account before you reach out",
    body: "Kithos researches every account that matters — who is involved, what changed, and why now — and keeps the picture current as the deal moves.",
    outputs: ["Account briefs", "Stakeholder maps", "Buying signals"],
    Glyph: GlyphReticle,
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
    id: "capability-outreach",
    title: "Outreach relevant enough to earn a reply",
    body: "Messages grounded in the account's context and what has worked for your team before — built for markets where generic outreach is punished.",
    outputs: ["First touch", "Follow-ups", "Objection handling"],
    Glyph: GlyphPath,
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
    id: "capability-meetings",
    title: "Walk into first conversations prepared",
    body: "Meeting prep drawn from everything Kithos knows: the buyer, the business, the open questions, and the moves that advanced similar deals.",
    outputs: ["Meeting prep", "Talking points", "Next-step plans"],
    Glyph: GlyphBrief,
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
    id: "capability-judgment",
    title: "Always know the next move — and why",
    body: "Kithos recommends what should happen next and shows its reasoning, so judgment stays with your team and sharpens with every outcome.",
    outputs: ["Next best action", "Deal risks", "Win and loss patterns"],
    Glyph: GlyphNext,
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

const INTRO_SELECTOR = "[data-capability-intro]";
const ROW_SELECTOR = "[data-capability-row]";

export function CapabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);

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
                  <SectionHeadingTitle
                    id="capabilities-heading"
                    data-capability-intro
                  >
                    From account research to the <em>next conversation.</em>
                  </SectionHeadingTitle>
                  <SectionHeadingSupport data-capability-intro>
                    {CAPABILITY_SUBHEAD}
                  </SectionHeadingSupport>
                </SectionHeadingStack>
              </SectionHeadingBand>

              <div className="capability-ledger" role="list">
                {CAPABILITIES.map((capability) => {
                  const headingId = `${capability.id}-heading`;
                  const { Glyph } = capability;

                  return (
                    <article
                      key={capability.id}
                      id={capability.id}
                      role="listitem"
                      aria-labelledby={headingId}
                      data-capability-row
                      className="capability-ledger__row"
                    >
                      <span className="capability-ledger__mark" aria-hidden>
                        <Glyph />
                      </span>
                      <h3
                        id={headingId}
                        className="capability-ledger__title type-card-title"
                      >
                        {capability.title}
                      </h3>
                      <div className="capability-ledger__detail">
                        <p className="capability-ledger__body body">
                          {capability.body}
                        </p>
                        <ul
                          className="capability-ledger__outputs"
                          aria-label="What you get"
                        >
                          {capability.outputs.map((output) => (
                            <li
                              key={output}
                              className="capability-ledger__output ui"
                            >
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <CapabilityArtifact artifact={capability.artifact} />
                    </article>
                  );
                })}
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
