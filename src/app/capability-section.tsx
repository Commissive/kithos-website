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
import { SectionRule } from "./section-rule";
import "./capability-section.css";

const CAPABILITIES = [
  {
    id: "capability-define",
    phase: "Define your ICP",
    body: "Kithos reasons across your wins, losses, and product to define the segments and buyer profile worth your team's focus.",
    artifact: {
      kind: "segment",
      label: "Ideal customer profile",
      source: "Kithos",
      basis: "Reasoned from 14 closed deals",
      headline: "Mid-market health systems with stalled procurement",
      stat: "fits 5 of your last 6 wins",
      criteria: [
        "Revenue $250M–$500M",
        "Reopened workflow RFP",
        "CFO owns the funded mandate",
      ],
      because:
        "Cold-segment outreach stalled 2× as often — focus here and the motion compounds.",
      applied: "Sharpens with every close · feeds account selection",
    },
  },
  {
    id: "capability-find",
    phase: "Find the right accounts",
    body: "Within that profile, Kithos surfaces the accounts and the why-now signals worth acting on first.",
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

// `phase` and `body` are per-section copy: the pursuit/win sets reuse a
// capability's artifact but override its headline and description, so widen
// both off the `as const` literal union to plain strings.
export type Capability = Omit<
  (typeof CAPABILITIES)[number],
  "id" | "phase" | "body"
> & {
  id: string;
  phase: string;
  body: string;
};

export const ACCOUNT_PURSUIT_SUBHEAD =
  "Less guesswork across the whole market. More effort on segments and accounts that can close.";

export const ACCOUNT_PURSUIT_CAPABILITIES = [
  {
    ...CAPABILITIES[0],
    id: "capability-establish-focus",
    phase: "Know where to focus",
    body:
      "Your team stops debating ICP in the abstract. Priority segments, use cases, and buyers become clear enough to act on.",
  },
  {
    ...CAPABILITIES[1],
    phase: "See which accounts matter now",
    body:
      "You know which accounts to work first — and why now is the moment to engage.",
  },
] as const satisfies readonly Capability[];

export const WIN_ACCOUNTS_SUBHEAD =
  "The right accounts still stall without the right approach. Your team shows up prepared, advances with clarity, and learns what to repeat.";

export const WIN_ACCOUNTS_CAPABILITIES = [
  {
    ...CAPABILITIES[2],
    phase: "Earn the conversation",
    body:
      "Your first message lands with a credible reason to engage — not a template. You enter each conversation knowing why this account, why now, and what matters to them.",
  },
  {
    ...CAPABILITIES[3],
    phase: "Keep the deal moving",
    body:
      "Every meeting ends with a clear next move — owner, objective, and evidence. Deals don't drift because context and risks stay in view between interactions.",
  },
  {
    ...CAPABILITIES[4],
    phase: "Get sharper every close",
    body:
      "What worked and what didn't becomes visible across the team, so the next account starts with sharper judgment than the last.",
  },
] as const satisfies readonly Capability[];

const STAGE_TINTS = [
  "color-mix(in oklch, var(--forest-soft) 32%, var(--snow))",
  "var(--forest-tint)",
  "var(--terracotta-tint)",
  "var(--bone-shade)",
  "color-mix(in oklch, var(--forest-soft) 42%, var(--snow))",
] as const;

export const WIN_ACCOUNTS_STAGE_TINTS = [
  STAGE_TINTS[2],
  STAGE_TINTS[3],
  STAGE_TINTS[4],
] as const;

export const ACCOUNT_PURSUIT_STAGE_TINTS = [STAGE_TINTS[0], STAGE_TINTS[1]] as const;

const REVEAL_SELECTOR = "[data-capability-reveal]";

export type CapabilitySectionProps = {
  sectionId?: string;
  headingId?: string;
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  idPrefix?: string;
  capabilities?: readonly Capability[];
  autoAdvance?: boolean;
  stageTints?: readonly string[];
};

const CAPABILITY_SECTION_DEFAULTS = {
  sectionId: "capabilities",
  headingId: "capabilities-heading",
  eyebrow: "How to win",
  headline: "Win the accounts you choose.",
  subhead: WIN_ACCOUNTS_SUBHEAD,
  idPrefix: "",
  capabilities: WIN_ACCOUNTS_CAPABILITIES,
} as const;

export function CapabilitySection({
  sectionId = CAPABILITY_SECTION_DEFAULTS.sectionId,
  headingId = CAPABILITY_SECTION_DEFAULTS.headingId,
  eyebrow = CAPABILITY_SECTION_DEFAULTS.eyebrow,
  headline = CAPABILITY_SECTION_DEFAULTS.headline,
  subhead = CAPABILITY_SECTION_DEFAULTS.subhead,
  idPrefix = CAPABILITY_SECTION_DEFAULTS.idPrefix,
  capabilities = CAPABILITY_SECTION_DEFAULTS.capabilities,
  autoAdvance = true,
  stageTints = STAGE_TINTS,
}: CapabilitySectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [canRotate, setCanRotate] = useState(false);

  // Pause signals for the auto-advance (WCAG 2.2.2 — auto-updating content
  // longer than 5s needs a way to pause). Tracked separately and combined at
  // render: hover/focus give the user control (they pause by reading), and the
  // off-screen / hidden-tab signals stop the carousel cycling past content
  // nobody is looking at. The dwell bar freezes via `animation-play-state` and
  // resumes from the same point — see `[data-paused]` in the CSS.
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [onscreen, setOnscreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const count = capabilities.length;
  // Clamp at render so a caller swapping in a shorter set can never index out
  // of range — derived, so no extra render is needed to correct it.
  const activeIndex = active < count ? active : 0;
  const paused =
    canRotate && (hovered || focusWithin || !onscreen || !tabVisible);

  const advance = () =>
    setActive((prev) => (count > 0 ? (prev + 1) % count : prev));

  // Auto-advance unless motion is reduced — the carousel runs on both mobile
  // and desktop. The advance is driven by the active step's progress bar
  // finishing (see `onAnimationEnd` below), so the visible bar is the clock.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanRotate(autoAdvance && !motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, [autoAdvance]);

  // Pause while the section is scrolled out of view.
  useEffect(() => {
    if (!autoAdvance) return;
    const root = sectionRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOnscreen(entry?.isIntersecting ?? true),
      { threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [autoAdvance]);

  // Pause while the tab is hidden — the dwell bar shouldn't run in the
  // background and snap several steps forward when the user returns.
  useEffect(() => {
    if (!autoAdvance) return;
    const sync = () => setTabVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [autoAdvance]);

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
      id={sectionId}
      aria-labelledby={headingId}
      className="capability-section relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            {/* Single column on mobile (heading → panel → steps); a two-
                column grid on desktop. Same carousel either way. */}
            <div
              className="capability-deck"
              data-paused={paused || undefined}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
              onFocus={() => setFocusWithin(true)}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  setFocusWithin(false);
                }
              }}
            >
              <SectionHeadingStack className="capability-deck__intro">
                <SectionEyebrow data-capability-reveal>
                  {eyebrow}
                </SectionEyebrow>
                <SectionHeadingTitle
                  id={headingId}
                  data-capability-reveal
                >
                  {headline}
                </SectionHeadingTitle>
                <SectionHeadingSupport data-capability-reveal>
                  {subhead}
                </SectionHeadingSupport>
              </SectionHeadingStack>

              <div
                className="capability-deck__stage"
                data-capability-reveal
                style={
                  {
                    "--stage-tint":
                      stageTints[activeIndex] ??
                      stageTints[stageTints.length - 1],
                  } as CSSProperties
                }
              >
                <GridBandCellVertices prefix="capability-stage" />
                {capabilities.map((capability, index) => (
                  <div
                    key={`${idPrefix}${capability.id}`}
                    aria-hidden={index !== activeIndex}
                    className={`capability-deck__scene${
                      index === activeIndex ? " is-active" : ""
                    }`}
                  >
                    <CapabilityArtifact artifact={capability.artifact} />
                  </div>
                ))}
              </div>

              <ol className="capability-deck__steps" data-capability-reveal>
                {capabilities.map((capability, index) => {
                  const capabilityKey = `${idPrefix}${capability.id}`;
                  const headingIdForStep = `${capabilityKey}-heading`;
                  const detailId = `${capabilityKey}-detail`;
                  const isActive = index === activeIndex;

                  return (
                    <li
                      key={capabilityKey}
                      id={capabilityKey}
                      className={`capability-deck__step${isActive ? " is-active" : ""}`}
                    >
                      <h3
                        id={headingIdForStep}
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
                        aria-labelledby={headingIdForStep}
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

      <SectionRule placement="end" />
    </section>
  );
}
