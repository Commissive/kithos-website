"use client";

import { useRef } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { ReasoningStepItems, type ReasoningStep } from "./reasoning-steps";
import { gsap, ScrollTrigger, useGSAP } from "./gsap-setup";
import "./revenue-path-section.css";

const REVENUE_PATH_HEADLINE =
  "Commercial reasoning that compounds.";
const REVENUE_PATH_SUBHEAD =
  "Market context, account motion, and outcomes—connected in one layer so each commercial decision starts sharper than the last.";

const COMMERCIAL_REASONING_STEPS: readonly ReasoningStep[] = [
  {
    id: "knowledge",
    title: "Context",
    body: "Kithos gathers activity, assumptions, data, and signals from connected tools, external sources, and what your team shares. It builds a working understanding of your market, accounts, buyers, and past outcomes.",
  },
  {
    id: "outcomes",
    title: "Memory",
    body: "Kithos turns replies, silence, objections, meetings, wins, and losses into commercial memory. Each outcome helps shape the next account, message, follow-up, and deal decision.",
  },
];

const INTRO_SELECTOR = "[data-revenue-path-intro]";
const CARD_SELECTOR = "[data-revenue-path-card]";

export function RevenuePathSection() {
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
        gsap.set(cards, { y: 14, autoAlpha: 0 });

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
              stagger: 0.12,
              overwrite: "auto",
            });
          },
        });

        const cardBatch =
          cards.length > 0
            ? ScrollTrigger.batch(cards, {
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
              })
            : [];

        return () => {
          introTrigger.kill();
          cardBatch.forEach((st) => st.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="revenue-path"
      aria-labelledby="revenue-path-heading"
      className="revenue-path relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div className="revenue-path__surface">
        <div className="revenue-path__inner">
          <PageShell>
            <PageColumn className="page-section-top">
              <PageGrid>
                <PageGridProse>
                  <header className="section-heading-band">
                    <div className="section-heading-row">
                      <div className="section-heading-row__title">
                        <h2
                          id="revenue-path-heading"
                          data-revenue-path-intro
                          className="type-statement section-heading-title"
                        >
                          {REVENUE_PATH_HEADLINE}
                        </h2>
                      </div>
                      <p
                        data-revenue-path-intro
                        className="lead section-heading-support section-heading-row__support"
                      >
                        {REVENUE_PATH_SUBHEAD}
                      </p>
                    </div>
                  </header>

                  <ReasoningStepItems steps={COMMERCIAL_REASONING_STEPS} />
                </PageGridProse>
              </PageGrid>
            </PageColumn>
          </PageShell>
        </div>
      </div>
    </section>
  );
}
