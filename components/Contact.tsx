"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    );
    window.location.href = `mailto:hello@timotion.studio?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#000021]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[10px] tracking-widest uppercase text-white/50 mb-4">
          Get In Touch
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#ff7bac] mb-4 leading-tight">
          Let&apos;s chat & give life some more magic
        </h2>
        <p className="text-[#c8c8d8]/60 text-sm mb-14">
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
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#00002e] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-6 py-4 text-sm focus:outline-none focus:border-[#ff7bac] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#00002e] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-6 py-4 text-sm focus:outline-none focus:border-[#ff7bac] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                placeholder="Message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#00002e] border border-[#f0f0f0]/10 text-[#f0f0f0] placeholder-[#f0f0f0]/25 px-6 py-4 text-sm focus:outline-none focus:border-[#ff7bac] transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#d4a853] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#c49843] transition-colors duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
