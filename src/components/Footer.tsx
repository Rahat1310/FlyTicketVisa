import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-xs text-white/45">
            ATAB {siteConfig.trust.atab} · Trade License {siteConfig.trust.tradeLicense}
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold tracking-wide text-white/90">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold tracking-wide text-white/90">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            <li>
              <Link href="/about" className="hover:text-white">
                About & trust
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-white">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact / Inquiry
              </Link>
            </li>
            <li>
              <Link href="/countries" className="hover:text-white">
                Country visas
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold tracking-wide text-white/90">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp chat
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-1 leading-relaxed">
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
            <li className="text-white/45">{siteConfig.hours}</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-sm font-semibold tracking-wide text-white/90">Our Office</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <iframe
              src={siteConfig.address.mapEmbedUrl}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Refund & cancellation policy available on request / About page.</p>
        </div>
      </div>
    </footer>
  );
}
