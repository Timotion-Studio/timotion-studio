"use client";

import { useState, useRef, useEffect } from "react";

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/hnny-i-let-go.mp3");
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      if (scrollY < heroHeight * 0.6) {
        setScrollOpacity(1);
      } else {
        setScrollOpacity(0.5);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      aria-label={isPlaying ? "Pause music" : "Play music"}
      onClick={toggle}
      style={{ position: "fixed", bottom: 78, right: 78, zIndex: 50, background: "none", border: "none", padding: 0 }}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000021] rounded-full"
    >
      {/* Outer wrapper — scale on hover lives here */}
      <div
        className="vinyl-btn"
        style={{
          position: "relative",
          width: 100,
          height: 100,
          cursor: "pointer",
          opacity: isPlaying ? scrollOpacity : scrollOpacity * 0.35,
        }}
      >

        {/* Layer 1 — spinning disc, transform: rotate lives here only */}
        <svg
          className={isPlaying ? "vinyl-disc-spinning" : ""}
          width="100"
          height="100"
          viewBox="0 0 64 64"
          fill="none"
        >
          <defs>
            <clipPath id="discClip">
              <circle cx="32" cy="32" r="31" />
            </clipPath>
            <path
              id="textCircle"
              d="M 32,32 m -19,0 a 19,19 0 1,1 38,0 a 19,19 0 1,1 -38,0"
            />
            <radialGradient id="darkOverlay" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="60%" stopColor="rgba(0,0,0,0.45)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.75)" />
            </radialGradient>
          </defs>

          <image
            href="/timotion-picture.jpg"
            x="1" y="1"
            width="62" height="62"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#discClip)"
          />
          <circle cx="32" cy="32" r="31" fill="url(#darkOverlay)" />
          <circle cx="32" cy="32" r="31" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
          <circle cx="32" cy="32" r="23" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          <circle cx="32" cy="32" r="19" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <circle cx="32" cy="32" r="15" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
          <text
            fontSize="4.2"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            letterSpacing="2.5"
            fill="rgba(255,255,255,0.55)"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            <textPath href="#textCircle" startOffset="0%">
              PLAY ME · PLAY ME · PLAY ME ·
            </textPath>
          </text>
          <circle cx="32" cy="32" r="2.5" fill="#0B0C1A" />
        </svg>

        {/* Layer 2 — cyan hover overlay, does NOT spin */}
        <div className="vinyl-cyan-overlay" />

        {/* Layer 3 — play/pause icon, does NOT spin */}
        <div className="vinyl-icon">
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="1" width="3" height="8" fill="white" />
              <rect x="6" y="1" width="3" height="8" fill="white" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <polygon points="2,1 9,5 2,9" fill="white" />
            </svg>
          )}
        </div>

      </div>
    </button>
  );
}
