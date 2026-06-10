import { Nav } from "./nav";
import { SiteFooter } from "./site-footer";
import { ProblemSection } from "./problem-section";
import { Hero } from "./hero";
import { ProductStatement } from "./product-statement";
import { RevenuePathSection } from "./revenue-path-section";
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
              <ProductStatement />
              <ProblemSection />
              <RevenuePathSection />
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
