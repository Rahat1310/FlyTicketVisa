import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { prisma } from "@/lib/db";
import { isClerkConfigured } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin · Leads",
  description: "Staff lead inbox",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!process.env.DATABASE_URL) {
    return (
      <>
        <CompactHero
          eyebrow="Staff only"
          title="Admin dashboard"
          description="Connect Neon (DATABASE_URL) to list inquiries and document uploads."
        />
        <LightSection>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {!isClerkConfigured() ? (
                <>
                  Also add Clerk keys (
                  <code className="text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>
                  , <code className="text-xs">CLERK_SECRET_KEY</code>) to gate this
                  area in production.
                </>
              ) : (
                <>Clerk is configured. Add DATABASE_URL to load leads.</>
              )}
            </p>
          </div>
        </LightSection>
      </>
    );
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      _count: { select: { uploads: true } },
    },
  });

  return (
    <>
      <CompactHero
        eyebrow="Staff only"
        title="Lead inbox"
        description={`${leads.length} recent inquiries. Open a lead to review documents.`}
      />
      <LightSection>
        {!isClerkConfigured() ? (
          <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Clerk keys are not set — this page is open in local/dev mode. Add Clerk
            before deploying.
          </p>
        ) : null}

        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-section/80 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Files</th>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-medium text-navy">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{lead.service}</div>
                      {lead.country ? (
                        <div className="text-xs text-muted-foreground">
                          {lead.country}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 capitalize">{lead.status}</td>
                    <td className="px-4 py-3">{lead._count.uploads}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {lead.createdAt.toLocaleString("en-BD")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className={cn(
                          buttonVariants({ size: "sm", variant: "outline" }),
                        )}
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </LightSection>
    </>
  );
}
