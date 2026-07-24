import Link from "next/link";
import {
  GraduationCap,
  Plane,
  Briefcase,
  Stethoscope,
  Palmtree,
  MoonStar,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Service, ServiceSlug } from "@/lib/services";
import { cn } from "@/lib/utils";

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "umrah-package": MoonStar,
  "student-visa": GraduationCap,
  "tourist-visa": Palmtree,
  "business-visa": Briefcase,
  "medical-visa": Stethoscope,
  "air-ticket": Plane,
};

type ServiceCardProps = {
  service: Service;
  index?: number;
  className?: string;
};

export function ServiceCard({ service, index = 0, className }: ServiceCardProps) {
  const Icon = serviceIcons[service.slug];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border/80 bg-card p-8 shadow-[0_20px_60px_-15px_rgba(20,82,82,0.12)] transition-all duration-500 hover:-translate-y-2 hover:border-teal/30 hover:shadow-[0_40px_80px_-20px_rgba(20,82,82,0.2)] sm:p-10",
        className,
      )}
    >
      <div className="absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-teal/5 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-teal/10" />
      <div className="absolute -bottom-20 -left-20 z-0 h-64 w-64 rounded-full bg-gold/5 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-gold/10" />

      <span className="absolute -right-4 -top-8 z-0 select-none font-display text-[10rem] font-bold leading-none text-mist/60 transition-all duration-700 group-hover:text-mist/80">
        {(index + 1).toString().padStart(2, "0")}
      </span>

      <div className="relative z-10 flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-navy text-white shadow-[0_10px_20px_-5px_rgba(20,82,82,0.35)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="size-7" strokeWidth={1.5} />
        </div>
        <div className="h-px flex-1 bg-border/80 transition-all duration-500 group-hover:bg-teal/30" />
      </div>

      <div className="relative z-10 mt-16 flex flex-col">
        <h3 className="font-display text-3xl font-medium tracking-tight text-navy transition-colors duration-300 group-hover:text-teal">
          {service.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {service.summary}
        </p>
      </div>

      <div className="relative z-10 mt-12">
        <div className="inline-flex w-full items-center justify-between rounded-[1.25rem] border border-border/60 bg-section/50 p-2 pr-6 transition-all duration-500 group-hover:border-teal/30 group-hover:bg-teal/5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:bg-teal group-hover:text-white">
            <ArrowRight className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-navy transition-colors duration-300 group-hover:text-teal">
            Explore Service
          </span>
        </div>
      </div>
    </Link>
  );
}
