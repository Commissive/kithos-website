import {
  SectionEyebrow,
  SectionHeadingStack,
  SectionHeadingTitle,
} from "./page-layout";
import "./kithos-intro-section.css";

export function KithosIntroSection() {
  return (
    <section
      aria-labelledby="kithos-intro-heading"
      className="kithos-intro relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
      data-on-accent
    >
      <div className="kithos-intro__frame">
        <div className="kithos-intro__band">
          <SectionHeadingStack center className="kithos-intro__stack">
            <SectionEyebrow>What Kithos is</SectionEyebrow>
            <SectionHeadingTitle id="kithos-intro-heading" center>
              Kithos understands your product and reasons across your market
              and buyer context, so your team can{" "}
              <em>focus on winnable opportunities.</em>
            </SectionHeadingTitle>
          </SectionHeadingStack>
        </div>
      </div>
    </section>
  );
}
