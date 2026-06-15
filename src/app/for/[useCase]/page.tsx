import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../nav";
import { SiteFooter } from "../../site-footer";
import { AccessButton } from "../../access-modal";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingRow,
  SectionHeadingRowTitle,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "../../page-layout";
import { USE_CASES, getUseCase } from "../use-cases";
import "../use-case.css";

export const dynamicParams = false;

type Params = { useCase: string };

export function generateStaticParams(): Params[] {
  return USE_CASES.map(({ slug }) => ({ useCase: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const useCase = getUseCase((await params).useCase);
  if (!useCase) return {};
  return {
    title: `${useCase.metaTitle} — Kithos`,
    description: useCase.metaDescription,
    alternates: { canonical: `/for/${useCase.slug}` },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const useCase = getUseCase((await params).useCase);
  if (!useCase) notFound();

  return (
    <>
      <Nav />
      <main id="main" className="w-full">
        <section
          aria-labelledby="use-case-heading"
          className="use-case-hero w-full"
        >
          <PageShell>
            <PageColumn className="page-section-top">
              <PageGrid>
                <PageGridProse>
                  <SectionHeadingBand>
                    <SectionHeadingStack>
                      <SectionEyebrow>{useCase.eyebrow}</SectionEyebrow>
                      <SectionHeadingRow>
                        <SectionHeadingRowTitle>
                          <h1
                            id="use-case-heading"
                            className="type-statement section-heading-title"
                          >
                            {useCase.headline} <em>{useCase.headlineEm}</em>
                          </h1>
                        </SectionHeadingRowTitle>
                        <SectionHeadingSupport>
                          {useCase.support}
                        </SectionHeadingSupport>
                      </SectionHeadingRow>
                    </SectionHeadingStack>
                  </SectionHeadingBand>
                  <div className="use-case-hero__actions">
                    <AccessButton size="lg" tone="accent" />
                  </div>
                </PageGridProse>
              </PageGrid>
            </PageColumn>
          </PageShell>
        </section>

        <section
          aria-labelledby="use-case-motion-heading"
          className="use-case-motion w-full"
        >
          <PageShell>
            <PageColumn className="page-section-top">
              <PageGrid>
                <PageGridProse>
                  <SectionHeadingBand>
                    <SectionHeadingStack>
                      <SectionEyebrow>What Kithos does</SectionEyebrow>
                      <SectionHeadingRow>
                        <SectionHeadingRowTitle>
                          <SectionHeadingTitle id="use-case-motion-heading">
                            Four moves, run the way{" "}
                            <em>your market buys.</em>
                          </SectionHeadingTitle>
                        </SectionHeadingRowTitle>
                        <SectionHeadingSupport>
                          The Kithos motion doesn&apos;t change — find, shape,
                          move, learn. What changes is everything inside it,
                          reasoned from how buying actually works in your
                          world.
                        </SectionHeadingSupport>
                      </SectionHeadingRow>
                    </SectionHeadingStack>
                  </SectionHeadingBand>

                  <div className="use-case-motion__grid">
                    {useCase.pillars.map((pillar) => (
                      <article
                        key={pillar.phase}
                        className="use-case-motion__cell"
                      >
                        <h3 className="use-case-motion__cell-title type-card-title">
                          <span
                            className="use-case-motion__marker"
                            aria-hidden
                          />
                          {pillar.phase}
                        </h3>
                        <p className="use-case-motion__cell-body body">
                          {pillar.body}
                        </p>
                      </article>
                    ))}
                  </div>

                  <p className="use-case-motion__coda">
                    All of it from the stack you already run —{" "}
                    <Link
                      href="/#integrations"
                      className="interactive-text-link underline-offset-[4px]"
                    >
                      see the integrations
                    </Link>
                    .
                  </p>
                </PageGridProse>
              </PageGrid>
            </PageColumn>
          </PageShell>
        </section>
      </main>
      <SiteFooter showEarlyAccess />
    </>
  );
}
