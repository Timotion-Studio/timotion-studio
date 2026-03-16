"use client";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "We had the pleasure of working with Timo and his team when creating the music video for our recent single 'Obsessed'. His amazingly creative but also deadline-driven approach to the whole project meant we achieved an incredibly unique video on time and to an unbelievable standard!!!",
    client: "Pink Panda",
    role: "DJ Collective",
  },
  {
    quote:
      "Collaborating with Timo was super easy and the end result is amazing. Janey and Bee were super happy with the video for 'Turned Heads'. The combination of creativity, punctuality and communication is rare in our industry. We would definitely work with Timo again!",
    client: "Jerrald",
    role: "The Drag Agency",
  },
  {
    quote:
      "Timo has an incredible eye for detail and a real passion for storytelling. The photos from our shoot exceeded every expectation — we couldn't be happier with the result.",
    client: "Sarah M.",
    role: "Brand Client",
  },
  {
    quote:
      "Working with Timotion Studio was a seamless experience from start to finish. Professional, creative, and genuinely invested in capturing something special.",
    client: "Thomas & Elena",
    role: "Wedding Clients",
  },
];

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#ff7bac]/40 mb-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <section id="testimonials" className="py-24 bg-[#000021] scroll-mt-20 overflow-hidden">
      {/* Section header */}
      <div className="content-container mb-12">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Testimonials
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center font-bold leading-[1.2] tracking-wide">
          Kind Words
        </h2>
      </div>

      {/* Scroll track — bleeds edge to edge */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6"
        style={{
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2))",
          paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2))",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {testimonials.map((t) => (
          <div
            key={t.client}
            className="snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] xl:w-[30vw] bg-[#00002e] border border-white/5 p-10 flex flex-col justify-between"
            style={{ minHeight: "320px" }}
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

      {/* Hide scrollbar in WebKit */}
      <style>{`
        #testimonials .snap-x::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
