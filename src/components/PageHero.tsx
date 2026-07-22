import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="bg-hero-atmosphere text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {eyebrow ? (
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-white/55">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="animate-fade-up-delay mt-3 max-w-3xl font-display text-4xl leading-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="animate-fade-up-delay-2 mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          {description}
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-gold text-navy-deep hover:bg-gold/90",
            )}
          >
            Send inquiry
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
          >
            WhatsApp {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
