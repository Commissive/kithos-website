import { Nav } from "./nav";
import { AccessButton } from "./access-modal";
import { MetaStrip } from "./meta-strip";
import { BrandMark } from "./brand-mark";
import { Wordmark } from "./wordmark";
import { BridgeStatement } from "./bridge-statement";
import { CommercialReasoningSection } from "./commercial-reasoning-section";
import { ObservabilityLayerSection } from "./observability-layer-section";
import { SectionStatementHeadline } from "./section-statement-headline";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import { PageStructuralFrame, SectionRuleTicks } from "./structural-frame";

function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="flex min-h-[var(--hero-viewport-h)] w-full flex-col justify-center bg-[var(--bone)] py-[var(--hero-shell-gap-y)]"
    >
      <PageShell>
        <PageColumn>
      <div className="relative flex min-h-[var(--hero-card-min-h)] w-full flex-col overflow-hidden rounded-2xl bg-[var(--forest-deep)] text-[var(--on-forest)] md:rounded-[1.75rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/hero-background.jpg"
          alt=""
          width={1024}
          height={576}
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full min-h-full object-cover object-[42%_38%] sm:object-[40%_36%]"
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "var(--hero-scrim-horizontal)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "var(--hero-scrim-vertical)" }}
        />

        <div className="relative z-10 flex min-h-[var(--hero-card-min-h)] flex-col justify-center py-16 md:py-20 lg:py-24">
          <PageGrid>
            <PageGridProse className="page-grid-prose--hero">
              <h1 id="hero-headline" className="rise rise-2 type-hero">
                <span className="block">Revenue,</span>
                <span className="block">without the guesswork.</span>
              </h1>
              <p className="rise rise-3 lead mt-6 max-w-[46ch] text-[var(--on-forest-lead)]">
                Kithos is the commercial agent that helps B2B teams turn
                scattered go-to-market context into a clear path to revenue.
              </p>
              <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <AccessButton size="lg" tone="on-forest" className="btn-lift" />
                <a
                  href="#how-it-works"
                  className="link-underline ui inline-flex min-h-[44px] items-center text-[var(--on-forest)] transition-colors hover:text-[var(--on-forest-link-hover)]"
                >
                  See how it works
                </a>
              </div>
            </PageGridProse>
          </PageGrid>
        </div>
      </div>
        </PageColumn>
      </PageShell>
    </section>
  );
}

const COMMERCIAL_REASONING_FEATURES = [
  {
    step: 1,
    title: "Research",
    summary:
      "Kithos learns about your company and researches the market you operate in.",
    middleBody: [
      "It finds relevant accounts, studies what each company does, identifies buying signals, and maps likely stakeholders.",
      "It spots timing triggers and gathers the context needed before outreach, meetings, or deal decisions.",
    ],
    middleItems: [
      "Account discovery",
      "Company research",
      "Stakeholder mapping",
      "Signal detection",
      "Market context",
      "Competitive context",
      "Timing and relevance checks",
      "Account-specific reasoning",
    ],
    pillRows: [
      ["Company research", "Timing and relevance checks", "Market context"],
      ["Account discovery", "Stakeholder mapping", "Signal detection"],
      ["Competitive context", "Account-specific reasoning"],
    ],
    outcome: [
      "Get a clearer view of which companies are worth pursuing, why they might care now, and what angle is most likely to earn a serious conversation.",
      "Better account selection before scarce sales time is spent.",
    ],
  },
] as const;

function SynthesisSection() {
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--bone)]">
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <h2 className="type-statement max-w-[18ch]">
                Go from scattered work to a self-improving revenue motion.
              </h2>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}

function EarlyAccessSection() {
  return (
    <section
      id="access"
      data-on-accent
      className="flex min-h-[100svh] flex-col bg-[var(--accent)] pb-[var(--section-pad-bottom-lg)] text-[var(--on-accent)]"
      style={
        {
          "--mark-tile": "var(--on-accent)",
          "--mark-cutout": "var(--bg)",
        } as React.CSSProperties
      }
    >
      <PageShell className="flex-1">
        <PageColumn className="flex flex-1 flex-col justify-center">
          <PageGrid>
            <PageGridProse className="page-grid-prose--hero">
              <span className="label" style={{ color: "var(--on-accent-soft)" }}>
                Get early access
              </span>
              <h2 className="type-statement mt-6 max-w-[20ch] text-[var(--on-accent)]">
                Make the next decision sharper than the last.
              </h2>
              <div className="mt-12">
                <AccessButton size="lg" tone="on-accent" />
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>

      <div className="mt-auto md:relative">
        <PageShell>
          <PageColumn
            className="flex items-end gap-5 sm:gap-6 md:gap-8"
            style={
              {
                "--mark-tile": "var(--on-accent-mark-tile)",
                "--mark-cutout": "var(--accent)",
                color: "var(--on-accent-mark-tile)",
              } as React.CSSProperties
            }
          >
            <BrandMark className="h-16 w-16 shrink-0 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-44 lg:w-44" />
            <Wordmark className="h-16 w-auto shrink-0 sm:h-24 md:h-32 lg:h-44" />
          </PageColumn>
        </PageShell>

        <PageShell className="mt-12 w-full sm:mt-14 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:pb-8">
          <PageColumn>
            <MetaStrip />
          </PageColumn>
        </PageShell>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <main id="main">
          <Hero />
          <div className="stack-overlap-track relative isolate">
            <BridgeStatement />
            <CommercialReasoningSection
              headline={
                <SectionStatementHeadline
                  lead="The commercial reasoning system for repeatable revenue."
                  support="Kithos gives you the intelligence to win."
                />
              }
              features={COMMERCIAL_REASONING_FEATURES}
            />
          </div>
          <ObservabilityLayerSection />
          <SynthesisSection />
        </main>
        <EarlyAccessSection />
        <PageStructuralFrame />
      </div>
    </>
  );
}
