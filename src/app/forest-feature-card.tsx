import type { CSSProperties } from "react";

/** Max width of a single forest feature card (reused in grids and rows). */
export const FOREST_FEATURE_CARD_MAX_WIDTH = "21rem";

/** Default card height — vertical rectangle at fixed width. */
export const FOREST_FEATURE_CARD_MIN_HEIGHT = "34rem";

/** Wide forest feature card — 2.5× the standard card width. */
export const FOREST_FEATURE_CARD_WIDE_MAX_WIDTH = "52.5rem";

const PENTAGON_PATH =
  "M 54.840 17.320 A 2.160 2.160 0 0 1 57.000 19.480 L 57.000 53.000 A 4.000 4.000 0 0 1 53.000 57.000 L 19.480 57.000 A 2.160 2.160 0 0 1 17.320 54.840 L 17.320 54.840 A 2.160 2.160 0 0 1 18.847 51.153 L 51.153 18.847 A 2.160 2.160 0 0 1 54.840 17.320 Z";

type ForestFeatureCardProps = {
  stepIndex: number;
  headline: string;
  body: string;
  className?: string;
};

type ForestFeatureCardInnerProps = ForestFeatureCardProps & {
  maxWidth: string;
  size: "default" | "wide";
};

function StepIndex({ index }: { index: number }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="step-index text-[var(--on-forest-meta)]"
        aria-hidden
      >
        {`0${index + 1}`}
      </span>
      <span
        className="h-px w-8 shrink-0 bg-[var(--on-forest-rule-muted)]"
        aria-hidden
      />
    </div>
  );
}

function ForestFeatureCardInner({
  stepIndex,
  headline,
  body,
  className = "",
  maxWidth,
  size,
}: ForestFeatureCardInnerProps) {
  const pentagonClass =
    size === "wide"
      ? "pointer-events-none absolute -right-6 -top-4 h-36 w-36 opacity-[0.14] sm:h-44 sm:w-44 md:right-2 md:top-2"
      : "pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-[0.14] sm:h-32 sm:w-32 md:right-2 md:bottom-2";

  const bodyClass =
    size === "wide" ? "body mt-5 max-w-[58ch]" : "body mt-5";

  const headlineClass =
    size === "wide"
      ? "type-card mt-auto max-w-[28ch] pt-8"
      : "type-card pt-6";

  const articleStyle: CSSProperties = {
    maxWidth,
    width: maxWidth,
    ...(size === "default"
      ? { minHeight: FOREST_FEATURE_CARD_MIN_HEIGHT }
      : {}),
  };

  const innerLayout =
    size === "default" ? "flex-1 justify-between" : "flex-1";

  return (
    <article
      data-surface="forest"
      className={`relative flex min-w-0 flex-col overflow-hidden bg-[var(--forest)] shadow-[var(--shadow-inset-forest),var(--shadow-elev-1)] ${className}`}
      style={articleStyle}
    >
      <svg
        aria-hidden
        viewBox="17.32 17.32 39.68 39.68"
        preserveAspectRatio="xMidYMid meet"
        className={pentagonClass}
      >
        <path d={PENTAGON_PATH} fill="var(--bone)" />
      </svg>

      <div
        className={`relative flex w-full flex-col p-8 md:p-10 lg:p-12 ${innerLayout}`}
      >
        <div>
          <StepIndex index={stepIndex} />
          <p className={bodyClass}>{body}</p>
        </div>
        <h3 className={headlineClass}>{headline}</h3>
      </div>
    </article>
  );
}

export function ForestFeatureCard({
  stepIndex,
  headline,
  body,
  className = "",
}: ForestFeatureCardProps) {
  return (
    <ForestFeatureCardInner
      stepIndex={stepIndex}
      headline={headline}
      body={body}
      className={className}
      maxWidth={FOREST_FEATURE_CARD_MAX_WIDTH}
      size="default"
    />
  );
}

export function ForestFeatureCardWide({
  stepIndex,
  headline,
  body,
  className = "",
}: ForestFeatureCardProps) {
  return (
    <ForestFeatureCardInner
      stepIndex={stepIndex}
      headline={headline}
      body={body}
      className={className}
      maxWidth={FOREST_FEATURE_CARD_WIDE_MAX_WIDTH}
      size="wide"
    />
  );
}
