import "./product-statement.css";
import { PRODUCT_STATEMENT_ILLUSTRATIONS } from "./product-statement-illustrations";
import { SectionRuleTicks } from "./structural-frame";

const PRODUCT_STATEMENT =
  "The sales agent for technical products, regulated markets, and early markets where the team is still learning who buys and why.";

const CATEGORIES = [
  {
    title: "Technical products",
    tone: "bone-deeper",
    illustration: PRODUCT_STATEMENT_ILLUSTRATIONS.key,
    body: "When the buyer is not the user and the deal turns on technical proof, Kithos reasons over your team's full context to recommend the next commercial move.",
  },
  {
    title: "Regulated markets",
    tone: "bone-quiet",
    illustration: PRODUCT_STATEMENT_ILLUSTRATIONS.anchor,
    body: "Where credibility, compliance, and timing matter as much as the pitch, Kithos keeps account context complete so every touch starts from evidence—not scattered notes or stale fields.",
  },
  {
    title: "Early markets",
    tone: "ink",
    illustration: PRODUCT_STATEMENT_ILLUSTRATIONS.sprout,
    body: "While you are still learning who buys and why, Kithos turns every conversation and outcome into shared memory that sharpens the motion deal by deal.",
  },
] as const;

export function ProductStatement() {
  return (
    <section
      aria-labelledby="product-statement-heading"
      className="product-statement relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--surface)]"
    >
      <SectionRuleTicks />
      <h2 id="product-statement-heading" className="sr-only">
        {PRODUCT_STATEMENT}
      </h2>
      <p className="product-statement__prefix label text-[var(--ink-muted)]">
        The sales agent for
      </p>
      <div
        className="product-statement__strip"
        role="list"
        aria-label="Markets and categories Kithos serves"
      >
        {CATEGORIES.map((category, index) => (
          <article
            key={category.title}
            role="listitem"
            className="product-statement__card"
            data-tone={category.tone}
          >
            <span className="product-statement__index" aria-hidden>
              {String(index + 1).padStart(2, "0")}.
            </span>
            <figure className="product-statement__illo" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.illustration.src}
                alt=""
                width={category.illustration.width}
                height={category.illustration.height}
                loading="lazy"
                decoding="async"
                className="product-statement__illo-image"
              />
            </figure>
            <div className="product-statement__card-copy">
              <h3 className="product-statement__card-title type-card">
                {category.title}
              </h3>
              <p className="product-statement__card-body type-body-lg">
                {category.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
