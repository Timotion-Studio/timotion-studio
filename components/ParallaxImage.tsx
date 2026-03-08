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

      // progress: starts when element is 10% into the viewport from the bottom
      const triggerPoint = vh * 0.9; // 90% down the viewport = 10% in
      const entered = (triggerPoint - rect.top) / (triggerPoint + rect.height);
      const progress = Math.max(0, Math.min(1, entered));

      // ── Shutter: open from centre outward ─────────────────────────────
      // Both top and bottom clip start at 50% (fully closed) → 0% (fully open)
      // Use an eased curve so the opening feels snappy
      const eased = 1 - Math.pow(1 - progress, 2); // ease-out quad
      const clip = (1 - eased) * 50; // 50% → 0%
      wrapper.style.clipPath = `inset(${clip}% 0 ${clip}% 0)`;

      // ── Subtle parallax on the image inside ───────────────────────────
      const norm = (rect.top + rect.height / 2) / vh - 0.5; // –0.5 → +0.5
      img.style.transform = `translateY(${norm * 40}px) scale(1.08)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapperRef}
        style={{
          overflow: "hidden",
          aspectRatio: "3/4",
          willChange: "clip-path",
        }}
      >
        <img
          ref={imgRef}
          src="/timotion-picture.jpg"
          alt="Timo — Timotion Studio"
          style={{
            width: "100%",
            height: "115%",
            marginTop: "-7.5%",
            objectFit: "cover",
            objectPosition: "center",
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
