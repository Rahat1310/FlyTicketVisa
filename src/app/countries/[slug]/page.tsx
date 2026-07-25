import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Banknote, Flame } from "lucide-react";
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
  const isChina = country.slug === "china";

  const groups: Record<
    string,
    { title: string; color: string; accent: string; checkColor: string; items: string[] }
  > = {
    personal: {
      title: "Personal & Travel Documents",
      color: "from-teal/10 to-teal/5 border-teal/20",
      accent: "text-teal",
      checkColor: "text-teal",
      items: [],
    },
    business: {
      title: "Business & Professional",
      color: "from-gold/10 to-gold/5 border-gold/20",
      accent: "text-[#b38e1e]",
      checkColor: "text-[#b38e1e]",
      items: [],
    },
    financial: {
      title: "Financial Documents",
      color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
      accent: "text-blue-600",
      checkColor: "text-blue-600",
      items: [],
    },
    other: {
      title: "Other Requirements",
      color: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
      accent: "text-emerald-600",
      checkColor: "text-emerald-600",
      items: [],
    },
  };

  country.documentsRequired.forEach((doc) => {
    const l = doc.toLowerCase();
    if (
      l.includes("passport") ||
      l.includes("photo") ||
      l.includes("picture") ||
      l.includes("visa") ||
      l.includes("nid") ||
      l.includes("form")
    ) {
      groups.personal.items.push(doc);
    } else if (
      l.includes("solvency") ||
      l.includes("bank") ||
      l.includes("financial")
    ) {
      groups.financial.items.push(doc);
    } else if (
      l.includes("trade") ||
      l.includes("noc") ||
      l.includes("tin") ||
      l.includes("job") ||
      l.includes("businessman") ||
      l.includes("student") ||
      l.includes("letter") ||
      l.includes("visiting card") ||
      l.includes("employment") ||
      l.includes("academic")
    ) {
      groups.business.items.push(doc);
    } else {
      groups.other.items.push(doc);
    }
  });

  const docGroups = Object.values(groups).filter((g) => g.items.length > 0);

  return (
    <>
      <section className="relative overflow-hidden bg-hero-atmosphere py-14 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-section-pattern-dark opacity-60" aria-hidden />
        <div className="relative container-fluid">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
              {country.region}
            </p>
            {isChina ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-deep">
                <Flame className="size-3" />
                Trending
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div
              className={cn(
                "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-white/10 shadow-lg",
                isChina ? "border-gold/50" : "border-white/20",
              )}
            >
              <img
                src={getCountryFlagUrl(country.slug)}
                alt={`${country.name} flag`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-display text-5xl">
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
              {isChina ? (
                <Link
                  href="/canton-fair"
                  className={cn(
                    buttonVariants(),
                    "mt-5 inline-flex min-h-[44px] items-center bg-gold text-navy-deep hover:bg-gold/90",
                  )}
                >
                  Also going to Canton Fair?
                </Link>
              ) : null}
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

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-2xl text-navy">Documents required</h2>
            {docGroups.map((group) => (
              <div
                key={group.title}
                className={cn(
                  "rounded-xl border bg-gradient-to-br p-5 shadow-sm",
                  group.color,
                )}
              >
                <h3
                  className={cn(
                    "mb-3 font-display text-base font-semibold",
                    group.accent,
                  )}
                >
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-navy/80">
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", group.checkColor)}
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
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
                  "mt-8 w-full bg-gold text-navy-deep hover:bg-gold/90",
                )}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </LightSection>

      <LightSection bordered>
        <h2 className="font-display text-2xl text-navy">Other countries</h2>
        <div className="relative mt-8">
          <div className="pointer-events-none absolute -right-4 bottom-0 top-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {others.slice(0, 6).map((c) => (
              <div key={c.slug} className="w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
                <CountryCard country={c} />
              </div>
            ))}
          </div>
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
