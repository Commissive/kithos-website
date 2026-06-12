import type { ReactNode } from "react";
import "./capability-artifact.css";

/* ── Inline app marks (decorative) ── */

function IconKithos({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      aria-hidden
      fill="none"
    >
      <rect
        x="1"
        y="1"
        width="14"
        height="14"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 8h8M8 4v8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function IconGmail({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden>
      <path
        fill="#EA4335"
        d="M2 4.5 8 9l6-4.5v7.5c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V4.5Z"
      />
      <path fill="#FBBC04" d="M2 4.5 8 9 2 13V4.5Z" opacity=".9" />
      <path fill="#34A853" d="M14 4.5 8 9l6 4.5V4.5Z" opacity=".85" />
      <path fill="#4285F4" d="M8 9 2 4.5h12L8 9Z" />
    </svg>
  );
}

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
    };

/* The product shell — one Kithos app; each artifact is a view inside it. */
const APP_NAV = [
  { id: "accounts", label: "Accounts" },
  { id: "outreach", label: "Outreach" },
  { id: "deals", label: "Deals" },
  { id: "playbook", label: "Playbook" },
] as const;

type AppView = (typeof APP_NAV)[number]["id"];

type FrameProps = {
  label: string;
  view: AppView;
  meta?: string;
  live?: boolean;
  children: ReactNode;
};

function WindowDots() {
  return (
    <span className="ui-frame__dots" aria-hidden>
      <span className="ui-frame__dot ui-frame__dot--close" />
      <span className="ui-frame__dot ui-frame__dot--minimize" />
      <span className="ui-frame__dot ui-frame__dot--maximize" />
    </span>
  );
}

function AppFrame({ label, view, meta, live = false, children }: FrameProps) {
  return (
    <aside className="capability-artifact ui-frame" aria-label={label}>
      <div className="ui-frame__stack" aria-hidden />
      <div className="ui-frame__shell">
        <header className="ui-frame__titlebar">
          <WindowDots />
          <div className="ui-frame__brand">
            <span className="ui-frame__icon">
              <IconKithos className="ui-frame__svg" />
            </span>
            <span className="ui-frame__source">Kithos</span>
            <span className="ui-frame__divider" aria-hidden />
            <span className="ui-frame__view">{label}</span>
          </div>
          {meta ? (
            <span
              className={`ui-frame__meta${live ? " ui-frame__meta--live" : ""}`}
            >
              {live ? <span className="ui-frame__live-dot" aria-hidden /> : null}
              {meta}
            </span>
          ) : null}
        </header>
        <div className="ui-frame__viewport">
          <div className="ui-app">
            <nav className="ui-app__nav" aria-hidden>
              {APP_NAV.map((item) => (
                <span
                  key={item.id}
                  className={`ui-app__nav-item${
                    item.id === view ? " is-active" : ""
                  }`}
                >
                  {item.label}
                </span>
              ))}
              <span className="ui-app__user">
                <span className="ui-app__avatar" aria-hidden>
                  A
                </span>
                Alex
              </span>
            </nav>
            <div className="ui-app__main">{children}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      className="ui-move__ring"
      viewBox="0 0 36 36"
      role="img"
      aria-label={`${value}% confidence`}
    >
      <circle
        className="ui-move__ring-track"
        cx="18"
        cy="18"
        r={radius}
        fill="none"
      />
      <circle
        className="ui-move__ring-fill"
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x="18"
        y="18.5"
        textAnchor="middle"
        dominantBaseline="middle"
        className="ui-move__ring-value"
      >
        {value}
      </text>
    </svg>
  );
}

function StatusDot({ tone }: { tone: Stakeholder["tone"] }) {
  return (
    <span
      className={`ui-status-dot ui-status-dot--${tone}`}
      aria-hidden
    />
  );
}

function BriefArtifact(props: Extract<ArtifactPreview, { kind: "brief" }>) {
  const {
    label,
    updated,
    account,
    industry,
    stage,
    meta,
    signals,
    stakeholders,
  } = props;

  const initials = account
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <AppFrame label={label} view="accounts" meta={`Live · ${updated}`} live>
      <div className="ui-brief">
        <nav className="ui-brief__rail" aria-label="Record sections">
          <span className="ui-brief__rail-item is-active">Account</span>
          <span className="ui-brief__rail-item">Signals</span>
          <span className="ui-brief__rail-item">People</span>
        </nav>

        <div className="ui-brief__main">
          <header className="ui-brief__header">
            <div className="ui-brief__logo">{initials}</div>
            <div className="ui-brief__identity">
              <h4 className="ui-brief__name">{account}</h4>
              <p className="ui-brief__sub">
                {industry}
                <span aria-hidden> · </span>
                {meta[1]?.value}
                <span aria-hidden> · </span>
                {meta[0]?.value} employees
              </p>
            </div>
            <div className="ui-brief__stage-wrap">
              <span className="ui-brief__stage">{stage}</span>
              <span className="ui-brief__momentum" aria-hidden>
                <svg className="ui-brief__sparkline" viewBox="0 0 52 18">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    points="2,14 12,11 22,12 32,7 42,5 50,3"
                  />
                  <circle cx="50" cy="3" r="2" fill="currentColor" />
                </svg>
                <span className="ui-brief__momentum-label">Momentum ↑</span>
              </span>
            </div>
          </header>

          <div className="ui-brief__stats">
            {meta.map(({ label: statLabel, value }) => (
              <div key={statLabel} className="ui-brief__stat">
                <span className="ui-brief__stat-label">{statLabel}</span>
                <span className="ui-brief__stat-value">{value}</span>
              </div>
            ))}
          </div>

          <section className="ui-panel" aria-label="Buying signals">
            <div className="ui-panel__head">
              <h5 className="ui-panel__title">Buying signals</h5>
              <span className="ui-panel__badge">{signals.length} new</span>
            </div>
            <ol className="ui-timeline">
              {signals.map((signal) => (
                <li key={signal.text} className="ui-timeline__item">
                  <span className="ui-timeline__dot" aria-hidden />
                  <div className="ui-timeline__body">
                    <div className="ui-timeline__meta">
                      <span className="ui-timeline__tag">{signal.tag}</span>
                      <time className="ui-timeline__when">{signal.when}</time>
                    </div>
                    <p className="ui-timeline__text">{signal.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="ui-panel" aria-label="Stakeholder map">
            <div className="ui-panel__head">
              <h5 className="ui-panel__title">Stakeholder map</h5>
            </div>
            <ul className="ui-roster">
              {stakeholders.map((person) => (
                <li key={person.name} className="ui-roster__row">
                  <span className="ui-roster__avatar">{person.initials}</span>
                  <div className="ui-roster__info">
                    <span className="ui-roster__name">{person.name}</span>
                    <span className="ui-roster__title">{person.title}</span>
                  </div>
                  <span className="ui-roster__role">{person.role}</span>
                  <span className="ui-roster__status">
                    <StatusDot tone={person.tone} />
                    {person.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppFrame>
  );
}

function OutreachArtifact(props: Extract<ArtifactPreview, { kind: "outreach" }>) {
  const { label, from, to, subject, body, highlight, footer } = props;

  return (
    <AppFrame label={label} view="outreach">
      <div className="ui-mail">
        <div className="ui-mail__toolbar">
          <span className="ui-mail__channel">
            <IconGmail className="ui-mail__channel-icon" />
            Sends via Gmail
          </span>
          <span className="ui-mail__draft">Draft saved</span>
          <span className="ui-mail__send">Send</span>
        </div>

        <div className="ui-mail__compose">
          <div className="ui-mail__row">
            <span className="ui-mail__key">From</span>
            <span className="ui-mail__val">{from}</span>
          </div>
          <div className="ui-mail__row ui-mail__row--to">
            <span className="ui-mail__key">To</span>
            <div className="ui-mail__address">
              <div className="ui-mail__chips">
                {to.map((recipient) => (
                  <span key={recipient.email} className="ui-mail__chip">
                    <span className="ui-mail__chip-avatar" aria-hidden>
                      {recipient.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span className="ui-mail__chip-text">
                      <strong>{recipient.name}</strong>
                      <em>{recipient.email}</em>
                    </span>
                  </span>
                ))}
              </div>
              <span className="ui-mail__extras" aria-hidden>
                <span>Cc</span>
                <span>Bcc</span>
              </span>
            </div>
          </div>
          <div className="ui-mail__row ui-mail__row--subject">
            <span className="ui-mail__key">Subject</span>
            <span className="ui-mail__subject">{subject}</span>
          </div>
        </div>

        <div className="ui-mail__body">
          {body.map((paragraph, index) => (
            <p key={paragraph} className="ui-mail__paragraph">
              {index === 0 ? (
                <>
                  {paragraph.split(highlight)[0]}
                  <mark className="ui-mail__highlight">{highlight}</mark>
                  {paragraph.split(highlight)[1]}
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>

        <footer className="ui-mail__bar">
          <span className="ui-mail__spark" aria-hidden>
            ✦
          </span>
          {footer}
        </footer>
      </div>
    </AppFrame>
  );
}

function PatternArtifact(props: Extract<ArtifactPreview, { kind: "pattern" }>) {
  const { label, period, headline, stat, patterns, applied } = props;

  return (
    <AppFrame label={label} view="playbook" meta={period}>
      <div className="ui-pattern">
        <section className="ui-pattern__lead" aria-label="Strongest pattern">
          <span className="ui-pattern__lead-label">Strongest pattern</span>
          <p className="ui-pattern__headline">
            {headline} <mark className="ui-pattern__stat">{stat}</mark>
          </p>
        </section>

        <ul className="ui-pattern__list" aria-label="Win and loss patterns">
          {patterns.map((entry) => (
            <li key={entry.text} className="ui-pattern__row">
              <span
                className={`ui-pattern__tag ui-pattern__tag--${entry.tone}`}
              >
                {entry.tone === "win" ? "Win pattern" : "Loss pattern"}
              </span>
              <span className="ui-pattern__text">{entry.text}</span>
              <span className="ui-pattern__evidence">{entry.evidence}</span>
            </li>
          ))}
        </ul>

        <footer className="ui-pattern__bar">{applied}</footer>
      </div>
    </AppFrame>
  );
}

function MoveArtifact(props: Extract<ArtifactPreview, { kind: "move" }>) {
  const {
    label,
    priority,
    confidence,
    action,
    evidence,
    because,
    similar,
  } = props;

  return (
    <AppFrame label={label} view="deals">
      <div className="ui-move">
        <div className="ui-move__accent" aria-hidden />

        <div className="ui-move__content">
          <div className="ui-move__top">
            <span className="ui-move__priority">{priority}</span>
            <div className="ui-move__confidence">
              <ConfidenceRing value={confidence} />
              <span className="ui-move__confidence-label">Confidence</span>
            </div>
          </div>

          <p className="ui-move__action">{action}</p>

          <ul className="ui-move__evidence" aria-label="Evidence">
            {evidence.map((item) => (
              <li key={item} className="ui-move__evidence-item">
                <span className="ui-move__evidence-check" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <blockquote className="ui-move__reason">
            <span className="ui-move__reason-label">Why this move</span>
            {because}
          </blockquote>

          <p className="ui-move__pattern">
            <span className="ui-move__pattern-label">Win pattern</span>
            {similar}
          </p>

          <div className="ui-move__actions" aria-hidden>
            <span className="ui-move__btn ui-move__btn--primary">
              Schedule meeting
            </span>
            <span className="ui-move__btn">Snooze</span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

export function CapabilityArtifact({ artifact }: { artifact: ArtifactPreview }) {
  switch (artifact.kind) {
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
