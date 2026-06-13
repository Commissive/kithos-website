import Image from "next/image";
import Link from "next/link";
import { AccessButton } from "./access-modal";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
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
  { href: "/#faq", label: "FAQ" },
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
                    Build a revenue motion that gets sharper with every outcome.
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
              <p className="ui early-access__meta">
                Invite-only rollout. Priority to teams selling into complex
                buying environments.
              </p>
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
      <div aria-hidden className="site-footer__bg">
        <Image
          src="/hero/bg-footer2.png"
          alt=""
          fill
          sizes="100vw"
          className="site-footer__bg-image"
          aria-hidden
        />
      </div>
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
              <p className="body site-footer__tagline">
                Commercial reasoning for repeatable revenue.
              </p>

              <nav
                className="site-footer__cols"
                aria-labelledby="footer-connect-heading"
              >
                <section className="site-footer__connect">
                  <h3
                    id="footer-connect-heading"
                    className="label site-footer__connect-title"
                  >
                    Connect
                  </h3>
                  <ul className="site-footer__connect-list">
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
