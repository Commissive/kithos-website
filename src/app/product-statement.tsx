"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import "./product-statement.css";
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
import { GridBandCellVertices } from "./grid-band-cell";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";

const SUBHEAD =
  "Where the right account is not always obvious and generic outreach is often punished.";

/* Three complexity archetypes — the grouping carries the argument.
   The why-line leads; the taxonomy is the label. */
const ARCHETYPES = [
  {
    id: "archetype-regulated",
    slug: "regulated-markets",
    name: "Regulated markets",
    why: "Trust and process gate every deal.",
    tint: "var(--forest-tint)",
    accent: "var(--forest)",
    rows: [
      ["Healthcare", "Legal", "Finance"],
      ["Compliance", "Defence", "Energy"],
    ],
  },
  {
    id: "archetype-technical",
    slug: "technical-products",
    name: "Technical products",
    why: "Nothing sells until the problem is understood.",
    tint: "var(--terracotta-tint)",
    accent: "var(--terracotta)",
    rows: [
      ["Developer Tools", "Cybersecurity"],
      ["Infrastructure", "Applied AI & ML"],
    ],
  },
  {
    id: "archetype-industrial",
    slug: "industrial-operations",
    name: "Industrial operations",
    why: "The buyer is rarely the user, and cycles run long.",
    tint: "var(--bone-shade)",
    accent: "var(--ink)",
    rows: [
      ["Manufacturing", "Supply Chain"],
      ["Procurement", "Construction"],
    ],
  },
] as const;

const RISE_SELECTOR = "[data-ps-rise]";

export function ProductStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>(RISE_SELECTOR, root);
      const mm = gsap.matchMedia();

      bindScrollReveal(mm, targets, () => {
        gsap.set(targets, { y: 16, autoAlpha: 0 });

        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top 76%",
          once: true,
          onEnter: () => {
            gsap.to(targets, {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.12,
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
      id="fit"
      aria-labelledby="product-statement-heading"
      className="product-statement relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow>Where Kithos fits</SectionEyebrow>
                  <SectionHeadingRow>
                    <SectionHeadingRowTitle>
                      <SectionHeadingTitle id="product-statement-heading">
                        Engineered for teams selling into{" "}
                        <em>complex buying environments.</em>
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport>{SUBHEAD}</SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>
            </PageGridProse>

            <ul
              className="ps-archetypes"
              aria-label="Complex buying environments"
            >
              {ARCHETYPES.map((archetype) => (
                <li
                  key={archetype.id}
                  id={archetype.id}
                  data-ps-rise
                  className="ps-archetype"
                  style={
                    {
                      "--stage-tint": archetype.tint,
                      "--ps-cell-accent": archetype.accent,
                    } as CSSProperties
                  }
                >
                  <GridBandCellVertices prefix="capability-stage" />
                  <p className="ps-archetype__label label">{archetype.name}</p>
                  <h3 className="ps-archetype__why type-card-title">
                    {archetype.why}
                  </h3>
                  <div className="ps-archetype__industries">
                    {archetype.rows.map((row) => (
                      <ul key={row.join()} className="ps-archetype__row">
                        {row.map((industry) => (
                          <li key={industry} className="ps-archetype__cell">
                            {industry}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                  <Link
                    href={`/for/${archetype.slug}`}
                    className="ps-archetype__link interactive-text-link ui"
                  >
                    Kithos for {archetype.name.toLowerCase()}{" "}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="ps-coda" data-ps-rise>
              And anywhere else the deal is{" "}
              <em>harder than the demo.</em>
            </p>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
