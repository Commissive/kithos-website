import "./stack-band.css";

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
  { name: "Apollo", logo: "/logos/integrations/apollo.svg" },
] as const;

const STACK_MARQUEE_DURATION = 48;

function IntegrationLogo({
  integration,
  decorative = false,
}: {
  integration: StackIntegration;
  decorative?: boolean;
}) {
  return (
    <img
      src={integration.logo}
      alt={decorative ? "" : integration.name}
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

export function StackMarquee() {
  const loop = [...STACK_INTEGRATIONS, ...STACK_INTEGRATIONS];

  return (
    <div className="stack-band" data-capability-stack>
      <div
        className="stack-band__marquee"
        style={{ "--stack-marquee-duration": `${STACK_MARQUEE_DURATION}s` }}
      >
        <ul className="stack-band__track" aria-label="Tools Kithos connects to">
          {loop.map((integration, index) => {
            const isDuplicate = index >= STACK_INTEGRATIONS.length;

            return (
              <li
                key={`${integration.name}-${index}`}
                className="stack-band__cell"
                aria-hidden={isDuplicate ? true : undefined}
              >
                <IntegrationLogo
                  integration={integration}
                  decorative={isDuplicate}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
