import { processSteps } from "@/lib/data/site";
import { MotionItem, MotionStagger } from "@/components/sections/motion-section";

/** Proceso de trabajo en 4 pasos. */
export function ProcessSteps() {
  return (
    <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step) => (
        <MotionItem
          key={step.number}
          className="group relative rounded-xl border border-stone/40 bg-cream p-7 transition-shadow duration-300 hover:shadow-soft"
        >
          <span className="font-display text-display-sm font-medium text-green-olive/40 transition-colors group-hover:text-terracotta">
            {step.number}
          </span>
          <h3 className="mt-3 font-display text-xl text-green-deep">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{step.description}</p>
        </MotionItem>
      ))}
    </MotionStagger>
  );
}
