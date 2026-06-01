import { Nav } from "./nav";
import { AccessButton } from "./access-modal";
import { MetaStrip } from "./meta-strip";
import { BrandMark } from "./brand-mark";
import { Wordmark } from "./wordmark";
import { ProblemSection } from "./problem-section";
import { Hero } from "./hero";
import { ProductStatement } from "./product-statement";
import { RevenuePathSection } from "./revenue-path-section";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";

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
            <ProblemSection />
            <RevenuePathSection />
            <ProductStatement />
          </div>
        </main>
        <EarlyAccessSection />
      </div>
    </>
  );
}
