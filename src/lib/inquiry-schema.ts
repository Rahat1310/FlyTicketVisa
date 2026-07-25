import { z } from "zod";
import { countries } from "@/lib/data/countries";
import { services } from "@/lib/services";

const SCRIPT_PATTERN = /<\s*script\b|javascript\s*:|on\w+\s*=/i;
const HEADER_INJECTION = /[\r\n\0]/;

const serviceTitles = new Set(services.map((s) => s.title));
const countryNames = new Set(countries.map((c) => c.name));

function cleanText(value: string): string {
  return value.replace(/\0/g, "").trim();
}

function rejectDangerous(value: string, label: string): string {
  const cleaned = cleanText(value);
  if (SCRIPT_PATTERN.test(cleaned)) {
    throw new Error(`${label} contains disallowed content.`);
  }
  return cleaned;
}

function rejectHeaderInjection(value: string, label: string): string {
  const cleaned = cleanText(value);
  if (HEADER_INJECTION.test(cleaned)) {
    throw new Error(`${label} contains invalid characters.`);
  }
  if (SCRIPT_PATTERN.test(cleaned)) {
    throw new Error(`${label} contains disallowed content.`);
  }
  return cleaned;
}

/** Client + server payload shape (includes anti-bot fields). */
export const inquiryInputSchema = z.object({
  name: z.string().max(120),
  phone: z.string().max(40),
  email: z.string().max(254).optional().or(z.literal("")),
  service: z.string().max(120),
  country: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  /** Honeypot — must stay empty */
  website: z.string().max(200).optional().or(z.literal("")),
  /** Client form mount time (ms since epoch) */
  formStartedAt: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;

export type SanitizedInquiry = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  country?: string;
  message?: string;
};

export function parseAndSanitizeInquiry(
  raw: unknown,
):
  | { ok: true; data: SanitizedInquiry; website: string; formStartedAt: number }
  | { ok: false; error: string } {
  const parsed = inquiryInputSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("Inquiry schema validation failed:", parsed.error.flatten());
    return { ok: false, error: "Invalid form data. Please check your entries." };
  }

  const input = parsed.data;

  try {
    const name = rejectHeaderInjection(input.name, "Name");
    const phone = rejectHeaderInjection(input.phone, "Phone");
    const emailRaw = input.email ? cleanText(input.email) : "";
    const service = rejectHeaderInjection(input.service, "Service");
    const countryRaw = input.country ? rejectHeaderInjection(input.country, "Country") : "";
    const messageRaw = input.message ? rejectDangerous(input.message, "Message") : "";

    if (!name || name.length < 2) {
      return { ok: false, error: "Please enter your full name." };
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
    if (!service || !serviceTitles.has(service)) {
      return { ok: false, error: "Please select a valid service." };
    }
    if (countryRaw && !countryNames.has(countryRaw)) {
      return { ok: false, error: "Please select a valid country." };
    }

    let email: string | undefined;
    if (emailRaw) {
      if (HEADER_INJECTION.test(emailRaw) || SCRIPT_PATTERN.test(emailRaw)) {
        return { ok: false, error: "Please enter a valid email address." };
      }
      const emailCheck = z.string().email().safeParse(emailRaw);
      if (!emailCheck.success) {
        return { ok: false, error: "Please enter a valid email address." };
      }
      email = emailCheck.data;
    }

    return {
      ok: true,
      website: cleanText(input.website ?? ""),
      formStartedAt: input.formStartedAt,
      data: {
        name,
        phone,
        email,
        service,
        country: countryRaw || undefined,
        message: messageRaw || undefined,
      },
    };
  } catch (error) {
    console.warn("Inquiry sanitization rejected input:", error);
    return {
      ok: false,
      error: "Invalid form data. Please check your entries.",
    };
  }
}
