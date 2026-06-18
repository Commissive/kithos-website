import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const RATE_LIMIT = { limit: 8, windowMs: 15 * 60 * 1000 };

const TEAM_SIZES = new Set(["solo", "2-5", "6-10", "11+"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 2000;

type Payload = {
  fullName: string;
  email: string;
  companyWebsite: string;
  role: string;
  teamSize: string;
  helpWith: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>): {
  data?: Payload;
  error?: string;
} {
  const fullName = clean(body.fullName);
  const email = clean(body.email);
  const companyWebsite = clean(body.companyWebsite);
  const role = clean(body.role);
  const teamSize = clean(body.teamSize);
  const helpWith = clean(body.helpWith);

  if (!fullName || !email) {
    return { error: "Full name and work email are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Please enter a valid work email." };
  }
  if (teamSize && !TEAM_SIZES.has(teamSize)) {
    return { error: "Please choose a valid team size." };
  }
  if (
    [fullName, email, companyWebsite, role, helpWith].some(
      (field) => field.length > MAX_LEN,
    )
  ) {
    return { error: "One of the fields is too long." };
  }

  return { data: { fullName, email, companyWebsite, role, teamSize, helpWith } };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`early-access:${ip}`, RATE_LIMIT);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
    return NextResponse.json(
      { ok: false, error: "Signups are temporarily unavailable." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: bots fill hidden fields; humans never do.
  if (clean(body.company_url)) {
    return NextResponse.json({ ok: true });
  }

  const { data, error } = validate(body);
  if (!data) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        secret: process.env.EARLY_ACCESS_SHARED_SECRET ?? "",
        submittedAt: new Date().toISOString(),
      }),
      // Apps Script web apps respond with a 302 redirect to the result;
      // following it returns the JSON body.
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Sheets webhook failed:", response.status);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Sheets webhook error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
