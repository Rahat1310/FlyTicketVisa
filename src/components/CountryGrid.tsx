import { countries } from "@/lib/data/countries";
import { CountryCard } from "@/components/CountryCard";
import { FadeIn } from "@/components/Animations";

export function CountryGrid({ limit }: { limit?: number }) {
  const list = limit ? countries.slice(0, limit) : countries;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((country, i) => (
        <FadeIn key={country.slug} delay={i * 0.1}>
          <CountryCard country={country} />
        </FadeIn>
      ))}
    </div>
  );
}
