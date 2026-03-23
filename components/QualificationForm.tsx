"use client";

import { useRef, useState, useEffect } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const TOTAL_STEPS = 4;

interface FormData {
  // Step 1
  name: string;
  email: string;
  clientType: string;
  // Step 2
  service: string;
  projectTypes: string[];
  // Step 3
  date: string;
  location: string;
  description: string;
  // Step 4
  budget: string;
  urgency: string;
  referral: string;
}

const initialData: FormData = {
  name: "",
  email: "",
  clientType: "",
  service: "",
  projectTypes: [],
  date: "",
  location: "",
  description: "",
  budget: "",
  urgency: "",
  referral: "",
};

// Reusable card option
function OptionCard({
  label,
  sublabel,
  selected,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 border transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? "rgba(255,123,172,0.08)" : "rgba(255,255,255,0.02)",
        borderColor: selected ? "#ff7bac" : "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-xl font-medium">{label}</p>
          {sublabel && <p className="text-[#c8c8d8]/60 text-sm mt-0.5">{sublabel}</p>}
        </div>
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 transition-all duration-200"
          style={{
            borderColor: selected ? "#ff7bac" : "rgba(255,255,255,0.25)",
            background: selected ? "#ff7bac" : "transparent",
          }}
        >
          {selected && (
            <svg className="w-2 h-2 text-[#000021]" fill="currentColor" viewBox="0 0 8 8">
              <path d="M6.6 1.4L3 5 1.4 3.4.3 4.5 3 7.2 7.7 2.5z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

// Reusable multi-select pill
function PillOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 border text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? "rgba(255,123,172,0.12)" : "transparent",
        borderColor: selected ? "#ff7bac" : "rgba(255,255,255,0.15)",
        color: selected ? "#ff7bac" : "rgba(255,255,255,0.55)",
      }}
    >
      {label}
    </button>
  );
}

// Field wrapper
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm tracking-widest uppercase text-white/50 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#00002e] border border-white/10 text-white placeholder-white/20 px-5 py-3.5 text-base focus:outline-none focus:border-[#ff7bac] transition-colors duration-300";

