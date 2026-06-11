"use client";

import { useRef } from "react";
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
import { ReasoningStepItems, type ReasoningStep } from "./reasoning-steps";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import "./revenue-path-section.css";

const REVENUE_PATH_SUBHEAD =
  "Kithos turns your market context and sales outcomes into a self-improving commercial system, so every account, message, meeting, and deal makes the next move sharper.";

const COMMERCIAL_REASONING_STEPS: readonly ReasoningStep[] = [
  {
    id: "knowledge",
    title: "Research",
    body: "Kithos gathers activity, assumptions, data, and signals from connected tools, external sources, and what your team shares. It builds a working understanding of your market, accounts, buyers, and past outcomes. The context to win.",
  },
  {
    id: "action",
    title: "Act",
    body: "Kithos recommends the next move — the account to pursue, the message to send, the plan for the meeting, the play for the deal. Every move starts from evidence, not instinct. The conviction to win.",
  },
  {
    id: "outcomes",
    title: "Remember",
    body: "Kithos commits replies, silence, objections, meetings, wins, and losses into memory. Each outcome helps shape the next account, message, follow-up, and deal decision. The intelligence to win.",
  },
];

const INTRO_SELECTOR = "[data-revenue-path-intro]";
const CARD_SELECTOR = "[data-revenue-path-card]";
const LOOP_SELECTOR = "[data-revenue-path-loop]";

export function RevenuePathSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const cards = gsap.utils.toArray<HTMLElement>(CARD_SELECTOR, root);
      const loop = gsap.utils.toArray<HTMLElement>(LOOP_SELECTOR, root);

      const mm = gsap.matchMedia();
      const targets = [...intro, ...cards, ...loop];

      bindScrollReveal(mm, targets, () => {
        gsap.set(intro, { y: 18, autoAlpha: 0 });
        gsap.set(cards, { y: 14, autoAlpha: 0 });
        gsap.set(loop, { autoAlpha: 0 });

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
                  gsap.to(loop, {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: "power1.out",
                    delay: 0.45,
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
      <div className="revenue-path__surface" data-on-accent>
        <div className="revenue-path__inner">
          <PageShell>
            <PageColumn className="page-section-top">
              <PageGrid>
                <PageGridProse>
                  <SectionHeadingBand>
                    <SectionHeadingStack>
                      <SectionEyebrow data-revenue-path-intro>
                        The learning loop
                      </SectionEyebrow>
                      <SectionHeadingRow>
                        <SectionHeadingRowTitle>
                          <SectionHeadingTitle
                            id="revenue-path-heading"
                            data-revenue-path-intro
                          >
                            Kithos learns and gets better with{" "}
                            <em>every deal.</em>
                          </SectionHeadingTitle>
                        </SectionHeadingRowTitle>
                        <SectionHeadingSupport data-revenue-path-intro>
                          {REVENUE_PATH_SUBHEAD}
                        </SectionHeadingSupport>
                      </SectionHeadingRow>
                    </SectionHeadingStack>
                  </SectionHeadingBand>

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
