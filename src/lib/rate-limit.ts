/**
 * Best-effort in-memory rate limiter.
 * Works per server instance (fine for single-region / low traffic).
 * For multi-instance production, replace with Redis / Upstash.
 */

type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_HITS = 5;

function prune(bucket: Bucket, now: number) {
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);
}

export function checkRateLimit(
  key: string,
  options: { windowMs?: number; max?: number } = {},
): { ok: true } | { ok: false; retryAfterSec: number } {
  const windowMs = options.windowMs ?? WINDOW_MS;
  const max = options.max ?? MAX_HITS;
  const now = Date.now();

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }

  prune(bucket, now);

  if (bucket.timestamps.length >= max) {
    const oldest = bucket.timestamps[0]!;
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  return { ok: true };
}

/** Opportunistic cleanup so the Map does not grow without bound. */
export function sweepRateLimits() {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    prune(bucket, now);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}
