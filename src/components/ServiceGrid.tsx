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
import { services, type ServiceSlug } from "@/lib/services";

import { FadeIn } from "@/components/Animations";

const icons: Record<ServiceSlug, LucideIcon> = {
  "umrah-package": MoonStar,
  "student-visa": GraduationCap,
  "tourist-visa": Palmtree,
  "business-visa": Briefcase,
  "medical-visa": Stethoscope,
  "air-ticket": Plane,
};

export function ServiceGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {services.map((service, i) => {
        const Icon = icons[service.slug];

        return (
          <FadeIn key={service.slug} delay={i * 0.15} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-8 sm:p-10 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] shadow-[0_20px_60px_-15px_rgba(27,138,122,0.15)] hover:shadow-[0_40px_80px_-20px_rgba(27,138,122,0.3)] border border-border/80 hover:border-teal/30 isolate"
            >
              {/* 3D Glass Layer overlay (appears on hover for glare effect) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay z-10 pointer-events-none" />

              {/* Glowing Accent Orbs inside the card to give depth */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal/5 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-teal/15 z-[-1]" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold/5 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-gold/15 z-[-1]" />

              {/* Typography Background Number */}
              <span className="absolute -right-4 -top-8 z-[-1] font-display text-[10rem] font-bold leading-none text-mist/60 transition-all duration-700 group-hover:-translate-x-4 group-hover:text-mist/80 select-none">
                {(i + 1).toString().padStart(2, '0')}
              </span>

              {/* Top section: 3D Floating Icon Container */}
              <div className="flex items-center gap-5 relative z-20">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-navy text-white shadow-[0_10px_20px_-5px_rgba(27,138,122,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_20px_30px_-10px_rgba(27,138,122,0.6)]">
                  <Icon className="size-7 drop-shadow-md" strokeWidth={1.5} />
                </div>
                <div className="h-px flex-1 bg-border/80 transition-all duration-500 group-hover:bg-teal/30" />
              </div>

              {/* Content Section */}
              <div className="mt-16 relative z-20 flex flex-col">
                <h3 className="font-display text-3xl font-medium tracking-tight text-navy transition-colors duration-300 group-hover:text-teal">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground/90">
                  {service.summary}
                </p>
              </div>

              {/* Creative Explore Button */}
              <div className="mt-12 relative z-20">
                <div className="inline-flex w-full items-center justify-between rounded-[1.25rem] border border-border/60 bg-mist/20 p-2 pr-6 transition-all duration-500 group-hover:border-teal/30 group-hover:bg-teal/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:bg-teal group-hover:text-white group-hover:shadow-md">
                    <ArrowRight className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-[0.15em] text-navy transition-colors duration-300 group-hover:text-teal">
                    Explore Service
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        );
      })}
    </div>
  );
}
