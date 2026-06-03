"use client";

import { useRef } from "react";
import { AccessButton } from "./access-modal";
import {
  PageColumn,
  PageGrid,
  PageGridFull,
  PageGridProse,
  PageShell,
} from "./page-layout";
import "./problem-section.css";
import { gsap, ScrollTrigger, useGSAP } from "./gsap-setup";

const PROBLEM_CARDS = [
  {
    id: "problem-market",
    phase: "Market",
    title: "Find the market worth focusing on",
    landscape: "/hero/market.png",
    body: [
      "Stop treating the market as one big pool. Kithos helps your team identify the segment where your product has the strongest commercial reason to win.",
      "It brings together product context, customer evidence, market signals, sales activity, and team assumptions to refine your ICP, so every account list, outreach decision, and meeting starts from a clearer view of who is worth pursuing.",
    ],
  },
  {
    id: "problem-accounts",
    phase: "Accounts",
    title: "Pursue the right accounts",
    body: [
      "A strong segment still leaves the team with more accounts than it can pursue well. Kithos identifies and prioritises the accounts worth attention, weighing fit, timing, evidence, buyer context, and what it learns from previous outreach, meetings, wins, and losses.",
      "So the team spends less time chasing maybes and more time on accounts with a clear commercial reason to engage.",
    ],
    landscape: "/hero/account.png",
  },
  {
    id: "problem-buyers",
    phase: "Buying path",
    title: "Navigate the buying path",
    landscape: "/hero/buying-path.png",
    body: [
      "Finding the right account is only the start. Kithos helps your team understand who matters inside each opportunity, why they care, what proof they need, what could stall the deal, and what should happen next.",
      "That context carries into outreach, meetings, follow-ups, and deal decisions, so the team can move each conversation with more confidence.",
    ],
  },
] as const;

const INTRO_SELECTOR = "[data-problem-intro]";
const CARD_SELECTOR = "[data-problem-card]";

const CTA_LEAD =
  "Start with the segment, accounts, and conversations worth your team's time.";

function ProblemCardLandscape({ src }: { src: string }) {
  return (
    <div className="problem-section__card-landscape" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="problem-section__card-landscape-image"
      />
    </div>
  );
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const cards = gsap.utils.toArray<HTMLElement>(CARD_SELECTOR, root);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...intro, ...cards], {
          clearProps: "opacity,transform,visibility",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="problem-section__intro">
              <header className="section-heading-band">
                <h2
                  id="problem-heading"
                  data-problem-intro
                  className="type-statement section-heading-title"
                >
                  Make sharper revenue decisions across the commercial
                  workflow.
                </h2>
              </header>
            </PageGridProse>

            <PageGridFull
              data-problem-intro
              className="problem-section__instrument"
              role="group"
              aria-label="Commercial workflow decisions"
            >
              {PROBLEM_CARDS.flatMap((card, index) => {
                const headingId = `${card.id}-heading`;
                const stepLabel = String(index + 1).padStart(2, "0");
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
                        <div className="problem-section__card-meta">
                          <span
                            className="problem-section__step step-index"
                            aria-hidden
                          >
                            {stepLabel}
                          </span>
                          <span
                            className="problem-section__meta-rule"
                            aria-hidden
                          />
                          <span className="problem-section__phase label">
                            {card.phase}
                          </span>
                        </div>
                      </div>

                      <div className="problem-section__card-col problem-section__card-col--copy">
                        <h3
                          id={headingId}
                          className="problem-section__card-title type-card-title"
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
                  </article>
                );

                if (index < PROBLEM_CARDS.length - 1) {
                  return [
                    cardNode,
                    <div
                      key={`${card.id}-separator`}
                      className="problem-section__separator"
                      aria-hidden
                    />,
                  ];
                }

                return [cardNode];
              })}
            </PageGridFull>

            <PageGridProse className="problem-section__footer">
              <p
                data-problem-intro
                className="lead section-heading-support problem-section__cta-lead"
              >
                {CTA_LEAD}
              </p>
              <div data-problem-intro className="problem-section__actions">
                <AccessButton tone="accent" size="lg" />
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
