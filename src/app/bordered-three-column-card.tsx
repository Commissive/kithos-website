export type ThreeColumnFeatureContent = {
  step: number;
  lead: string;
  support: string;
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
      data-surface="forest"
      className="three-col-feature relative flex h-[24rem] min-w-0 flex-col overflow-hidden bg-[var(--forest)] shadow-[var(--shadow-inset-forest),var(--shadow-elev-1)] lg:h-[28.125rem]"
    >
      <div className="relative flex h-full flex-1 flex-col px-6 py-7 md:px-7 md:py-8">
        <div
          aria-hidden
          className="h-px w-12 shrink-0 bg-[var(--on-forest-rule-muted)]"
        />
        <div className="three-col-feature__body mt-auto flex flex-col gap-6">
          <h3
            id={headingId}
            className="three-col-feature__statement type-card m-0 max-w-full whitespace-nowrap"
          >
            {feature.lead}
          </h3>
          <p className="three-col-feature__copy body max-w-[34ch] text-pretty">
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
