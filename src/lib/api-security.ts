import { NextResponse } from "next/server";

const DEV_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return null;
  }
}

/** Allowed browser origins for API routes (never `*`). */
export function getAllowedOrigins(): string[] {
  const origins = new Set<string>();

  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (site) {
    const n = normalizeOrigin(site);
    if (n) origins.add(n);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const n = normalizeOrigin(
      vercel.startsWith("http") ? vercel : `https://${vercel}`,
    );
    if (n) origins.add(n);
  }

  if (process.env.NODE_ENV !== "production") {
    for (const o of DEV_ORIGINS) origins.add(o);
  }

  return [...origins];
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // same-origin navigations / downloads often omit Origin
  const normalized = normalizeOrigin(origin);
  if (!normalized) return false;
  return getAllowedOrigins().includes(normalized);
}

/**
 * Reject cross-origin browser calls. Returns a 403 response when blocked,
 * otherwise null. Does not set Access-Control-Allow-Origin: *.
 */
export function rejectCrossOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  if (!isAllowedOrigin(origin)) {
    console.warn("Blocked cross-origin request", {
      origin,
      path: new URL(request.url).pathname,
    });
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  return null;
}

/** Attach restrictive CORS headers only for an allowed Origin. */
export function applyCorsHeaders(
  response: NextResponse,
  request: Request,
): NextResponse {
  const origin = request.headers.get("origin");
  if (origin && isAllowedOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return response;
}

export function jsonError(
  status: number,
  clientMessage = "Request could not be completed.",
  logDetail?: unknown,
): NextResponse {
  if (logDetail !== undefined) {
    console.error("API error:", { status, detail: logDetail });
  }
  return NextResponse.json({ error: clientMessage }, { status });
}
