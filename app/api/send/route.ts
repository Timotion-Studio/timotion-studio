import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Timotion Studio <hello@timotion.studio>";
const NOTIFY_TO = "hello@timotion.studio";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const allowedOrigins = [
    "https://timotion.studio",
    "https://www.timotion.studio",
    "https://timotion-studio-timotion-studios-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
  ];

  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  const isAllowedOrigin = allowedOrigins.some((o) => origin.startsWith(o));

  if (!isAllowedOrigin) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      clientType,
      service,
      projectTypes,
      date,
      location,
      description,
      budget,
      urgency,
      referral,
      website,
      turnstileToken,
    } = body;

    if (website) {
      return NextResponse.json({ success: true });
    }

    // Verify Cloudflare Turnstile token
    if (!turnstileToken) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v1/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY ?? "",
        response: turnstileToken,
      }),
    });
    let turnstileData;
    try {
      turnstileData = await turnstileRes.json();
    } catch {
      return NextResponse.json({ error: "Verification service unavailable. Please try again." }, { status: 502 });
    }
    if (!turnstileData.success) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (name.length > 100) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ error: "Email is too long." }, { status: 400 });
    }
    if (description && description.length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const safeProjectTypes = projectTypes?.map((t: string) => escapeHtml(t)).join(", ") || "—";

    // ── 1. Notification email to the studio ─────────────────────────────
    const notificationHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
        <div style="background:#000021;padding:32px;border-bottom:2px solid #00ffff;">
          <h1 style="color:#ff7bac;margin:0;font-size:24px;">New Enquiry Received</h1>
          <p style="color:#c8c8d8;margin:8px 0 0;">via timotion.studio</p>
        </div>
        <div style="padding:32px;background:#f9f9ff;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;width:40%;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;font-weight:600;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;"><a href="mailto:${escapeHtml(email)}" style="color:#000021;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Client Type</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(clientType) || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Service</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(service) || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Project Types</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${safeProjectTypes}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Date</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(date) || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Location</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(location) || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Budget</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(budget) || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Timeline</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(urgency) || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Referral</td><td style="padding:10px 0;border-bottom:1px solid #e0e0f0;">${escapeHtml(referral) || "—"}</td></tr>
          </table>
          ${description ? `<div style="margin-top:24px;"><p style="color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Project Description</p><div style="background:#fff;border-left:3px solid #ff7bac;padding:16px;border-radius:0 4px 4px 0;line-height:1.7;">${escapeHtml(description)}</div></div>` : ""}
        </div>
        <div style="background:#000021;padding:20px 32px;text-align:center;">
          <p style="color:#c8c8d8;margin:0;font-size:12px;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
        </div>
      </div>
    `;

    // ── 2. Auto-reply to the enquirer ────────────────────────────────────
    const autoReplyHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
        <div style="background:#000021;padding:40px 32px;text-align:center;border-bottom:2px solid #ff7bac;">
          <h1 style="color:#ff7bac;margin:0 0 8px;font-size:28px;letter-spacing:0.04em;">Thank you, ${escapeHtml(name.split(" ")[0])}.</h1>
          <p style="color:#c8c8d8;margin:0;font-size:15px;">We've received your enquiry.</p>
        </div>
        <div style="padding:40px 32px;background:#f9f9ff;line-height:1.8;font-size:15px;">
          <p>We're really glad you reached out. Your brief has landed safely and we'll review everything carefully before getting back to you.</p>
          <p>Expect to hear from us <strong>within 48 hours</strong> — usually sooner. In the meantime, feel free to take a look at our latest work on <a href="https://vimeo.com/timotionstudio" style="color:#000021;">Vimeo</a> or follow along on <a href="https://instagram.com/timotion.mp4" style="color:#000021;">Instagram</a>.</p>
          <p>Here's a quick summary of what you sent us:</p>
          <div style="background:#fff;border:1px solid #e0e0f0;padding:20px 24px;margin:24px 0;border-radius:4px;font-size:14px;">
            <p style="margin:0 0 6px;"><strong>Service:</strong> ${escapeHtml(service) || "—"}</p>
            <p style="margin:0 0 6px;"><strong>Project types:</strong> ${safeProjectTypes}</p>
            <p style="margin:0 0 6px;"><strong>Date:</strong> ${escapeHtml(date) || "—"}</p>
            <p style="margin:0;"><strong>Budget:</strong> ${escapeHtml(budget) || "—"}</p>
          </div>
          <p style="margin-bottom:0;">Speak soon,<br/><strong>Timo &amp; the Timotion Studio team</strong></p>
        </div>
        <div style="background:#000021;padding:20px 32px;text-align:center;">
          <p style="color:#c8c8d8;margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Timotion Studio</p>
          <p style="color:#666;margin:0;font-size:11px;">hello@timotion.studio</p>
        </div>
      </div>
    `;

    const [notification, autoReply] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: email,
        subject: `New enquiry from ${name}`,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "We've received your enquiry — Timotion Studio",
        html: autoReplyHtml,
      }),
    ]);

    if (notification.error || autoReply.error) {
      console.error("Resend error:", JSON.stringify(notification.error ?? autoReply.error));
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API /send error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
