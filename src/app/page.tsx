import { Nav } from "./nav";
import { AccessButton } from "./access-modal";
import { MetaStrip } from "./meta-strip";
import { BrandMark } from "./brand-mark";
import { Wordmark } from "./wordmark";
import { BridgeStatement } from "./bridge-statement";
import { ProductStatement } from "./product-statement";
import { CommercialContextSection } from "./commercial-context/commercial-context-section";
import { RevenuePathSection } from "./revenue-path-section";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import "./hero.css";

function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="hero w-full bg-[var(--bone)]"
    >
      <div className="hero__inset">
        <div className="hero__frame">
          <div aria-hidden data-hero-surface className="hero__surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/abstract-bg.png"
              alt=""
              width={1254}
              height={1254}
              fetchPriority="high"
              decoding="async"
              className="hero__image"
              aria-hidden
            />
            <div aria-hidden className="hero__scrim hero__scrim--horizontal" />
            <div aria-hidden className="hero__scrim hero__scrim--vertical" />
          </div>
          <div className="hero__content">
            <PageColumn>
              <PageGrid>
                <PageGridProse className="page-grid-prose--hero flex flex-col items-center text-center">
                  <h1 id="hero-headline" className="rise rise-2 type-hero">
                    Commercial reasoning for repeatable revenue.
                  </h1>
                  <p className="rise rise-3 type-subhead mt-6 max-w-[64ch] text-[var(--on-forest-lead)]">
                    Kithos helps teams turn scattered commercial context,
                    execution, and outcomes into sharper revenue decisions
                    across the commercial workflow.
                  </p>
                  <div className="rise rise-4 mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
                    <AccessButton size="lg" tone="on-forest" className="btn-lift" />
                    <a
                      href="#bridge-statement"
                      className="link-underline ui inline-flex min-h-[44px] items-center text-[var(--on-forest)] transition-colors hover:text-[var(--on-forest-link-hover)] motion-reduce:transition-none"
                    >
                      Learn more
                    </a>
                  </div>
                </PageGridProse>
              </PageGrid>
            </PageColumn>
          </div>
        </div>
      </div>
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
            <RevenuePathSection />
            <ProductStatement />
            <CommercialContextSection />
          </div>
        </main>
        <EarlyAccessSection />
      </div>
    </>
  );
}
