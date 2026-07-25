import { z } from "zod";
import { DOCUMENT_TYPES } from "@/lib/uploads";

const documentTypeValues = DOCUMENT_TYPES.map((t) => t.value) as [
  (typeof DOCUMENT_TYPES)[number]["value"],
  ...(typeof DOCUMENT_TYPES)[number]["value"][],
];

/** Prisma cuid-like ids */
export const idSchema = z
  .string()
  .trim()
  .min(20)
  .max(40)
  .regex(/^[a-z0-9]+$/i, "invalid id");

/** base64url upload tokens from crypto.randomBytes */
export const uploadTokenSchema = z
  .string()
  .trim()
  .min(20)
  .max(64)
  .regex(/^[A-Za-z0-9_-]+$/, "invalid token");

export const documentTypeSchema = z.enum(documentTypeValues);

export const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "in_progress",
  "closed",
]);

export const updateLeadStatusSchema = z.object({
  leadId: idSchema,
  status: leadStatusSchema,
});
