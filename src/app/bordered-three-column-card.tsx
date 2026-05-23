import type { ReactNode } from "react";
import { CapabilityPillCloud } from "./capability-pill-cloud";

export type ThreeColumnFeatureContent = {
  step: number;
  title: string;
  summary: string;
  middleBody: string | readonly string[];
  middleItems: readonly string[];
  /** When set, controls which pills share a row (must match middleItems labels). */
  pillRows?: readonly (readonly string[])[];
  outcome: string | readonly string[];
};

function toParagraphs(copy: string | readonly string[]): readonly string[] {
  return typeof copy === "string" ? [copy] : copy;
}

function FeatureColumn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`three-col-feature__col ${className}`.trim()}>{children}</div>
  );
}

export function BorderedThreeColumnCard({
  feature,
}: {
  feature: ThreeColumnFeatureContent;
}) {
  const headingId = `feature-${feature.step}-${feature.title.replace(/\s+/g, "-").toLowerCase()}`;
  const middleParagraphs = toParagraphs(feature.middleBody);
  const outcomeParagraphs = toParagraphs(feature.outcome);

  return (
    <article aria-labelledby={headingId} className="three-col-feature">
      <div className="three-col-feature__grid">
        <FeatureColumn className="three-col-feature__col--lead">
          <h3 id={headingId} className="three-col-feature__title text-balance">
            {feature.title}
          </h3>
          <p className="three-col-feature__prose lead text-[var(--ink-muted)] text-pretty">
            {feature.summary}
          </p>
        </FeatureColumn>

        <FeatureColumn className="three-col-feature__col--process">
          <div className="three-col-feature__prose flex flex-col gap-[var(--space-1-5)]">
            {middleParagraphs.map((paragraph) => (
              <p key={paragraph} className="body text-[var(--ink-body)] text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <CapabilityPillCloud items={feature.middleItems} rows={feature.pillRows} />
        </FeatureColumn>

        <FeatureColumn className="three-col-feature__col--outcome">
          <div className="three-col-feature__prose flex flex-col gap-[var(--space-1-5)]">
            {outcomeParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "lead text-[var(--ink)] text-pretty"
                    : "body text-[var(--ink-body)] text-pretty"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FeatureColumn>
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
    <div className="flex w-full flex-col gap-[var(--section-gap-md)]">
      {features.map((feature) => (
        <BorderedThreeColumnCard key={`${feature.step}-${feature.title}`} feature={feature} />
      ))}
    </div>
  );
}
