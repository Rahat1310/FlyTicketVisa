"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { getLeadByUploadToken } from "@/lib/auth";
import { sendDocumentsUploadedNotification } from "@/lib/email";
import {
  DOCUMENT_TYPES,
  MAX_UPLOAD_BYTES,
  MAX_UPLOADS_PER_LEAD,
  isAllowedMimeType,
  type DocumentType,
} from "@/lib/uploads";

export type UploadDocumentResult =
  | {
      ok: true;
      upload: {
        id: string;
        fileName: string;
        documentType: string;
        uploadedAt: string;
      };
    }
  | { ok: false; error: string };

const ALLOWED_TYPES = new Set(
  DOCUMENT_TYPES.map((t) => t.value),
) as Set<string>;

/** Simple per-token rate limit (in-memory; best-effort on serverless). */
const uploadHits = new Map<string, { count: number; windowStart: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

function checkRateLimit(token: string): boolean {
  const now = Date.now();
  const entry = uploadHits.get(token);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    uploadHits.set(token, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

export async function uploadDocument(
  token: string,
  formData: FormData,
): Promise<UploadDocumentResult> {
  if (!token?.trim()) {
    return { ok: false, error: "Invalid upload link." };
  }

  if (!checkRateLimit(token)) {
    return {
      ok: false,
      error: "Too many uploads. Please wait a minute and try again.",
    };
  }

  if (!process.env.DATABASE_URL) {
    return {
      ok: false,
      error: "Document storage is not configured yet. Please send files via WhatsApp.",
    };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      error: "File storage is not configured yet. Please send files via WhatsApp.",
    };
  }

  const result = await getLeadByUploadToken(token.trim());
  if (!result) {
    return { ok: false, error: "This upload link is invalid." };
  }
  if (result.expired) {
    return {
      ok: false,
      error: "This upload link has expired. Contact us for a new link.",
    };
  }

  const lead = result.lead;
  const existingCount = lead.uploads.length;
  if (existingCount >= MAX_UPLOADS_PER_LEAD) {
    return {
      ok: false,
      error: `Maximum of ${MAX_UPLOADS_PER_LEAD} files reached for this inquiry.`,
    };
  }

  const file = formData.get("file");
  const documentTypeRaw = String(formData.get("documentType") ?? "");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Please choose a file to upload." };
  }

  if (!ALLOWED_TYPES.has(documentTypeRaw)) {
    return { ok: false, error: "Please select a document type." };
  }
  const documentType = documentTypeRaw as DocumentType;

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: "File is too large. Maximum size is 8 MB.",
    };
  }

  const mimeType = file.type || "application/octet-stream";
  if (!isAllowedMimeType(mimeType)) {
    return {
      ok: false,
      error: "Only PDF, JPG, PNG, or WebP files are allowed.",
    };
  }

  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_").slice(0, 120);
  const pathname = `leads/${lead.id}/${Date.now()}-${documentType}-${safeName}`;

  try {
    const blob = await put(pathname, file, {
      access: "private",
      contentType: mimeType,
      addRandomSuffix: true,
      multipart: file.size > 4 * 1024 * 1024,
    });

    const upload = await prisma.upload.create({
      data: {
        leadId: lead.id,
        fileUrl: blob.url,
        fileName: safeName || "document",
        documentType,
        mimeType,
        sizeBytes: file.size,
      },
    });

    const uploadCount = existingCount + 1;

    // Notify on first document, and every later upload (staff wants visibility)
    void sendDocumentsUploadedNotification({
      leadId: lead.id,
      name: lead.name,
      phone: lead.phone,
      service: lead.service,
      country: lead.country,
      fileName: upload.fileName,
      documentType: upload.documentType,
      uploadCount,
    }).catch((err) => console.error("documents email failed:", err));

    return {
      ok: true,
      upload: {
        id: upload.id,
        fileName: upload.fileName,
        documentType: upload.documentType,
        uploadedAt: upload.uploadedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("uploadDocument failed:", error);
    return {
      ok: false,
      error: "Upload failed. Please try again or send the file on WhatsApp.",
    };
  }
}
