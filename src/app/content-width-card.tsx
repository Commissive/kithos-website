import type { ReactNode } from "react";

/** Full content-column height (between site rule borders). */
export const CONTENT_WIDTH_CARD_MIN_HEIGHT = "34rem";

const GRID_RULE =
  "border-[color-mix(in_oklch,var(--bone)_22%,var(--forest))]";

const CELL_PADDING = "p-5 md:p-6 lg:p-8";

const PENTAGON_PATH =
  "M 54.840 17.320 A 2.160 2.160 0 0 1 57.000 19.480 L 57.000 53.000 A 4.000 4.000 0 0 1 53.000 57.000 L 19.480 57.000 A 2.160 2.160 0 0 1 17.320 54.840 L 17.320 54.840 A 2.160 2.160 0 0 1 18.847 51.153 L 51.153 18.847 A 2.160 2.160 0 0 1 54.840 17.320 Z";

function StepIndex({ index }: { index: number }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[color-mix(in_oklch,var(--bone)_42%,var(--forest))]"
        style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
        aria-hidden
      >
        {`0${index + 1}`}
      </span>
      <span
        className="h-px w-10 shrink-0 bg-[color-mix(in_oklch,var(--bone)_28%,var(--forest))]"
        aria-hidden
      />
    </div>
  );
}

function GridCell({
  index,
  children,
  className = "",
}: {
  index: number;
  children?: ReactNode;
  className?: string;
}) {
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <div
      className={`flex min-h-0 flex-col ${col < 2 ? `border-r ${GRID_RULE}` : ""} ${row < 1 ? `border-b ${GRID_RULE}` : ""} ${CELL_PADDING} ${className}`}
    >
      {children}
    </div>
  );
}

export function ContentWidthCard({
  stepIndex,
  headline,
  body,
  className = "",
}: {
  stepIndex: number;
  headline: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={`relative flex min-h-0 w-full flex-col overflow-hidden bg-[var(--forest)] text-[var(--bone)] shadow-[inset_0_1px_0_color-mix(in_oklch,var(--bone)_14%,var(--forest))] ${className}`}
      style={{ minHeight: CONTENT_WIDTH_CARD_MIN_HEIGHT }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--bone) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--bone) 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 20% 0%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 20% 0%, black 20%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_100%,color-mix(in_oklch,var(--forest-deep)_55%,transparent),transparent_58%)]"
      />
      <svg
        aria-hidden
        viewBox="17.32 17.32 39.68 39.68"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute -right-6 -bottom-4 h-40 w-40 opacity-[0.12] sm:h-48 sm:w-48 md:right-2 md:bottom-2"
      >
        <path d={PENTAGON_PATH} fill="var(--bone)" />
      </svg>

      <div className="relative grid min-h-0 flex-1 grid-cols-3 grid-rows-2">
        <GridCell index={0}>
          <StepIndex index={stepIndex} />
        </GridCell>

        <GridCell index={1}>
          <p className="body text-[color-mix(in_oklch,var(--bone)_78%,var(--forest))]">
            {body}
          </p>
        </GridCell>

        <GridCell index={2} />

        <GridCell index={3} />

        <GridCell index={4} />

        <GridCell index={5}>
          <h3 className="type-card text-[var(--bone)]">{headline}</h3>
        </GridCell>
      </div>
    </article>
  );
}
