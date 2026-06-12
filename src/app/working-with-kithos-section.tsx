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
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import "./working-with-kithos-section.css";

const WORKING_SUBHEAD =
  "Kithos holds a living picture of your company, your customers, and your whole commercial lifecycle — researching what's new, learning from what worked, and remembering all of it.";

const LEDGER_ROWS = [
  {
    id: "understanding",
    title: "Never starts cold",
    body: "It already knows the account's history, the buyer's world, and what changed this week — drawn from your tools and fresh research, not a blank prompt.",
  },
  {
    id: "approval",
    title: "Acts on your say-so",
    body: "Every prepared move comes with the reasoning behind it. Approve and it's done — sent, logged, scheduled. Nothing reaches a buyer without you.",
  },
  {
    id: "memory",
    title: "Never forgets",
    body: "Every reply, objection, win, and loss is committed to memory. Patterns become playbook — so each move starts further ahead than the last.",
  },
] as const;

const INTRO_SELECTOR = "[data-working-intro]";
const ROW_SELECTOR = "[data-working-row]";

export function WorkingWithKithosSection() {
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
              stagger: 0.12,
              overwrite: "auto",
            });
          },
        });

        const rowBatch =
          rows.length > 0
            ? ScrollTrigger.batch(rows, {
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
      id="working-with-kithos"
      aria-labelledby="working-with-kithos-heading"
      className="working-with-kithos relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div className="working-with-kithos__surface">
        <div className="working-with-kithos__inner">
          <PageShell>
            <PageColumn className="page-section-top">
              <PageGrid>
                <PageGridProse>
                  <SectionHeadingBand>
                    <SectionHeadingStack>
                      <SectionEyebrow data-working-intro>
                        Working with Kithos
                      </SectionEyebrow>
                      <SectionHeadingRow>
                        <SectionHeadingRowTitle>
                          <SectionHeadingTitle
                            id="working-with-kithos-heading"
                            data-working-intro
                          >
                            It knows your business <em>end to end.</em>
                          </SectionHeadingTitle>
                        </SectionHeadingRowTitle>
                        <SectionHeadingSupport data-working-intro>
                          {WORKING_SUBHEAD}
                        </SectionHeadingSupport>
                      </SectionHeadingRow>
                    </SectionHeadingStack>
                  </SectionHeadingBand>

                  <div className="working-with-kithos__rows">
                    {LEDGER_ROWS.map((row) => {
                      const headingId = `${row.id}-heading`;
                      return (
                        <article
                          key={row.id}
                          id={row.id}
                          data-working-row
                          aria-labelledby={headingId}
                          className="working-with-kithos__row"
                        >
                          <h3
                            id={headingId}
                            className="working-with-kithos__row-title type-card-title"
                          >
                            {row.title}
                          </h3>
                          <p className="working-with-kithos__row-body body">
                            {row.body}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </PageGridProse>
              </PageGrid>
            </PageColumn>
          </PageShell>
        </div>
      </div>
    </section>
  );
}
