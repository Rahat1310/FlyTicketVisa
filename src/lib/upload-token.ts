import { randomBytes } from "crypto";
import { TOKEN_TTL_DAYS } from "@/lib/uploads";

export function generateUploadToken(): string {
  return randomBytes(24).toString("base64url");
}

export function getTokenExpiry(days = TOKEN_TTL_DAYS): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}
