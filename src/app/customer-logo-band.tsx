import { PageColumn, PageShell } from "./page-layout";
import { SectionRule } from "./section-rule";
import "./customer-logo-band.css";

/* Customer logo band — a trust strip below the hero whose logos scroll
   continuously in an infinite marquee. Logos are data-driven and currently
   empty; until they exist the band marquees neutral placeholder slots so the
   layout reads as a logo row ready to be filled. Drop entries into LOGOS to
   replace the placeholders with real marks.

   The marquee is two identical groups side by side; the track animates left by
   exactly one group width (-50%) and loops, so the second group seamlessly
   takes the first's place. Per-item trailing margin (not flex gap) keeps the
   spacing uniform across the group boundary, which is what makes the loop
   jump-free. Reduced motion shows a single static, centered row. */

const LOGOS: { name: string; src: string }[] = [];
const PLACEHOLDER_COUNT = 6;

function LogoGroup({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      role="list"
      aria-hidden={clone || undefined}
      className={
        clone ? "logo-band__group logo-band__group--clone" : "logo-band__group"
      }
    >
      {LOGOS.length > 0
        ? LOGOS.map((logo) => (
            <li key={logo.name} className="logo-band__item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="logo-band__logo"
              />
            </li>
          ))
        : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
            <li
              key={i}
              aria-hidden
              className="logo-band__item logo-band__item--placeholder"
            />
          ))}
    </ul>
  );
}

export function CustomerLogoBand() {
  return (
    <section aria-label="Customers" className="logo-band w-full">
      <PageShell>
        <PageColumn className="logo-band__inner">
          <p className="logo-band__caption label">Trusted by revenue teams</p>
          <div className="logo-band__viewport">
            <div className="logo-band__track">
              <LogoGroup />
              <LogoGroup clone />
            </div>
          </div>
        </PageColumn>
      </PageShell>

      <SectionRule placement="end" />
    </section>
  );
}
