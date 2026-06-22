import type { Metadata } from "next";
import { Nav } from "../nav";
import { SiteFooter } from "../site-footer";

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
      <main id="main" className="w-full">
        <div className="page-shell">
          <div className="page-column page-section-top pb-[var(--section-pad-bottom-lg)]">
            <div className="page-grid">
              <article className="page-grid-prose page-grid-prose--legal">
          <p className="label">Last updated · 13 May 2026</p>
          <h1 className="type-statement mt-4">Terms</h1>

          <p className="body mt-10">
            These terms apply to the Kithos website and to any
            early-access product use under a separate design partner
            agreement. Written in plain English on purpose.
          </p>

          <h2 className="type-subhead mt-16">What Kithos is</h2>
          <p className="body mt-4">
            Kithos is a commercial decision layer for B2B teams selling
            into complex buying environments. The product is in early
            access. Features, availability, and
            pricing may change as we learn what works.
          </p>

          <h2 className="type-subhead mt-16">The website</h2>
          <p className="body mt-4">
            You&apos;re free to read, share, and link to anything on
            kithos.ai. You may not scrape it at scale or republish it as
            your own.
          </p>

          <h2 className="type-subhead mt-16">Applying for early access</h2>
          <p className="body mt-4">
            If you apply, you confirm that the information you provide is
            accurate and that you&apos;re authorised to act on behalf of
            the company you list. We review every application; selection
            is at our discretion.
          </p>

          <h2 className="type-subhead mt-16">Early-access product use</h2>
          <p className="body mt-4">
            If we invite you to use Kithos as a design partner, the terms
            of that arrangement live in a separate written agreement
            between you and Kithos. Anything you tell us in confidence
            stays in confidence. Anything we share with you about
            unreleased product, internal thinking, or other partners, you
            keep in confidence too.
          </p>

          <h2 className="type-subhead mt-16">Your data</h2>
          <p className="body mt-4">
            You own your data. Kithos owns the software. We don&apos;t
            claim rights over the commercial information you bring into
            the product. If you leave, you can take your data with you.
          </p>

          <h2 className="type-subhead mt-16">No warranty during early access</h2>
          <p className="body mt-4">
            Early access is provided as-is. The product is in active
            development. Things will change. Things will occasionally
            break. We&apos;ll tell you when they do.
          </p>

          <h2 className="type-subhead mt-16">Limitation of liability</h2>
          <p className="body mt-4">
            To the extent permitted by law, Kithos is not liable for
            indirect, incidental, or consequential damages arising from
            use of the website or the early-access product.
          </p>

          <h2 className="type-subhead mt-16">Termination</h2>
          <p className="body mt-4">
            You can stop using Kithos at any time. We can suspend or end
            your access if you breach these terms or the design partner
            agreement.
          </p>

          <h2 className="type-subhead mt-16">Changes</h2>
          <p className="body mt-4">
            If we materially change these terms, we&apos;ll update the
            date above and email anyone with an active early-access
            arrangement.
          </p>

          <h2 className="type-subhead mt-16">Governing law</h2>
          <p className="body mt-4">
            These terms are governed by the laws of the jurisdiction in
            which Kithos is incorporated. We&apos;ll specify that here
            once the company is formally established. Any disputes will
            be resolved in the courts of that jurisdiction.
          </p>

          <h2 className="type-subhead mt-16">Contact</h2>
          <p className="body mt-4">
            Questions —{" "}
            <a
              href="mailto:hello@kithos.ai"
              className="interactive-text-link"
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

      <SiteFooter />
    </>
  );
}
