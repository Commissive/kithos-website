function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const PRIMARY_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function MetaStrip() {
  return (
    <section
      aria-label="Footer"
      className="w-full border-t border-[var(--on-accent-rule)] pt-6 md:pt-8"
    >
      <div className="border border-[var(--on-accent-rule)] bg-[color-mix(in_oklch,var(--accent)_86%,var(--bone)_14%)] px-5 py-5 shadow-[var(--shadow-elev-1)] md:px-7 md:py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="label text-[var(--on-accent-soft)]">Kithos</p>
            <p className="body mt-3 max-w-[36ch] text-[var(--on-accent)]">
              Commercial reasoning for early B2B teams.
            </p>
          </div>

          <nav aria-label="Footer links" className="md:col-span-4 md:justify-self-center">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="interactive-text-link ui font-sans">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-3 md:justify-self-end">
            <div className="-ml-1 flex items-center gap-1">
              <a
                href="https://x.com/kithosAI"
                target="_blank"
                rel="noreferrer"
                aria-label="Kithos on X"
                className="interactive-icon-link inline-flex h-10 w-10 items-center justify-center rounded-none border border-[var(--on-accent-rule)] bg-white/5"
              >
                <XIcon />
              </a>
              <a
                href="https://linkedin.com/company/kithosAI"
                target="_blank"
                rel="noreferrer"
                aria-label="Kithos on LinkedIn"
                className="interactive-icon-link inline-flex h-10 w-10 items-center justify-center rounded-none border border-[var(--on-accent-rule)] bg-white/5"
              >
                <LinkedInIcon />
              </a>
            </div>

            <a href="mailto:hello@kithos.ai" className="interactive-text-link ui font-sans">
              hello@kithos.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
