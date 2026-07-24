import type { Metadata } from "next";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { CountryGrid } from "@/components/CountryGrid";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Countries We Serve",
  description:
    "Visa support for Bangladeshi applicants — UK, Australia, Canada, Malaysia, UAE, Thailand, Singapore, Schengen, Saudi Arabia, and more.",
};

export default function CountriesIndexPage() {
  return (
    <>
      <CompactHero
        eyebrow="Destinations"
        title="Countries we help with most"
        description="Transparent documents, fees, and processing times for every priority destination. More countries added using the same template."
      />

      <LightSection>
        <SectionHeading
          eyebrow="Priority set"
          title="Choose a destination"
          description="Open a country page for visa types, checklists, and Apply Now."
        />
        <div className="mt-10">
          <CountryGrid />
        </div>
      </LightSection>

      <CTABanner
        title="Don't see your destination?"
        description="Message us on WhatsApp — we support visas and tickets for countries that accept Bangladeshi applicants."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
        showAddress={false}
      />
    </>
  );
}
