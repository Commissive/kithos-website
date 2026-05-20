import type { Metadata } from "next";
import { Nav } from "../nav";
import { MetaStrip } from "../meta-strip";

export const metadata: Metadata = {
  title: "Terms — Kithos",
  description:
    "The terms that apply to the Kithos website and to early-access product use.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto w-full max-w-[86rem] px-6 pt-20 pb-28 md:px-10 md:pt-28 md:pb-36">
        <article className="mx-auto max-w-[70ch]">
          <p className="label">Last updated · 13 May 2026</p>
          <h1 className="display-3 mt-4">Terms</h1>

          <p className="body mt-10 text-[var(--ink-soft)]">
            These terms apply to the Kithos website and to any
            early-access product use under a separate design partner
            agreement. Written in plain English on purpose.
          </p>

          <h2 className="display-5 mt-16">What Kithos is</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            Kithos is a commercial reasoning system for early B2B teams.
            The product is in early access. Features, availability, and
            pricing may change as we learn what works.
          </p>

          <h2 className="display-5 mt-16">The website</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            You&apos;re free to read, share, and link to anything on
            kithos.ai. You may not scrape it at scale or republish it as
            your own.
          </p>

          <h2 className="display-5 mt-16">Applying for early access</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            If you apply, you confirm that the information you provide is
            accurate and that you&apos;re authorised to act on behalf of
            the company you list. We review every application; selection
            is at our discretion.
          </p>

          <h2 className="display-5 mt-16">Early-access product use</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            If we invite you to use Kithos as a design partner, the terms
            of that arrangement live in a separate written agreement
            between you and Kithos. Anything you tell us in confidence
            stays in confidence. Anything we share with you about
            unreleased product, internal thinking, or other partners, you
            keep in confidence too.
          </p>

          <h2 className="display-5 mt-16">Your data</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            You own your data. Kithos owns the software. We don&apos;t
            claim rights over the commercial information you bring into
            the product. If you leave, you can take your data with you.
          </p>

          <h2 className="display-5 mt-16">No warranty during early access</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            Early access is provided as-is. The product is in active
            development. Things will change. Things will occasionally
            break. We&apos;ll tell you when they do.
          </p>

          <h2 className="display-5 mt-16">Limitation of liability</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            To the extent permitted by law, Kithos is not liable for
            indirect, incidental, or consequential damages arising from
            use of the website or the early-access product.
          </p>

          <h2 className="display-5 mt-16">Termination</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            You can stop using Kithos at any time. We can suspend or end
            your access if you breach these terms or the design partner
            agreement.
          </p>

          <h2 className="display-5 mt-16">Changes</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            If we materially change these terms, we&apos;ll update the
            date above and email anyone with an active early-access
            arrangement.
          </p>

          <h2 className="display-5 mt-16">Governing law</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            These terms are governed by the laws of the jurisdiction in
            which Kithos is incorporated. We&apos;ll specify that here
            once the company is formally established. Any disputes will
            be resolved in the courts of that jurisdiction.
          </p>

          <h2 className="display-5 mt-16">Contact</h2>
          <p className="body mt-4 text-[var(--ink-soft)]">
            Questions —{" "}
            <a
              href="mailto:hello@kithos.ai"
              className="font-medium text-[var(--ink)] underline-offset-[4px] hover:underline"
            >
              hello@kithos.ai
            </a>
            .
          </p>
        </article>
      </main>

      <footer className="bg-[var(--accent)]">
        <div className="mx-auto w-full max-w-[86rem] px-6 py-8 md:px-10 md:py-10">
          <MetaStrip />
        </div>
      </footer>
    </>
  );
}
