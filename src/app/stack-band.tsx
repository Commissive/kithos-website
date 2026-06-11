import type { CSSProperties } from "react";
import "./stack-band.css";
import { GridBandCellVertices } from "./grid-band-cell";

export type StackIntegration = {
  name: string;
  logo: string;
  /** Icon-only mark — taller aspect, smaller padding. */
  variant?: "mark";
};

export const STACK_INTEGRATIONS: readonly StackIntegration[] = [
  { name: "Salesforce", logo: "/logos/integrations/salesforce.svg" },
  { name: "HubSpot", logo: "/logos/integrations/hubspot.svg", variant: "mark" },
  { name: "Gmail", logo: "/logos/integrations/gmail.svg", variant: "mark" },
  {
    name: "Google Calendar",
    logo: "/logos/integrations/google-calendar.svg",
    variant: "mark",
  },
  { name: "Slack", logo: "/logos/integrations/slack.svg", variant: "mark" },
  { name: "Gong", logo: "/logos/integrations/gong.svg", variant: "mark" },
  { name: "Loom", logo: "/logos/integrations/loom.svg", variant: "mark" },
  { name: "Notion", logo: "/logos/integrations/notion.svg", variant: "mark" },
  {
    name: "Google Docs",
    logo: "/logos/integrations/google-docs.svg",
    variant: "mark",
  },
  { name: "LinkedIn", logo: "/logos/integrations/linkedin.svg", variant: "mark" },
  { name: "ZoomInfo", logo: "/logos/integrations/zoominfo.svg", variant: "mark" },
  { name: "Apollo", logo: "/logos/integrations/apollo.svg", variant: "mark" },
  { name: "Granola", logo: "/logos/integrations/granola.svg", variant: "mark" },
] as const;

type StackLogoPlacement = {
  col: number;
  row: number;
  colMobile: number;
  rowMobile: number;
};

/** Sparse grid slots — one unique cell per logo on desktop (5×4) and mobile (3×5). */
export const STACK_LOGO_PLACEMENTS: readonly StackLogoPlacement[] = [
  { col: 1, row: 1, colMobile: 1, rowMobile: 1 },
  { col: 2, row: 1, colMobile: 2, rowMobile: 1 },
  { col: 4, row: 1, colMobile: 3, rowMobile: 1 },
  { col: 5, row: 1, colMobile: 1, rowMobile: 2 },
  { col: 1, row: 2, colMobile: 2, rowMobile: 2 },
  { col: 3, row: 2, colMobile: 3, rowMobile: 2 },
  { col: 4, row: 2, colMobile: 1, rowMobile: 3 },
  { col: 2, row: 3, colMobile: 2, rowMobile: 3 },
  { col: 4, row: 3, colMobile: 3, rowMobile: 3 },
  { col: 1, row: 4, colMobile: 1, rowMobile: 4 },
  { col: 3, row: 4, colMobile: 2, rowMobile: 4 },
  { col: 4, row: 4, colMobile: 3, rowMobile: 4 },
  { col: 5, row: 4, colMobile: 2, rowMobile: 5 },
] as const;

function IntegrationLogo({ integration }: { integration: StackIntegration }) {
  return (
    <img
      src={integration.logo}
      alt={integration.name}
      className={
        integration.variant === "mark"
          ? "stack-band__logo stack-band__logo--mark"
          : "stack-band__logo stack-band__logo--wordmark"
      }
      loading="lazy"
      decoding="async"
    />
  );
}

export function StackLogoCloud() {
  return (
    <div className="stack-band" data-capability-stack>
      <ul className="stack-band__field" aria-label="Tools Kithos connects to">
        {STACK_INTEGRATIONS.map((integration, index) => {
          const placement = STACK_LOGO_PLACEMENTS[index];

          return (
            <li
              key={integration.name}
              className="stack-band__cell"
              style={
                {
                  "--stack-col": placement.col,
                  "--stack-row": placement.row,
                  "--stack-col-mobile": placement.colMobile,
                  "--stack-row-mobile": placement.rowMobile,
                } as CSSProperties
              }
            >
              <GridBandCellVertices prefix="stack-band" />
              <IntegrationLogo integration={integration} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Back-compat alias */
export const StackMarquee = StackLogoCloud;
