"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

export interface ShadeItem {
  code: string;
  name: string;
  hex: string;
  undertone: string;
}

export const CORE_SHADES: ShadeItem[] = [
  {
    code: "No.4",
    name: "Medium Brown",
    hex: "#4E4136",
    undertone: "Natural Chestnut",
  },
  {
    code: "No.1",
    name: "Pure Black",
    hex: "#2D2C2D",
    undertone: "Deep Mineral Jet",
  },
  {
    code: "No.7",
    name: "Medium Blonde",
    hex: "#BE966C",
    undertone: "Warm Golden",
  },
  {
    code: "No.9",
    name: "Very Light Blonde",
    hex: "#E3C8AD",
    undertone: "Champagne Blonde",
  },
  {
    code: "No.0/0",
    name: "Clear Gloss",
    hex: "#F2EFF0",
    undertone: "Translucent Gloss",
  },
];

interface HeroSectionProps {
  onAddToCart?: (shade: ShadeItem) => void;
}

export function HeroSection({ onAddToCart }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Attempt autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user interaction
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const scrollToNext = () => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      const nextTop = hero.offsetTop + hero.offsetHeight;
      window.scrollTo({ top: nextTop, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full pt-[96px] sm:pt-0 sm:h-screen sm:min-h-[580px] sm:max-h-[1080px] bg-[#070D12] overflow-hidden select-none"
    >
      {/* Background / Main Video Container */}
      <div className="relative w-full aspect-video sm:aspect-auto sm:absolute sm:inset-0 sm:w-full sm:h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-contain sm:object-cover block"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/COLOURPIG_Dots_Opening_30s_v2%20(1).mp4" type="video/mp4" />
        </video>

        {/* Floating Sound Controller (positioned inside video container for clean mobile framing) */}
        <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-10 z-20 flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="group flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all active:scale-95 shadow-lg"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ash group-hover:text-white" />
                <span className="hidden sm:inline text-[10px] font-mono tracking-wider uppercase text-ash group-hover:text-white">
                  Sound Off
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7AC142]" />
                <span className="hidden sm:inline text-[10px] font-mono tracking-wider uppercase text-white">
                  Sound On
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimal Interactive Scroll Cue (Desktop only) */}
      <button
        onClick={scrollToNext}
        className="hidden sm:flex absolute bottom-6 sm:bottom-8 inset-x-0 mx-auto w-fit flex-col items-center justify-center gap-1.5 cursor-pointer z-20 opacity-80 hover:opacity-100 transition-opacity group"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-platinum/80 group-hover:text-white transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-platinum/80 group-hover:text-white animate-bounce" />
      </button>
    </section>
  );
}
