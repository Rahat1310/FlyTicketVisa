import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { CompactHero } from "@/components/CompactHero";
import { CountryCard } from "@/components/CountryCard";
import { LightSection } from "@/components/LightSection";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { getCountriesBySlugs } from "@/lib/data/countries";
import { getServiceBySlug, services } from "@/lib/services";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600; // 1 hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getCountriesBySlugs(service.relatedCountries);

  return (
    <>
      <CompactHero eyebrow="Visa service" title={service.title} description={service.description} />

      <LightSection>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Process"
              title="What's included"
              description="End-to-end support from checklist to submission."
            />
            <ul className="mt-8 space-y-3">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              className={cn(buttonVariants(), "mt-8 bg-gold text-navy-deep hover:bg-gold/90")}
            >
              {service.cta}
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl text-navy">Typical requirements</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Exact lists vary by country and embassy — we confirm before filing.
            </p>
            <ul className="mt-6 space-y-3">
              {service.requirements.map((item) => (
                <li
                  key={item}
                  className="border-b border-border/70 pb-3 text-sm last:border-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LightSection>

      {related.length > 0 ? (
        <LightSection bordered>
          <SectionHeading
            eyebrow="Destinations"
            title="Countries for this service"
            description="Open a country page for documents, fees, and processing time."
          />
          <div className="relative mt-10">
            <div className="pointer-events-none absolute -right-4 bottom-0 top-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />
            <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {related.map((country) => (
                <div
                  key={country.slug}
                  className="w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink"
                >
                  <CountryCard country={country} />
                </div>
              ))}
            </div>
          </div>
        </LightSection>
      ) : (
        <LightSection bordered>
          <SectionHeading
            eyebrow="Destinations"
            title="Popular countries"
            description="We help with visas and tickets worldwide."
          />
          <div className="relative mt-10">
            <div className="pointer-events-none absolute -right-4 bottom-0 top-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />
            <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {getCountriesBySlugs([
                "china",
                "india",
                "thailand",
                "malaysia",
                "singapore",
                "saudi-arabia",
              ]).map((country) => (
                <div
                  key={country.slug}
                  className="w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink"
                >
                  <CountryCard country={country} />
                </div>
              ))}
            </div>
          </div>
        </LightSection>
      )}

      <CTABanner
        title={`Ready for ${service.shortTitle}?`}
        description="Send an inquiry and we'll reply with a clear checklist and timeline."
        primaryLabel="Start an inquiry"
        primaryHref={`/contact?service=${encodeURIComponent(service.title)}`}
        showAddress={false}
      />
    </>
  );
}
