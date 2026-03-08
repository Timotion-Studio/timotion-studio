"use client";

import { useEffect, useRef } from "react";

export default function ParallaxImage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    let rafId: number;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      // normalised position: 0 = element centre at viewport centre
      // negative = element below centre, positive = element above centre
      const norm = 1 - (rect.top + rect.height / 2) / vh;

      // ── Parallax: image shifts up as you scroll down ──────────────────
      // range: –40px (element below vp) → +40px (element above vp)
      const imgShift = norm * 80;
      img.style.transform = `translateY(${imgShift}px)`;

      // ── Top-clip: shrink the frame from the top as it scrolls up ──────
      // Only clips once the element starts entering the upper half of vp
      const clipTop = Math.max(0, norm * 110);
      wrapper.style.clipPath = `inset(${clipTop}px 0px 0px 0px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative">
      {/* clip wrapper — overflow hidden keeps img scale contained */}
      <div
        ref={wrapperRef}
        style={{ overflow: "hidden", aspectRatio: "3/4", willChange: "clip-path" }}
      >
        {/* image is 115% tall so parallax shift never exposes a gap at bottom */}
        <img
          ref={imgRef}
          src="/timotion-picture.jpg"
          alt="Timo — Timotion Studio"
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            willChange: "transform",
          }}
        />
      </div>

      {/* decorative corner accent */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#ff7bac]/20 pointer-events-none" />
    </div>
  );
}
