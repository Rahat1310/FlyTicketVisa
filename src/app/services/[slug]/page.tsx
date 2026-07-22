import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CountryGrid } from "@/components/CountryGrid";
import { buttonVariants } from "@/components/ui/button";
import { getServiceBySlug, services } from "@/lib/services";
import { getCountriesBySlugs } from "@/lib/countries";
import { getWhatsAppUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

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
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.description}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-navy">What you get</h2>
            <ul className="mt-6 space-y-3">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={getWhatsAppUrl(`Assalamu alaikum. I need help with: ${service.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "bg-teal hover:bg-teal/90")}
              >
                {service.cta}
              </a>
            </div>
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
            <Link
              href="/contact"
              className="mt-6 inline-block text-sm font-medium text-teal hover:underline"
            >
              Prefer a full inquiry form →
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-mist/40 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl text-navy sm:text-3xl">
              Related countries
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open a country page for documents, fees, and processing time.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((country) => (
                <Link
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:border-teal/40"
                >
                  <span className="text-3xl" aria-hidden>
                    {country.flag}
                  </span>
                  <div>
                    <p className="font-medium text-navy">{country.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {country.processingTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-border bg-mist/40 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl text-navy">Popular destinations</h2>
            <div className="mt-8">
              <CountryGrid limit={6} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
