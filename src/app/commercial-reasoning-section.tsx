import { useId, type ReactNode } from "react";
import {
  BorderedThreeColumnCardStack,
  type ThreeColumnFeatureContent,
} from "./bordered-three-column-card";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { SectionRuleTicks } from "./structural-frame";

export function CommercialReasoningSection({
  eyebrow,
  headline,
  subhead,
  body,
  features,
}: {
  eyebrow?: string;
  headline: ReactNode;
  subhead?: string;
  body?: readonly string[];
  features: readonly ThreeColumnFeatureContent[];
}) {
  const headlineId = useId();
  const headingContent = subhead ? (
    <div className="section-heading-stack">
      <div className="grid grid-cols-1 items-start gap-[var(--section-gap-md)] lg:grid-cols-12 lg:gap-x-[var(--page-grid-gap)] lg:gap-y-0">
        <div className="lg:col-span-7">
          <h2 id={headlineId} className="type-statement section-heading-title text-[var(--ink)]">
            {headline}
          </h2>
        </div>
        <p className="lead section-heading-support lg:col-span-5">{subhead}</p>
      </div>
      {body && body.length > 0 ? (
        <div className="flex max-w-[52ch] flex-col gap-[var(--space-1-5)]">
          {body.map((paragraph, i) => (
            <p key={i} className="body text-[var(--ink-body)]">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  ) : (
    <div className="section-heading-stack">
      <h2 id={headlineId} className="type-statement section-heading-title text-[var(--ink)]">
        {headline}
      </h2>
      {body && body.length > 0 ? (
        <div className="flex max-w-[52ch] flex-col gap-[var(--space-1-5)]">
          {body.map((paragraph, i) => (
            <p key={i} className="body text-[var(--ink-body)]">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <section
      id="commercial-reasoning"
      aria-labelledby={headlineId}
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--surface)]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-[var(--section-gap-xl)] pb-[var(--section-prose-pad-bottom)]">
              {eyebrow ? <p className="label">{eyebrow}</p> : null}
              {headingContent}
              <BorderedThreeColumnCardStack features={features} />
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
