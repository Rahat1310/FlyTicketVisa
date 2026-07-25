import { cn } from "@/lib/utils";

type CompactHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

/** Smaller dark-navy hero for inner pages — matches homepage bookend style */
export function CompactHero({ eyebrow, title, description, className }: CompactHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-hero-atmosphere py-14 text-white sm:py-16",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-section-pattern-dark opacity-60" aria-hidden />
      <div className="relative container-fluid">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl text-balance sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
