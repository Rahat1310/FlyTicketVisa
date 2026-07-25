import { prisma } from "@/lib/db";
import { generateUploadToken, getTokenExpiry } from "@/lib/upload-token";

export function isClerkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY,
  );
}

export async function requireAdmin() {
  if (!isClerkConfigured()) {
    return { ok: true as const, mode: "dev" as const };
  }

  const { auth } = await import("@clerk/nextjs/server");
  await auth.protect();
  return { ok: true as const, mode: "clerk" as const };
}

export async function getLeadByUploadToken(token: string) {
  if (!process.env.DATABASE_URL) return null;

  const lead = await prisma.lead.findUnique({
    where: { uploadToken: token },
    include: {
      uploads: { orderBy: { uploadedAt: "desc" } },
    },
  });

  if (!lead) return null;
  if (lead.tokenExpiresAt && lead.tokenExpiresAt.getTime() < Date.now()) {
    return { expired: true as const, lead };
  }

  return { expired: false as const, lead };
}

export async function createLeadUploadTokenFields() {
  return {
    uploadToken: generateUploadToken(),
    tokenExpiresAt: getTokenExpiry(),
  };
}
