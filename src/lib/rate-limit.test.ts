import { afterEach, describe, expect, it, vi } from "vitest";
import {
  _rateLimitStoreSize,
  _resetRateLimitStore,
  getClientIp,
  rateLimit,
} from "./rate-limit";

describe("rateLimit", () => {
  afterEach(() => {
    vi.useRealTimers();
    _resetRateLimitStore();
  });

  it("allows requests under the limit", () => {
    const opts = { limit: 3, windowMs: 60_000 };
    expect(rateLimit("a", opts)).toEqual({ ok: true });
    expect(rateLimit("a", opts)).toEqual({ ok: true });
    expect(rateLimit("a", opts)).toEqual({ ok: true });
  });

  it("blocks requests over the limit within the window", () => {
    const opts = { limit: 2, windowMs: 60_000 };
    expect(rateLimit("b", opts)).toEqual({ ok: true });
    expect(rateLimit("b", opts)).toEqual({ ok: true });
    const blocked = rateLimit("b", opts);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThan(0);
    }
  });

  it("resets after the window expires", () => {
    vi.useFakeTimers();
    const opts = { limit: 1, windowMs: 1_000 };
    expect(rateLimit("c", opts)).toEqual({ ok: true });
    expect(rateLimit("c", opts).ok).toBe(false);

    vi.advanceTimersByTime(1_001);
    expect(rateLimit("c", opts)).toEqual({ ok: true });
  });

  it("tracks keys independently", () => {
    const opts = { limit: 1, windowMs: 60_000 };
    expect(rateLimit("one", opts)).toEqual({ ok: true });
    expect(rateLimit("two", opts)).toEqual({ ok: true });
    expect(rateLimit("one", opts).ok).toBe(false);
  });

  it("evicts expired buckets so the store doesn't grow unbounded", () => {
    vi.useFakeTimers();
    _resetRateLimitStore();
    const opts = { limit: 5, windowMs: 1_000 };

    for (let i = 0; i < 25; i++) rateLimit(`ip-${i}`, opts);
    expect(_rateLimitStoreSize()).toBe(25);

    // Past the window (all expired) and the sweep interval — the next call
    // sweeps the dead entries, leaving only the key it just created.
    vi.advanceTimersByTime(61_000);
    rateLimit("fresh", opts);
    expect(_rateLimitStoreSize()).toBe(1);
  });

  it("keeps live buckets while sweeping", () => {
    vi.useFakeTimers();
    _resetRateLimitStore();
    const opts = { limit: 5, windowMs: 120_000 };

    rateLimit("stale", { limit: 5, windowMs: 1_000 });
    vi.advanceTimersByTime(61_000); // 'stale' is now expired
    rateLimit("live", opts); // triggers a sweep, then records 'live'
    expect(_rateLimitStoreSize()).toBe(1);
    expect(rateLimit("live", opts)).toEqual({ ok: true });
  });
});

describe("getClientIp", () => {
  it("prefers the first x-forwarded-for address", () => {
    const request = new Request("https://kithos.ai", {
      headers: { "x-forwarded-for": "203.0.113.1, 10.0.0.1" },
    });
    expect(getClientIp(request)).toBe("203.0.113.1");
  });

  it("falls back to x-real-ip", () => {
    const request = new Request("https://kithos.ai", {
      headers: { "x-real-ip": "198.51.100.2" },
    });
    expect(getClientIp(request)).toBe("198.51.100.2");
  });
});
