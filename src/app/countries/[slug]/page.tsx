import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, FileText, Banknote } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { countries, getCountryBySlug } from "@/lib/countries";
import { getWhatsAppUrl } from "@/lib/site";
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

  return (
    <>
      <PageHero
        eyebrow={`${country.region} · ${country.flag}`}
        title={`${country.name} visa support`}
        description={country.summary}
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <Banknote className="size-5 text-teal" strokeWidth={1.5} />
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Fee
              </p>
              <p className="mt-1 text-sm font-medium text-navy">{country.fee}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <Clock className="size-5 text-teal" strokeWidth={1.5} />
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Processing time
              </p>
              <p className="mt-1 text-sm font-medium text-navy">
                {country.processingTime}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <FileText className="size-5 text-teal" strokeWidth={1.5} />
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Visa types
              </p>
              <p className="mt-1 text-sm font-medium text-navy">
                {country.visaTypes.join(", ")}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-navy">
                Documents typically required
              </h2>
              <ul className="mt-6 space-y-3">
                {country.documentsRequired.map((doc) => (
                  <li
                    key={doc}
                    className="border-b border-border/70 pb-3 text-sm text-navy/85 last:border-0"
                  >
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy p-7 text-white sm:p-8">
              <h2 className="font-display text-2xl">Important notes</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {country.notes}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Embassy rules change. We always reconfirm the latest checklist and fee
                before your application is submitted.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants(),
                    "bg-gold text-navy-deep hover:bg-gold/90",
                  )}
                >
                  Inquire about {country.name}
                </Link>
                <a
                  href={getWhatsAppUrl(
                    `Assalamu alaikum. I need ${country.name} visa help.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-mist/40 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl text-navy">Other countries</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/countries/${c.slug}`}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-navy transition-colors hover:border-teal/40"
              >
                {c.flag} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
