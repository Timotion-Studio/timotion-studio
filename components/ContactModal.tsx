"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setSubmitted(false);
        setSubmitError(null);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, description: form.message, website: honeypotRef.current?.value, turnstileToken }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken('');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ animation: "modalBackdropIn 0.35s ease forwards" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#000021]/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-lg bg-[#00002e] border border-white/10 p-10"
        style={{ animation: "modalWarpIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-[#ff7bac] transition-colors text-2xl leading-none cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>

        <p className="text-sm tracking-[0.3em] uppercase text-white/60 mb-3">Get In Touch</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#ff7bac] mb-2 leading-[1.2] tracking-wide">
          Let&apos;s chat & give life some more magic
        </h2>
        <p className="text-[#c8c8d8]/60 text-sm mb-8">
          <a href="mailto:hello@timotion.studio" className="hover:text-[#ff7bac] transition-colors">
            hello@timotion.studio
          </a>
        </p>

        {submitted ? (
          <div className="py-10 text-center">
            <p className="font-[family-name:var(--font-playfair)] text-xl italic text-[#ff7bac]">
              Thank you — we&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
            <input
              type="text"
              placeholder="Name"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#000021] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-5 py-3.5 text-sm focus:outline-none focus:border-[#ff7bac] transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              required
              maxLength={254}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#000021] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-5 py-3.5 text-sm focus:outline-none focus:border-[#ff7bac] transition-colors"
            />
            <textarea
              placeholder="Message"
              required
              rows={5}
              maxLength={5000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#000021] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-5 py-3.5 text-sm focus:outline-none focus:border-[#ff7bac] transition-colors resize-none"
            />
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken('')}
              options={{ size: "invisible" }}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-4 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
            {submitError && (
              <p className="text-sm text-red-400 text-center">{submitError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
