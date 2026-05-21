import { Nav } from "./nav";
import { AccessButton } from "./access-modal";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { MetaStrip } from "./meta-strip";
import { RevenueMotionSteps } from "./revenue-motion-steps";
import { ScrollStatement } from "./scroll-statement";
import { PageStructuralFrame, SectionRuleTicks } from "./structural-frame";

function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="w-full bg-[var(--bg)] px-4 pt-5 pb-5 md:px-6 md:pt-6 md:pb-6"
    >
      <div className="relative mx-auto flex min-h-[var(--hero-min-h)] w-full max-w-[var(--page-max)] flex-col overflow-hidden rounded-2xl bg-[var(--forest-deep)] text-[var(--bone)] md:rounded-[1.75rem]">
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
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--forest)_94%,transparent)_0%,color-mix(in_oklch,var(--forest)_72%,transparent)_42%,color-mix(in_oklch,var(--forest)_28%,transparent)_68%,transparent_88%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklch,var(--forest-deep)_55%,transparent),transparent_55%)]"
        />

        <div className="relative z-10 flex min-h-[var(--hero-min-h)] flex-col justify-center px-6 py-16 md:px-10 md:py-20 lg:py-24">
          <div className="max-w-[54rem]">
          <h1 id="hero-headline" className="rise rise-2 type-hero">
            <span className="block">Revenue,</span>
            <span className="block">without the guesswork.</span>
          </h1>
          <p className="rise rise-3 lead mt-6 max-w-[46ch] text-[color-mix(in_oklch,var(--bone)_82%,var(--forest))]">
            Kithos is the commercial agent that helps B2B teams turn
            scattered go-to-market context into a clear path to revenue.
          </p>
          <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <AccessButton size="lg" tone="on-forest" className="btn-lift" />
            <a
              href="#right-now"
              className="link-underline inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-[var(--bone)] transition-colors hover:text-[color-mix(in_oklch,var(--bone)_72%,var(--forest))]"
            >
              See how it works
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemStatement() {
  return (
    <ScrollStatement
      eyebrow="Find your revenue motion"
      headline="Sell with the confidence of a superintelligent commercial team."
      body={[
        "You built for someone. You shouldn't need six tools to find them, or GTM based on vibes.",
        "Kithos helps your team win deals it would otherwise lose. Know what opportunities deserve attention, and get the full gist of what's happening and what should happen next.",
      ]}
    />
  );
}

function MotionStatement() {
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--surface)] py-[var(--section-pad-y-spacious)]">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[var(--page-max)] px-6 md:px-10">
        <h2 className="type-statement max-w-[18ch]">
          Go from scattered work to a self-improving revenue motion.
        </h2>
      </div>
    </section>
  );
}

function ClosingBand() {
  return (
    <section
      id="access"
      data-on-accent
      className="flex min-h-[100svh] flex-col bg-[var(--accent)] text-[var(--on-accent)]"
      style={
        {
          "--mark-tile": "var(--on-accent)",
          "--mark-cutout": "var(--bg)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-1 flex-col justify-center px-6 py-[var(--section-pad-y)] md:px-10">
        <span className="label" style={{ color: "var(--on-accent-soft)" }}>
          Get early access
        </span>
        <h2 className="type-hero mt-6 max-w-[20ch] text-[var(--on-accent)]">
          Make the next decision sharper than the last.
        </h2>
        <div className="mt-12">
          <AccessButton size="lg" tone="on-accent" />
        </div>
      </div>

      <div className="md:relative">
        <div
          className="mx-auto flex w-full max-w-[var(--page-max)] items-end gap-5 px-6 sm:gap-6 md:gap-8 md:px-10"
          style={
            {
              "--mark-tile":
                "color-mix(in oklch, var(--accent) 88%, var(--accent-ink) 12%)",
              "--mark-cutout": "var(--accent)",
              color:
                "color-mix(in oklch, var(--accent) 88%, var(--accent-ink) 12%)",
            } as React.CSSProperties
          }
        >
          <BrandMark className="h-16 w-16 shrink-0 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-44 lg:w-44" />
          <Wordmark className="h-16 w-auto shrink-0 sm:h-24 md:h-32 lg:h-44" />
        </div>

        <div className="mx-auto mt-12 w-full max-w-[var(--page-max)] px-6 pb-6 sm:mt-14 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-10 md:pb-8">
          <MetaStrip />
        </div>
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
          <ProblemStatement />
          <RevenueMotionSteps />
          <MotionStatement />
        </main>
        <ClosingBand />
        <PageStructuralFrame />
      </div>
    </>
  );
}
