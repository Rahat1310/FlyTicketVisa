import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type LeadEmailPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  country?: string;
  message?: string;
};

export async function sendLeadNotification(payload: LeadEmailPayload) {
  const inbox = process.env.AGENCY_INBOX_EMAIL ?? siteConfig.email;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping lead email.");
    return;
  }

  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Service: ${payload.service}`,
    payload.country ? `Country: ${payload.country}` : null,
    payload.message ? `Message: ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await resend.emails.send({
    from,
    to: inbox,
    subject: `New inquiry: ${payload.service}${payload.country ? ` — ${payload.country}` : ""}`,
    text: lines,
  });
}
