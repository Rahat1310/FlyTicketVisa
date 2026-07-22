import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";
import { BadgeCheck, Building2, HeartHandshake, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Trust",
  description:
    "Learn about our visa and air ticket agency in Bangladesh — licenses, ATAB membership, office, and how we work.",
};

const trustItems = [
  {
    icon: BadgeCheck,
    title: "ATAB membership",
    body: siteConfig.trust.atab,
  },
  {
    icon: Scale,
    title: "Trade license",
    body: siteConfig.trust.tradeLicense,
  },
  {
    icon: Building2,
    title: "IATA (if applicable)",
    body: siteConfig.trust.iata,
  },
  {
    icon: HeartHandshake,
    title: "Refund & cancellation",
    body: "Service charges and embassy fees are explained before work begins. Refund eligibility depends on embassy stage and airline rules — ask us for written terms on your case.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Dhaka-based agency built on trust"
        description="We help Bangladeshi nationals with visas and air tickets — with clear documents, honest timelines, and real office accountability."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-navy">Our story</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Travel paperwork should not feel confusing or risky. {siteConfig.name}{" "}
              focuses on transparent guidance for students, tourists, business travelers,
              medical patients, and Umrah pilgrims. We start with a checklist, confirm
              fees upfront, and stay reachable on WhatsApp until your case moves forward.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Final agency name, logo, and brand colors will be locked in before launch.
              License numbers below are placeholders — replace with your real ATAB,
              trade license, and IATA details.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <item.icon className="size-6 text-teal" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-mist/40 py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy">Visit our office</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{siteConfig.hours}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Phone:{" "}
              <a href={siteConfig.phoneHref} className="font-medium text-teal">
                {siteConfig.phone}
              </a>
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <iframe
              title="Office location map"
              src={siteConfig.address.mapEmbedUrl}
              className="h-72 w-full grayscale-[20%] contrast-[1.05] sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl text-navy">Team</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Add real staff photos and roles before launch. For now, this section signals
            that clients deal with a real local team — not an anonymous online broker.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Counselor", "Documentation lead", "Ticketing desk"].map((role) => (
              <div
                key={role}
                className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-10 text-center"
              >
                <div className="mx-auto size-16 rounded-full bg-mist" />
                <p className="mt-4 text-sm font-medium text-navy">Team member</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
