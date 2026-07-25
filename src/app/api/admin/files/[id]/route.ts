import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import {
  applyCorsHeaders,
  jsonError,
  rejectCrossOrigin,
} from "@/lib/api-security";
import { idSchema } from "@/lib/api-schemas";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function OPTIONS(request: Request) {
  const blocked = rejectCrossOrigin(request);
  if (blocked) return blocked;

  const res = new NextResponse(null, { status: 204 });
  return applyCorsHeaders(res, request);
}

export async function GET(request: Request, context: RouteContext) {
  const blocked = rejectCrossOrigin(request);
  if (blocked) return blocked;

  try {
    await requireAdmin();
  } catch (error) {
    console.error("Admin file download unauthorized:", error);
    return applyCorsHeaders(
      jsonError(401, "Unauthorized."),
      request,
    );
  }

  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) {
    return applyCorsHeaders(
      jsonError(503, "Request could not be completed."),
      request,
    );
  }

  const { id: rawId } = await context.params;
  const idResult = idSchema.safeParse(rawId);
  if (!idResult.success) {
    console.warn("Admin file download invalid id:", idResult.error.flatten());
    return applyCorsHeaders(
      jsonError(400, "Request could not be completed."),
      request,
    );
  }

  try {
    const upload = await prisma.upload.findUnique({
      where: { id: idResult.data },
    });
    if (!upload) {
      return applyCorsHeaders(jsonError(404, "Not found."), request);
    }

    const result = await get(upload.fileUrl, { access: "private" });
    if (!result || !result.stream) {
      console.error("Blob missing for upload", { id: upload.id });
      return applyCorsHeaders(jsonError(404, "Not found."), request);
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      upload.mimeType ||
        result.blob.contentType ||
        "application/octet-stream",
    );
    headers.set(
      "Content-Disposition",
      `attachment; filename="${upload.fileName.replace(/"/g, "")}"`,
    );
    if (upload.sizeBytes) {
      headers.set("Content-Length", String(upload.sizeBytes));
    }
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Cache-Control", "private, no-store");

    const response = new NextResponse(result.stream, { headers });
    return applyCorsHeaders(response, request);
  } catch (error) {
    return applyCorsHeaders(
      jsonError(500, "Request could not be completed.", error),
      request,
    );
  }
}
