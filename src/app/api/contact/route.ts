/**
 * POST /api/contact — "checkout coming soon" enquiries from the cart drawer.
 *
 * Sends the enquiry by email through Resend (https://resend.com) when
 * RESEND_API_KEY and CONTACT_FROM_EMAIL are set. Without them it answers 503
 * with `fallback: "mailto"`, and the browser opens the visitor's email app
 * with the same message addressed to CONTACT_TO_EMAIL instead.
 */

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@colourpig.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MAX_ORDER = 2000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, message, order, website } = body;

  // Hidden field real visitors never fill in; bots usually do. Pretend it worked.
  if (typeof website === "string" && website.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof email !== "string" || email.length > MAX_EMAIL || !EMAIL.test(email.trim())) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message !== undefined && (typeof message !== "string" || message.length > MAX_MESSAGE)) {
    return Response.json({ error: "Your message is too long." }, { status: 400 });
  }
  if (order !== undefined && (typeof order !== "string" || order.length > MAX_ORDER)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
    return Response.json({ error: "Email sending is not set up.", fallback: "mailto", to: CONTACT_TO_EMAIL }, { status: 503 });
  }

  const from = email.trim();
  const text = [
    `From: ${from}`,
    "",
    "Message:",
    (message as string | undefined)?.trim() || "(none)",
    "",
    "In their bag:",
    (order as string | undefined)?.trim() || "(empty)",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: from,
        subject: `Checkout enquiry from ${from}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend rejected the email.", res.status, await res.text());
      return Response.json({ error: "We couldn't send your message. Please try again." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Sending failed.", error);
    return Response.json({ error: "We couldn't send your message. Please try again." }, { status: 502 });
  }
}
