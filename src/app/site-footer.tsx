import Link from "next/link";
import { AccessButton } from "./access-modal";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { USE_CASES } from "./for/use-cases";
import {
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import "./site-footer.css";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

const PRODUCT_LINKS: FooterLink[] = [
  { href: "/#capabilities", label: "What it does" },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const CONNECT_LINKS: FooterLink[] = [
  { href: "https://x.com/kithosAI", label: "Twitter (X)", external: true },
  {
    href: "https://linkedin.com/company/kithosAI",
    label: "LinkedIn",
    external: true,
  },
  { href: "mailto:hello@kithos.ai", label: "hello@kithos.ai" },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className="site-footer__link ui"
      >
        {link.label}
      </a>
    );
  }
  if (link.href.startsWith("mailto:")) {
    return (
      <a href={link.href} className="site-footer__link ui">
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className="site-footer__link ui">
      {link.label}
    </Link>
  );
}

export function SiteFooter({ showEarlyAccess = false }: { showEarlyAccess?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="page-shell site-footer__shell">
        <div data-on-accent className="site-footer__card">
          {showEarlyAccess ? (
            <section
              id="access"
              aria-labelledby="early-access-heading"
              className="site-footer__cta"
            >
              <div className="site-footer__cta-inner">
                <SectionHeadingStack center>
                  <SectionHeadingTitle id="early-access-heading" center>
                    Make sharper decisions. Win the right customers.
                  </SectionHeadingTitle>
                  <SectionHeadingSupport>
                    Join teams using Kithos to find the right customers, move
                    deals forward with sharper context, and turn every outcome
                    into a better next move.
                  </SectionHeadingSupport>
                </SectionHeadingStack>
                <div className="site-footer__cta-actions">
                  <AccessButton size="lg" tone="on-accent" />
                </div>
              </div>
            </section>
          ) : null}

          <div className="site-footer__body">
            <div className="site-footer__identity">
              <Link href="/" aria-label="Kithos home" className="site-footer__brand">
                <BrandMark className="h-7 w-7 shrink-0" />
                <Wordmark className="h-5 w-auto" />
              </Link>
              <p className="site-footer__tagline body">
                The commercial decision layer for teams selling to businesses.
              </p>
            </div>

            <section className="site-footer__nav-section">
              <h3 className="label site-footer__nav-title">Product</h3>
              <ul className="site-footer__nav-list">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="site-footer__nav-section">
              <h3 className="label site-footer__nav-title">Built for</h3>
              <ul className="site-footer__nav-list">
                {USE_CASES.map((useCase) => (
                  <li key={useCase.slug}>
                    <Link
                      href={`/for/${useCase.slug}`}
                      className="site-footer__link ui"
                    >
                      {useCase.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="site-footer__nav-section">
              <h3 className="label site-footer__nav-title">Connect</h3>
              <ul className="site-footer__nav-list">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="site-footer__base">
            <p className="ui site-footer__copy">© Kithos {year}</p>
            <nav className="site-footer__legal" aria-label="Legal">
              <ul className="site-footer__legal-list">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
