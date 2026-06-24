type RateLimitOptions = {
  /** Max requests allowed within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/* Without eviction the map grows for every distinct key forever — a key's
   entry is only reclaimed when that same key returns after its window. Sweep
   expired entries at most once per interval so a long-lived server instance
   seeing many distinct client IPs doesn't leak memory. Cheap and amortized;
   no timer, so it's safe under serverless freeze/thaw. */
const SWEEP_INTERVAL_MS = 60_000;
let nextSweepAt = 0;

function sweepExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}

/** Best-effort in-memory rate limiter (per server instance). */
export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();

  if (now >= nextSweepAt) {
    sweepExpired(now);
    nextSweepAt = now + SWEEP_INTERVAL_MS;
  }

  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

/** Number of tracked keys. Exposed for tests (eviction is otherwise invisible). */
export function _rateLimitStoreSize(): number {
  return buckets.size;
}

/** Clear all rate-limit state. Exposed so tests can run in isolation. */
export function _resetRateLimitStore(): void {
  buckets.clear();
  nextSweepAt = 0;
}
