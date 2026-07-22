import Link from "next/link";
import { ArrowRight, Plane, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SiteImage } from "@/components/SiteImage";
import { ServiceGrid } from "@/components/ServiceGrid";
import { FadeIn, AnimatedText } from "@/components/Animations";

import { CountryGrid } from "@/components/CountryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
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
        {/* Darker vignette — keeps text highly readable while photo still shows through */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/65 to-navy-deep/90"
          aria-hidden
        />

        {/* Moving Airplane Animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Bottom plane (Left to Right) */}
          <Plane className="absolute top-[45%] left-0 w-24 h-24 text-white/10 animate-fly drop-shadow-xl" strokeWidth={1} />
          {/* Top plane (Right to Left) */}
          <Plane className="absolute top-[7%] left-0 w-16 h-16 text-white/10 animate-fly-reverse drop-shadow-xl" strokeWidth={1} />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-4xl items-center justify-center px-4 py-24 sm:px-6">
          <div className="relative w-full text-center">
            {/* Low-opacity fade behind type so photo still shows through */}
            <div
              className="animate-hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(6,21,37,0.7)_0%,rgba(6,21,37,0.4)_45%,transparent_72%)]"
              aria-hidden
            />

            <div className="relative">
              {/* Vibrant Gradient Main Title */}
              <h1 className="animate-hero-brand font-display text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-teal drop-shadow-[0_4px_32px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-8xl py-2">
                {siteConfig.name}
              </h1>

              <div
                className="animate-hero-line mx-auto mt-4 mb-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold to-transparent sm:w-48"
                aria-hidden
              />

              {/* Creative Subtitle with Accent Highlights */}
              <h1 className="animate-fade-up-delay mt-6 text-xl font-light leading-relaxed tracking-wide text-mist/90 text-balance sm:text-2xl md:text-3xl md:leading-relaxed max-w-3xl mx-auto">
                Your journey starts here — from{" "}
                <span className="font-medium text-white drop-shadow-md relative inline-block">
                  Bangladesh
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gold rounded-full opacity-80"></span>
                </span>{" "}
                to the{" "}
                <span className="font-medium text-white drop-shadow-md relative inline-block">
                  world.
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gold rounded-full opacity-80"></span>
                </span>
              </h1>

              <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
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
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white",
                  )}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-section-atmosphere" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-section-pattern" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
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
        </div>
      </section>

      <section className="relative border-y border-border py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-section-atmosphere" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-section-pattern" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn direction="up" delay={0.1} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Priority destinations"
              title="Countries we help with most"
              description="Transparent fees, documents, and processing times on every country page."
            />
            <Link
              href="/countries/uk"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:underline"
            >
              Browse all priority countries
              <ArrowRight className="size-3.5" />
            </Link>
          </FadeIn>
          <div className="mt-10">
            <CountryGrid />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-hero-atmosphere py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-section-pattern-dark" aria-hidden />
        <FadeIn delay={0.2} className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl text-balance sm:text-4xl">
            <AnimatedText text="Ready to start your visa or ticket?" />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Send an inquiry or message us on WhatsApp. We reply with a clear checklist
            and next steps — no pressure, no hidden fees.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gold text-navy-deep hover:bg-gold/90",
              )}
            >
              Contact us
            </Link>
            <a
              href={siteConfig.phoneHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Call {siteConfig.phone}
            </a>
          </div>

          <div className="mt-14 flex flex-col items-center justify-center space-y-3">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
              Or visit us in person
            </p>
            <div className="group inline-flex items-center gap-3 rounded-full border border-teal/20 bg-teal/10 px-5 py-2.5 text-sm font-medium text-teal backdrop-blur-md transition-all hover:bg-teal/20 hover:border-teal/40 cursor-default">
              <MapPin className="size-4 animate-bounce" />
              <span>Monichottor, Shaheb Bazar, Rajshahi</span>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
