import { PageColumn, PageGrid, PageGridProse, PageShell } from "./page-layout";
import "./tools-distance-section.css";

/* "Tools need direction." — a stacked deck of brand-logo tiles (plus a
   notification-count badge) sitting above a centered headline. The directionless
   pile of tools sets up Kithos as the layer that directs them. Logos are the
   official integration assets in /public/logos/integrations. */

type Brand = { name: string; src: string };

const LOGO_DIR = "/logos/integrations";

const BRANDS: Brand[] = [
  { name: "Salesforce", src: `${LOGO_DIR}/salesforce.svg` },
  { name: "HubSpot", src: `${LOGO_DIR}/hubspot.svg` },
  { name: "Gmail", src: `${LOGO_DIR}/gmail.svg` },
  { name: "Slack", src: `${LOGO_DIR}/slack.svg` },
  { name: "Gong", src: `${LOGO_DIR}/gong.svg` },
  { name: "Granola", src: `${LOGO_DIR}/granola.svg` },
  { name: "Apollo", src: `${LOGO_DIR}/apollo.svg` },
  { name: "ZoomInfo", src: `${LOGO_DIR}/zoominfo.svg` },
  { name: "LinkedIn", src: `${LOGO_DIR}/linkedin.svg` },
  { name: "Notion", src: `${LOGO_DIR}/notion.svg` },
];

function IconStrip() {
  return (
    <span className="tools-distance__strip" aria-hidden>
      <span className="tools-distance__track">
        {BRANDS.map((brand) => (
          <span key={brand.name} className="tools-distance__tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.src} alt="" loading="lazy" />
          </span>
        ))}
      </span>
      <span className="tools-distance__badge">999+</span>
    </span>
  );
}

export function ToolsDistanceSection() {
  return (
    <section
      id="distance"
      aria-labelledby="distance-heading"
      className="tools-distance relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="tools-distance__content">
              <IconStrip />
              <h2 id="distance-heading" className="tools-distance__headline">
                Tools need direction.
              </h2>

              <p className="tools-distance__body">
                The bottleneck was never doing the work. It&apos;s deciding
                what&apos;s worth doing. The market is full of tools that help you
                send more, store more, and do more. For a team still working out
                how to sell, more activity just makes more noise.
              </p>

              <p className="tools-distance__kicker">
                Kithos helps you decide what is worth doing.
              </p>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
