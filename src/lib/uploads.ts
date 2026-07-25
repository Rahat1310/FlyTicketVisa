export const DOCUMENT_TYPES = [
  { value: "passport", label: "Passport (bio page)" },
  { value: "photo", label: "Passport photo" },
  { value: "bank_statement", label: "Bank statement" },
  { value: "solvency", label: "Bank solvency certificate" },
  { value: "trade_license", label: "Trade license / NOC" },
  { value: "tin", label: "TIN certificate" },
  { value: "air_ticket", label: "Air ticket" },
  { value: "invitation", label: "Invitation letter" },
  { value: "other", label: "Other" },
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number]["value"];

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB
export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const TOKEN_TTL_DAYS = 7;
export const MAX_UPLOADS_PER_LEAD = 20;

export function isAllowedMimeType(mime: string): boolean {
  return (ALLOWED_MIME_TYPES as readonly string[]).includes(mime);
}

export function documentTypeLabel(value: string): string {
  return DOCUMENT_TYPES.find((t) => t.value === value)?.label ?? value;
}
