"use server";

import { createLeadUploadTokenFields } from "@/lib/auth";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { parseAndSanitizeInquiry } from "@/lib/inquiry-schema";
import { checkRateLimit, sweepRateLimits } from "@/lib/rate-limit";

const MIN_FORM_MS = 2000;

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  country?: string;
  message?: string;
  /** Honeypot — leave empty */
  website?: string;
  formStartedAt: number;
};

export type SubmitInquiryResult =
  | { ok: true; service: string; uploadToken?: string }
  | { ok: false; error: string };

function fakeSuccess(service: string): SubmitInquiryResult {
  // Appear successful to bots without creating a lead or sending email.
  return { ok: true, service: service || "Inquiry" };
}

export async function submitInquiry(
  payload: InquiryPayload,
): Promise<SubmitInquiryResult> {
  const parsed = parseAndSanitizeInquiry(payload);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error };
  }

  const { data, website, formStartedAt } = parsed;

  // 1) Honeypot — bots fill hidden fields; real users never see it.
  if (website.length > 0) {
    console.warn("Inquiry rejected: honeypot filled");
    return fakeSuccess(data.service);
  }

  // 2) Timing — submissions faster than ~2s are almost always automated.
  const elapsed = Date.now() - formStartedAt;
  if (
    !Number.isFinite(formStartedAt) ||
    !Number.isFinite(elapsed) ||
    formStartedAt > Date.now() + 5_000 || // clock skew / tampered timestamp
    elapsed < MIN_FORM_MS
  ) {
    console.warn("Inquiry rejected: timing check", { elapsed });
    return fakeSuccess(data.service);
  }

  // 4) Rate limit per IP (5 / 15 minutes)
  sweepRateLimits();
  const ip = await getClientIp();
  const limit = checkRateLimit(`inquiry:${ip}`);
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many inquiries from this network. Please try again in about ${Math.ceil(limit.retryAfterSec / 60)} minutes, or message us on WhatsApp.`,
    };
  }

  try {
    let uploadToken: string | undefined;

    if (process.env.DATABASE_URL) {
      const tokenFields = await createLeadUploadTokenFields();
      const lead = await prisma.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          service: data.service,
          country: data.country || null,
          message: data.message || null,
          uploadToken: tokenFields.uploadToken,
          tokenExpiresAt: tokenFields.tokenExpiresAt,
        },
      });
      uploadToken = lead.uploadToken ?? undefined;
    } else {
      console.warn("DATABASE_URL not set — skipping Prisma insert.");
    }

    const emailResult = await sendLeadNotification(data);
    if (!emailResult.ok) {
      return { ok: false, error: emailResult.error };
    }

    return {
      ok: true,
      service: data.service,
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
