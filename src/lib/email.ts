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
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${payload.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Phone:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                <a href="tel:${payload.phone}" style="color: #145252; text-decoration: none;">${payload.phone}</a>
              </td>
            </tr>
            ${payload.email ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Email:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                <a href="mailto:${payload.email}" style="color: #145252; text-decoration: none;">${payload.email}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Service:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${payload.service}</td>
            </tr>
            ${payload.country ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;"><strong>Country:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${payload.country}</td>
            </tr>
            ` : ''}
            ${payload.message ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;" valign="top"><strong>Message:</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; white-space: pre-wrap;">${payload.message}</td>
            </tr>
            ` : ''}
          </tbody>
        </table>
      </div>
      <div style="background-color: #f9fafb; padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
        Sent via FlyTicket Visa Site Form
      </div>
    </div>
  `;

  await resend.emails.send({
    from,
    to: inbox,
    subject: `New inquiry: ${payload.service}${payload.country ? ` — ${payload.country}` : ""}`,
    html,
  });
}
