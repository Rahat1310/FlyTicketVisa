import type { Metadata } from "next";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Visa & Travel Services",
  description:
    "Umrah packages, student, tourist, business, and medical visas, plus air tickets — from Bangladesh.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <CompactHero
        eyebrow="What we offer"
        title="Services for Bangladeshi travelers"
        description="Each service has its own page with requirements, related countries, and a clear next step."
      />

      <LightSection>
        <SectionHeading
          eyebrow="All services"
          title="Pick a path"
          description="Student, tourist, business, medical, Umrah, or flights."
        />
        <div className="mt-10">
          <ServiceGrid />
        </div>
      </LightSection>

      <CTABanner
        title="Not sure which service you need?"
        description="Tell us your destination and travel dates — we'll recommend the right path."
        primaryLabel="Start an inquiry"
        primaryHref="/contact"
        showAddress={false}
      />
    </>
  );
}
