"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const projects = [
  {
    index: "01",
    category: "Fashion Film",
    name: "IBEROAFRICAN",
    slug: "iberoafrican",
    bg1: "#2d1b4e",
    bg2: "#000021",
  },
  {
    index: "02",
    category: "Wedding Film",
    name: "SUN WINE LAUGHTER",
    slug: "sun-wine-laughter",
    bg1: "#3d1a08",
    bg2: "#000021",
  },
  {
    index: "03",
    category: "Short Film",
    name: "THE GIFT",
    slug: "the-gift",
    bg1: "#0a2d1b",
    bg2: "#000021",
  },
  {
    index: "04",
    category: "Event Film",
    name: "THE KRAKEN",
    slug: "the-kraken",
    bg1: "#081a3d",
    bg2: "#000021",
  },
  {
    index: "05",
    category: "Event Photo",
    name: "POWER OF ONE TEAM",
    slug: "power-of-one-team",
    bg1: "#3d0820",
    bg2: "#000021",
  },
  {
    index: "06",
    category: "Fashion Photo",
    name: "CONCRETE DESERT",
    slug: "concrete-desert",
    bg1: "#2a1a08",
    bg2: "#000021",
  },
];

export default function ProjectsHover() {
  const [hovered, setHovered] = useState<number | null>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      smoothRef.current.x = lerp(smoothRef.current.x, cursorRef.current.x, 0.08);
      smoothRef.current.y = lerp(smoothRef.current.y, cursorRef.current.y, 0.08);

      if (floatingRef.current) {
        const x = smoothRef.current.x + 40;
        const y = smoothRef.current.y - 150;
        floatingRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const active = hovered !== null ? projects[hovered] : null;

  const rowContent = (p: (typeof projects)[number], i: number) => {
    const isActive = hovered === i;
    return (
      <div
        className="flex items-center justify-between py-7 border-t border-white/[0.08] cursor-pointer select-none"
        style={{ borderColor: isActive ? "rgba(255,123,172,0.25)" : undefined }}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Left: index + name */}
        <div className="flex items-baseline gap-6 md:gap-10">
          <span
            className="text-[10px] tracking-widest transition-colors duration-300 shrink-0"
            style={{ color: isActive ? "#ff7bac" : "rgba(255,255,255,0.18)" }}
          >
            {p.index}
          </span>
          <div>
            <span
              className="block text-[9px] tracking-widest uppercase mb-1.5 transition-colors duration-300"
              style={{ color: isActive ? "#d4a853" : "rgba(255,255,255,0.28)" }}
            >
              {p.category}
            </span>
            <h3
              className="font-[family-name:var(--font-playfair)] font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight leading-none"
              style={{
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                transform: isActive ? "translateX(10px)" : "translateX(0)",
                transition: "color 0.3s ease, transform 0.3s ease",
              }}
            >
              {p.name}
            </h3>
          </div>
        </div>

        {/* Right: action */}
        <span
          className="hidden md:block text-[9px] tracking-widest uppercase shrink-0 ml-4"
          style={{
            color: "#ff7bac",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          View Case Study →
        </span>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 px-6 bg-[#000021]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] tracking-widest uppercase text-white/50 text-center mb-3">
          Our Work
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#ff7bac] text-center mb-20 font-bold">
          Selected Projects
        </h2>

        <div>
          {projects.map((p, i) => (
            <Link key={i} href={`/projects/${p.slug}`} className="block">
              {rowContent(p, i)}
            </Link>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>

      {/* Floating video thumbnail — desktop only */}
      <div
        ref={floatingRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <div
          className="overflow-hidden"
          style={{
            width: "340px",
            aspectRatio: "16/9",
            opacity: hovered !== null ? 1 : 0,
            transform: hovered !== null ? "scale(1) rotate(-1deg)" : "scale(0.82) rotate(-1deg)",
            transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {active && (
            <div
              className="w-full h-full relative flex items-end p-4"
              style={{
                background: `linear-gradient(135deg, ${active.bg1} 0%, ${active.bg2} 100%)`,
              }}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.06) 3px, rgba(255,255,255,0.06) 4px)",
                }}
              />
              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,10,0.6) 100%)",
                }}
              />
              {/* Recording dot */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: "#ff7bac",
                    boxShadow: "0 0 6px #ff7bac",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span className="text-[8px] text-white/40 uppercase tracking-widest">
                  Preview
                </span>
              </div>
              {/* Project label */}
              <div className="relative z-10">
                <p className="text-[#d4a853] text-[8px] tracking-widest uppercase mb-1">
                  {active.category}
                </p>
                <p className="text-white font-[family-name:var(--font-playfair)] text-sm font-bold capitalize leading-tight">
                  {active.name.toLowerCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
