import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SiteImage } from "@/components/SiteImage";
import { ServiceGrid } from "@/components/ServiceGrid";
import { TrustStamp } from "@/components/TrustStamp";
import { CountryGrid } from "@/components/CountryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { LightSection } from "@/components/LightSection";
import { CTABanner } from "@/components/CTABanner";
import { FadeIn } from "@/components/Animations";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100vh] overflow-hidden bg-navy-deep text-white">
        {siteConfig.heroImageUrl ? (
          <SiteImage
            src={siteConfig.heroImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-hero-atmosphere" aria-hidden />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/60 to-navy-deep/90"
          aria-hidden
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <Plane className="absolute top-[45%] left-0 h-24 w-24 animate-fly text-white/10 drop-shadow-xl" strokeWidth={1} />
          <Plane className="absolute top-[7%] left-0 h-16 w-16 animate-fly-reverse text-white/10 drop-shadow-xl" strokeWidth={1} />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-4xl items-center justify-center px-4 py-24 sm:px-6">
          <div className="relative w-full text-center">
            <div
              className="animate-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(11,27,46,0.75)_0%,rgba(11,27,46,0.4)_45%,transparent_72%)]"
              aria-hidden
            />

            <div className="relative">
              <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                {siteConfig.name}
              </p>

              <div
                className="animate-hero-line mx-auto mt-5 h-px w-16 origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent sm:w-24"
                aria-hidden
              />

              <h1 className="animate-hero-brand mt-6 text-3xl font-light leading-snug tracking-wide text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Your journey starts here — from{" "}
                <span className="font-medium text-gold">Bangladesh</span> to the{" "}
                <span className="font-medium text-gold">world.</span>
              </h1>

              <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Student, tourist, business, medical, Umrah, and flights — clear documents,
                honest timelines, and WhatsApp support.
              </p>

              <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-gold text-navy-deep shadow-[0_8px_30px_rgba(201,162,39,0.25)] hover:bg-gold/90",
                  )}
                >
                  Start an inquiry
                </Link>
                <Link
                  href="#services"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white",
                  )}
                >
                  Check visa requirements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-border bg-section-atmosphere py-10">
        <div className="pointer-events-none absolute inset-0 bg-section-pattern" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <TrustStamp />
        </div>
      </section>

      <LightSection id="services">
        <FadeIn>
          <SectionHeading
            eyebrow="What we offer"
            title="Services built for Bangladeshi travelers"
            description="Each service has its own page with requirements, related countries, and a clear next step."
          />
        </FadeIn>
        <div className="mt-10">
          <ServiceGrid />
        </div>
      </LightSection>

      <LightSection id="countries" bordered>
        <FadeIn direction="up" delay={0.1} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Priority destinations"
            title="Countries we help with most"
            description="Transparent fees, documents, and processing times on every country page."
          />
          <Link
            href="/countries"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:underline"
          >
            Browse all priority countries
            <ArrowRight className="size-3.5" />
          </Link>
        </FadeIn>
        <div className="mt-10">
          <CountryGrid />
        </div>
      </LightSection>

      <CTABanner />
    </>
  );
}
