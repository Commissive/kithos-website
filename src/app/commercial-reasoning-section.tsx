import { useId, type CSSProperties, type ReactNode } from "react";
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

const SECTION_IMAGE = {
  src: "/brand/illustrations/detailed-preparation.webp",
  alt: "Abstract view of preparation and context coming together before a commercial move",
  position: "45% 50%",
} as const;

const PANEL_PAD = "p-6 md:p-8 lg:p-10";

const PANEL_SHELL = [
  "commercial-reasoning-panel flex w-full flex-col overflow-hidden",
  "bg-[var(--forest)] text-[var(--on-forest)]",
  "shadow-[inset_0_1px_0_var(--on-forest-inset-highlight)]",
  PANEL_PAD,
].join(" ");

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

  return (
    <section
      id="commercial-reasoning"
      aria-labelledby={headlineId}
      className="stack-overlap-sheet relative z-10 mt-[var(--stack-overlap-pull)] w-full scroll-mt-[var(--scroll-anchor-offset)] overflow-hidden rounded-t-2xl border-t border-[var(--rule)] bg-[var(--bone)] md:rounded-t-[1.75rem]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top-first">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-[var(--section-gap-xl)] pb-[var(--section-prose-pad-bottom)]">
              {eyebrow ? <p className="label">{eyebrow}</p> : null}

              {subhead ? (
                <div className="grid grid-cols-1 items-start gap-[var(--section-gap-md)] lg:grid-cols-12 lg:gap-x-[var(--page-grid-gap)] lg:gap-y-0">
                  <div className="lg:col-span-7">
                    <h2
                      id={headlineId}
                      className="type-statement text-[var(--ink)]"
                    >
                      {headline}
                    </h2>
                  </div>
                  <p className="lead max-w-[36ch] text-[var(--ink-muted)] lg:col-span-5 lg:max-w-[40ch]">
                    {subhead}
                  </p>
                </div>
              ) : (
                <h2 id={headlineId} className="type-statement text-[var(--ink)]">
                  {headline}
                </h2>
              )}

              {body && body.length > 0 ? (
                <div className="flex max-w-[52ch] flex-col gap-[var(--space-1-5)]">
                  {body.map((paragraph, i) => (
                    <p key={i} className="body text-[var(--ink-body)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              <div className={PANEL_SHELL}>
                <div className="commercial-reasoning-layout grid w-full min-h-[22rem] grid-cols-1 gap-6 sm:min-h-[26rem] lg:min-h-[36rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-8">
                  <figure
                    className="commercial-reasoning-layout__figure relative m-0 min-h-[22rem] overflow-hidden p-0 sm:min-h-[26rem] lg:h-full lg:min-h-full"
                    style={
                      {
                        "--illustration-position": SECTION_IMAGE.position,
                      } as CSSProperties
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SECTION_IMAGE.src}
                      alt={SECTION_IMAGE.alt}
                      width={1024}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="commercial-reasoning-layout__image absolute inset-0 size-full object-cover"
                    />
                  </figure>
                  <div className="commercial-reasoning-layout__capabilities flex h-full min-h-0 min-w-0">
                    <BorderedThreeColumnCardStack features={features} />
                  </div>
                </div>
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
