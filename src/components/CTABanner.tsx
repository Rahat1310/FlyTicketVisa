import Link from "next/link";
import { MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedText } from "@/components/Animations";
import { FadeIn } from "@/components/Animations";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type CTABannerProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showAddress?: boolean;
  className?: string;
};

export function CTABanner({
  title = "Ready to start your visa or ticket?",
  description = "Send an inquiry or message us on WhatsApp. We reply with a clear checklist and next steps — no pressure, no hidden fees.",
  primaryLabel = "Contact us",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  showAddress = true,
  className,
}: CTABannerProps) {
  const secondaryText = secondaryLabel ?? `Call ${siteConfig.phone}`;
  const secondaryLink = secondaryHref ?? siteConfig.phoneHref;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-border bg-hero-atmosphere py-16 text-white sm:py-20",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-section-pattern-dark" aria-hidden />
      <FadeIn delay={0.2} className="relative container-fluid text-center">
        <h2 className="font-display text-3xl text-balance sm:text-4xl">
          <AnimatedText text={title} />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/65">{description}</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href={primaryHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto bg-gold text-navy-deep hover:bg-gold/90",
            )}
          >
            {primaryLabel}
          </Link>
          <a
            href={secondaryLink}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
          >
            {secondaryText}
          </a>
        </div>

        {showAddress ? (
          <div className="mt-14 flex flex-col items-center justify-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Or visit us in person
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-3xl sm:rounded-full border border-teal/20 bg-teal/10 px-5 py-3 sm:py-2.5 text-center sm:text-left text-sm font-medium text-teal backdrop-blur-md">
              <MapPin className="size-4 shrink-0" />
              <span>{siteConfig.address.lines.join(", ")}</span>
            </div>
          </div>
        ) : null}
      </FadeIn>
    </section>
  );
}
