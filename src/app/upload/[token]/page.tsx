import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "@/components/CompactHero";
import { LightSection } from "@/components/LightSection";
import { UploadClient } from "@/components/UploadClient";
import { getLeadByUploadToken } from "@/lib/auth";
import { getChecklistSlots } from "@/lib/checklist";
import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Upload documents",
  description: "Secure document upload for your visa inquiry.",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function UploadPage({ params }: PageProps) {
  const { token } = await params;
  const result = await getLeadByUploadToken(token);

  if (!process.env.DATABASE_URL) {
    return (
      <>
        <CompactHero
          eyebrow="Documents"
          title="Upload unavailable"
          description="Document storage is not connected yet. Please send files on WhatsApp."
        />
        <LightSection>
          <div className="mx-auto max-w-lg text-center">
            <a
              href={getWhatsAppUrl("Hi, I need to send visa documents.")}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#25D366] text-white hover:bg-[#20bd5a]",
              )}
            >
              Message on WhatsApp
            </a>
          </div>
        </LightSection>
      </>
    );
  }

  if (!result) {
    return (
      <>
        <CompactHero
          eyebrow="Documents"
          title="Link not found"
          description="This upload link is invalid or has already been removed."
        />
        <LightSection>
          <div className="mx-auto max-w-lg text-center">
            <p className="text-sm text-muted-foreground">
              Contact {siteConfig.name} for a fresh secure link.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "mt-6 inline-flex bg-gold text-navy-deep hover:bg-gold/90",
              )}
            >
              Contact us
            </Link>
          </div>
        </LightSection>
      </>
    );
  }

  if (result.expired) {
    return (
      <>
        <CompactHero
          eyebrow="Documents"
          title="Link expired"
          description="Upload links expire after 7 days for your security."
        />
        <LightSection>
          <div className="mx-auto max-w-lg text-center">
            <a
              href={getWhatsAppUrl(
                `Hi, my document upload link expired. Name: ${result.lead.name}`,
              )}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#25D366] text-white hover:bg-[#20bd5a]",
              )}
            >
              Request a new link on WhatsApp
            </a>
          </div>
        </LightSection>
      </>
    );
  }

  const { lead } = result;
  const slots = getChecklistSlots(lead.country);

  return (
    <>
      <CompactHero
        eyebrow="Secure upload"
        title="Upload your documents"
        description={`For ${lead.name} · ${lead.service}${lead.country ? ` · ${lead.country}` : ""}. Files go to our private vault — not a public page.`}
      />
      <LightSection>
        <div className="mx-auto max-w-xl">
          <UploadClient
            token={token}
            slots={slots}
            initialUploads={lead.uploads.map((u) => ({
              id: u.id,
              fileName: u.fileName,
              documentType: u.documentType,
              uploadedAt: u.uploadedAt.toISOString(),
            }))}
          />
        </div>
      </LightSection>
    </>
  );
}
