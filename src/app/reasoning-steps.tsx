import "./reasoning-steps.css";

export type ReasoningStep = {
  id: string;
  title: string;
  body: string;
};

export function ReasoningStepItems({
  steps,
}: {
  steps: readonly ReasoningStep[];
}) {
  return (
    <div className="reasoning-steps__list">
      {steps.map((step, index) => {
        const headingId = `${step.id}-heading`;
        const stepLabel = String(index + 1).padStart(2, "0");

        return (
          <article
            key={step.id}
            id={step.id}
            data-revenue-path-card
            aria-labelledby={headingId}
            className="reasoning-steps__card"
          >
            <div className="reasoning-steps__card-inner">
              <div className="reasoning-steps__card-head">
                <span
                  className="reasoning-steps__index step-index"
                  aria-hidden
                >
                  {stepLabel}
                </span>
                <span className="reasoning-steps__index-rule" aria-hidden />
              </div>

              <h3
                id={headingId}
                className="reasoning-steps__card-title type-card-title"
              >
                {step.title}
              </h3>
              <p className="reasoning-steps__card-body body">{step.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
