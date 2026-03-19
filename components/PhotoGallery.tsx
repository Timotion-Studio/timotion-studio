"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Photo {
  _key: string;
  url: string;
  alt: string;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + photos.length) % photos.length);
      else if (e.key === "ArrowRight") setIdx((i) => (i + 1) % photos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  return (
    <>
      {/* Photo grid */}
      <div className="photo-grid">
        <style>{`
          .photo-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          @media (max-width: 1023px) { .photo-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 639px)  { .photo-grid { grid-template-columns: 1fr; } }
        `}</style>
        {photos.map((photo, i) => (
          <button
            key={photo._key}
            type="button"
            onClick={() => { setIdx(i); setOpen(true); }}
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              position: "relative",
            }}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 200ms ease",
          }}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

          {/* Close */}
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#fff",
              background: "none",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
              lineHeight: 1,
              padding: "0.5rem",
              zIndex: 1,
            }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              background: "none",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 1,
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Image */}
          <Image
            key={photos[idx]._key}
            src={photos[idx].url}
            alt={photos[idx].alt}
            width={1920}
            height={1280}
            onClick={(e) => e.stopPropagation()}
            sizes="90vw"
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              background: "none",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 1,
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Counter */}
          <span
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
            }}
          >
            {idx + 1} / {photos.length}
          </span>
        </div>
      )}
    </>
  );
}
