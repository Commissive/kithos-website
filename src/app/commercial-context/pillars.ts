export type PillarAccent = "forest" | "accent" | "terracotta" | "forest-muted";

export type PillarId = "collects" | "curates" | "connects" | "compounds";

export type CommercialContextPillar = {
  id: PillarId;
  eyebrow: string;
  heading: string;
  callout: string;
  body: string;
  accent: PillarAccent;
};

export const PILLAR_ACCENT_VAR: Record<PillarAccent, string> = {
  forest: "var(--forest)",
  accent: "var(--accent)",
  terracotta: "var(--terracotta)",
  "forest-muted": "var(--forest-muted)",
};

export const COMMERCIAL_CONTEXT_PILLARS: readonly CommercialContextPillar[] = [
  {
    id: "collects",
    eyebrow: "Collects",
    heading: "Kithos asks, searches, and extracts.",
    callout:
      "It gets missing context from the team, searches across connected tools and external sources, and extracts the signals that matter.",
    body: "Connect your tools, share your product, positioning, current sales efforts, customer evidence, and assumptions. Kithos turns notes, decks, calls, CRM activity, inbox threads, customer feedback, and team assumptions into a working commercial profile of your business.",
    accent: "forest",
  },
  {
    id: "curates",
    eyebrow: "Curates",
    heading: "Kithos sifts, sorts, and weighs.",
    callout:
      "It understands the commercial lifecycle, knows where your context applies, and when to apply them.",
    body: "Separate useful signal from background noise. Kithos identifies what influences decisions or changes the commercial picture: stronger-fit accounts, timing signals, buyer responses, repeated objections, and assumptions that need testing.",
    accent: "accent",
  },
  {
    id: "connects",
    eyebrow: "Connects",
    heading: "Kithos puts context to work.",
    callout:
      "It brings the right commercial context into the work before outreach, meetings, follow-ups, and deal decisions.",
    body: "Kithos connects what your team should know about the account, buyer, message, risk, previous interaction, and next move. So every commercial action starts with what the team already knows, not scattered notes, stale CRM fields, or memory.",
    accent: "terracotta",
  },
  {
    id: "compounds",
    eyebrow: "Compounds",
    heading: "Kithos builds commercial memory.",
    callout:
      "It captures the work, reads the outcome, and learns what helps your team find, engage, and win customers.",
    body: "The best teams scale with a playbook everyone can use. Kithos turns every reply, silence, objection, meeting, win, and loss into knowledge that shapes the next account, message, follow-up, and deal decision. So the motion keeps getting sharper.",
    accent: "forest-muted",
  },
] as const;

export const DEFAULT_PILLAR_ID = COMMERCIAL_CONTEXT_PILLARS[0].id;
