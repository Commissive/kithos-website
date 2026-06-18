import "./stack-band.css";
import { BrandMark } from "./brand-mark";

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
      { name: "Salesforce", logo: "/logos/integrations/salesforce.svg" },
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

/* The stage is wider than tall; the SVG shares its aspect so the orthogonal
   routing keeps true right angles between node centres and the core. */
const STAGE_ASPECT = 1.8;
const VIEW_W = 100 * STAGE_ASPECT;
const X = (px: number) => +(px * STAGE_ASPECT).toFixed(2);

/* Central Kithos node. Apps don't spear the centre; each side gathers its apps
   onto a shared trunk, and only the four trunks enter the core — a circuit bus,
   not a starburst. */
const CORE = { px: 50, py: 50 };
/* Where a trunk meets the core edge. */
const EDGE = { top: 42, bottom: 58, left: 46, right: 54 };
/* The shared trunk line for each side. */
const TRUNK = { top: 31, bottom: 69, left: 27, right: 73 };

type Side = "top" | "bottom" | "left" | "right";
type Node = { px: number; py: number; side: Side };

/* Apps framed around the core, indexed to STACK_INTEGRATIONS order. */
const NODES: readonly Node[] = [
  { px: 30, py: 13, side: "top" }, // top trunk (4)
  { px: 43.3, py: 13, side: "top" },
  { px: 56.7, py: 13, side: "top" },
  { px: 70, py: 13, side: "top" },
  { px: 90, py: 30, side: "right" }, // right trunk (3)
  { px: 90, py: 50, side: "right" },
  { px: 90, py: 70, side: "right" },
  { px: 30, py: 87, side: "bottom" }, // bottom trunk (4)
  { px: 43.3, py: 87, side: "bottom" },
  { px: 56.7, py: 87, side: "bottom" },
  { px: 70, py: 87, side: "bottom" },
  { px: 10, py: 30, side: "left" }, // left trunk (3)
  { px: 10, py: 50, side: "left" },
  { px: 10, py: 70, side: "left" },
];

/* Orthogonal route: a stub from the app to its side's trunk, along the trunk to
   centre, then one short leg into the core. Sibling apps share the trunk + leg,
   so the wires merge instead of each driving its own line to the middle. */
function nodePath({ px, py, side }: Node): string {
  const cx = X(CORE.px);
  switch (side) {
    case "top":
      return `M ${X(px)} ${py} V ${TRUNK.top} H ${cx} V ${EDGE.top}`;
    case "bottom":
      return `M ${X(px)} ${py} V ${TRUNK.bottom} H ${cx} V ${EDGE.bottom}`;
    case "left":
      return `M ${X(px)} ${py} H ${X(TRUNK.left)} V ${CORE.py} H ${X(EDGE.left)}`;
    case "right":
      return `M ${X(px)} ${py} H ${X(TRUNK.right)} V ${CORE.py} H ${X(EDGE.right)}`;
  }
}

/* Connect-to-existing-systems network — each app the team already uses wired
   into one Kithos node, with a bright pulse running through every wire into the
   core. The moving wires are the argument: scattered sources into one picture. */
export function StackLogoCloud() {
  const total = STACK_INTEGRATIONS.length;

  return (
    <div className="stack-net">
      <svg
        className="stack-net__wires"
        viewBox={`0 0 ${VIEW_W} 100`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {STACK_INTEGRATIONS.map((tool, i) => (
          <path
            key={`base-${tool.name}`}
            className="stack-net__wire"
            d={nodePath(NODES[i])}
          />
        ))}
        {STACK_INTEGRATIONS.map((tool, i) => (
          <path
            key={`beam-${tool.name}`}
            className="stack-net__beam"
            d={nodePath(NODES[i])}
            pathLength={100}
            style={{ animationDelay: `${((i / total) * 2).toFixed(2)}s` }}
          />
        ))}
      </svg>

      {STACK_INTEGRATIONS.map((tool, i) => {
        const p = NODES[i];
        return (
          <div
            key={tool.name}
            className="stack-net__node"
            style={{ left: `${p.px}%`, top: `${p.py}%` }}
            title={tool.name}
          >
            {/* Small CSS-positioned SVG logo — next/image adds no SVG benefit here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.logo}
              alt={tool.name}
              className="stack-net__logo"
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}

      <div
        className="stack-net__core"
        style={{ left: `${CORE.px}%`, top: `${CORE.py}%` }}
        aria-hidden
      >
        <BrandMark className="stack-net__core-mark" />
      </div>
    </div>
  );
}
