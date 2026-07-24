import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <CompactHero
        eyebrow="404"
        title="This page doesn't exist"
        description="The link may be outdated, or the page moved. Try services, countries, or contact."
      />
      <LightSection>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className={cn(buttonVariants(), "bg-gold text-navy-deep hover:bg-gold/90")}
          >
            Home
          </Link>
          <Link href="/services" className={cn(buttonVariants({ variant: "outline" }))}>
            Services
          </Link>
          <Link href="/countries" className={cn(buttonVariants({ variant: "outline" }))}>
            Countries
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
            Contact
          </Link>
        </div>
      </LightSection>
    </>
  );
}
