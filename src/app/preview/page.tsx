import { Highlight } from "../highlight";
import { StackGrid } from "../stack-grid";
import { RightNowFragments } from "../right-now-fragments";

/* Throwaway comparison route — current "Right Now" vs the proposed
   fragments direction. Not linked from anywhere; delete once a
   direction is chosen. */

function CurrentRightNow() {
  return (
    <section className="w-full bg-[var(--surface)] py-28 md:py-40 lg:py-48">
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <div className="flex items-baseline gap-6 border-t border-[var(--rule-strong)] pt-6">
          <span className="label">Right now</span>
          <div
            aria-hidden
            className="h-px flex-1 self-center bg-[var(--rule)]"
          />
        </div>
        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-14 md:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display-2 max-w-[16ch]">
              Teams are making revenue decisions from{" "}
              <Highlight>fragments</Highlight>.
            </h2>
            <p className="lead mt-10 max-w-[52ch] text-[var(--ink-soft)]">
              Where to focus, who matters, why they should care, and how
              to move deals forward. The context is split across CRM
              fields, call notes, inboxes, Slack threads, spreadsheets,
              decks, and individual memory.
            </p>
            <p className="body mt-5 max-w-[52ch] text-[var(--ink-soft)]">
              The stack records activity but without a system that ties
              it all together, deals get lost, lessons do not compound,
              and the team does not scale.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:items-end lg:pt-20 xl:pt-24">
            <StackGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[86rem] px-6 pt-20 md:px-10">
      <span className="label">{children}</span>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <main id="main">
      <Banner>Comparison · A — current</Banner>
      <CurrentRightNow />
      <div className="h-px w-full bg-[var(--rule-strong)]" />
      <Banner>Comparison · B — proposed (fragments)</Banner>
      <RightNowFragments />
    </main>
  );
}
