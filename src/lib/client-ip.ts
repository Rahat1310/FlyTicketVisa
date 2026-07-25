import { headers } from "next/headers";

/** Best-effort client IP from reverse-proxy headers (Vercel / common hosts). */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = h.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const vercelIp = h.get("x-vercel-forwarded-for")?.trim();
  if (vercelIp) return vercelIp.split(",")[0]?.trim() || "unknown";

  return "unknown";
}
