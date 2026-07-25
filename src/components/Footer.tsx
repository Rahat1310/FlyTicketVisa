import Link from "next/link";
import { services } from "@/lib/services";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";

function FooterNavColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      {/* Mobile Accordion */}
      <details className="group border-b border-white/10 md:hidden">
        <summary className="flex w-full cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold tracking-wide text-white/90 [&::-webkit-details-marker]:hidden">
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform group-open:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="pb-4">{children}</div>
      </details>

      {/* Desktop Column */}
      <div className="hidden md:block lg:col-span-2">
        <p className="text-sm font-semibold tracking-wide text-white/90">{title}</p>
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy-deep text-white pb-[76px] lg:pb-0">
      <div className="container-fluid grid gap-0 md:gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="pb-8 md:pb-0 lg:col-span-3 border-b border-white/10 md:border-none">
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{siteConfig.tagline}</p>
        </div>

        <FooterNavColumn title="Services">
          <ul className="flex flex-col text-sm text-white/65">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </FooterNavColumn>

        <FooterNavColumn title="Explore">
          <ul className="flex flex-col text-sm text-white/65">
            <li>
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                About & trust
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                Contact / Inquiry
              </Link>
            </li>
            <li>
              <Link
                href="/countries"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                Country visas
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                All services
              </Link>
            </li>
          </ul>
        </FooterNavColumn>

        <FooterNavColumn title="Contact">
          <ul className="flex flex-col text-sm text-white/65">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                WhatsApp chat
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-[44px] items-center transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="py-2 leading-relaxed">
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
            <li className="text-white/45">{siteConfig.hours}</li>
          </ul>
        </FooterNavColumn>

        <div className="pt-8 md:pt-0 lg:col-span-3">
          <p className="text-sm font-semibold tracking-wide text-white/90">Our Office</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 aspect-video w-full max-w-full">
            <iframe
              src={siteConfig.address.mapEmbedUrl}
              className="h-full w-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-fluid flex flex-col items-center justify-center gap-2 py-5 text-center text-xs text-white/40 w-full">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Refund & cancellation policy available on request / About page.</p>
        </div>
      </div>
    </footer>
  );
}
