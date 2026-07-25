import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompactHero } from "@/components/CompactHero";
import { LeadStatusSelect } from "@/components/LeadStatusSelect";
import { LightSection } from "@/components/LightSection";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import { documentTypeLabel } from "@/lib/uploads";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin · Lead",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminLeadPage({ params }: PageProps) {
  const { id } = await params;

  if (!process.env.DATABASE_URL) {
    notFound();
  }

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      uploads: { orderBy: { uploadedAt: "desc" } },
    },
  });

  if (!lead) notFound();

  // eslint-disable-next-line react-hooks/purity -- server component; Date.now() is safe here
  const now = Date.now();
  const isTokenValid = !lead.tokenExpiresAt || lead.tokenExpiresAt.getTime() > now;
  const uploadLink = lead.uploadToken && isTokenValid ? `/upload/${lead.uploadToken}` : null;

  return (
    <>
      <CompactHero
        eyebrow="Lead detail"
        title={lead.name}
        description={`${lead.service}${lead.country ? ` · ${lead.country}` : ""}`}
      />
      <LightSection>
        <div className="mb-6">
          <Link href="/admin" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            ← All leads
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl text-navy">Details</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href={`tel:${lead.phone}`} className="text-teal">
                    {lead.phone}
                  </a>
                </dd>
              </div>
              {lead.email ? (
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href={`mailto:${lead.email}`} className="text-teal">
                      {lead.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {lead.message ? (
                <div>
                  <dt className="text-muted-foreground">Message</dt>
                  <dd className="whitespace-pre-wrap text-navy">{lead.message}</dd>
                </div>
              ) : null}
              <div>
                <dt className="mb-1 text-muted-foreground">Status</dt>
                <dd>
                  <LeadStatusSelect leadId={lead.id} status={lead.status} />
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Submitted</dt>
                <dd>{lead.createdAt.toLocaleString("en-BD")}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={getWhatsAppUrl(
                  `Assalamu alaikum ${lead.name}, regarding your ${lead.service} inquiry…`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "bg-[#25D366] text-white hover:bg-[#20bd5a]",
                )}
              >
                WhatsApp
              </a>
              {uploadLink ? (
                <a
                  href={uploadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                >
                  Client upload link
                </a>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Upload token missing or expired — ask them to inquire again or send files on
                  WhatsApp.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl text-navy">Documents ({lead.uploads.length})</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Private files — download via authenticated admin route only.
            </p>

            {lead.uploads.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                No files yet. Share the upload link after you chat with the client.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {lead.uploads.map((file) => (
                  <li
                    key={file.id}
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy">{file.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {documentTypeLabel(file.documentType)}
                        {file.sizeBytes ? ` · ${(file.sizeBytes / 1024).toFixed(0)} KB` : ""}
                        {" · "}
                        {file.uploadedAt.toLocaleString("en-BD")}
                      </p>
                    </div>
                    <a
                      href={`/api/admin/files/${file.id}`}
                      className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-6 text-xs text-muted-foreground">Inbox: {siteConfig.email}</p>
          </div>
        </div>
      </LightSection>
    </>
  );
}
