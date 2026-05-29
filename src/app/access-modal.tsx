"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type SelectOption = { value: string; label: string };

function NativeSelect({
  id,
  name,
  required,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: SelectOption[];
}) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`access-modal__input w-full appearance-none pr-8 ${
          value ? "text-[var(--ink)]" : "text-[var(--muted)]"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[var(--ink-quiet)]"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 4.5 L6 8.5 L10 4.5" strokeLinecap="round" />
      </svg>
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
  const [open, setOpen] = useState(false);
  return (
    <AccessModalCtx.Provider value={{ open, setOpen }}>
      {children}
      <AccessModal />
    </AccessModalCtx.Provider>
  );
}

const useAccessModal = () => useContext(AccessModalCtx);

const TONES = {
  ghost:
    "border border-[var(--rule)] bg-[var(--bone)] text-[var(--ink)] hover:bg-[var(--hover-bone-ink)]",
  glass:
    "border border-white/15 bg-white/12 text-[var(--on-forest)] backdrop-blur-md hover:bg-white/18",
  forest:
    "bg-[var(--forest)] text-[var(--bone)] hover:bg-[var(--forest-hover)]",
  accent:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]",
  "on-accent":
    "bg-[var(--bone)] text-[var(--accent)] hover:bg-[var(--hover-bone-accent)]",
  "on-forest":
    "bg-[var(--bone)] text-[var(--ink)] hover:bg-[var(--hover-bone-forest)]",
} as const;

type AccessButtonTone = keyof typeof TONES;

const SIZES = {
  lg: "rounded-none px-5 py-3 ui",
  default: "min-h-11 rounded-none px-3.5 py-2 ui",
  sm: "min-h-8 shrink-0 rounded-none px-3.5 py-1.5 ui hover:translate-y-0 hover:shadow-none active:scale-100",
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
  const motion =
    size === "sm"
      ? ""
      : "hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(17,24,39,0.12)] active:translate-y-0 active:scale-[0.99]";

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`group inline-flex items-center gap-1.5 font-sans transition-[background-color,border-color,color,transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] motion-reduce:transform-none motion-reduce:transition-none ${motion} ${sizing} ${toning} ${className}`}
    >
      Get early access
      {size === "lg" && (
        <span
          aria-hidden
          className="text-[0.95em] transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          →
        </span>
      )}
    </button>
  );
}

type FormState = "idle" | "submitting" | "done" | "error";

function AccessModal() {
  const { open, setOpen } = useAccessModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
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
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) setState("idle");
  }
  const close = useCallback(() => setOpen(false), [setOpen]);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setTimeout(() => setState("done"), 700);
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
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-none text-[var(--ink-quiet)] transition-[background-color,color,transform] duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] hover:-translate-y-px hover:bg-[var(--surface)] hover:text-[var(--ink)] active:translate-y-0 active:scale-[0.98]"
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

      <form onSubmit={onSubmit} className="access-modal__shell">
        <div className="access-modal__scroll">
          <header className="px-8 pt-12 pb-9 md:px-10 md:pt-14">
            <h2 id="access-modal-title" className="display-4">
              Get early access
            </h2>
            <div className="mt-6 max-w-[52ch] space-y-4 text-[var(--ink-body)]">
              <p className="body">
                Kithos is opening early access for a small group of B2B
                teams building their path to repeatable revenue. Design
                partners shape the product alongside our team.
              </p>
              <p className="body">
                Share a few details. Kithos will be in touch.
              </p>
            </div>
          </header>

          {!isDone && (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-7 px-8 pb-9 md:grid-cols-2 md:px-10">
                <Field id={ids.fullName} label="Full name">
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
                <Field id={ids.email} label="Work email">
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
                    required
                    autoComplete="url"
                    placeholder="company.com"
                    className="access-modal__input"
                  />
                </Field>
                <Field id={ids.role} label="Role">
                  <input
                    id={ids.role}
                    name="role"
                    type="text"
                    required
                    autoComplete="organization-title"
                    className="access-modal__input"
                  />
                </Field>
                <Field id={ids.teamSize} label="Commercial team size">
                  <NativeSelect
                    id={ids.teamSize}
                    name="teamSize"
                    required
                    placeholder="Select…"
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
                  className="md:col-span-2"
                >
                  <textarea
                    id={ids.helpWith}
                    name="helpWith"
                    required
                    rows={2}
                    placeholder="Finding the right accounts, improving outreach, preparing for calls, learning from wins/losses, or something else."
                    className="access-modal__textarea"
                  />
                </Field>
              </div>
            </>
          )}

          {isDone && (
            <div className="px-8 pb-12 md:px-10">
              <div className="flex items-baseline gap-3 pb-5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-none bg-[var(--accent)]"
                />
                <p className="display-5 text-[var(--ink)]">
                  Got it — we&apos;ll be in touch.
                </p>
              </div>
              <p className="body mt-6 max-w-[48ch] text-[var(--ink-body)]">
                We read every application ourselves. Expect a note from us
                within two business days.
              </p>
            </div>
          )}
        </div>

        <footer className="access-modal__footer">
          {!isDone ? (
            <button
              type="submit"
              disabled={state === "submitting"}
              className="group body inline-flex items-center gap-1.5 rounded-none bg-[var(--ink)] px-6 py-3 font-sans text-[var(--bg)] transition-[background-color,color,opacity,transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] hover:-translate-y-px hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] hover:shadow-[var(--shadow-elev-1)] active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
            >
              {state === "submitting" ? "Sending…" : "Get early access"}
              <span
                aria-hidden
                className="text-[0.95em] transition-transform duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={close}
              className="group ui inline-flex items-center gap-1.5 rounded-none border border-[var(--rule)] bg-[var(--bone)] px-5 py-2.5 font-sans text-[var(--ink)] transition-[background-color,border-color,color,transform] duration-[220ms] ease-[cubic-bezier(0.2,0.9,0.2,1)] hover:-translate-y-px hover:bg-[var(--hover-bone-ink)] active:translate-y-0 active:scale-[0.99]"
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
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
