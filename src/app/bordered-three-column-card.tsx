import type { CSSProperties } from "react";

export type ThreeColumnFeatureContent = {
  step: number;
  lead: string;
  support: string;
};

const CARD_SURFACE_STYLE: CSSProperties = {
  backgroundImage: "var(--surface-grid-forest)",
  backgroundSize: "28px 28px",
  maskImage:
    "linear-gradient(180deg, black 0%, black 38%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(180deg, black 0%, black 38%, transparent 100%)",
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
      className="three-col-feature relative flex h-[24rem] min-w-0 flex-col overflow-hidden rounded-[var(--radius-panel)] bg-[var(--forest)] text-[var(--on-forest)] shadow-[var(--shadow-inset-forest),var(--shadow-elev-1)] lg:h-[28.125rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={CARD_SURFACE_STYLE}
      />
      <div className="relative flex h-full flex-1 flex-col px-6 py-7 md:px-7 md:py-8">
        <div
          aria-hidden
          className="h-px w-12 shrink-0 bg-[var(--on-forest-rule-muted)]"
        />
        <div className="three-col-feature__body mt-auto flex flex-col gap-6">
          <h3
            id={headingId}
            className="three-col-feature__statement type-card m-0 max-w-full whitespace-nowrap text-[var(--on-forest)]"
          >
            {feature.lead}
          </h3>
          <p className="three-col-feature__copy body max-w-[34ch] text-[var(--on-forest-body)] text-pretty">
            {feature.support}
          </p>
        </div>
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
    <div className="three-col-feature-grid grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
      {features.map((feature) => (
        <BorderedThreeColumnCard key={`${feature.step}-${feature.lead}`} feature={feature} />
      ))}
    </div>
  );
}
