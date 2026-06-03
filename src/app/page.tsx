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
      className="early-access bg-[var(--accent)]"
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
              <span className="label">
                Get early access
              </span>
              <h2 className="type-statement section-heading-title section-heading-title--center mt-6">
                Build a revenue motion that gets sharper with every outcome.
              </h2>
              <p className="lead section-heading-support mt-6">
                Join teams using Kithos to find the right customers, move deals
                forward with sharper context, and turn every outcome into a
                better next move.
              </p>
              <div className="mt-8 md:mt-10">
                <AccessButton size="lg" tone="on-accent" />
              </div>
              <p className="ui mt-4">
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
