import { Nav } from "./nav";
import { SiteFooter } from "./site-footer";
import { Hero } from "./hero";
import { CapabilitySection } from "./capability-section";
import { BuyingExperienceSection } from "./buying-experience-section";
import { StackSection } from "./stack-section";
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
              <CapabilitySection />
              <BuyingExperienceSection />
              <StackSection />
            </div>
          </SiteGridPanel>
        </main>
        <SiteFooter showEarlyAccess />
      </div>
    </>
  );
}
