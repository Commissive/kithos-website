import "./stack-band.css";
import { GridBandCellVertices } from "./grid-band-cell";

export type StackIntegration = {
  name: string;
  logo: string;
  /** Wide brand wordmark — shown without a separate name label. */
  variant?: "wordmark";
};

export type StackGroup = {
  label: string;
  tools: readonly StackIntegration[];
};

/* Grouped by the workflow categories the section copy claims —
   the arrangement is the evidence. */
export const STACK_GROUPS: readonly StackGroup[] = [
  {
    label: "CRM",
    tools: [
      {
        name: "Salesforce",
        logo: "/logos/integrations/salesforce.svg",
        variant: "wordmark",
      },
      { name: "HubSpot", logo: "/logos/integrations/hubspot.svg" },
    ],
  },
  {
    label: "Inbox & calendar",
    tools: [
      { name: "Gmail", logo: "/logos/integrations/gmail.svg" },
      {
        name: "Google Calendar",
        logo: "/logos/integrations/google-calendar.svg",
      },
    ],
  },
  {
    label: "Calls & recordings",
    tools: [
      { name: "Gong", logo: "/logos/integrations/gong.svg" },
      { name: "Loom", logo: "/logos/integrations/loom.svg" },
      { name: "Granola", logo: "/logos/integrations/granola.svg" },
    ],
  },
  {
    label: "Notes & workspace",
    tools: [
      { name: "Notion", logo: "/logos/integrations/notion.svg" },
      { name: "Google Docs", logo: "/logos/integrations/google-docs.svg" },
      { name: "Slack", logo: "/logos/integrations/slack.svg" },
      { name: "Monday.com", logo: "/logos/integrations/monday.svg" },
    ],
  },
  {
    label: "Prospecting data",
    tools: [
      { name: "LinkedIn", logo: "/logos/integrations/linkedin.svg" },
      { name: "ZoomInfo", logo: "/logos/integrations/zoominfo.svg" },
      { name: "Apollo", logo: "/logos/integrations/apollo.svg" },
    ],
  },
] as const;

export const STACK_INTEGRATIONS: readonly StackIntegration[] =
  STACK_GROUPS.flatMap((group) => group.tools);

export function StackLogoCloud() {
  return (
    <ul className="stack-cloud" aria-label="Tools Kithos connects to">
      {STACK_INTEGRATIONS.map((tool) => (
        <li key={tool.name} className="stack-cloud__cell">
          <GridBandCellVertices prefix="stack-band" />
          <img
            src={tool.logo}
            alt={tool.name}
            className={
              tool.variant === "wordmark"
                ? "stack-cloud__logo stack-cloud__logo--wordmark"
                : "stack-cloud__logo"
            }
            loading="lazy"
            decoding="async"
          />
          {tool.variant === "wordmark" ? null : (
            <span className="stack-cloud__name">{tool.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
