"use client";

import { useRef } from "react";
import {
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import "./problem-section.css";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";

const WORKFLOW_STEPS = [
  {
    id: "problem-market",
    phase: "Focus",
    title: "Find the market worth focusing on.",
  },
  {
    id: "problem-accounts",
    phase: "Prioritise",
    title: "Identify the right accounts to pursue.",
  },
  {
    id: "problem-buyers",
    phase: "Engage",
    title: "Navigate the buying path with confidence.",
  },
] as const;

const PROBLEM_HEADLINE =
  "Make sharper revenue decisions across the commercial workflow.";
const PROBLEM_SUBHEAD =
  "Focus, prioritise, and engage — with sharper context on every move.";

const INTRO_SELECTOR = "[data-problem-intro]";
const PANEL_SELECTOR = "[data-problem-panel]";
const CARD_SELECTOR = "[data-problem-card]";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const panel = gsap.utils.toArray<HTMLElement>(PANEL_SELECTOR, root);
      const cards = gsap.utils.toArray<HTMLElement>(CARD_SELECTOR, root);

      const mm = gsap.matchMedia();
      const targets = [...intro, ...panel, ...cards];

      bindScrollReveal(mm, targets, () => {
        gsap.set(intro, { y: 18, autoAlpha: 0 });
        gsap.set(panel, { y: 12, autoAlpha: 0 });
        gsap.set(cards, { y: 10, autoAlpha: 0 });

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
            gsap.to(panel, {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power3.out",
              delay: 0.1,
              overwrite: "auto",
            });
            gsap.to(cards, {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.12,
              delay: 0.22,
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
      <div className="problem-section__panel page-section-top">
        <div className="problem-frame" data-problem-panel>
          <div className="problem-frame__intro">
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
            className="problem-grid"
            role="group"
            aria-label="Commercial workflow phases"
          >
            {WORKFLOW_STEPS.map((step) => {
              const headingId = `${step.id}-heading`;

              return (
                <article
                  key={step.id}
                  id={step.id}
                  aria-labelledby={headingId}
                  data-problem-card
                  className="problem-grid__cell problem-grid__cell--step"
                >
                  <p className="problem-grid__phase label">{step.phase}</p>
                  <h3
                    id={headingId}
                    className="problem-grid__title type-card-title"
                  >
                    {step.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
