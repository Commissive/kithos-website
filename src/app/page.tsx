import { Nav } from "./nav";
import { SiteFooter } from "./site-footer";
import { Hero } from "./hero";
import { NextMoveSection } from "./next-move-section";
import {
  CapabilitySection,
  ACCOUNT_PURSUIT_CAPABILITIES,
  ACCOUNT_PURSUIT_SUBHEAD,
  ACCOUNT_PURSUIT_STAGE_TINTS,
  WIN_ACCOUNTS_CAPABILITIES,
  WIN_ACCOUNTS_SUBHEAD,
  WIN_ACCOUNTS_STAGE_TINTS,
} from "./capability-section";
import { SiteGridPanel, SiteGridVlines } from "./page-layout";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <main id="main">
          <SiteGridPanel>
            <Hero />
            <div className="page-sections">
              <SiteGridVlines />
              <NextMoveSection />
              <CapabilitySection
                sectionId="account-pursuit"
                headingId="account-pursuit-heading"
                eyebrow="Where to focus"
                headline="Start with the accounts worth pursuing."
                subhead={ACCOUNT_PURSUIT_SUBHEAD}
                idPrefix="pursuit-"
                capabilities={ACCOUNT_PURSUIT_CAPABILITIES}
                stageTints={ACCOUNT_PURSUIT_STAGE_TINTS}
              />
              <CapabilitySection
                sectionId="capabilities"
                headingId="capabilities-heading"
                eyebrow="How to win"
                headline="Win the accounts you choose."
                subhead={WIN_ACCOUNTS_SUBHEAD}
                capabilities={WIN_ACCOUNTS_CAPABILITIES}
                stageTints={WIN_ACCOUNTS_STAGE_TINTS}
              />
            </div>
          </SiteGridPanel>
        </main>
        <SiteFooter showEarlyAccess />
      </div>
    </>
  );
}
