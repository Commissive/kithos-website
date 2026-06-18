import type { ReactNode } from "react";
import "./capability-artifact.css";

/* ── Data shapes (unchanged — the capability data feeds these) ── */

type Stakeholder = {
  initials: string;
  name: string;
  title: string;
  role: string;
  status: string;
  tone: "hot" | "warm" | "cold";
};

type Signal = {
  text: string;
  tag: string;
  when: string;
};

type MetaField = {
  label: string;
  value: string;
};

type Recipient = {
  name: string;
  email: string;
};

type PatternEntry = {
  tone: "win" | "loss";
  text: string;
  evidence: string;
};

export type ArtifactPreview =
  | {
      kind: "brief";
      label: string;
      source: string;
      updated: string;
      account: string;
      industry: string;
      stage: string;
      meta: readonly MetaField[];
      signals: readonly Signal[];
      stakeholders: readonly Stakeholder[];
    }
  | {
      kind: "outreach";
      label: string;
      source: string;
      from: string;
      to: readonly Recipient[];
      subject: string;
      body: readonly string[];
      highlight: string;
      footer: string;
    }
  | {
      kind: "pattern";
      label: string;
      source: string;
      period: string;
      headline: string;
      stat: string;
      patterns: readonly PatternEntry[];
      applied: string;
    }
  | {
      kind: "move";
      label: string;
      source: string;
      priority: string;
      confidence: number;
      action: string;
      evidence: readonly string[];
      because: string;
      similar: string;
    }
  | {
      kind: "segment";
      label: string;
      source: string;
      basis: string;
      headline: string;
      stat: string;
      criteria: readonly string[];
      because: string;
      applied: string;
    };

/* ── One consistent card shell — every artifact is the same instrument:
   a mono header (mark · label · meta), a body, and a status footer. ── */

