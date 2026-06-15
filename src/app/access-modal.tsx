"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

function singleLineHeight(el: HTMLTextAreaElement) {
  const style = getComputedStyle(el);
  const lineHeight = Number.parseFloat(style.lineHeight);
  const padding =
    Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
  return (Number.isFinite(lineHeight) ? lineHeight : 0) + padding;
}

function syncTextareaHeight(el: HTMLTextAreaElement) {
  const floor = singleLineHeight(el);
  el.style.height = "auto";
  const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);
  const cap =
    Number.isFinite(maxHeight) && maxHeight > 0 ? maxHeight : Infinity;
  const contentHeight = Math.max(el.scrollHeight, floor);
  const next = Math.min(contentHeight, cap);
  el.style.height = `${next}px`;
  el.style.overflowY = contentHeight > cap ? "auto" : "hidden";
}

function AutoGrowTextarea({
  active = true,
  className = "",
  onInput,
  ...props
}: ComponentPropsWithoutRef<"textarea"> & { active?: boolean }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el || !active) return;
    syncTextareaHeight(el);
  }, [active]);

  useLayoutEffect(() => {
    if (!active) return;
    resize();
    const id = requestAnimationFrame(resize);
    return () => cancelAnimationFrame(id);
  }, [active, resize]);

  return (
    <textarea
      ref={ref}
      rows={1}
      className={className}
      onInput={(event) => {
        syncTextareaHeight(event.currentTarget);
        onInput?.(event);
      }}
      {...props}
    />
  );
}

type SelectOption = { value: string; label: string };

const SELECT_CHEVRON = (
  <svg
    aria-hidden
    viewBox="0 0 12 12"
    className="access-modal__select-chevron"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M2 4.5 L6 8.5 L10 4.5" strokeLinecap="round" />
  </svg>
);

function ModalSelect({
  id,
  name,
  required,
  options,
}: {
  id: string;
  name: string;
  required?: boolean;
  options: SelectOption[];
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const choose = (next: string) => {
    setValue(next);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="access-modal__select-wrap">
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        aria-hidden
      />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-required={required || undefined}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            event.stopPropagation();
            setOpen(false);
          }
        }}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className={`access-modal__select access-modal__select-trigger ${
          value ? "" : "access-modal__select--placeholder"
        }`}
      >
        <span className="access-modal__select-value">
          {selected?.label ?? (required ? "\u00a0" : "Select…")}
        </span>
      </button>
      {SELECT_CHEVRON}
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="access-modal__select-menu"
        >
          {options.map((option) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === option.value}
                className="access-modal__select-option"
                onClick={() => choose(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type AccessModalState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AccessModalCtx = createContext<AccessModalState>({
  open: false,
  setOpen: () => {},
});

export function AccessModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpenState] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const setOpen = useCallback((next: boolean) => {
    if (next) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setOpenState(true);
      return;
    }

    setOpenState(false);
    requestAnimationFrame(() => {
      const trigger = returnFocusRef.current;
      returnFocusRef.current = null;
      if (trigger?.isConnected) {
        trigger.focus();
      }
    });
  }, []);

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <AccessModalCtx.Provider value={value}>
      {children}
      <AccessModal />
    </AccessModalCtx.Provider>
  );
}

const useAccessModal = () => useContext(AccessModalCtx);

const ACCESS_BTN_MOTION =
  "motion-reduce:transition-none motion-reduce:active:scale-100";

