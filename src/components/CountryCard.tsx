import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Country } from "@/lib/data/countries";
import { getCountryFlagUrl } from "@/lib/data/flags";
import { cn } from "@/lib/utils";

type CountryCardProps = {
  country: Country;
  className?: string;
};

export function CountryCard({ country, className }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className={cn(
        "group relative flex h-full items-center gap-5 overflow-hidden rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-teal/30 hover:shadow-[0_20px_40px_-15px_rgba(20,82,82,0.15)]",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-section shadow-sm transition-transform duration-500 group-hover:scale-110">
        <img
          src={getCountryFlagUrl(country.slug)}
          alt={`${country.name} flag`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <h3 className="font-display text-xl font-medium text-navy transition-colors duration-300 group-hover:text-teal">
          {country.name}
        </h3>
        <p className="mt-1.5 truncate text-sm text-muted-foreground">
          {country.visaTypes.join(" • ")}
        </p>
      </div>

      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-section text-navy transition-all duration-500 group-hover:bg-teal group-hover:text-white group-hover:shadow-md">
        <ArrowRight className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
      </div>
    </Link>
  );
}
