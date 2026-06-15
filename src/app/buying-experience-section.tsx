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
import "./buying-experience-section.css";

/* "Show up as the team that understands the buyer" — Kithos carries account,
   market and buyer context across the whole journey (message → meeting →
   follow-up), so the team is more relevant, prepared, and easy to buy from.
   The buyer-experience lever, framed as the reader's (seller's) edge — and
   spanning the journey rather than reducing to personalised outbound. */
const POINTS = [
  {
    title: "Relevant from the first interaction",
    body: "Kithos connects the account's current priorities to the part of your product that matters now, so the first message begins with a credible reason to engage.",
  },
  {
    title: "Prepared for every conversation",
    body: "The team enters each meeting with the buying group, previous interactions, open questions, deal risks and likely objections already in view.",
  },
  {
    title: "Clear about the next move",
    body: "Kithos turns each interaction into a reasoned next step, with the owner, objective and evidence needed to keep the opportunity moving.",
  },
] as const;

export function BuyingExperienceSection() {
  return (
    <section
      aria-labelledby="buying-experience-heading"
      className="buying-experience relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <SectionHeadingBand>
                <SectionHeadingStack>
                  <SectionEyebrow>Full-context selling</SectionEyebrow>
                  <SectionHeadingRow>
                    <SectionHeadingRowTitle>
                      <SectionHeadingTitle id="buying-experience-heading">
                        Show up as the team that{" "}
                        <em>understands the buyer.</em>
                      </SectionHeadingTitle>
                    </SectionHeadingRowTitle>
                    <SectionHeadingSupport>
                      Kithos brings the account, market and buyer context into
                      every message, meeting and follow-up, so your team is more
                      relevant, better prepared and easier to buy from.
                    </SectionHeadingSupport>
                  </SectionHeadingRow>
                </SectionHeadingStack>
              </SectionHeadingBand>

              <ol
                className="buying-experience__journey"
                aria-label="Across the buying journey"
              >
                {POINTS.map((point) => (
                  <li key={point.title} className="buying-experience__stage">
                    <span className="buying-experience__node" aria-hidden />
                    <h3 className="buying-experience__stage-title type-card-title">
                      {point.title}
                    </h3>
                    <p className="buying-experience__stage-body body">
                      {point.body}
                    </p>
                  </li>
                ))}
              </ol>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
