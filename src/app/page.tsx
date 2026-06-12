import { Nav } from "./nav";
import { SiteFooter } from "./site-footer";
import { Hero } from "./hero";
import { KithosIntroSection } from "./kithos-intro-section";
import { ProductStatement } from "./product-statement";
import { CapabilitySection } from "./capability-section";
import { StackSection } from "./stack-section";
import { WorkingWithKithosSection } from "./working-with-kithos-section";
import { FaqSection } from "./faq-section";
import { SiteGridPanel } from "./page-layout";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <main id="main">
          <SiteGridPanel>
            <Hero />
            <div className="page-sections">
              <KithosIntroSection />
              <CapabilitySection />
              <ProductStatement />
              <StackSection />
              <WorkingWithKithosSection />
            </div>
          </SiteGridPanel>
          <div className="page-sections">
            <FaqSection />
          </div>
        </main>
        <SiteFooter showEarlyAccess />
      </div>
    </>
  );
}
