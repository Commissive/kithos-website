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
    illustration: "/brand/illustrations/deep-research.webp",
    illustrationVariant: "photo",
    illustrationAlt:
      "Abstract view of research and market context turning into directed commercial action",
    lead: "Deep research.",
    support: [
      "Kithos learns your business and market to develop deep product expertise before attempting to influence your outreach, meetings, or deal decisions.",
    ],
    benefitLead: "Spend selling time on accounts that are actually worth the chase.",
    benefitParagraphs: [
      "Build lists from fit and intent—not guesswork and scraped names.",
      "Understand what each company does before you write the first line.",
      "See who likely influences the deal so outreach lands with the right people.",
      "Spot live buying motion instead of chasing accounts going nowhere.",
      "Place each account in the market story buyers and investors already believe.",
      "Know how you are positioned against alternatives before the first call.",
      "Reach out when the account is more likely to care—not when the calendar says so.",
      "Tailor the angle to the account, not a template with the company name swapped in.",
    ],
  },
  {
    step: 2,
    illustration: "/brand/illustrations/intelligent-synthesis.webp",
    illustrationVariant: "photo",
    illustrationAlt:
      "Abstract view of scattered commercial context unified into shared memory",
    lead: "Intelligent synthesis.",
    support: [
      "Kithos pulls scattered commercial context into one working view, so teams get a shared commercial memory they can actually reason from.",
    ],
    benefitLead: "Stop rebuilding context from scratch on every deal.",
    benefitParagraphs: [
      "Everyone sells from the same understanding of what you actually offer.",
      "Preserve how leadership talks about the company as the team scales.",
      "Turn customer wins and objections into memory the whole team can use.",
      "Reuse what worked last time instead of reinventing responses deal by deal.",
      "Pull activity and history into reasoning—not another empty-field review.",
      "Connect external signals to accounts already in your pipeline.",
      "Keep deep account context on the opportunity, not scattered across tabs.",
      "Build institutional knowledge that survives rep turnover.",
    ],
  },
  {
    step: 3,
    illustration: "/brand/illustrations/activity-prioritisation.webp",
    illustrationVariant: "photo",
    illustrationPosition: "58% 45%",
    illustrationAlt:
      "Abstract view of many signals converging toward the opportunities most likely to close",
    lead: "Activity prioritisation.",
    support: [
      "Kithos weighs account fit, timing, available evidence, and current team capacity to decide the next best action.",
      "Surfaces opportunities most likely to close.",
    ],
    benefitLead: "Put team attention where it will actually move revenue.",
    benefitParagraphs: [
      "Focus on accounts that match how you win—not just who replied.",
      "Prioritise when momentum is real, not when automation says now.",
      "See which deals need action this week versus noise in the inbox.",
      "Match effort to stakeholders who can actually move the deal.",
      "Weight calls on what you know—not hope and gut feel alone.",
      "Know where you have lines in and where you still need a path.",
      "Use past touches to choose the next move, not repeat the last follow-up.",
      "Allocate attention across the team without everyone chasing the same accounts.",
    ],
  },
  {
    step: 4,
    illustration: "/brand/illustrations/detailed-preparation.webp",
    illustrationVariant: "photo",
    illustrationPosition: "45% 50%",
    illustrationAlt:
      "Abstract view of preparation and context coming together before a commercial move",
    lead: "Detailed preparation.",
    support: [
      "Kithos helps you think through deal decisions before you act.",
      "Gets you ready so you show up sharper with less generic outreach.",
    ],
    benefitLead: "Show up to every commercial moment already prepared.",
    benefitParagraphs: [
      "Walk into calls with the context that matters already assembled.",
      "Send follow-ups with a point of view—not just checking in.",
      "Think through pricing, timing, and risk before you commit in the room.",
      "Stop rebuilding the same account story from five tools before every move.",
      "Know what to ask, what to avoid, and what success looks like going in.",
      "Personalise outreach from evidence—not templates with a name swapped in.",
      "Keep the full account picture one step away when you are deciding what to do next.",
      "Show up sharper on every email, call, and negotiation.",
    ],
  },
  {
    step: 5,
    illustration: "/brand/illustrations/compounding-intelligence.webp",
    illustrationVariant: "photo",
    illustrationPosition: "48% 52%",
    illustrationAlt:
      "Abstract view of commercial outcomes compounding into sharper team judgment over time",
    lead: "Compounding intelligence.",
    support: [
      "Kithos turns commercial outcomes into sharper judgment for what to do next.",
      "The sales motion gets sharper as the team works.",
    ],
    benefitLead: "Turn every outcome into a sharper motion for the next one.",
    benefitParagraphs: [
      "Learn what messaging earns replies—and what gets ignored.",
      "Spot recurring blockers and how your team actually overcame them.",
      "See what winning deals had in common while the motion is still fresh.",
      "Understand why you lost without rewriting the story from memory alone.",
      "Turn every reply, stall, and close into input for the next decision.",
      "Build playbooks from real outcomes—not slides from last quarter.",
      "Carry forward what worked instead of each rep starting from zero.",
      "Get sharper as a team because the system learns with every deal.",
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
