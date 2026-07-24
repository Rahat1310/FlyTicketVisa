import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  description: "Staff dashboard — Clerk auth coming soon.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <CompactHero
        eyebrow="Staff only"
        title="Admin dashboard"
        description="Lead inbox and document uploads will live here. Clerk auth + Neon leads wire up once env keys are ready."
      />

      <LightSection>
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Add{" "}
            <code className="rounded bg-section px-1.5 py-0.5 text-xs text-navy">
              NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
            </code>{" "}
            and{" "}
            <code className="rounded bg-section px-1.5 py-0.5 text-xs text-navy">
              CLERK_SECRET_KEY
            </code>{" "}
            to <code className="text-xs">.env.local</code>, then we&apos;ll gate this
            route and list inquiries from Prisma.
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "mt-6 inline-flex bg-gold text-navy-deep hover:bg-gold/90",
            )}
          >
            Back to inquiry form
          </Link>
        </div>
      </LightSection>
    </>
  );
}
