"use client";

import { useRef, useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formLoadTime = useRef<number>(Date.now());

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, description: form.message, website: honeypotRef.current?.value, formLoadTime: formLoadTime.current }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#000021]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 mb-4">
          Get In Touch
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-[#ff7bac] mb-4 leading-[1.2] tracking-wide">
          Let&apos;s chat & give life some more magic
        </h2>
        <p className="text-[#c8c8d8]/60 text-base mb-14">
          <a
            href="mailto:hello@timotion.studio"
            className="hover:text-[#ff7bac] transition-colors duration-300 cursor-pointer"
          >
            hello@timotion.studio
          </a>
        </p>

        {submitted ? (
          <div className="py-16">
            <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#ff7bac]">
              Thank you — we&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#00002e] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-6 py-4 text-base focus:outline-none focus:border-[#ff7bac] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                maxLength={254}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#00002e] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-6 py-4 text-base focus:outline-none focus:border-[#ff7bac] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                placeholder="Message"
                required
                rows={6}
                maxLength={5000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#00002e] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-6 py-4 text-base focus:outline-none focus:border-[#ff7bac] transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-4 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
            {submitError && (
              <p className="text-sm text-red-400 text-center mt-3">{submitError}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
