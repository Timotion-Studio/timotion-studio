"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = ["Projects", "Services", "Testimonials", "Qualify"] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > lastY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#000021] shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "bg-transparent"
      }`}
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/timotion-logo.png"
            alt="Timotion Studio"
            style={{ maxHeight: "48px", width: "auto" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 text-[10px] tracking-widest uppercase hover:text-[#ff7bac] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <Link
            href="/contact"
            className="text-white/70 text-[10px] tracking-widest uppercase hover:text-[#ff7bac] transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#000021] border-t border-[#f0f0f0]/10 px-6 py-6 flex flex-col gap-6">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 text-xs tracking-widest uppercase hover:text-[#ff7bac] transition-colors"
            >
              {item}
            </a>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-xs tracking-widest uppercase hover:text-[#ff7bac] transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
