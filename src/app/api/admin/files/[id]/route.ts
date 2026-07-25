import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  await requireAdmin();

  if (!process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Storage not configured." },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  const upload = await prisma.upload.findUnique({ where: { id } });
  if (!upload) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const result = await get(upload.fileUrl, { access: "private" });
  if (!result || !result.stream) {
    return NextResponse.json({ error: "File missing in storage." }, { status: 404 });
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

  return new NextResponse(result.stream, { headers });
}