function ArtifactCard({
  label,
  meta,
  live = false,
  children,
  footer,
}: {
  label: string;
  meta?: string;
  live?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <aside className="capability-artifact afx" aria-label={label}>
      <header className="afx__head">
        <span className="afx__mark" aria-hidden />
        <span className="afx__label">{label}</span>
        {meta ? (
          <span className="afx__meta">
            {live ? <span className="afx__live" aria-hidden /> : null}
            {meta}
          </span>
        ) : null}
      </header>
      <div className="afx__body">{children}</div>
      {footer ? <footer className="afx__foot">{footer}</footer> : null}
    </aside>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="afx__eyebrow">{children}</p>;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/* ── Find — the ranked account and why it matters now ── */

function BriefArtifact(props: Extract<ArtifactPreview, { kind: "brief" }>) {
  const { label, updated, account, industry, stage, meta, signals, stakeholders } =
    props;
  const why = signals[0];
  const risk = signals[1];

  return (
    <ArtifactCard
      label={label}
      meta={`Live · ${updated}`}
      live
      footer={<>1 champion engaged · 1 gatekeeper to clear</>}
    >
      <div className="afx__lead">
        <div className="afx__lead-id">
          <h4 className="afx__title">{account}</h4>
          <p className="afx__sub">
            {industry} · {meta[1]?.value}
          </p>
        </div>
        <span className="afx__pill">{stage}</span>
      </div>

      <div className="afx__why">
        <Eyebrow>Why now</Eyebrow>
        <p className="afx__why-text">
          <span className="afx__tag">{why.tag}</span>
          {why.text}
        </p>
      </div>

      {risk ? (
        <p className="afx__why-text afx__why-text--risk">
          <span className="afx__tag afx__tag--risk">{risk.tag}</span>
          {risk.text}
        </p>
      ) : null}

      <div className="afx__strip">
        <span className="afx__avatars" aria-hidden>
          {stakeholders.map((person) => (
            <span key={person.name} className="afx__avatar">
              {person.initials}
              <span className={`afx__dot afx__dot--${person.tone}`} />
            </span>
          ))}
        </span>
        <span className="afx__strip-label">Buying group mapped</span>
      </div>
    </ArtifactCard>
  );
}

/* ── Shape — the drafted opening ── */

function OutreachArtifact(props: Extract<ArtifactPreview, { kind: "outreach" }>) {
  const { label, to, subject, body, highlight, footer } = props;
  const recipient = to[0];

  return (
    <ArtifactCard label={label} meta="Gmail draft" footer={footer}>
      <div className="afx__fields">
        <div className="afx__field">
          <span className="afx__field-key">To</span>
          {recipient ? (
            <span className="afx__chip">
              <span className="afx__chip-avatar" aria-hidden>
                {initialsOf(recipient.name)}
              </span>
              {recipient.name}
            </span>
          ) : null}
        </div>
        <div className="afx__field">
          <span className="afx__field-key">Subject</span>
          <span className="afx__field-val">{subject}</span>
        </div>
      </div>

      <div className="afx__mailbody">
        {body.map((paragraph, index) => (
          <p key={paragraph} className="afx__para">
            {index === 0 && paragraph.includes(highlight) ? (
              <>
                {paragraph.split(highlight)[0]}
                <mark className="afx__mark-text">{highlight}</mark>
                {paragraph.split(highlight)[1]}
              </>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>
    </ArtifactCard>
  );
}

/* ── Move — the recommended next action ── */

function MoveArtifact(props: Extract<ArtifactPreview, { kind: "move" }>) {
  const { label, priority, confidence, action, evidence, because } = props;

  return (
    <ArtifactCard label={label} meta={`${confidence}% confidence`}>
      <div className="afx__rec">
        <span className="afx__pill afx__pill--accent">{priority}</span>
        <h4 className="afx__action">{action}</h4>
      </div>

      <ul className="afx__chips" aria-label="Evidence">
        {evidence.map((item) => (
          <li key={item} className="afx__evidence">
            <span className="afx__check" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="afx__rationale">
        <Eyebrow>Why this move</Eyebrow>
        <p className="afx__why-text">{because}</p>
      </div>
    </ArtifactCard>
  );
}

/* ── Learn — the pattern worth repeating ── */

function PatternArtifact(props: Extract<ArtifactPreview, { kind: "pattern" }>) {
  const { label, period, headline, stat, patterns, applied } = props;

  return (
    <ArtifactCard label={label} meta={period} footer={applied}>
      <div className="afx__pattern-lead">
        <Eyebrow>Strongest pattern</Eyebrow>
        <p className="afx__pattern-headline">
          {headline} <mark className="afx__mark-text">{stat}</mark>
        </p>
      </div>

      <ul className="afx__patterns">
        {patterns.map((entry) => (
          <li key={entry.text} className={`afx__pattern afx__pattern--${entry.tone}`}>
            <span className="afx__pattern-tag">
              {entry.tone === "win" ? "Win" : "Loss"}
            </span>
            <span className="afx__pattern-text">{entry.text}</span>
            <span className="afx__pattern-evidence">{entry.evidence}</span>
          </li>
        ))}
      </ul>
    </ArtifactCard>
  );
}

/* ── Define — the ideal customer profile, reasoned from outcomes ── */

function SegmentArtifact(props: Extract<ArtifactPreview, { kind: "segment" }>) {
  const { label, basis, headline, stat, criteria, because } = props;

  return (
    <ArtifactCard label={label} meta={basis} footer={props.applied}>
      <div className="afx__pattern-lead">
        <Eyebrow>Best-fit profile</Eyebrow>
        <p className="afx__pattern-headline">
          {headline} <mark className="afx__mark-text">{stat}</mark>
        </p>
      </div>

      <ul className="afx__chips" aria-label="Defining criteria">
        {criteria.map((item) => (
          <li key={item} className="afx__evidence">
            <span className="afx__check" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="afx__rationale">
        <Eyebrow>Why this profile</Eyebrow>
        <p className="afx__why-text">{because}</p>
      </div>
    </ArtifactCard>
  );
}

export function CapabilityArtifact({ artifact }: { artifact: ArtifactPreview }) {
  switch (artifact.kind) {
    case "segment":
      return <SegmentArtifact {...artifact} />;
    case "brief":
      return <BriefArtifact {...artifact} />;
    case "outreach":
      return <OutreachArtifact {...artifact} />;
    case "pattern":
      return <PatternArtifact {...artifact} />;
    case "move":
      return <MoveArtifact {...artifact} />;
  }
}
