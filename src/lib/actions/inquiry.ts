"use server";

import { prisma } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  country?: string;
  message?: string;
};

export type SubmitInquiryResult =
  | { ok: true; service: string }
  | { ok: false; error: string };

export async function submitInquiry(
  payload: InquiryPayload,
): Promise<SubmitInquiryResult> {
  if (!payload.name.trim() || !payload.phone.trim() || !payload.service.trim()) {
    return { ok: false, error: "Name, phone, and service are required." };
  }

  try {
    if (process.env.DATABASE_URL) {
      await prisma.lead.create({
        data: {
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: payload.email?.trim() || null,
          service: payload.service.trim(),
          country: payload.country?.trim() || null,
          message: payload.message?.trim() || null,
        },
      });
    } else {
      console.warn("DATABASE_URL not set — skipping Prisma insert.");
    }

    await sendLeadNotification(payload);

    return { ok: true, service: payload.service.trim() };
  } catch (error) {
    console.error("submitInquiry failed:", error);
    return {
      ok: false,
      error: "Something went wrong. Please try WhatsApp or call us directly.",
    };
  }
}
