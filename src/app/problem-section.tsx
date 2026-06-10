"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import "./problem-section.css";
import {
  ProblemSectionCellGrid,
  ProblemSectionCellRow,
} from "./problem-section-cell-row";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";

const PANEL_COL_BREAKPOINTS = [
  "(max-width: 47.999rem)",
  "(min-width: 48rem)",
  "(min-width: 64rem)",
] as const;

const COPY_GRID_ROWS = 6;

function readProblemGridCols(section: HTMLElement | null): {
  panelCols: number;
  copyCols: number;
} {
  const styles = section
    ? getComputedStyle(section)
    : getComputedStyle(document.documentElement);
  const panelCols = Number.parseInt(
    styles.getPropertyValue("--problem-panel-cols").trim(),
    10,
  );
  const metaSpan = Number.parseInt(
    styles.getPropertyValue("--problem-meta-col-span").trim(),
    10,
  );
  const panel =
    Number.isFinite(panelCols) && panelCols > 0 ? panelCols : 8;
  const copy =
    Number.isFinite(metaSpan) && metaSpan > 0 && panel > metaSpan
      ? panel - metaSpan
      : panel;

  return { panelCols: panel, copyCols: copy };
}

const PROBLEM_CARDS = [
  {
    id: "problem-market",
    phase: "Focus",
    title: "Find the market worth focusing on.",
    landscape: "/hero/market.png",
    body: [
      "Stop treating the market as one big pool. Kithos helps your team identify the segment where your product has the strongest commercial reason to win.",
      "It brings together product context, customer evidence, market signals, sales activity, and team assumptions to refine your ICP, so every account list, outreach decision, and meeting starts from a clearer view of who is worth pursuing.",
    ],
  },
  {
    id: "problem-accounts",
    phase: "Prioritise",
    title: "Identify the right accounts to pursue.",
    landscape: "/hero/account.png",
    body: [
      "A strong segment still leaves the team with more accounts than it can pursue well. Kithos identifies and prioritises the accounts worth attention, weighing fit, timing, evidence, buyer context, and what it learns from previous outreach, meetings, wins, and losses.",
      "So the team spends less time chasing maybes and more time on accounts with a clear commercial reason to engage.",
    ],
  },
  {
    id: "problem-buyers",
    phase: "Engage",
    title: "Navigate the buying path with confidence.",
    landscape: "/hero/buying-path.png",
    body: [
      "Finding the right account is only the start. Kithos helps your team understand who matters inside each opportunity, why they care, what proof they need, what could stall the deal, and what should happen next.",
      "That context carries into outreach, meetings, follow-ups, and deal decisions, so the team can move each conversation with more confidence.",
    ],
  },
] as const;

const PROBLEM_HEADLINE =
  "Make sharper revenue decisions across the commercial workflow.";
const PROBLEM_SUBHEAD =
  "Know exactly who to pursue, what to say, and how to turn early sales attempts into a repeatable motion.";

const INTRO_SELECTOR = "[data-problem-intro]";
const CARD_SELECTOR = "[data-problem-card]";

function ProblemCardLandscape({ src }: { src: string }) {
  return (
    <div className="problem-section__card-landscape" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 48rem) 100vw, (max-width: 63.999rem) 28vw, 25vw"
        className="problem-section__card-landscape-image"
      />
    </div>
  );
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [gridCols, setGridCols] = useState({ panelCols: 8, copyCols: 8 });

  useLayoutEffect(() => {
    const syncPanelCols = () =>
      setGridCols(readProblemGridCols(sectionRef.current));

    syncPanelCols();

    const mediaQueries = PANEL_COL_BREAKPOINTS.map((query) =>
      window.matchMedia(query),
    );
    const onBreakpointChange = () => syncPanelCols();

    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", onBreakpointChange);
    }

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", onBreakpointChange);
      }
    };
  }, []);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const cards = gsap.utils.toArray<HTMLElement>(CARD_SELECTOR, root);

      const mm = gsap.matchMedia();
      const targets = [...intro, ...cards];

      bindScrollReveal(mm, targets, () => {
        gsap.set(intro, { y: 18, autoAlpha: 0 });
        gsap.set(cards, { y: 22, autoAlpha: 0 });

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
            gsap.to(cards, {
              y: 0,
              autoAlpha: 1,
              duration: 0.72,
              ease: "power3.out",
              stagger: 0.14,
              delay: 0.12,
              overwrite: "auto",
            });
          },
        });

        return () => {
          introTrigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-labelledby="problem-heading"
      className="problem-section relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div className="problem-section__frame">
        <div className="problem-section__panel page-section-top">
          <div className="problem-section__intro">
            <SectionHeadingBand>
              <SectionHeadingStack>
                <SectionHeadingTitle id="problem-heading" data-problem-intro>
                  {PROBLEM_HEADLINE}
                </SectionHeadingTitle>
                <SectionHeadingSupport data-problem-intro>
                  {PROBLEM_SUBHEAD}
                </SectionHeadingSupport>
              </SectionHeadingStack>
            </SectionHeadingBand>
          </div>

          <div
            className="problem-section__instrument"
            role="group"
            aria-label="Commercial workflow decisions"
          >
              {PROBLEM_CARDS.flatMap((card, index) => {
                const headingId = `${card.id}-heading`;
                const landscapeSrc =
                  "landscape" in card ? card.landscape : undefined;

                const cardNode = (
                  <article
                    key={card.id}
                    id={card.id}
                    aria-labelledby={headingId}
                    data-problem-card
                    className={[
                      "problem-section__card",
                      landscapeSrc && "problem-section__card--landscape",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="problem-section__card-inner">
                      <div className="problem-section__card-col problem-section__card-col--meta">
                        {landscapeSrc ? (
                          <ProblemCardLandscape src={landscapeSrc} />
                        ) : null}
                      </div>

                      <div className="problem-section__card-col problem-section__card-col--copy">
                        <ProblemSectionCellGrid
                          cols={gridCols.copyCols}
                          rows={COPY_GRID_ROWS}
                          className="problem-section__copy-cells"
                        />
                        <div className="problem-section__copy-content">
                          <p className="problem-section__phase-pill ui">
                            <span className="problem-section__phase label">
                              {card.phase}
                            </span>
                          </p>

                          <h3
                            id={headingId}
                            className="problem-section__card-title"
                          >
                            {card.title}
                          </h3>

                          <div className="problem-section__card-body-wrap">
                            {(typeof card.body === "string"
                              ? [card.body]
                              : card.body
                            ).map((paragraph, paragraphIndex) => (
                              <p
                                key={paragraphIndex}
                                className="body problem-section__card-body"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );

                if (index < PROBLEM_CARDS.length - 1) {
                  return [
                    cardNode,
                    <ProblemSectionCellRow
                      key={`${card.id}-cells`}
                      cols={gridCols.panelCols}
                    />,
                  ];
                }

                return [cardNode];
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