export default function QualificationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [formToken, setFormToken] = useState<string>('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  useEffect(() => {
    fetch('/api/token').then(r => r.json()).then(d => setFormToken(d.token));
  }, []);

  const goTo = (next: number) => {
    setAnimKey((k) => k + 1);
    setStep(next);
    window.scrollTo({ top: document.getElementById("qualify")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const toggleProjectType = (val: string) => {
    setData((d) => ({
      ...d,
      projectTypes: d.projectTypes.includes(val)
        ? d.projectTypes.filter((v) => v !== val)
        : [...d.projectTypes, val],
    }));
  };

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypotRef.current?.value, token: formToken, turnstileToken }),
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

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const stepLabels = ["You", "Project", "Details", "Budget"];

  return (
    <section id="qualify" className="py-24 bg-[#00002e] scroll-mt-20">
      <div className="content-container">
        {/* Header */}
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Start Your Project
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center mb-4 font-bold leading-[1.2] tracking-wide">
          Let&apos;s See If We&apos;re The Right Fit
        </h2>
        <p className="text-[#c8c8d8] text-base text-center mb-14 leading-relaxed">
          A few quick questions to understand your vision and make sure we can deliver something you&apos;ll love.
        </p>

        {submitted ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(255,123,172,0.15)", border: "1px solid rgba(255,123,172,0.4)" }}
            >
              <svg className="w-7 h-7 text-[#ff7bac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white font-bold mb-3">
              Thank you, {data.name.split(" ")[0]}.
            </h3>
            <p className="text-[#c8c8d8] text-base">
              We&apos;ll review your brief and be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-3">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-400"
                      style={{
                        background:
                          i + 1 < step
                            ? "#00ffff"
                            : i + 1 === step
                            ? "rgba(0,255,255,0.18)"
                            : "rgba(255,255,255,0.05)",
                        border: `1px solid ${
                          i + 1 <= step ? "#00ffff" : "rgba(255,255,255,0.12)"
                        }`,
                        color: i + 1 <= step ? (i + 1 < step ? "#000021" : "#00ffff") : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {i + 1 < step ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.6 1.4L3 5 1.4 3.4.3 4.5 3 7.2 7.7 2.5z" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className="text-sm tracking-widest uppercase hidden sm:block"
                      style={{ color: i + 1 === step ? "#00ffff" : "rgba(255,255,255,0.55)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              {/* Track */}
              <div className="relative h-px bg-white/8 mt-2">
                <div
                  className="absolute top-0 left-0 h-full bg-[#00ffff] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

            {/* Steps */}
            <div key={animKey} className="animate-fade-in-up">
              {/* ── Step 1: About You ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white font-bold mb-6 leading-[1.2] tracking-wide">
                    Tell us about yourself
                  </h3>

                  <Field label="Full Name">
                    <input
                      type="text"
                      placeholder="Your name"
                      maxLength={100}
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      maxLength={254}
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className={inputCls}
                    />
                  </Field>

                  <Field label="I am a…">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: "individual", label: "Individual", sub: "Personal project or event" },
                        { val: "brand", label: "Brand", sub: "Company or product" },
                        { val: "agency", label: "Agency", sub: "Representing a client" },
                        { val: "production", label: "Production Co.", sub: "Film or media company" },
                      ].map((o) => (
                        <OptionCard
                          key={o.val}
                          label={o.label}
                          sublabel={o.sub}
                          selected={data.clientType === o.val}
                          onClick={() => setData({ ...data, clientType: o.val })}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {/* ── Step 2: Project Type ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white font-bold mb-6 leading-[1.2] tracking-wide">
                    What are you looking for?
                  </h3>

                  <Field label="Service">
                    <div className="grid grid-cols-3 gap-3">
                      {["Photography", "Videography", "Both"].map((o) => (
                        <OptionCard
                          key={o}
                          label={o}
                          selected={data.service === o}
                          onClick={() => setData({ ...data, service: o })}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field label="Project Category — select all that apply">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Brand Photos",
                        "Event Photos",
                        "Commercial Photos",
                        "Brand Video",
                        "Commercial",
                        "Event Videography",
                        "Other",
                      ].map((t) => (
                        <PillOption
                          key={t}
                          label={t}
                          selected={data.projectTypes.includes(t)}
                          onClick={() => toggleProjectType(t)}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {/* ── Step 3: Project Details ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white font-bold mb-6 leading-[1.2] tracking-wide">
                    Tell us about the project
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Estimated Date">
                      <input
                        type="text"
                        placeholder="e.g. June 2025 or TBD"
                        maxLength={200}
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Location">
                      <input
                        type="text"
                        placeholder="City or venue"
                        maxLength={200}
                        value={data.location}
                        onChange={(e) => setData({ ...data, location: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="Project Description">
                    <textarea
                      placeholder="Tell us what you have in mind — the more detail the better."
                      rows={5}
                      maxLength={5000}
                      value={data.description}
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                </div>
              )}

              {/* ── Step 4: Budget & Wrap-up ── */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white font-bold mb-6 leading-[1.2] tracking-wide">
                    Investment & timeline
                  </h3>

                  <Field label="Estimated Budget">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: "under-1k", label: "Under £1,000", sub: "Compact scope" },
                        { val: "1k-3k", label: "£1,000 – £3,000", sub: "Standard project" },
                        { val: "3k-5k", label: "£3,000 – £5,000", sub: "Extended / complex" },
                        { val: "5k-10k", label: "£5,000 – £10,000", sub: "Multi-day or campaign" },
                        { val: "10k+", label: "£10,000+", sub: "Full production" },
                        { val: "unsure", label: "Not sure yet", sub: "Open to a quote" },
                      ].map((o) => (
                        <OptionCard
                          key={o.val}
                          label={o.label}
                          sublabel={o.sub}
                          selected={data.budget === o.val}
                          onClick={() => setData({ ...data, budget: o.val })}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field label="How soon do you need this?">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: "asap", label: "ASAP", sub: "Within 4 weeks" },
                        { val: "1-3m", label: "1 – 3 months", sub: "Moderate lead time" },
                        { val: "3-6m", label: "3 – 6 months", sub: "Planning ahead" },
                        { val: "6m+", label: "6 months+", sub: "Early stage planning" },
                      ].map((o) => (
                        <OptionCard
                          key={o.val}
                          label={o.label}
                          sublabel={o.sub}
                          selected={data.urgency === o.val}
                          onClick={() => setData({ ...data, urgency: o.val })}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field label="How did you find us?">
                    <div className="flex flex-wrap gap-2">
                      {["Instagram", "Vimeo", "Google", "Referral", "Other"].map((r) => (
                        <PillOption
                          key={r}
                          label={r}
                          selected={data.referral === r}
                          onClick={() => setData({ ...data, referral: r })}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              )}
            </div>

            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken('')}
              options={{ size: "invisible" }}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  disabled={
                    (step === 1 && (!data.name || !data.email || !data.clientType)) ||
                    (step === 2 && (!data.service || data.projectTypes.length === 0)) ||
                    (step === 3 && !data.description)
                  }
                  className="px-10 py-3.5 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!data.budget || !data.urgency || submitting}
                  className="px-10 py-3.5 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : "Submit Brief →"}
                </button>
              )}
            </div>

            {/* Error message */}
            {submitError && (
              <p className="text-center text-sm text-red-400 mt-4">
                {submitError}
              </p>
            )}

            {/* Step counter */}
            <p className="text-center text-xs tracking-widest uppercase text-white/20 mt-5">
              Step {step} of {TOTAL_STEPS}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