// Dark-fill tones (accent/ink/forest) get the terracotta left-to-right wipe
// from the shared `.access-btn::before` (see control.css) — their snow label
// stays readable over both states. The footer's on-accent button is light and
// sits on a terracotta field, so it cross-fades to forest green instead (a
// distinct shift that reads against that backdrop).
const TONES = {
  ghost:
    "border border-[var(--rule)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--hover-bone-ink)]",
  ink:
    "bg-[var(--ink)] text-[var(--bg)] hover:shadow-[var(--shadow-elev-1)] disabled:cursor-wait disabled:opacity-60",
  glass:
    "border border-white/15 bg-white/12 text-[var(--on-forest)] backdrop-blur-md hover:bg-white/18",
  forest:
    "bg-[var(--forest)] text-[var(--on-forest)]",
  accent:
    "bg-[var(--accent)] text-[var(--accent-ink)]",
  "on-accent":
    "bg-[var(--bg)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]",
  "on-forest":
    "bg-[var(--bg)] text-[var(--headline)] hover:bg-[var(--hover-bone-forest)]",
} as const;

type AccessButtonTone = keyof typeof TONES;

const SIZES = {
  lg: "access-btn access-btn--lg rounded-none",
  default: "access-btn access-btn--default rounded-none",
  sm: "access-btn access-btn--compact shrink-0 rounded-none",
} as const;

export function AccessButton({
  size = "default",
  tone = "ghost",
  className = "",
}: {
  size?: keyof typeof SIZES;
  tone?: AccessButtonTone;
  className?: string;
}) {
  const { setOpen } = useAccessModal();
  const sizing = SIZES[size];
  const toning = TONES[tone];
  return (
    <button
      type="button"
      data-tone={tone}
      onClick={() => setOpen(true)}
      className={`group inline-flex items-center gap-1.5 font-sans ${ACCESS_BTN_MOTION} ${sizing} ${toning} ${className}`}
    >
      <span className="access-btn__content">
        Get early access
        {size === "lg" && (
          <span
            aria-hidden
            className="access-btn__arrow text-[0.95em]"
          >
            →
          </span>
        )}
      </span>
    </button>
  );
}

type FormState = "idle" | "submitting" | "done" | "error";

