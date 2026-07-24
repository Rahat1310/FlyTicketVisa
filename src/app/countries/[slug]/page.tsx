import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Banknote } from "lucide-react";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { CTABanner } from "@/components/CTABanner";
import { CountryCard } from "@/components/CountryCard";
import { getCountryFlagUrl } from "@/lib/data/flags";
import { countries, getCountryBySlug } from "@/lib/data/countries";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  return {
    title: `${country.name} Visa from Bangladesh`,
    description: country.summary,
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const others = countries.filter((c) => c.slug !== country.slug);
  const applyHref = `/contact?country=${encodeURIComponent(country.name)}&countrySlug=${country.slug}`;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-atmosphere py-14 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-section-pattern-dark opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {country.region}
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/10 shadow-lg">
              <img
                src={getCountryFlagUrl(country.slug)}
                alt={`${country.name} flag`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl">
                {country.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
                {country.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {country.visaTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LightSection>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Banknote className="size-5 text-teal" strokeWidth={1.5} />
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Fee
            </p>
            <p className="mt-1 font-medium text-navy">{country.fee}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Clock className="size-5 text-teal" strokeWidth={1.5} />
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Processing time
            </p>
            <p className="mt-1 font-medium text-navy">{country.processingTime}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-navy">Documents required</h2>
            <ul className="mt-6 space-y-3">
              {country.documentsRequired.map((doc) => (
                <li key={doc} className="flex gap-3 text-sm text-navy/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl text-navy">Important notes</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {country.notes}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Embassy rules change. We always reconfirm the latest checklist and fee
              before your application is submitted.
            </p>
            <Link
              href={applyHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 bg-gold text-navy-deep hover:bg-gold/90",
              )}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </LightSection>

      <LightSection bordered>
        <h2 className="font-display text-2xl text-navy">Other countries</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.slice(0, 6).map((c) => (
            <CountryCard key={c.slug} country={c} />
          ))}
        </div>
      </LightSection>

      <CTABanner
        title={`Need help with ${country.name}?`}
        description="Submit an inquiry and we'll guide you through documents, fees, and timelines."
        primaryLabel="Apply Now"
        primaryHref={applyHref}
        showAddress={false}
      />
    </>
  );
}
