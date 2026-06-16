import Link from "next/link";
import { AccessButton } from "./access-modal";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { USE_CASES } from "./for/use-cases";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionHeadingBand,
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

function EarlyAccessBlock() {
  return (
    <section
      id="access"
      data-on-accent
      aria-labelledby="early-access-heading"
      className="early-access"
    >
      <PageShell>
        <PageColumn className="early-access__column">
          <PageGrid>
            <PageGridProse className="early-access__prose">
              <SectionHeadingBand center>
                <SectionHeadingStack center>
                  <SectionHeadingTitle
                    id="early-access-heading"
                    center
                  >
                    Make sharper decisions. Win the right customers.
                  </SectionHeadingTitle>
                  <SectionHeadingSupport>
                    Join teams using Kithos to find the right customers, move
                    deals forward with sharper context, and turn every outcome
                    into a better next move.
                  </SectionHeadingSupport>
                </SectionHeadingStack>
              </SectionHeadingBand>
              <div className="early-access__cta">
                <AccessButton size="lg" tone="on-accent" />
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}

export function SiteFooter({ showEarlyAccess = false }: { showEarlyAccess?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__content">
        {showEarlyAccess ? <EarlyAccessBlock /> : null}
        <div className="page-shell site-footer__shell">
          <div className="site-footer__card">
            <div className="site-footer__head">
              <Link href="/" aria-label="Kithos home" className="site-footer__brand">
                <BrandMark className="h-7 w-7 shrink-0" />
                <Wordmark className="h-5 w-auto" />
              </Link>
            </div>

            <div className="site-footer__body">
              <p className="site-footer__tagline">
                The commercial reasoning system for teams selling to businesses.
              </p>

              <nav className="site-footer__cols" aria-label="More from Kithos">
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
              </nav>
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
      </div>
    </footer>
  );
}
