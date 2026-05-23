import type { ReactNode } from "react";

/** ~85% viewport below the fixed nav (see `--nav-h` in globals.css). */
export const SPLIT_STEP_CARD_MIN_HEIGHT = "calc(85svh - var(--nav-h))";

const PANEL_PADDING = "p-8 md:p-10 lg:p-12";
const PANEL_ROW_GRID =
  "relative z-10 grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto]";

const BODY_TEXT_GRID =
  "relative z-10 grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]";

const PENTAGON_PATH =
  "M 54.840 17.320 A 2.160 2.160 0 0 1 57.000 19.480 L 57.000 53.000 A 4.000 4.000 0 0 1 53.000 57.000 L 19.480 57.000 A 2.160 2.160 0 0 1 17.320 54.840 L 17.320 54.840 A 2.160 2.160 0 0 1 18.847 51.153 L 51.153 18.847 A 2.160 2.160 0 0 1 54.840 17.320 Z";

function PanelMetaRow({
  children,
  ruleClassName,
}: {
  children: ReactNode;
  ruleClassName: string;
}) {
  return (
    <header
      className={`flex min-h-[2.75rem] flex-col justify-end border-b pb-6 md:min-h-[3rem] md:pb-8 ${ruleClassName}`}
    >
      {children}
    </header>
  );
}

function PanelMainRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 items-start pt-8 md:pt-10 lg:pt-12">
      {children}
    </div>
  );
}

function PanelFooterRow({ children }: { children: ReactNode }) {
  return (
    <footer className="flex min-h-[4.5rem] items-end pt-8 md:min-h-[5rem] md:pt-10 lg:pt-12">
      {children}
    </footer>
  );
}

function BodyTextRow({
  children,
  row,
}: {
  children: ReactNode;
  row: 1 | 2 | 3;
}) {
  const textClass =
    row === 1
      ? "lead max-w-[48ch] text-[var(--ink)]"
      : "body max-w-[48ch] text-[var(--ink-body)]";

  return (
    <div
      className={`flex min-h-0 flex-col justify-center ${
        row < 3 ? "border-b border-[var(--rule)]" : ""
      }`}
    >
      <p className={textClass}>{children}</p>
    </div>
  );
}

function HeadlineStepIndex({ index }: { index: number }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="step-index text-[var(--on-forest-meta)]"
        aria-hidden
      >
        {`0${index + 1}`}
      </span>
      <span
        className="h-px w-10 shrink-0 bg-[var(--on-forest-rule-muted)]"
        aria-hidden
      />
    </div>
  );
}

function HeadlinePanel({
  stepIndex,
  headline,
  flipped,
}: {
  stepIndex: number;
  headline: string;
  flipped: boolean;
}) {
  const pentagonClass =
    "pointer-events-none absolute -right-6 -bottom-4 h-40 w-40 opacity-[0.12] sm:h-48 sm:w-48 md:right-2 md:bottom-2";

  return (
    <div
      className={`relative flex min-h-0 flex-col overflow-hidden bg-[var(--forest)] text-[var(--on-forest)] shadow-[inset_0_1px_0_var(--on-forest-inset-highlight)] md:min-h-full ${
        flipped
          ? "border-b border-[var(--rule)] md:order-2 md:border-b-0 md:border-l md:border-[var(--panel-edge-forest)]"
          : "border-b border-[var(--rule)] md:border-r md:border-b-0 md:border-[var(--panel-edge-forest)]"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "var(--surface-grid-forest)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 20% 0%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 20% 0%, black 20%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_100%,var(--on-forest-scrim),transparent_58%)]"
      />
      <svg
        aria-hidden
        viewBox="17.32 17.32 39.68 39.68"
        preserveAspectRatio="xMidYMid meet"
        className={pentagonClass}
      >
        <path d={PENTAGON_PATH} fill="var(--bone)" />
      </svg>

      <div className={`${PANEL_ROW_GRID} ${PANEL_PADDING}`}>
        <PanelMetaRow ruleClassName="border-[var(--on-forest-rule)]">
          <HeadlineStepIndex index={stepIndex} />
        </PanelMetaRow>

        <PanelMainRow>
          <h3 className="type-feature max-w-[15ch] text-[var(--on-forest)] lg:max-w-[16ch]">
            {headline}
          </h3>
        </PanelMainRow>

        <PanelFooterRow>
          <span
            aria-hidden
            className="h-px w-full max-w-[12rem] bg-[var(--on-forest-accent-line)]"
          />
        </PanelFooterRow>
      </div>
    </div>
  );
}

function BodyPanel({
  body,
  illustration,
  illustrationAlt,
  flipped,
}: {
  body: readonly [string, string, string];
  illustration?: string;
  illustrationAlt?: string;
  flipped: boolean;
}) {
  const [rowOne, rowTwo, rowThree] = body;

  return (
    <div
      className={`relative flex min-h-0 flex-col overflow-hidden bg-[var(--bone)] md:min-h-full ${
        flipped ? "md:order-1 md:border-r md:border-[var(--rule)]" : ""
      }`}
    >
      {illustration ? (
        <figure
          className={`pointer-events-none absolute bottom-8 z-20 md:bottom-10 lg:bottom-12 ${
            flipped ? "left-8 md:left-10 lg:left-12" : "right-8 md:right-10 lg:right-12"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={illustration}
            alt={illustrationAlt}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-[7.5rem] opacity-90 sm:max-w-[9rem]"
          />
        </figure>
      ) : null}

      <div className={`${BODY_TEXT_GRID} ${PANEL_PADDING}`}>
        <BodyTextRow row={1}>{rowOne}</BodyTextRow>
        <BodyTextRow row={2}>{rowTwo}</BodyTextRow>
        <BodyTextRow row={3}>{rowThree}</BodyTextRow>
      </div>
    </div>
  );
}

export type SplitStepBody = readonly [string, string, string];

export function SplitStepCard({
  stepIndex,
  headline,
  body,
  illustration,
  illustrationAlt = "",
  flipped = false,
  className = "",
}: {
  stepIndex: number;
  headline: string;
  body: SplitStepBody;
  illustration?: string;
  illustrationAlt?: string;
  /** Body panel left, headline panel right (md+). */
  flipped?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bone)] md:grid-cols-2 md:items-stretch ${className}`}
      style={{ minHeight: SPLIT_STEP_CARD_MIN_HEIGHT }}
    >
      {flipped ? (
        <>
          <BodyPanel
            body={body}
            illustration={illustration}
            illustrationAlt={illustrationAlt}
            flipped={flipped}
          />
          <HeadlinePanel
            stepIndex={stepIndex}
            headline={headline}
            flipped={flipped}
          />
        </>
      ) : (
        <>
          <HeadlinePanel
            stepIndex={stepIndex}
            headline={headline}
            flipped={flipped}
          />
          <BodyPanel
            body={body}
            illustration={illustration}
            illustrationAlt={illustrationAlt}
            flipped={flipped}
          />
        </>
      )}
    </article>
  );
}
