"use client";

import React, { useRef, useEffect } from "react";

export function BehindTheScience() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient loop: nudge autoplay in case the browser held it back
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section id="engineering" className="w-full select-none">
      {/* Heading kept for screen readers / SEO only — the video carries the section visually */}
      <h2 className="sr-only">The System</h2>

      {/* Cinematic Video Showcase — full-bleed, edge to edge, no controls */}
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        {/* Colourpig spectrum accent line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF671F] via-[#FFC72C] via-[#7AC142] via-[#00A3E0] to-[#B584C4] z-20" />

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover bg-black"
        >
          <source src="/system-exploded.mp4" type="video/mp4" />
        </video>

        {/* Ambient Top Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
      </div>
    </section>
  );
}

export default BehindTheScience;
