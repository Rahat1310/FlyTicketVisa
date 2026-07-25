import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getCountryFlagUrl } from "@/lib/data/flags";
import { cn } from "@/lib/utils";
import { SiteImage } from "@/components/SiteImage";

/** Homepage featured strip — China Visa + Canton Fair for FB campaign traffic */
export function FeaturedHotSection() {
  return (
    <section
      id="featured"
      className="relative overflow-hidden border-b border-gold/25 bg-navy-deep py-12 text-white sm:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-pattern-dark opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-teal/20 blur-3xl"
        aria-hidden
      />

      <div className="relative container-fluid">
        <div className="flex flex-wrap items-center gap-2">
          <span className="animate-trending-pulse inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-navy-deep shadow-[0_0_0_0_rgba(201,162,39,0.55)]">
            <Flame className="size-3.5" />
            Trending now
          </span>
        </div>

        <h2 className="mt-4 font-display text-3xl text-balance sm:text-4xl">
          China Visa & Canton Fair
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Get your China visa checklist or full Canton Fair travel
          package (invitation, M-visa, flights & hotels).
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
          <Link
            href="/countries/china"
            className="group flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 rounded-2xl border border-white/15 bg-white/5 p-4 md:p-5 transition-all hover:border-gold/50 hover:bg-white/10"
          >
            <div className="relative flex h-10 w-10 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full border-2 border-gold/40">
              <SiteImage
                src={getCountryFlagUrl("china")}
                alt="China flag"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gold">
                Visa
              </p>
              <p className="mt-1 font-display text-base md:text-xl text-white">China Visa</p>
              <p className="mt-1 text-[11px] md:text-sm leading-tight text-white/60">
                Documents checklist · delivery in 2–3 weeks
              </p>
            </div>
            <ArrowRight className="size-4 md:size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1 md:ml-auto" />
          </Link>

          <Link
            href="/canton-fair"
            className="group flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 rounded-2xl border border-gold/40 bg-gold/10 p-4 md:p-5 transition-all hover:border-gold hover:bg-gold/15"
          >
            <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-[0.85rem] md:rounded-2xl bg-gold text-navy-deep">
              <Flame className="size-5 md:size-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gold">
                Fair package
              </p>
              <p className="mt-1 font-display text-base md:text-xl text-white">Canton Fair</p>
              <p className="mt-1 text-[11px] md:text-sm leading-tight text-white/60">
                Invitation · China M-visa · flights & hotels
              </p>
            </div>
            <ArrowRight className="size-4 md:size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1 md:ml-auto" />
          </Link>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <Link
            href="/canton-fair"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full md:w-auto bg-gold text-navy-deep hover:bg-gold/90",
            )}
          >
            Explore Canton Fair
          </Link>
          <Link
            href="/contact?service=Canton%20Fair&country=China"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full md:w-auto border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
          >
            Inquire now
          </Link>
        </div>
      </div>
    </section>
  );
}
