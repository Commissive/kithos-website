"use client";

import { useRef } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import "./problem-section.css";
import { gsap, ScrollTrigger, useGSAP } from "./gsap-setup";

const PROBLEM_BODY =
  "Instead, context fragments across tools, every account gets re-explained from scratch, and wins and losses rarely sharpen the next move.";

const CONSEQUENCES = [
  {
    title: "Fragmented context",
    body: "Product detail, CRM fields, calls, and notes rarely add up to one working view before outreach or a meeting.",
  },
  {
    title: "Repeated discovery",
    body: "Each rep rebuilds who matters, why they care, and what proof they need, even on familiar accounts.",
  },
  {
    title: "Weak feedback loops",
    body: "Silences, objections, and closed deals produce activity records, not clearer priorities for the next conversation.",
  },
] as const;

const INTRO_SELECTOR = "[data-problem-intro]";
const CARD_SELECTOR = "[data-problem-card]";

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
      id="problem"
      aria-labelledby="problem-heading"
      className="problem-section relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <header className="problem-section__intro section-heading-band">
                <div className="section-heading-row">
                  <div className="section-heading-row__title">
                    <h2
                      id="problem-heading"
                      data-problem-intro
                      className="type-statement section-heading-title text-[var(--ink)]"
                    >
                      Finding and converting the right customers should get
                      sharper with every interaction.
                    </h2>
                  </div>
                  <p
                    data-problem-intro
                    className="lead section-heading-support section-heading-row__support"
                  >
                    {PROBLEM_BODY}
                  </p>
                </div>
              </header>

              <ul className="problem-section__cards">
                {CONSEQUENCES.map((item) => (
                  <li key={item.title}>
                    <article
                      data-problem-card
                      className="problem-section__card"
                      aria-labelledby={`problem-card-${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <h3
                        id={`problem-card-${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                        className="problem-section__card-title type-card-title"
                      >
                        {item.title}
                      </h3>
                      <p className="problem-section__card-body body">
                        {item.body}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
