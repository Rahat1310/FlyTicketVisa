import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { siteConfig, getWhatsAppUrl } from "@/lib/site";
import { MessageCircle, Phone, MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact / Inquiry",
  description:
    "Send a visa or air ticket inquiry. Reach us on WhatsApp, phone, or visit our Dhaka office.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us where you want to go"
        description="Share your service, country, and dates. We reply with requirements, fees, and a realistic timeline."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl text-navy">Inquiry form</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Submits via WhatsApp for now. Database + email alerts come in a later phase.
            </p>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl text-navy">Reach us directly</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-teal" />
                  <a href={siteConfig.phoneHref} className="hover:text-teal">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-teal" />
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal"
                  >
                    WhatsApp chat
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-teal" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-teal">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-teal" />
                  <span>
                    {siteConfig.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">{siteConfig.hours}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Office map"
                src={siteConfig.address.mapEmbedUrl}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
