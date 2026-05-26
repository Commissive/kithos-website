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
import {
  PageStructuralFrame,
  SectionRuleTicks,
} from "./structural-frame";

function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative flex min-h-[max(38rem,var(--hero-viewport-h))] w-full flex-col justify-end bg-[var(--bone)]"
    >
      <div
        aria-hidden
        data-hero-surface
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(var(--nav-h)*-1)] overflow-hidden bg-[var(--forest)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/kithos-bg.png"
          alt=""
          width={1024}
          height={576}
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full min-h-full object-cover object-center"
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
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col justify-end px-2 pb-12 text-[var(--on-forest)] md:pb-16 lg:pb-20">
        <PageShell>
          <PageColumn>
            <PageGrid>
              <PageGridProse className="page-grid-prose--hero flex flex-col items-center text-center">
                <h1 id="hero-headline" className="rise rise-2 type-hero">
                  Revenue without the guesswork.
                </h1>
                <p className="rise rise-3 lead mt-6 max-w-[64ch] text-[var(--on-forest-lead)]">
                  Make outreach, meetings, and deal decisions sharper, faster,
                  and more consistent with the commercial reasoning system for
                  early B2B teams.
                </p>
                <div className="rise rise-4 mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                  <AccessButton size="lg" tone="on-forest" className="btn-lift" />
                  <a
                    href="#how-it-works"
                    className="link-underline ui inline-flex min-h-[44px] items-center text-[var(--on-forest)] transition-colors hover:text-[var(--on-forest-link-hover)] motion-reduce:transition-none"
                  >
                    See how it works
                  </a>
                </div>
              </PageGridProse>
            </PageGrid>
          </PageColumn>
        </PageShell>
      </div>
    </section>
  );
}

const COMMERCIAL_REASONING_FEATURES = [
  {
    step: 1,
    lead: "Research",
    support:
      "Kithos studies your business and market before shaping commercial moves.",
  },
  {
    step: 2,
    lead: "Reason",
    support:
      "Kithos weighs evidence and capacity to focus the next move.",
  },
  {
    step: 3,
    lead: "Remember",
    support:
      "Kithos gives your team relevant context for sharper deal decisions.",
  },
] as const;

const COMMERCIAL_CONTEXT_PILLARS = [
  {
    title: "Collects",
    kicker: "Ask. Search. Extract.",
    body: "Kithos starts with what your team knows and finds what it needs. Connect the tools, share your product, positioning, current sales efforts, customer evidence, and assumptions. Kithos turns notes, decks, calls, CRM activity, inbox threads, customer feedback, and team assumptions into a working commercial profile of your business.",
  },
  {
    title: "Curate",
    kicker: "Sift. Sort. Weigh.",
    body: "Kithos separates useful signal from background noise. It identifies what influences decisions or changes the commercial picture: stronger-fit accounts, timing signals, buyer responses, repeated objections, and assumptions that need testing. It builds a working knowledge of your commercial activities.",
  },
  {
    title: "Connects",
    kicker: "Right when it matters.",
    body: "Kithos brings the right context into the work exactly when the team needs it: the account, the buyer, the message, the risk, the last interaction, and the recommended next move. Before outreach. Before meetings. Before follow-ups. Before deal decisions. So every commercial move starts from what the team already knows.",
  },
  {
    title: "Compounds",
    kicker: "It gets better.",
    body: "The best teams scale with a playbook everyone can leverage. Kithos captures replies, silences, objections, meetings, wins, and losses, then feeds that learning back into the next account, next message, next meeting, and next decision. The motion gets sharper because the context never disappears.",
  },
] as const;

function ProductToRevenueSection() {
  return (
    <section
      aria-labelledby="product-to-revenue-heading"
      className="relative z-10 w-full scroll-mt-[var(--scroll-anchor-offset)] overflow-hidden border-t border-[var(--rule)] bg-[var(--surface)]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top-first">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-[var(--section-gap-md)] pb-[var(--section-prose-pad-bottom)]">
              <header className="commercial-context-intro">
                <h2
                  id="product-to-revenue-heading"
                  className="type-statement section-heading-title text-balance"
                >
                  The Commercial Context Engine.
                </h2>
                <p className="lead max-w-[56ch] text-[var(--ink-muted)]">
                  Kithos collects what your team knows, curates what matters, and
                  brings the right context to every commercial move.
                </p>
              </header>
              <div className="commercial-context-pillars mt-2">
                {COMMERCIAL_CONTEXT_PILLARS.map((pillar) => (
                  <article key={pillar.title} className="commercial-context-card">
                    <p className="label">{pillar.title}</p>
                    <h3 className="type-card mt-3 text-[var(--ink)]">
                      <span className="font-normal text-[var(--ink-muted)]">
                        {pillar.kicker}
                      </span>
                    </h3>
                    <p className="body mt-3 text-[var(--ink-body)]">{pillar.body}</p>
                  </article>
                ))}
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}

function CommercialContextEngineSection() {
  return (
    <section
      aria-labelledby="commercial-context-engine-heading"
      className="relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--surface)]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="pb-[var(--section-prose-pad-bottom)]">
              <h2
                id="commercial-context-engine-heading"
                className="type-statement section-heading-title text-balance"
              >
                Go from product to revenue with confidence.
              </h2>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}

function SynthesisSection() {
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--surface)]">
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse>
              <h2 className="type-statement section-heading-title">
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

      <div className="mt-auto w-full">
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

        <PageShell className="mt-10 w-full pb-8 sm:mt-12 md:mt-14 md:pb-10">
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
          <div className="relative isolate">
            <BridgeStatement />
            <ProductToRevenueSection />
            <CommercialContextEngineSection />
            <CommercialReasoningSection
              headline={
                <SectionStatementHeadline
                  lead="Turn scattered go-to-market context into a clear path to revenue."
                  support={[]}
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