function AccessModal() {
  const { open, setOpen } = useAccessModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shellRef = useRef<HTMLFormElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const ids = {
    fullName: useId(),
    email: useId(),
    companyWebsite: useId(),
    role: useId(),
    teamSize: useId(),
    helpWith: useId(),
  };

  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Reset on close (every close path funnels through here, incl. ESC via
  // the dialog's onClose) so the form is fresh when reopened.
  const close = useCallback(() => {
    setOpen(false);
    setState("idle");
    setErrorMessage(null);
  }, [setOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => fullNameRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const viewport = window.visualViewport;
    if (!viewport) return;

    const syncViewportHeight = () => {
      const dialog = dialogRef.current;
      const shell = shellRef.current;
      if (!dialog || !shell) return;

      const gap =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--space-2",
          ),
        ) || 32;
      const maxHeight = `${Math.max(0, viewport.height - gap)}px`;
      dialog.style.maxHeight = maxHeight;
      shell.style.maxHeight = maxHeight;
    };

    syncViewportHeight();
    viewport.addEventListener("resize", syncViewportHeight);
    viewport.addEventListener("scroll", syncViewportHeight);

    return () => {
      viewport.removeEventListener("resize", syncViewportHeight);
      viewport.removeEventListener("scroll", syncViewportHeight);
      if (dialogRef.current) dialogRef.current.style.maxHeight = "";
      if (shellRef.current) shellRef.current.style.maxHeight = "";
    };
  }, [open]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setState("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response
        .json()
        .catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!response.ok || !result?.ok) {
        setErrorMessage(
          result?.error ?? "Something went wrong. Please try again.",
        );
        setState("error");
        return;
      }

      setState("done");
    } catch {
      setErrorMessage(
        "We couldn't reach our servers. Please check your connection and try again.",
      );
      setState("error");
    }
  };

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const isDone = state === "done";

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onClick={onDialogClick}
      className="access-modal"
      aria-labelledby="access-modal-title"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="access-modal__close"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>

      <form
        ref={shellRef}
        onSubmit={onSubmit}
        className="access-modal__shell"
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
          }}
        >
          <label htmlFor="company_url">Company URL (leave blank)</label>
          <input
            id="company_url"
            name="company_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="access-modal__scroll">
          <header className="access-modal__header">
            <h2 id="access-modal-title" className="type-rule">
              Get early access
            </h2>
            <div className="access-modal__intro body">
              <p className="body">
                Join us to shape Kithos for teams selling into complex buying
                environments.
              </p>
            </div>
          </header>

          {!isDone && (
            <>
              <div className="access-modal__form">
                <p className="access-modal__form-note ui">
                  <span className="access-modal__label-mark" aria-hidden>
                    *
                  </span>{" "}
                  Required fields
                </p>
                <Field id={ids.fullName} label="Full name" required>
                  <input
                    ref={fullNameRef}
                    id={ids.fullName}
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    className="access-modal__input"
                  />
                </Field>
                <Field id={ids.email} label="Work email" required>
                  <input
                    id={ids.email}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="access-modal__input"
                  />
                </Field>
                <Field id={ids.companyWebsite} label="Company website">
                  <input
                    id={ids.companyWebsite}
                    name="companyWebsite"
                    type="text"
                    autoComplete="url"
                    className="access-modal__input"
                  />
                </Field>
                <Field id={ids.role} label="Role">
                  <input
                    id={ids.role}
                    name="role"
                    type="text"
                    autoComplete="organization-title"
                    className="access-modal__input"
                  />
                </Field>
                <Field id={ids.teamSize} label="Commercial team size">
                  <ModalSelect
                    id={ids.teamSize}
                    name="teamSize"
                    options={[
                      { value: "solo", label: "Just me" },
                      { value: "2-5", label: "2–5" },
                      { value: "6-10", label: "6–10" },
                      { value: "11+", label: "11+" },
                    ]}
                  />
                </Field>
                <Field
                  id={ids.helpWith}
                  label="What are you hoping Kithos can help with?"
                  className="access-modal__form-field--wide"
                >
                  <AutoGrowTextarea
                    active={open}
                    id={ids.helpWith}
                    name="helpWith"
                    className="access-modal__textarea"
                  />
                </Field>
              </div>
            </>
          )}

          {isDone && (
            <div className="access-modal__done">
              <div className="access-modal__done-lead">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-none bg-[var(--accent)]"
                />
                <p className="type-subhead">
                  Got it — we&apos;ll be in touch.
                </p>
              </div>
              <p className="access-modal__done-copy body">
                We read every application ourselves. Expect a note from us
                within two business days.
              </p>
            </div>
          )}
        </div>

        <footer className="access-modal__footer">
          {errorMessage && !isDone ? (
            <p role="alert" className="access-modal__error ui">
              {errorMessage}
            </p>
          ) : null}
          {!isDone ? (
            <button
              type="submit"
              data-tone="ink"
              disabled={state === "submitting"}
              className={`group inline-flex items-center gap-1.5 font-sans ${ACCESS_BTN_MOTION} ${SIZES.default} rounded-none ${TONES.ink}`}
            >
              <span className="access-btn__content">
                {state === "submitting" ? "Sending…" : "Get early access"}
                <span aria-hidden className="access-btn__arrow text-[0.95em]">
                  →
                </span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={close}
              className={`group inline-flex items-center gap-1.5 font-sans ${ACCESS_BTN_MOTION} ${SIZES.default} rounded-none ${TONES.ghost}`}
            >
              Close
            </button>
          )}
        </footer>
      </form>
    </dialog>
  );
}

function Field({
  id,
  label,
  children,
  className = "",
  required = false,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="access-modal__label ui">
        <span className="access-modal__label-row">
          <span className="access-modal__label-text">{label}</span>
          {required ? (
            <span className="access-modal__label-mark" aria-hidden>
              *
            </span>
          ) : null}
        </span>
      </label>
      <div className="access-modal__field">{children}</div>
    </div>
  );
}
