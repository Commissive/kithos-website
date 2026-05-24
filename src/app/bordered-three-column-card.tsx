import type { CSSProperties, ReactNode } from "react";
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

function illustrationWebpSrc(src: string): string {
  return src.replace(/\.(jpe?g|png)$/i, ".webp");
}

function FeatureIllustration({
  src,
  alt,
  variant = "line",
}: {
  src: string;
  alt: string;
  variant?: "line" | "photo";
}) {
  if (variant === "photo") {
    const webpSrc = illustrationWebpSrc(src);

    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={1024}
          height={768}
          loading="lazy"
          decoding="async"
        />
      </picture>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      loading="lazy"
      decoding="async"
    />
  );
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
  const headingId = `feature-${feature.step}-${feature.lead.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article aria-labelledby={headingId} className="three-col-feature">
      <div className="three-col-feature__grid">
        <FeatureColumn className="three-col-feature__col--lead">
          {feature.illustration ? (
            <figure
              className={
                feature.illustrationVariant === "photo"
                  ? "three-col-feature__illustration three-col-feature__illustration--photo"
                  : "three-col-feature__illustration"
              }
              style={
                feature.illustrationPosition
                  ? ({
                      "--illustration-position": feature.illustrationPosition,
                    } as CSSProperties)
                  : undefined
              }
            >
              <FeatureIllustration
                src={feature.illustration}
                alt={feature.illustrationAlt ?? ""}
                variant={feature.illustrationVariant}
              />
            </figure>
          ) : null}
          <h3
            id={headingId}
            className="three-col-feature__statement type-card text-balance"
          >
            <SectionStatementHeadline lead={feature.lead} support={feature.support} />
          </h3>
        </FeatureColumn>

        <FeatureColumn className="three-col-feature__col--benefits">
          <p className="three-col-feature__benefit-lead type-feature text-balance">
            {feature.benefitLead}
          </p>
          <div className="three-col-feature__benefit-details">
            {feature.benefitParagraphs.map((paragraph) => (
              <p key={paragraph} className="three-col-feature__benefit-body body text-pretty">
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
    <div className="three-col-feature-stack">
      {features.map((feature) => (
        <BorderedThreeColumnCard key={`${feature.step}-${feature.lead}`} feature={feature} />
      ))}
    </div>
  );
}
