import { Nav } from "./nav";
import { AccessButton } from "./access-modal";
import "./early-access-section.css";
import "./home-mobile.css";
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
      className="early-access bg-[var(--accent)] text-[var(--on-accent)]"
      style={
        {
          "--mark-tile": "var(--on-accent)",
          "--mark-cutout": "var(--bg)",
        } as React.CSSProperties
      }
    >
      <PageShell>
        <PageColumn className="page-section-top pb-[var(--section-pad-bottom-lg)]">
          <PageGrid>
            <PageGridProse className="flex flex-col items-center text-center">
              <span className="label text-[var(--on-accent)]/80">
                Get early access
              </span>
              <h2 className="type-statement section-heading-title section-heading-title--center mt-6 text-[var(--on-accent)]">
                Make the next decision sharper than the last.
              </h2>
              <p className="lead section-heading-support mt-6 text-[var(--on-accent)]/90">
                Join teams using Kithos to connect market context, account
                motion, and outcomes in one commercial layer.
              </p>
              <div className="mt-8 md:mt-10">
                <AccessButton size="lg" tone="on-accent" />
              </div>
              <p className="ui mt-4 text-[var(--on-accent)]/75">
                Invite-only rollout. Priority to active B2B teams.
              </p>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
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
            <ProductStatement />
            <ProblemSection />
            <RevenuePathSection />
          </div>
        </main>
        <EarlyAccessSection />
      </div>
    </>
  );
}
