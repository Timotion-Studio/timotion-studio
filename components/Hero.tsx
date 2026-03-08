export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
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
      <div className="relative max-w-5xl mx-auto" style={{ zIndex: 4 }}>
        <p className="text-[#d4a853] text-[10px] tracking-[0.5em] uppercase mb-10 font-light">
          emotion &nbsp;&nbsp;|&nbsp;&nbsp; magic &nbsp;&nbsp;|&nbsp;&nbsp; art
        </p>

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#ff7bac] leading-[1.1] mb-12">
          Picture-Perfect Moments: Exceptional Photography & Cinematic Films
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-10 py-4 border border-[#ff7bac]/70 text-[#ff7bac] text-[10px] tracking-[0.3em] uppercase hover:bg-[#ff7bac] hover:text-[#000021] hover:border-[#ff7bac] transition-all duration-300 cursor-pointer"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-10 py-4 bg-[#ff7bac] text-[#000021] text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#ff60a0] transition-all duration-300 cursor-pointer"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ zIndex: 4 }}>
        <a
          href="#projects"
          className="text-white/50 text-[10px] tracking-[0.3em] uppercase hover:text-[#ff7bac] transition-colors duration-300 cursor-pointer"
        >
          Scroll Down ↓
        </a>
      </div>
    </section>
  );
}
