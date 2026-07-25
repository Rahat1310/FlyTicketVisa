"use server";

import { revalidatePath } from "next/cache";
import { updateLeadStatusSchema } from "@/lib/api-schemas";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    await requireAdmin();
  } catch (error) {
    console.error("updateLeadStatus unauthorized:", error);
    return { ok: false as const, error: "Unauthorized." };
  }

  const parsed = updateLeadStatusSchema.safeParse({ leadId, status });
  if (!parsed.success) {
    console.warn("updateLeadStatus invalid input:", parsed.error.flatten());
    return { ok: false as const, error: "Request could not be completed." };
  }

  if (!process.env.DATABASE_URL) {
    return { ok: false as const, error: "Request could not be completed." };
  }

  try {
    await prisma.lead.update({
      where: { id: parsed.data.leadId },
      data: { status: parsed.data.status },
    });

    revalidatePath("/admin");
    revalidatePath(`/admin/leads/${parsed.data.leadId}`);
    return { ok: true as const };
  } catch (error) {
    console.error("updateLeadStatus failed:", error);
    return { ok: false as const, error: "Request could not be completed." };
  }
}
