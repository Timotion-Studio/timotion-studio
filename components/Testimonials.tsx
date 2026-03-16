"use client";
import { useEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    quote: "We had the pleasure of working with Timo and his team when creating the music video for our recent single 'Obsessed'. His amazingly creative but also deadline-driven approach to the whole project meant we achieved an incredibly unique video on time and to an unbelievable standard!!!",
    client: "Pink Panda",
    role: "DJ Collective",
  },
  {
    quote: "Collaborating with Timo was super easy and the end result is amazing. Janey and Bee were super happy with the video for 'Turned Heads'. The combination of creativity, punctuality and communication is rare in our industry. We would definitely work with Timo again!",
    client: "Jerrald",
    role: "The Drag Agency",
  },
  {
    quote: "Timo has an incredible eye for detail and a real passion for storytelling. The photos from our shoot exceeded every expectation — we couldn't be happier with the result.",
    client: "Sarah M.",
    role: "Brand Client",
  },
  {
    quote: "Working with Timotion Studio was a seamless experience from start to finish. Professional, creative, and genuinely invested in capturing something special.",
    client: "Thomas & Elena",
    role: "Wedding Clients",
  },
];

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#ff7bac]/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function Testimonials() {
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

  // Dot click — scroll card into view
  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-[#000021] scroll-mt-20">
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
              key={t.client}
              ref={(el) => setCardRef(el, i)}
              className="opacity-0 bg-[#00002e] border border-white/5 p-10 flex flex-col justify-between"
              style={{ minHeight: "280px" }}
            >
              <div>
                <QuoteIcon />
                <blockquote className="font-[family-name:var(--font-playfair)] text-xl italic text-white leading-relaxed">
                  {t.quote}
                </blockquote>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-[#ff7bac] text-xs tracking-widest uppercase font-semibold">
                  {t.client}
                </p>
                <p className="text-white/60 text-xs tracking-widest uppercase mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigator */}
      <div className="flex justify-center gap-3 mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="w-1.5 h-1.5 bg-white/20 hover:bg-[#ff7bac]/60 rounded-full transition-colors duration-300 cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
}
