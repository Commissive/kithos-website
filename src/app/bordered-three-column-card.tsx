import { SectionStatementHeadline } from "./section-statement-headline";

export type ThreeColumnFeatureContent = {
  step: number;
  lead: string;
  support: string | readonly string[];
  illustration?: string;
  illustrationAlt?: string;
  /** `photo` uses full-width square crop; default `line` keeps compact line-art sizing. */
  illustrationVariant?: "line" | "photo";
  /** Object position for photo crop, e.g. `58% 45%`. */
  illustrationPosition?: string;
  benefitLead: string;
  benefitParagraphs: readonly string[];
};

export function BorderedThreeColumnCard({
  feature,
}: {
  feature: ThreeColumnFeatureContent;
}) {
  const headingId = `feature-${feature.step}-${feature.lead.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      aria-labelledby={headingId}
      className="three-col-feature flex min-h-0 flex-1 flex-col items-start justify-start"
    >
      <div className="three-col-feature__body w-full">
        <h3
          id={headingId}
          className="three-col-feature__statement type-card m-0 w-full text-pretty"
        >
          <SectionStatementHeadline lead={feature.lead} support={feature.support} />
        </h3>
      </div>
    </article>
  );
}

export function BorderedThreeColumnCardStack({
  features,
}: {
  features: readonly ThreeColumnFeatureContent[];
}) {
  return (
    <div className="three-col-feature-stack three-col-feature-stack--rows flex size-full min-h-0 flex-1 flex-col">
      {features.map((feature) => (
        <BorderedThreeColumnCard key={`${feature.step}-${feature.lead}`} feature={feature} />
      ))}
    </div>
  );
}
