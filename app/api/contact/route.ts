import { NextResponse } from "next/server";
import { contactPayloadSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * In-memory rate limit (per server instance). Good enough to blunt basic abuse;
 * on serverless/multi-instance hosting, back this with Redis/Upstash or add
 * Cloudflare Turnstile for stronger protection.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled => pretend success so bots learn nothing.
    const hp = (body as { website?: unknown } | null)?.website;
    if (typeof hp === "string" && hp.length > 0) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Please check the highlighted fields and try again." }, { status: 400 });
  }

  const data = parsed.data;
  if (data.startedAt && Date.now() - data.startedAt < 2500) {
    return NextResponse.json({ ok: true }); // submitted faster than a human could: silently drop
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[contact] Email delivery is not configured (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL).");
    return NextResponse.json(
      { error: "Our inquiry form is not connected yet, so your message was not sent. Please contact us by WhatsApp or email instead." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Business", data.businessName],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Service", data.service],
  ];
  const html = `<h2>New VIRTUAL FIRA inquiry</h2><table>${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><h3>Project details</h3><p style="white-space:pre-wrap">${escapeHtml(data.details)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `New inquiry: ${data.service} - ${data.businessName}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ error: "We could not send your message. Please try again shortly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Delivery failed", err);
    return NextResponse.json({ error: "We could not send your message. Please try again shortly." }, { status: 502 });
  }
}
