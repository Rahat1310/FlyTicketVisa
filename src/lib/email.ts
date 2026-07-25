import { siteConfig } from "@/lib/site";
import { documentTypeLabel } from "@/lib/uploads";

type LeadEmailPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  country?: string;
  message?: string;
};

export type SendEmailResult =
  | { ok: true }
  | { ok: false; error: string };

function getBrevoConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const inbox = process.env.AGENCY_INBOX_EMAIL ?? siteConfig.email;
  const fromEmail =
    process.env.BREVO_FROM_EMAIL?.trim() || siteConfig.email;
  const fromName =
    process.env.BREVO_FROM_NAME?.trim() || siteConfig.name;

  return { apiKey, inbox, fromEmail, fromName };
}

async function sendBrevoEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendEmailResult> {
  const { apiKey, fromEmail, fromName } = getBrevoConfig();

  if (!apiKey) {
    console.warn("BREVO_API_KEY not set — skipping email.");
    return {
      ok: false,
      error:
        "Email is not configured yet (missing BREVO_API_KEY in .env.local).",
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: options.to }],
        subject: options.subject,
        htmlContent: options.html,
      }),
    });

    const body = (await response.json().catch(() => null)) as {
      messageId?: string;
      message?: string;
      code?: string;
    } | null;

    if (!response.ok) {
      const message =
        body?.message ||
        `Brevo error ${response.status}. Check API key and verified sender.`;
      console.error("Brevo email failed:", body);
      return { ok: false, error: message };
    }

    console.info("Brevo email sent:", {
      messageId: body?.messageId,
      to: options.to,
    });
    return { ok: true };
  } catch (error) {
    console.error("Brevo email request failed:", error);
    return {
      ok: false,
      error: "Could not reach Brevo. Check your network and try again.",
    };
  }
}

export async function sendLeadNotification(
  payload: LeadEmailPayload,
): Promise<SendEmailResult> {
  const { inbox } = getBrevoConfig();

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #145252; padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Inquiry Received</h2>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(payload.name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Phone:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                <a href="tel:${escapeHtml(payload.phone)}" style="color: #145252; text-decoration: none;">${escapeHtml(payload.phone)}</a>
              </td>
            </tr>
            ${
              payload.email
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Email:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                <a href="mailto:${escapeHtml(payload.email)}" style="color: #145252; text-decoration: none;">${escapeHtml(payload.email)}</a>
              </td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Service:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(payload.service)}</td>
            </tr>
            ${
              payload.country
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Country:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${escapeHtml(payload.country)}</td>
            </tr>
            `
                : ""
            }
            ${
              payload.message
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;" valign="top"><strong>Message:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; white-space: pre-wrap;">${escapeHtml(payload.message)}</td>
            </tr>
            `
                : ""
            }
          </tbody>
        </table>
      </div>
      <div style="background-color: #f9fafb; padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
        Sent via ${escapeHtml(siteConfig.name)} site form
      </div>
    </div>
  `;

  return sendBrevoEmail({
    to: inbox,
    subject: `New inquiry: ${payload.service}${payload.country ? ` — ${payload.country}` : ""}`,
    html,
  });
}

type DocumentsEmailPayload = {
  leadId: string;
  name: string;
  phone: string;
  service: string;
  country?: string | null;
  fileName: string;
  documentType: string;
  uploadCount: number;
};

export async function sendDocumentsUploadedNotification(
  payload: DocumentsEmailPayload,
): Promise<SendEmailResult> {
  const { inbox } = getBrevoConfig();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyticketvisa.com";

  const typeLabel = documentTypeLabel(payload.documentType);
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0B1B2E; padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New documents uploaded</h2>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <p style="margin: 0 0 16px; color: #374151;">
          ${escapeHtml(payload.name)} uploaded <strong>${escapeHtml(typeLabel)}</strong>
          (${escapeHtml(payload.fileName)}). This lead now has ${payload.uploadCount} file(s).
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563; width: 110px;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.phone)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Service:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.service)}</td>
            </tr>
            ${
              payload.country
                ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Country:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.country)}</td>
            </tr>
            `
                : ""
            }
          </tbody>
        </table>
        <p style="margin: 20px 0 0;">
          <a href="${siteUrl}/admin/leads/${payload.leadId}" style="display: inline-block; background: #C9A227; color: #0B1B2E; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-weight: 600;">
            Open lead in admin
          </a>
        </p>
      </div>
    </div>
  `;

  return sendBrevoEmail({
    to: inbox,
    subject: `Documents uploaded: ${payload.name} — ${payload.service}`,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
