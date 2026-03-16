"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "./ContactModal";

const links = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Qualify", href: "/#qualify" },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
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
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        !hidden && scrolled
          ? "bg-[#000021] shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/timotion-logo.png"
            alt="Timotion Studio"
            height={48}
            width={160}
            style={{ height: "48px", width: "auto" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link-cyan text-sm tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000021]"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setContactOpen(true)}
            className="nav-link-cyan text-sm tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000021] cursor-pointer"
          >
            Contact
          </button>
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
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="nav-link-cyan text-xs tracking-widest uppercase"
            >
              {item.label}
            </Link>
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
    <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
