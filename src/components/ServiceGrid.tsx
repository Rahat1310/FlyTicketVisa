import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { FadeIn } from "@/components/Animations";

export function ServiceGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {services.map((service, i) => (
        <FadeIn key={service.slug} delay={i * 0.15} className="h-full">
          <ServiceCard service={service} index={i} />
        </FadeIn>
      ))}
    </div>
  );
}
