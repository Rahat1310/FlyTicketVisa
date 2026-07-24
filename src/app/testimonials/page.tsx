import type { Metadata } from "next";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { TestimonialList } from "@/components/TestimonialList";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about our visa processing and air ticket support from Bangladesh.",
};

export default function TestimonialsPage() {
  return (
    <>
      <CompactHero
        eyebrow="Testimonials"
        title="Trusted by travelers across Bangladesh"
        description="Students, Umrah pilgrims, tourists, and families — replace placeholders with real photos and names before launch."
      />

      <LightSection>
        <TestimonialList />
      </LightSection>

      <CTABanner
        title="Have a visa or ticket question?"
        description="Tell us your destination and travel dates — we reply with a clear checklist and next steps."
        primaryLabel="Send an inquiry"
        primaryHref="/contact"
        showAddress={false}
      />
    </>
  );
}
