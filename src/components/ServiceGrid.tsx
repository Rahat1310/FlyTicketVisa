import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { FadeIn } from "@/components/Animations";

/** Canton Fair first so Facebook traffic sees it immediately in the grid */
const orderedServices = [...services].sort((a, b) => {
  if (a.slug === "canton-fair") return -1;
  if (b.slug === "canton-fair") return 1;
  return 0;
});

export function ServiceGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {orderedServices.map((service, i) => (
        <FadeIn key={service.slug} delay={i * 0.15} className="h-full">
          <ServiceCard service={service} index={i} />
        </FadeIn>
      ))}
    </div>
  );
}
