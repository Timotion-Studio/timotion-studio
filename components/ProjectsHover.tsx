"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const POPUP_W = 280;
const POPUP_H = 160;
const OFFSET = 20;

const projects = [
  {
    index: "01",
    category: "Fashion Film",
    name: "IBEROAFRICAN",
    slug: "iberoafrican",
    vimeoId: "866267301",
    bg1: "#2d1b4e",
    bg2: "#000021",
  },
  {
    index: "02",
    category: "Wedding Film",
    name: "SUN WINE LAUGHTER",
    slug: "sun-wine-laughter",
    vimeoId: "997674576",
    bg1: "#3d1a08",
    bg2: "#000021",
  },
  {
    index: "03",
    category: "Short Film",
    name: "THE GIFT",
    slug: "the-gift",
    vimeoId: "826875302",
    bg1: "#0a2d1b",
    bg2: "#000021",
  },
  {
    index: "04",
    category: "Event Film",
    name: "THE KRAKEN",
    slug: "the-kraken",
    vimeoId: "856809196",
    bg1: "#081a3d",
    bg2: "#000021",
  },
  {
    index: "05",
    category: "Event Photography",
    name: "POWER OF ONE TEAM",
    slug: "power-of-one-team",
    vimeoId: null,
    bg1: "#3d0820",
    bg2: "#000021",
  },
  {
    index: "06",
    category: "Fashion Photography",
    name: "CONCRETE DESERT",
    slug: "concrete-desert",
    vimeoId: null,
    bg1: "#2a1a08",
    bg2: "#000021",
  },
];

function calcPos(cx: number, cy: number): { x: number; y: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let x = cx + OFFSET;
  let y = cy - POPUP_H - OFFSET;

  if (x + POPUP_W > vw - 16) x = cx - POPUP_W - OFFSET;
  if (y < 16) y = cy + OFFSET;
  if (y + POPUP_H > vh - 16) y = vh - POPUP_H - 16;

  return { x, y };
}

export default function ProjectsHover() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((i: number, e: React.MouseEvent) => {
    setHovered(i);
    setVisible(true);
    setPopupPos(calcPos(e.clientX, e.clientY));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setPopupPos(calcPos(e.clientX, e.clientY));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
    setHovered(null);
  }, []);

  const active = hovered !== null ? projects[hovered] : null;

  return (
    <section id="projects" className="pt-40 pb-24 bg-[#0B0C1A]" style={{ marginTop: 0 }}>
      <div className="content-container">
        <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
          Our Work
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl text-[#ff7bac] text-center mb-20 font-bold leading-[1.2] tracking-wide">
          Selected Projects
        </h2>

        <div>
          {projects.map((p, i) => {
            const isActive = hovered === i;
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="block">
                <div
                  className="flex items-center justify-between py-7 border-t border-white/[0.08] cursor-pointer select-none"
                  style={{
                    borderColor: isActive ? "rgba(255,123,172,0.25)" : undefined,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(i, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Left: index + name */}
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span
                      className="text-[10px] transition-colors duration-300 shrink-0"
                      style={{
                        letterSpacing: "0.2em",
                        color: isActive ? "#ff7bac" : "rgba(255,255,255,0.18)",
                      }}
                    >
                      {p.index}
                    </span>
                    <div>
                      <span
                        className="block text-[11px] uppercase mb-1.5 transition-colors duration-300"
                        style={{
                          letterSpacing: "0.2em",
                          color: isActive
                            ? "#ff7bac"
                            : "rgba(255,255,255,0.50)",
                        }}
                      >
                        {p.category}
                      </span>
                      <h3
                        className={`project-title font-[family-name:var(--font-playfair)] font-bold text-2xl sm:text-4xl md:text-5xl leading-none${isActive ? " active" : ""}`}
                        style={{
                          letterSpacing: "0.08em",
                          transform: isActive
                            ? "translateX(10px)"
                            : "translateX(0)",
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
                      transform: isActive
                        ? "translateX(0)"
                        : "translateX(-8px)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    View Case Study →
                  </span>
                </div>
              </Link>
            );
          })}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>

      {/* ── Floating video popup — desktop only ── */}
      <div
        className="hidden md:block fixed pointer-events-none z-[9999]"
        style={{
          left: popupPos.x,
          top: popupPos.y,
          width: POPUP_W,
          height: POPUP_H,
          opacity: visible && active ? 1 : 0,
          transition: "opacity 0.15s ease",
          background: "#0B0C1A",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.75), 0 2px 8px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        {active?.vimeoId ? (
          <iframe
            key={active.vimeoId}
            src={`https://player.vimeo.com/video/${active.vimeoId}?autoplay=1&muted=1&controls=0&loop=1&background=1`}
            allow="autoplay"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        ) : active ? (
          <div
            className="w-full h-full flex items-end p-3"
            style={{
              background: `linear-gradient(135deg, ${active.bg1} 0%, ${active.bg2} 100%)`,
            }}
          >
            <div>
              <p
                className="text-[#ff7bac] text-[8px] uppercase mb-0.5"
                style={{ letterSpacing: "0.2em" }}
              >
                {active.category}
              </p>
              <p className="text-white font-[family-name:var(--font-playfair)] text-xs font-bold capitalize">
                {active.name.toLowerCase()}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
