"use client";
import { useEffect, useRef, useState, useCallback } from "react";

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

const TOTAL = testimonials.length;
const WHEEL_THRESHOLD = 80; // deltaY needed to advance one card

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#ff7bac]/40 mb-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Single source of truth — refs only, no stale closures
  const lockedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const seenCardsRef = useRef(new Set<number>());
  const cycleCompleteRef = useRef(false);
  const wheelAccumRef = useRef(0);

  // React state only for rendering
  const [activeIndex, setActiveIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scrollTrackToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 24;
    track.scrollTo({ left: card.offsetLeft - paddingLeft, behavior: "smooth" });
  }, []);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    lockedRef.current = true;
    setLocked(true);
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    lockedRef.current = false;
    setLocked(false);
  }, []);

  const resetState = useCallback(() => {
    activeIndexRef.current = 0;
    seenCardsRef.current = new Set();
    cycleCompleteRef.current = false;
    wheelAccumRef.current = 0;
    setActiveIndex(0);
    scrollTrackToIndex(0);
  }, [scrollTrackToIndex]);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    // Lock when section enters viewport
    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetState();
          lockScroll();
        } else {
          unlockScroll();
        }
      },
      { threshold: 0.6 }
    );
    enterObserver.observe(section);

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      wheelAccumRef.current += e.deltaY;

      // Not enough scroll yet
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const direction = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0; // reset accumulator after each step

      const current = activeIndexRef.current;

      if (direction > 0) {
        // Scrolling forward
        const next = (current + 1) % TOTAL;

        // Mark current card as seen
        seenCardsRef.current.add(current);

        // If we're about to loop back to 0 and all cards have been seen — unlock
        if (next === 0 && seenCardsRef.current.size === TOTAL) {
          cycleCompleteRef.current = true;
          // Show card 0 briefly then unlock
          activeIndexRef.current = 0;
          setActiveIndex(0);
          scrollTrackToIndex(0);
          setTimeout(() => {
            unlockScroll();
            window.scrollBy({ top: 80, behavior: "smooth" });
          }, 500);
          return;
        }

        activeIndexRef.current = next;
        setActiveIndex(next);
        scrollTrackToIndex(next);
        seenCardsRef.current.add(next);

      } else {
        // Scrolling backward — go to previous card, min 0
        const prev = Math.max(current - 1, 0);
        activeIndexRef.current = prev;
        setActiveIndex(prev);
        scrollTrackToIndex(prev);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      enterObserver.disconnect();
      window.removeEventListener("wheel", onWheel);
      unlockScroll();
    };
  }, [isMobile, lockScroll, unlockScroll, resetState, scrollTrackToIndex]);

  // ── Mobile drag handlers ──
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    dragScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.2;
  };
  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-[#000021] scroll-mt-20 overflow-hidden"
    >
      {/* Header */}
      <div className="content-container mb-12">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Testimonials
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center font-bold leading-[1.2] tracking-wide">
          Kind Words
        </h2>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2))",
          paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2))",
          cursor: "grab",
          pointerEvents: locked ? "none" : "auto",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.client}
            className={`shrink-0 w-[85vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] xl:w-[30vw] bg-[#00002e] border flex flex-col justify-between p-10 transition-all duration-500 ${
              i === activeIndex
                ? "border-[#ff7bac]/30 opacity-100 scale-[1.01]"
                : "border-white/5 opacity-40"
            }`}
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

      {/* Progress dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? "w-6 h-1.5 bg-[#ff7bac]"
                : seenCardsRef.current.has(i)
                ? "w-1.5 h-1.5 bg-[#ff7bac]/40"
                : "w-1.5 h-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      {locked && (
        <p className="text-center text-white/30 text-xs tracking-widest uppercase mt-6 animate-pulse">
          Scroll to continue
        </p>
      )}

      <style>{`
        #testimonials div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
