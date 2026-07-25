import { cn } from "@/lib/utils";

type LightSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
};

/** Light section with established pale mint bg + dotted grid texture */
export function LightSection({ children, className, id, bordered = false }: LightSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-16 sm:py-20", bordered && "border-y border-border", className)}
    >
      <div className="pointer-events-none absolute inset-0 bg-section-atmosphere" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-section-pattern" aria-hidden />
      <div className="relative container-fluid">{children}</div>
    </section>
  );
}
