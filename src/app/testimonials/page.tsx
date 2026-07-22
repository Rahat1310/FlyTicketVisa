import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { TestimonialList } from "@/components/TestimonialList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about our visa processing and air ticket support from Bangladesh.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Trusted by travelers across Bangladesh"
        description="Students, Umrah pilgrims, tourists, and families — stories from people who worked with us. Replace placeholders with real photos and names before launch."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TestimonialList />
          <div className="mt-14 rounded-2xl border border-border bg-mist/50 px-6 py-10 text-center sm:px-10">
            <h2 className="font-display text-2xl text-navy">
              Have a visa or ticket question?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Tell us your destination and travel dates — we will reply with a clear
              checklist and next steps.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "mt-6 inline-flex bg-teal hover:bg-teal/90",
              )}
            >
              Send an inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
