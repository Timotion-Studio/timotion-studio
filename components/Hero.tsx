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
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#ff7bac] leading-[1.35] tracking-[0.06em] mb-12">
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ zIndex: 10 }}>
        <a
          href="#projects"
          className="text-white tracking-[0.3em] uppercase hover:text-[#ff7bac] transition-colors duration-300 cursor-pointer flex flex-row items-center gap-3"
          style={{ fontSize: "16px" }}
        >
          <span className="animate-scroll-text">Scroll Down</span>
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            className="animate-scroll-arrow"
          >
            <defs>
              <clipPath id="arrowClip">
                <rect x="0" y="0" width="10" height="0">
                  <animate
                    attributeName="height"
                    values="0;0;16;16;0"
                    keyTimes="0;0.08;0.45;0.75;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0 0 1 1; 0.4 0 0.2 1; 0 0 1 1; 0.4 0 0.2 1"
                  />
                </rect>
              </clipPath>
            </defs>
            <g clipPath="url(#arrowClip)">
              <line
                x1="5" y1="0" x2="5" y2="11"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <polyline
                points="1,7 5,13 9,7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>
        </a>
      </div>

      {/* ── Bottom fade — dissolves video into Projects section ── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "30%",
          background:
            "linear-gradient(to bottom, rgba(11,12,26,0) 0%, rgba(11,12,26,0.06) 20%, rgba(11,12,26,0.2) 40%, rgba(11,12,26,0.5) 60%, rgba(11,12,26,0.85) 80%, rgba(11,12,26,0.97) 92%, rgba(11,12,26,1) 100%)",
          zIndex: 5,
        }}
      />
    </section>
  );
}
