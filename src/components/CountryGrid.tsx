import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { countries } from "@/lib/countries";

import { FadeIn } from "@/components/Animations";

const flagMap: Record<string, string> = {
  "saudi-arabia": "sa",
  "uk": "gb",
  "australia": "au",
  "canada": "ca",
  "malaysia": "my",
  "uae": "ae",
  "thailand": "th",
  "singapore": "sg",
  "schengen": "eu",
};

export function CountryGrid({ limit }: { limit?: number }) {
  const list = limit ? countries.slice(0, limit) : countries;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((country, i) => {
        const iso = flagMap[country.slug] || "bd"; // fallback to bd if not found
        
        return (
          <FadeIn key={country.slug} delay={i * 0.1}>
            <Link
              href={`/countries/${country.slug}`}
              className="group relative flex h-full items-center gap-5 overflow-hidden rounded-[1.5rem] bg-white p-5 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(27,138,122,0.15)] border border-border/60 hover:border-teal/30 isolate"
            >
              {/* Subtle Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-[-1]" />
              
              {/* Circular Flag Container */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-mist/20 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md">
                <img 
                  src={`https://flagcdn.com/w80/${iso}.png`}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center min-w-0">
                <h3 className="font-display text-xl font-medium text-navy transition-colors duration-300 group-hover:text-teal">
                  {country.name}
                </h3>
                <p className="mt-1.5 truncate text-sm text-muted-foreground/90">
                  {country.visaTypes.join(" • ")}
                </p>
              </div>
              
              {/* Floating Arrow Icon */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist/50 text-navy transition-all duration-500 group-hover:bg-teal group-hover:text-white group-hover:shadow-md group-hover:shadow-teal/20">
                <ArrowRight className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
              </div>
            </Link>
          </FadeIn>
        );
      })}
    </div>
  );
}
