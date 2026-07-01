import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  rateLimit,
  clientIp,
  resetRateLimit,
  _trackedKeyCount,
} from "@/lib/rate-limit";

describe("rateLimit (sliding window)", () => {
  beforeEach(() => {
    resetRateLimit();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to `limit` calls then denies", () => {
    const limit = 3;
    for (let i = 0; i < limit; i++) {
      expect(rateLimit("a", limit)).toBe(true);
    }
    expect(rateLimit("a", limit)).toBe(false);
  });

  it("re-stores the window on the deny path (still denies within the window)", () => {
    const limit = 2;
    expect(rateLimit("deny", limit)).toBe(true);
    expect(rateLimit("deny", limit)).toBe(true);
    // First denial.
    expect(rateLimit("deny", limit)).toBe(false);
    // Advance a little, still inside the window: re-stored window keeps denying.
    vi.advanceTimersByTime(1_000);
    expect(rateLimit("deny", limit)).toBe(false);
  });

  it("recovers the same key after the window fully elapses", () => {
    const limit = 1;
    const windowMs = 60_000;
    expect(rateLimit("recover", limit, windowMs)).toBe(true);
    expect(rateLimit("recover", limit, windowMs)).toBe(false);
    // Advance past windowMs: the old timestamp is filtered out.
    vi.advanceTimersByTime(windowMs + 1);
    expect(rateLimit("recover", limit, windowMs)).toBe(true);
  });

  it("a call just under windowMs still counts toward the window", () => {
    const limit = 2;
    const windowMs = 60_000;
    expect(rateLimit("under", limit, windowMs)).toBe(true);
    // Move to just under the window relative to the first call.
    vi.advanceTimersByTime(windowMs - 1);
    expect(rateLimit("under", limit, windowMs)).toBe(true);
    // Both timestamps remain in-window, so we are now at the limit.
    expect(rateLimit("under", limit, windowMs)).toBe(false);
  });

  it("sweeps fully-expired windows once the tracked-key threshold is exceeded", () => {
    const windowMs = 60_000;
    // Insert > 5000 distinct keys, each with a single timestamp at t0.
    for (let i = 0; i < 5_001; i++) {
      expect(rateLimit(`key-${i}`, 5, windowMs)).toBe(true);
    }
    expect(_trackedKeyCount()).toBe(5_001);

    // Advance past the window so every existing entry is fully expired.
    vi.advanceTimersByTime(windowMs + 1);

    // One more call pushes size over the threshold and triggers the sweep.
    expect(rateLimit("fresh", 5, windowMs)).toBe(true);

    // All stale keys swept; only the fresh key remains.
    expect(_trackedKeyCount()).toBe(1);
    // And the fresh key still works.
    expect(rateLimit("fresh", 5, windowMs)).toBe(true);
  });
});

describe("clientIp (header precedence)", () => {
  it("prefers x-real-ip even when x-forwarded-for differs", () => {
    const request = new Request("https://example.com", {
      headers: {
        "x-real-ip": "203.0.113.7",
        "x-forwarded-for": "198.51.100.1, 10.0.0.1",
      },
    });
    expect(clientIp(request)).toBe("203.0.113.7");
  });

  it("uses the trimmed left-most x-forwarded-for when x-real-ip is absent", () => {
    const request = new Request("https://example.com", {
      headers: {
        "x-forwarded-for": "  198.51.100.1 , 10.0.0.1 ",
      },
    });
    expect(clientIp(request)).toBe("198.51.100.1");
  });

  it("falls back to 'unknown' when neither header is present", () => {
    const request = new Request("https://example.com");
    expect(clientIp(request)).toBe("unknown");
  });
});
