"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

/** Where enquiries go (also shown to the visitor) */
const CONTACT_EMAIL = "hello@colourpig.com";

type Status = "idle" | "sending" | "sent" | "opened-mail-app" | "error";

/**
 * Shown in the cart drawer in place of the Checkout button while online
 * checkout isn't open yet: a short note, the contact email, and a small form
 * that sends the visitor's email, an optional message and their bag to
 * CONTACT_EMAIL (via /api/contact, or their own email app if sending isn't set up).
 */
export function CheckoutComingSoon({ orderSummary, onContinue }: { orderSummary: string; onContinue: () => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // spam trap, hidden from people
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const openMailApp = () => {
    const subject = `Checkout enquiry from ${email.trim()}`;
    const body = [message.trim(), "", "In my bag:", orderSummary].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, order: orderSummary, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fallback?: string };
      if (res.ok) {
        setStatus("sent");
      } else if (data.fallback === "mailto") {
        openMailApp();
        setStatus("opened-mail-app");
      } else {
        setError(data.error ?? "We couldn't send your message. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("We couldn't send your message. Please try again.");
      setStatus("error");
    }
  };

  const done = status === "sent" || status === "opened-mail-app";

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest font-bold text-obsidian">Checkout coming soon</p>
        <p className="mt-1 text-[11px] font-mono text-obsidian/80 leading-relaxed">
          Online checkout opens shortly. Leave your email and we&apos;ll be in touch about your order, or write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:text-black">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      {done ? (
        <div className="flex items-start gap-2 rounded-xl border border-ash/30 bg-platinum/30 p-3 text-[11px] font-mono text-obsidian">
          <Check className="w-4 h-4 shrink-0 mt-px" />
          <span>
            {status === "sent"
              ? "Thanks, we've got your message and will be in touch soon."
              : `Your email app should open with your message to ${CONTACT_EMAIL}. Press send there to finish.`}
          </span>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-2" noValidate={false}>
          <label className="sr-only" htmlFor="coming-soon-email">Your email</label>
          <input
            id="coming-soon-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-ash/40 bg-white px-3.5 py-2.5 text-xs font-mono text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-obsidian"
          />
          <label className="sr-only" htmlFor="coming-soon-message">Message (optional)</label>
          <textarea
            id="coming-soon-message"
            rows={2}
            maxLength={2000}
            placeholder="Anything you'd like us to know (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border border-ash/40 bg-white px-3.5 py-2.5 text-xs font-mono text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-obsidian"
          />
          {/* Spam trap: invisible to people, so only bots fill it in */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          {error && <p className="text-[11px] font-mono text-rose-700">{error}</p>}

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onContinue}
              className="w-full py-3.5 px-3 rounded-xl border border-ash/30 bg-platinum/30 hover:bg-platinum/60 text-obsidian text-[11px] font-mono font-bold tracking-widest uppercase flex items-center justify-center transition-colors"
            >
              CONTINUE
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3.5 px-3 rounded-xl bg-obsidian hover:bg-black text-white text-[11px] font-mono font-bold tracking-widest uppercase flex items-center justify-center shadow-md transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait"
            >
              {status === "sending" ? "SENDING…" : "SEND"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CheckoutComingSoon;
