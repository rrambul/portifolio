/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Best-effort only — in a serverless deployment this state isn't shared across
 * instances, so back it with a durable store (e.g. Upstash) for stronger
 * guarantees. It still deters naive bursts and pairs with the honeypot check.
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
}

/** Best-effort client identity from proxy headers. */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

/** Test helper: clear all tracked windows. */
export function resetRateLimit(): void {
  hits.clear();
}
