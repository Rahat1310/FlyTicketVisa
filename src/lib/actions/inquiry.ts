"use server";

import { prisma } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { createLeadUploadTokenFields } from "@/lib/auth";

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  country?: string;
  message?: string;
};

export type SubmitInquiryResult =
  | { ok: true; service: string; uploadToken?: string }
  | { ok: false; error: string };

export async function submitInquiry(
  payload: InquiryPayload,
): Promise<SubmitInquiryResult> {
  if (!payload.name.trim() || !payload.phone.trim() || !payload.service.trim()) {
    return { ok: false, error: "Name, phone, and service are required." };
  }

  try {
    let uploadToken: string | undefined;

    if (process.env.DATABASE_URL) {
      const tokenFields = await createLeadUploadTokenFields();
      const lead = await prisma.lead.create({
        data: {
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: payload.email?.trim() || null,
          service: payload.service.trim(),
          country: payload.country?.trim() || null,
          message: payload.message?.trim() || null,
          uploadToken: tokenFields.uploadToken,
          tokenExpiresAt: tokenFields.tokenExpiresAt,
        },
      });
      uploadToken = lead.uploadToken ?? undefined;
    } else {
      console.warn("DATABASE_URL not set — skipping Prisma insert.");
    }

    const emailResult = await sendLeadNotification(payload);
    if (!emailResult.ok) {
      // Still keep the lead in DB if it was saved; surface email failure to the UI.
      return { ok: false, error: emailResult.error };
    }

    return {
      ok: true,
      service: payload.service.trim(),
      uploadToken,
    };
  } catch (error) {
    console.error("submitInquiry failed:", error);
    return {
      ok: false,
      error: "Something went wrong. Please try WhatsApp or call us directly.",
    };
  }
}
