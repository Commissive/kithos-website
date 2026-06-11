"use client";

import { useRef } from "react";
import {
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import "./problem-section.css";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import {
  EngageDiagram,
  FocusDiagram,
  PrioritiseDiagram,
} from "./workflow-diagrams";

const WORKFLOW_STEPS = [
  {
    id: "problem-market",
    phase: "Focus",
    title: "Find the market worth focusing on.",
    Diagram: FocusDiagram,
  },
  {
    id: "problem-accounts",
    phase: "Prioritise",
    title: "Identify the right accounts to pursue.",
    Diagram: PrioritiseDiagram,
  },
  {
    id: "problem-buyers",
    phase: "Engage",
    title: "Navigate the buying path with confidence.",
    Diagram: EngageDiagram,
  },
] as const;

const PROBLEM_SUBHEAD =
  "Focus on the right market. Prioritise the right accounts. Engage the right way.";

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

        // Diagram draw-on — one timeline per card, staggered with the cards.
        const diagramTimelines = cards.map((card, index) => {
          const lines = Array.from(
            card.querySelectorAll<SVGGeometryElement>("[data-d-line]"),
          );
          const bars = card.querySelectorAll("[data-d-bar]");
          const cellsEls = card.querySelectorAll("[data-d-cell]");
          const pops = card.querySelectorAll("[data-d-pop]");

          for (const line of lines) {
            const length = line.getTotalLength();
            gsap.set(line, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          }
          gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(cellsEls, {
            autoAlpha: 0,
            scale: 0.5,
            transformOrigin: "center center",
          });
          gsap.set(pops, { autoAlpha: 0 });

          const tl = gsap.timeline({ paused: true, delay: 0.4 + index * 0.16 });
          tl.to(lines, {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.inOut",
            stagger: 0.08,
          })
            .to(
              bars,
              { scaleX: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
              0.1,
            )
            .to(
              cellsEls,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                ease: "back.out(1.6)",
                stagger: 0.05,
              },
              0.25,
            )
            .to(pops, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, 0.7);

          return tl;
        });

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
            for (const tl of diagramTimelines) {
              tl.play();
            }
          },
        });

        return () => {
          introTrigger.kill();
          for (const tl of diagramTimelines) {
            tl.kill();
          }
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
                <SectionEyebrow data-problem-intro>
                  The workflow
                </SectionEyebrow>
                <SectionHeadingTitle id="problem-heading" data-problem-intro>
                  Every stage of the deal, decided with <em>evidence.</em>
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
              const { Diagram } = step;

              return (
                <article
                  key={step.id}
                  id={step.id}
                  aria-labelledby={headingId}
                  data-problem-card
                  className="problem-grid__cell problem-grid__cell--step"
                >
                  <div className="problem-grid__diagram" aria-hidden>
                    <Diagram />
                  </div>
                  <div className="problem-grid__copy">
                    <p className="problem-grid__phase label">{step.phase}</p>
                    <h3
                      id={headingId}
                      className="problem-grid__title type-card-title"
                    >
                      {step.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
