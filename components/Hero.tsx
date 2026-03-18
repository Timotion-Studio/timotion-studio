"use client";

import { useRef, useEffect, useCallback } from "react";

export default function Hero({ posterUrl, videoUrl }: { posterUrl?: string; videoUrl?: string }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const rafId       = useRef<number>(0);
  const cur         = useRef({ x: 0, y: 0 });
  const tgt         = useRef({ x: 0, y: 0 });

  const loop = useCallback(() => {
    const c = cur.current;
    const t = tgt.current;
    c.x += (t.x - c.x) * 0.2;
    c.y += (t.y - c.y) * 0.2;

    if (headlineRef.current) {
      headlineRef.current.style.transform = `translate3d(${-c.x}px, ${-c.y}px, 0)`;
    }
    if (ctaRef.current) {
      ctaRef.current.style.transform = `translate3d(${-c.x * 0.5}px, ${-c.y * 0.5}px, 0)`;
    }

    if (Math.abs(t.x - c.x) > 0.05 || Math.abs(t.y - c.y) > 0.05) {
      rafId.current = requestAnimationFrame(loop);
    }
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = contentRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    tgt.current = { x: dx * 65, y: dy * 65 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(loop);
  }, [loop]);

  const handleLeave = useCallback(() => {
    tgt.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#000021]"
    >

      {/* ── Background video ── */}
      <video
        ref={bgRef}
        autoPlay
        muted
        loop
        playsInline
        poster={posterUrl ?? "/hero-loop.jpg"}
        className="hero-bg absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={videoUrl ?? "/hero-loop.mp4"} type="video/mp4" />
      </video>

      {/* ── Overlays ── */}
      {/* Base dark tint */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,33,0.55)",
          zIndex: 1,
        }}
      />
      {/* Gradient: heavy top (nav clearance) + heavy bottom (scroll indicator) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,33,0.7) 0%, rgba(0,0,33,0.15) 35%, rgba(0,0,33,0.15) 65%, rgba(0,0,33,0.85) 100%)",
          zIndex: 2,
        }}
      />
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          zIndex: 3,
        }}
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative max-w-5xl mx-auto"
        style={{ zIndex: 4 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <h1
          ref={headlineRef}
          className="hero-text font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#ff7bac] leading-[1.35] tracking-[0.06em] mb-12"
        >
          Every story deserves to be felt, not just seen.
        </h1>

        <div ref={ctaRef} className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-10 py-4 border border-[#ff7bac]/70 text-[#ff7bac] text-[10px] tracking-[0.3em] uppercase hover:bg-[#ff7bac] hover:text-[#000021] hover:border-[#ff7bac] transition-all duration-300 cursor-pointer"
          >
            View Work
          </a>
          <a
            href="/contact"
            className="px-10 py-4 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-all duration-300 cursor-pointer"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <a
        href="#projects"
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ zIndex: 10, bottom: "80px" }}
      >
        <div className="scroll-wrapper">
          <div className="scroll-line" />
          <div className="scroll-text">SCROLL<br/>DOWN</div>
        </div>
      </a>

      {/* ── Bottom fade — dissolves video into Projects section ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "30%",
          background:
            "linear-gradient(to bottom, rgba(0,0,33,0) 0%, rgba(0,0,33,0.06) 20%, rgba(0,0,33,0.2) 40%, rgba(0,0,33,0.5) 60%, rgba(0,0,33,0.85) 80%, rgba(0,0,33,0.97) 92%, rgba(0,0,33,1) 100%)",
          zIndex: 5,
        }}
      />
    </section>
  );
}
