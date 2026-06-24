import { PageColumn, PageGrid, PageGridProse, PageShell } from "./page-layout";
import "./tools-distance-section.css";

/* "Tools add distance." — a centered headline with an inline stacked deck of
   brand-logo tiles sitting literally between "add" and "distance," plus a
   notification-count badge. The tools create the distance. Logos are the
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
              <h2 id="distance-heading" className="tools-distance__headline">
                <span className="tools-distance__word">Tools add</span>
                <IconStrip />
                <span className="tools-distance__word">activity.</span>
              </h2>

              <p className="tools-distance__body">
                The market is full of tools that help you find more, send more,
                store more, and track more. For teams still working out how to
                sell, more activity without direction is just more shots in the
                dark.
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
