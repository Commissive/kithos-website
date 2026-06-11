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

function IconCalendar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden>
      <rect x="2" y="3" width="12" height="11" rx="1" fill="#4285F4" />
      <rect x="2" y="3" width="12" height="3" fill="#1967D2" />
      <rect x="4.5" y="1.5" width="1.5" height="3" rx=".5" fill="#1967D2" />
      <rect x="10" y="1.5" width="1.5" height="3" rx=".5" fill="#1967D2" />
      <text
        x="8"
        y="11.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="5"
        fontFamily="system-ui,sans-serif"
        fontWeight="600"
      >
        14
      </text>
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

type PrepSection = {
  label: string;
  items: readonly string[];
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
      kind: "prep";
      label: string;
      source: string;
      event: {
        date: string;
        time: string;
        title: string;
        attendees: readonly string[];
      };
      sections: readonly PrepSection[];
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

type FrameProps = {
  label: string;
  source: string;
  meta?: string;
  live?: boolean;
  theme: "kithos" | "gmail" | "calendar";
  icon: ReactNode;
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

function AppFrame({
  label,
  source,
  meta,
  live = false,
  theme,
  icon,
  children,
}: FrameProps) {
  return (
    <aside
      className={`capability-artifact ui-frame ui-frame--${theme}`}
      aria-label={label}
    >
      <div className="ui-frame__stack" aria-hidden />
      <div className="ui-frame__shell">
        <header className="ui-frame__titlebar">
          <WindowDots />
          <div className="ui-frame__brand">
            <span className="ui-frame__icon">{icon}</span>
            <span className="ui-frame__source">{source}</span>
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
        <div className="ui-frame__viewport">{children}</div>
      </div>
    </aside>
  );
}

function IconFormatBold({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden>
      <path
        fill="currentColor"
        d="M3.2 2.2h3.1c1.45 0 2.45.85 2.45 2.05 0 .85-.45 1.45-1.15 1.75 1 .25 1.65 1 1.65 2.15 0 1.45-1.05 2.35-2.75 2.35H3.2V2.2Zm1.55 3.55h1.45c.65 0 1.05-.35 1.05-.9s-.4-.9-1.05-.9H4.75v1.8Zm0 3.55h1.75c.75 0 1.2-.4 1.2-1.05 0-.65-.45-1.05-1.2-1.05H4.75v2.1Z"
      />
    </svg>
  );
}

function IconFormatLink({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        d="M4.6 7.4 7.4 4.6M5.2 3.4l1.2-1.2a2 2 0 0 1 2.8 2.8L8 6.2M6.8 8.6l1.2 1.2a2 2 0 0 0 2.8-2.8L9.4 5.8"
      />
    </svg>
  );
}

function IconVideo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden>
      <rect
        x="1.5"
        y="3"
        width="6.5"
        height="6"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path fill="currentColor" d="M8.2 5.2 11 3.8v4.4l-2.8-1.4V5.2Z" />
    </svg>
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
    source,
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
    <AppFrame
      label={label}
      source={source}
      meta={`Live · ${updated}`}
      live
      theme="kithos"
      icon={<IconKithos className="ui-frame__svg" />}
    >
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
  const { label, source, from, to, subject, body, highlight, footer } = props;

  return (
    <AppFrame
      label={label}
      source={source}
      theme="gmail"
      icon={<IconGmail className="ui-frame__svg" />}
    >
      <div className="ui-mail">
        <div className="ui-mail__toolbar">
          <span className="ui-mail__tool" aria-hidden>
            ←
          </span>
          <span className="ui-mail__draft">Draft saved</span>
          <div className="ui-mail__format" aria-hidden>
            <span className="ui-mail__format-btn">
              <IconFormatBold className="ui-mail__format-icon" />
            </span>
            <span className="ui-mail__format-btn ui-mail__format-btn--italic">
              I
            </span>
            <span className="ui-mail__format-btn">
              <IconFormatLink className="ui-mail__format-icon" />
            </span>
          </div>
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

function PrepArtifact(props: Extract<ArtifactPreview, { kind: "prep" }>) {
  const { label, source, event, sections } = props;
  const [first, ...rest] = sections;

  return (
    <AppFrame
      label={label}
      source={source}
      meta={event.date}
      theme="calendar"
      icon={<IconCalendar className="ui-frame__svg" />}
    >
      <div className="ui-prep">
        <aside className="ui-prep__calendar" aria-label="Event">
          <div className="ui-prep__date-block">
            <span className="ui-prep__weekday">Thu</span>
            <span className="ui-prep__day">14</span>
            <span className="ui-prep__month">Mar</span>
          </div>
          <div className="ui-prep__week-strip" aria-hidden>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <span
                key={`${day}-${index}`}
                className={`ui-prep__week-dot${index === 3 ? " is-active" : ""}`}
              >
                {day}
              </span>
            ))}
          </div>
          <div className="ui-prep__event-card">
            <span className="ui-prep__time">{event.time}</span>
            <span className="ui-prep__duration">
              <IconVideo className="ui-prep__meet-icon" />
              30 min · Google Meet
            </span>
            <p className="ui-prep__event-title">{event.title}</p>
            <ul className="ui-prep__guests">
              {event.attendees.map((name) => (
                <li key={name} className="ui-prep__guest">
                  <span className="ui-prep__guest-dot" aria-hidden />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="ui-prep__brief">
          <div className="ui-prep__tabs" role="tablist" aria-label="Prep sections">
            {sections.map((section, index) => (
              <span
                key={section.label}
                className={`ui-prep__tab${index === 0 ? " is-active" : ""}`}
                role="tab"
                aria-selected={index === 0}
              >
                {section.label}
              </span>
            ))}
          </div>

          {first ? (
            <section className="ui-prep__section">
              <ul className="ui-prep__list">
                {first.items.map((item) => (
                  <li key={item} className="ui-prep__item">
                    <span className="ui-prep__copy">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {rest.map((section) => (
            <section key={section.label} className="ui-prep__section is-compact">
              <h6 className="ui-prep__section-label">{section.label}</h6>
              <ul className="ui-prep__list">
                {section.items.map((item) => (
                  <li key={item} className="ui-prep__item">
                    <span className="ui-prep__copy">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

function MoveArtifact(props: Extract<ArtifactPreview, { kind: "move" }>) {
  const {
    label,
    source,
    priority,
    confidence,
    action,
    evidence,
    because,
    similar,
  } = props;

  return (
    <AppFrame
      label={label}
      source={source}
      theme="kithos"
      icon={<IconKithos className="ui-frame__svg" />}
    >
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
    case "prep":
      return <PrepArtifact {...artifact} />;
    case "move":
      return <MoveArtifact {...artifact} />;
  }
}
