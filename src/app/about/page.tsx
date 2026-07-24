import type { Metadata } from "next";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";
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
      <CompactHero
        eyebrow="About"
        title="A Bangladesh agency built on trust"
        description="We help Bangladeshi nationals with visas and air tickets — clear documents, honest timelines, and real office accountability."
      />

      <LightSection>
        <SectionHeading
          eyebrow="Our story"
          title={`Why ${siteConfig.name}`}
          description="Travel paperwork should not feel confusing or risky."
        />
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            {siteConfig.name} focuses on transparent guidance for students, tourists,
            business travelers, medical patients, and Umrah pilgrims. We start with a
            checklist, confirm fees upfront, and stay reachable on WhatsApp until your
            case moves forward.
          </p>
          <p>
            License numbers below are placeholders until you confirm ATAB, trade license,
            and IATA details in{" "}
            <code className="rounded bg-mist px-1.5 py-0.5 text-xs text-navy">
              src/lib/site.ts
            </code>
            .
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
            >
              <item.icon className="size-6 text-teal" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </LightSection>

      <LightSection bordered>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Visit us"
              title="Our office"
              description={siteConfig.hours}
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
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
              className="h-72 w-full sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </LightSection>

      <LightSection>
        <SectionHeading
          eyebrow="People"
          title="Team"
          description="Add real staff photos and roles before launch — clients deal with a real local team."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["Counselor", "Documentation lead", "Ticketing desk"].map((role) => (
            <div
              key={role}
              className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-10 text-center"
            >
              <div className="mx-auto size-16 rounded-full bg-section" />
              <p className="mt-4 text-sm font-medium text-navy">Team member</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          ))}
        </div>
      </LightSection>

      <CTABanner showAddress={false} />
    </>
  );
}
