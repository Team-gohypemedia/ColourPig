"use client";

import React, { useEffect, useState } from "react";
import Image from "@/components/ui/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

/* ==========================================================================
   "Not sure of your number?" banner. The artwork is identical for every
   shade except the bottle on the right, so the full image is drawn once and
   only the bottle area cross-fades from shade to shade.
   Assets: public/Permanent/<shade>/Option B (light)/16 Find your shade No.N.jpg
   ========================================================================== */

const SHADE_ART = [
  "No.1 Black/Option B (light)/16 Find your shade No.1.jpg",
  "No.3 Brown/Option B (light)/16 Find your shade No.3.jpg",
  "No.4 Medium Brown/Option B (light)/16 Find your shade No.4.jpg",
  "No.5 Light Brown/Option B (light)/16 Find your shade No.5.jpg",
  "No.6 Dark Blonde/Option B (light)/16 Find your shade No.6.jpg",
  "No.7 Medium Blonde/Option B (light)/16 Find your shade No.7.jpg",
  "No.8 Light Blonde/Option B (light)/16 Find your shade No.8.jpg",
  "No.9 Very Light Blonde/Option B (light)/16 Find your shade No.9.jpg",
].map((path) => `/Permanent/${path}`);

/** The only part of the artwork that differs between shades (measured from the files) */
const BOTTLE_AREA = "inset(8.5% 6% 4.5% 70%)";
/** Where the printed "FIND YOUR COLOUR" button sits in the artwork */
const BUTTON_AREA = { left: "6%", top: "58.5%", width: "49%", height: "7.5%" };

/**
 * Empty blue trimmed off the artwork (share of its height) so the banner is
 * shorter without shrinking the text or bottle: above the headline, and the
 * faint tail of the bottle's shadow at the bottom.
 */
const TRIM_TOP = 0.07;
const TRIM_BOTTOM = 0.04;
const VISIBLE = 1 - TRIM_TOP - TRIM_BOTTOM;
/** The full square artwork, positioned so only the untrimmed band shows */
const ARTWORK_BOX = {
  top: `${(-TRIM_TOP / VISIBLE) * 100}%`,
  height: `${(1 / VISIBLE) * 100}%`,
};

const HOLD_MS = 2600;
const FADE_MS = 900;

export function FindShadeBanner() {
  const reduce = useReducedMotion();
  const [{ active, previous }, setSlide] = useState<{ active: number; previous: number | null }>({
    active: 0,
    previous: null,
  });

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setSlide(({ active: current }) => ({ active: (current + 1) % SHADE_ART.length, previous: current }));
    }, HOLD_MS + FADE_MS);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 42vw";

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: `1 / ${VISIBLE}` }}>
    <div className="absolute inset-x-0" style={ARTWORK_BOX}>
      {/* Background, text and button: drawn once and never animated */}
      <Image src={SHADE_ART[0]} alt="Not sure of your number? Let us help you find it." fill sizes={sizes} className="object-cover" />

      {/* Bottle layers: the incoming shade fades in on top of the outgoing one */}
      {SHADE_ART.map((src, i) => {
        const isActive = i === active;
        const isPrevious = i === previous;
        return (
          <div
            key={src}
            aria-hidden
            className="absolute inset-0"
            style={{
              clipPath: BOTTLE_AREA,
              opacity: isActive || isPrevious ? 1 : 0,
              zIndex: isActive ? 2 : isPrevious ? 1 : 0,
              transition: isActive ? `opacity ${FADE_MS}ms ease-in-out` : "none",
            }}
          >
            <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
          </div>
        );
      })}

      {/* Makes the printed "FIND YOUR COLOUR" button clickable */}
      <Link
        href="/#shade-finder"
        aria-label="Find your colour"
        className="absolute z-10 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={BUTTON_AREA}
      />
    </div>
    </div>
  );
}

export default FindShadeBanner;
