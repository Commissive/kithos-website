import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { _resetRateLimitStore } from "@/lib/rate-limit";

const ENDPOINT = "https://kithos.ai/api/early-access";

let ipCounter = 0;
/** Each test gets a fresh client IP so the shared limiter never interferes. */
function nextIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

function makeRequest(
  body: string,
  { ip = nextIp(), headers = {} }: { ip?: string; headers?: Record<string, string> } = {},
): Request {
  return new Request(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
      ...headers,
    },
    body,
  });
}

/* `Content-Length` is a forbidden header on the Fetch Headers API, so a real
   Request silently drops it — the platform sets it in production. This stub
   exercises the size guard's exact code path (`request.headers.get`). */
function requestWithHeaders(
  headers: Record<string, string>,
  jsonBody: unknown = {},
): Request {
  return {
    headers: { get: (key: string) => headers[key.toLowerCase()] ?? null },
    json: async () => jsonBody,
  } as unknown as Request;
}

const VALID = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  companyWebsite: "example.com",
  role: "VP Sales",
  teamSize: "2-5",
  helpWith: "Finding better-fit accounts.",
};

describe("POST /api/early-access", () => {
  beforeEach(() => {
    _resetRateLimitStore();
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://hooks.example/sheet";
    process.env.EARLY_ACCESS_SHARED_SECRET = "test-secret";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("forwards a valid submission and returns ok", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true }) as Response);
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(makeRequest(JSON.stringify(VALID)));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("silently accepts honeypot hits without forwarding", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true }) as Response);
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(
      makeRequest(JSON.stringify({ ...VALID, company_url: "spam" })),
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a null JSON body without throwing", async () => {
    const res = await POST(makeRequest("null"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
  });

  it("rejects an array JSON body", async () => {
    const res = await POST(makeRequest("[]"));
    expect(res.status).toBe(400);
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(makeRequest("{not json"));
    expect(res.status).toBe(400);
  });

  it("rejects an oversized body with 413", async () => {
    const res = await POST(
      requestWithHeaders({
        "content-length": String(40_000),
        "x-forwarded-for": nextIp(),
      }),
    );
    expect(res.status).toBe(413);
  });

  it("validates required fields", async () => {
    const res = await POST(makeRequest(JSON.stringify({ fullName: "No Email" })));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
  });

  it("rejects an invalid email", async () => {
    const res = await POST(
      makeRequest(JSON.stringify({ ...VALID, email: "not-an-email" })),
    );
    expect(res.status).toBe(400);
  });

  it("returns 503 when the webhook is not configured", async () => {
    delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(makeRequest(JSON.stringify(VALID)));
    expect(res.status).toBe(503);
  });

  it("rate-limits repeated requests from one client", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true }) as Response);
    vi.stubGlobal("fetch", fetchMock);
    const ip = nextIp();

    for (let i = 0; i < 8; i++) {
      const ok = await POST(
        makeRequest(JSON.stringify({ ...VALID, company_url: "spam" }), { ip }),
      );
      expect(ok.status).toBe(200);
    }
    const blocked = await POST(
      makeRequest(JSON.stringify({ ...VALID, company_url: "spam" }), { ip }),
    );
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });

  it("relays a webhook failure as 502", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 500 }) as Response),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(makeRequest(JSON.stringify(VALID)));
    expect(res.status).toBe(502);
  });
});
