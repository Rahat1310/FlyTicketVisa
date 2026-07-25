import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import type { Country } from "@/lib/data/countries";
import { getCountryFlagUrl } from "@/lib/data/flags";
import { cn } from "@/lib/utils";
import { SiteImage } from "@/components/SiteImage";

type CountryCardProps = {
  country: Country;
  className?: string;
  featured?: boolean;
};

export function CountryCard({
  country,
  className,
  featured = country.slug === "china",
}: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className={cn(
        "group relative flex h-full items-center gap-5 overflow-hidden rounded-[1.5rem] border bg-card p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(20,82,82,0.15)]",
        featured
          ? "border-gold/50 ring-1 ring-gold/30 hover:border-gold"
          : "border-border/60 hover:border-teal/30",
        className,
      )}
    >
      {featured ? (
        <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-deep">
          <Flame className="size-3" />
          Trending
        </span>
      ) : null}

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className={cn(
          "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-section shadow-sm transition-transform duration-500 group-hover:scale-110",
          featured ? "border-gold/50" : "border-border/80",
        )}
      >
        <SiteImage
          src={getCountryFlagUrl(country.slug)}
          alt={`${country.name} flag`}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <h3
          className={cn(
            "font-display text-xl font-medium text-navy transition-colors duration-300",
            featured ? "group-hover:text-gold" : "group-hover:text-teal",
          )}
        >
          {country.name}
        </h3>
        <p className="mt-1.5 truncate text-sm text-muted-foreground">
          {country.visaTypes.join(" • ")}
        </p>
      </div>

      <div
        className={cn(
          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 group-hover:text-white group-hover:shadow-md",
          featured
            ? "bg-gold/15 text-navy group-hover:bg-gold group-hover:text-navy-deep"
            : "bg-section text-navy group-hover:bg-teal",
        )}
      >
        <ArrowRight className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
      </div>
    </Link>
  );
}
