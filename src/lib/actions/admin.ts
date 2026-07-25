"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const ALLOWED_STATUSES = new Set(["new", "contacted", "in_progress", "closed"]);

export async function updateLeadStatus(leadId: string, status: string) {
  await requireAdmin();

  if (!process.env.DATABASE_URL) {
    return { ok: false as const, error: "Database not configured." };
  }

  if (!ALLOWED_STATUSES.has(status)) {
    return { ok: false as const, error: "Invalid status." };
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${leadId}`);
  return { ok: true as const };
}
