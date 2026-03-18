"use client";
import { useEffect, useRef, useCallback } from "react";
import type { SanityTestimonial } from "@/sanity/types";

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#ff7bac]/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function Testimonials({ testimonials }: { testimonials: SanityTestimonial[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  // Fade-in-on-scroll via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("testimonial-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="pt-24 pb-18 bg-[#000021] scroll-mt-20">
      {/* Header */}
      <div className="content-container mb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Testimonials
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center font-bold leading-[1.2] tracking-wide">
          Kind Words
        </h2>
      </div>

      {/* 2-column grid */}
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t._id}
              ref={(el) => setCardRef(el, i)}
              className="border-t border-white/10 pt-12 px-10 pb-10 flex flex-col justify-between"
              style={{ minHeight: "280px", opacity: 0, transform: "translateY(20px)" }}
            >
              <div>
                <QuoteIcon />
                <blockquote className="font-[family-name:var(--font-playfair)] text-lg italic text-white/90 leading-[1.8]">
                  {t.quote}
                </blockquote>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-[#ff7bac] text-sm tracking-widest uppercase font-semibold">
                  {t.clientName}
                </p>
                <p className="text-white/60 text-xs tracking-widest uppercase mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
