import type { Metadata } from "next";
import { Nav } from "../nav";
import { MetaStrip } from "../meta-strip";

export const metadata: Metadata = {
  title: "Privacy — Kithos",
  description:
    "How Kithos collects, uses, and protects the information you share when applying for early access.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="w-full">
        <div className="page-shell">
          <div className="page-column page-section-top pb-[var(--section-pad-bottom-lg)]">
            <div className="page-grid">
              <article className="page-grid-prose max-w-[70ch] lg:max-w-[70ch]">
          <p className="label">Last updated · 13 May 2026</p>
          <h1 className="display-3 mt-4">Privacy</h1>

          <p className="body mt-10 text-[var(--ink-body)]">
            Kithos is in early access. This page explains what information
            we collect when you apply, how we use it, and what your rights
            are. Written by us, not pasted from a template.
          </p>

          <h2 className="display-5 mt-16">What we collect</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            When you apply for early access, you share:
          </p>
          <ul className="body mt-4 space-y-2 text-[var(--ink-body)]">
            <li>— your full name</li>
            <li>— your work email</li>
            <li>— your company name and website</li>
            <li>— your role</li>
            <li>— your commercial team size</li>
            <li>— a short note about what you&apos;re hoping Kithos can help with</li>
          </ul>
          <p className="body mt-6 text-[var(--ink-body)]">
            We don&apos;t collect anything else from you unless you choose
            to share it — for example, by replying to an email or
            scheduling a conversation with us. Like most websites, we keep
            anonymous request logs for security and performance.
          </p>

          <h2 className="display-5 mt-16">How we use it</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            We use what you share to review your application, reply to
            you, decide whether Kithos is a fit for your team, and improve
            the application process itself.
          </p>
          <p className="body mt-4 text-[var(--ink-body)]">
            We don&apos;t sell your information. We don&apos;t share it
            with marketing partners. We don&apos;t use it to retarget you
            with ads.
          </p>

          <h2 className="display-5 mt-16">Where it lives</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            Your application is stored on infrastructure we operate,
            encrypted at rest and in transit. A small number of named
            people on the Kithos team can access it for the purposes
            above.
          </p>

          <h2 className="display-5 mt-16">Your rights</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            You can ask us to show you what we hold about you, correct or
            update it, or delete it. Email{" "}
            <a
              href="mailto:hello@kithos.ai"
              className="interactive-text-link text-[var(--ink)]"
            >
              hello@kithos.ai
            </a>{" "}
            and we&apos;ll reply within seven business days.
          </p>

          <h2 className="display-5 mt-16">Cookies</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            We don&apos;t use analytics or tracking cookies.
          </p>

          <h2 className="display-5 mt-16">Changes</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            If we materially change this policy, we&apos;ll update the
            date above and email anyone who has an active application.
          </p>

          <h2 className="display-5 mt-16">Contact</h2>
          <p className="body mt-4 text-[var(--ink-body)]">
            Questions, requests, or complaints —{" "}
            <a
              href="mailto:hello@kithos.ai"
              className="interactive-text-link text-[var(--ink)]"
            >
              hello@kithos.ai
            </a>
            .
          </p>
              </article>
            </div>
          </div>
        </div>
      </main>

      <footer data-on-accent className="bg-[var(--accent)]">
        <div className="page-shell w-full py-10 md:py-12">
          <MetaStrip />
        </div>
      </footer>
    </>
  );
}
