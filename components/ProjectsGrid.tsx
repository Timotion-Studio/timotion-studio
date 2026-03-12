"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const LEFT = [
  { slug: "iberoafrican",      title: "ibero\nafrican",      category: "FASHION | FILM",  src: "/iberoafrican-thumb.jpg",      w: 1080, h: 720  },
  { slug: "sun-wine-laughter", title: "sun wine\nlaughter",  category: "WEDDING | FILM",  src: "/sun-wine-laughter-thumb.jpg", w: 1920, h: 1080 },
  { slug: "power-of-one-team", title: "power of\none team", category: "EVENT | PHOTO",   src: "/power-of-one-team-thumb.jpg", w: 1200, h: 800  },
  { slug: "the-gift",          title: "the\ngift",           category: "SHORT | FILM",    src: "/the-gift-thumb.jpg",          w: 1920, h: 1080 },
];

const RIGHT = [
  { slug: "concrete-desert",   title: "concrete\ndesert",   category: "FASHION | PHOTO", src: "/concrete-desert-thumb.webp",  w: 900,  h: 1200 },
  { slug: "the-kraken",        title: "the\nkraken",        category: "EVENT | FILM",    src: "/kraken-thumb.jpg",            w: 1920, h: 1080 },
];

function Card({ slug, title, category, src, w, h }: {
  slug: string; title: string; category: string;
  src: string; w: number; h: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const txtRef     = useRef<HTMLDivElement>(null);
  const rafId      = useRef<number>(0);
  const cur        = useRef({ x: 0, y: 0 });
  const tgt        = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const loop = useCallback(() => {
    const c = cur.current;
    const t = tgt.current;
    c.x += (t.x - c.x) * 0.06;
    c.y += (t.y - c.y) * 0.06;

    if (imgRef.current) {
      imgRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
    }
    if (txtRef.current) {
      txtRef.current.style.transform = `translate3d(${-c.x * (20 / 35)}px, ${-c.y * (20 / 35)}px, 0)`;
    }

    if (Math.abs(t.x - c.x) > 0.05 || Math.abs(t.y - c.y) > 0.05) {
      rafId.current = requestAnimationFrame(loop);
    }
  }, []);

  const handleEnter = useCallback(() => {
    cur.current = { x: 0, y: 0 };
    tgt.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafId.current);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    tgt.current = { x: dx * 35, y: dy * 35 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(loop);
  }, [loop]);

  const handleLeave = useCallback(() => {
    tgt.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafId.current); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`parallax-card ${visible ? "card-visible" : "card-hidden"}`}
      style={{ position: "relative", overflow: "visible" }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Link wrapper — image, translates TOWARD cursor */}
      <Link href={`/projects/${slug}`}>
        <div
          ref={imgRef}
          className="parallax-img"
          style={{
            display: "block",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={src}
            alt={title}
            width={w}
            height={h}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </Link>

      {/* project-text — translates AWAY from cursor, floats left of card */}
      <div
        ref={txtRef}
        className="parallax-text"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: 0,
          marginLeft: "-4rem",
          pointerEvents: "none",
        }}
      >
        <p
          className="project-category-pill"
          style={{
            display: "inline-block",
            background: "#00ffff",
            color: "#0B0C1A",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            padding: "3px 10px 4px",
            whiteSpace: "nowrap",
            marginBottom: "0.5rem",
          }}
        >
          {category}
        </p>
        <h3
          className="font-[family-name:var(--font-playfair)]"
          style={{
            color: "#ff7bac",
            fontSize: "3.5rem",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <section
      id="projects"
      className="projects-grid-section"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        padding: "120px 8vw 100px 8vw",
        background: "#000021",
        scrollMarginTop: "80px",
      }}
    >
      <p className="text-sm tracking-[0.3em] uppercase text-white/60 text-center mb-3">
        Our Work
      </p>
      <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#ff7bac] text-center font-bold leading-[1.2] tracking-wide mb-16">
        Selected Projects
      </h2>
      <div className="projects-grid-outer" style={{ display: "flex", alignItems: "flex-start", gap: "6rem" }}>
        {/* Left column — 45% */}
        <div
          className="projects-grid-left"
          style={{
            width: "45%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: "5rem",
          }}
        >
          {LEFT.map((p) => <Card key={p.slug} {...p} />)}
        </div>

        {/* Right column — 55%, overflow visible so images are never clipped */}
        <div
          className="projects-grid-right"
          style={{
            width: "55%",
            flexShrink: 0,
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            gap: "5rem",
          }}
        >
          {RIGHT.map((p) => <Card key={p.slug} {...p} />)}
        </div>
      </div>
    </section>
  );
}
