"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, useHasMounted } from "@/components/motion/motion-primitives";

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
  const sectionRef = useRef<HTMLElement>(null);
  // Scroll-linked styles only after mount, so server and first client render match
  const mounted = useHasMounted();

  // Scroll-linked exit: the video eases back into a rounded frame while the scroll cue lifts away
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const videoRadius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cueY = useTransform(scrollYProgress, [0, 0.75], [0, -45]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

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
      ref={sectionRef}
      id="hero-section"
      className="relative w-full pt-[96px] sm:pt-0 sm:h-screen sm:min-h-[580px] sm:max-h-[1080px] bg-[#070D12] overflow-hidden select-none"
    >
      {/* Background / Main Video Container */}
      <motion.div
        className="relative w-full aspect-video sm:aspect-auto sm:absolute sm:inset-0 sm:w-full sm:h-full flex items-center justify-center overflow-hidden"
        style={mounted ? { scale: videoScale, borderRadius: videoRadius, y: videoY } : undefined}
      >
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
          <source src="/hero-video-web.mp4" type="video/mp4" />
          <source src="/COLOURPIG_Dots_Opening_30s_v2%20(1).mp4" type="video/mp4" />
        </video>

        {/* Floating Sound Controller (positioned inside video container for clean mobile framing) */}
        <motion.div
          className="absolute bottom-3 right-3 sm:bottom-8 sm:right-10 z-20 flex items-center gap-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        >
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
        </motion.div>
      </motion.div>

      {/* Minimal Interactive Scroll Cue (Desktop only) — rises in on load, lifts away on scroll */}
      <motion.div
        className="hidden sm:block absolute bottom-6 sm:bottom-8 inset-x-0 z-20 pointer-events-none"
        style={mounted ? { y: cueY, opacity: cueOpacity } : undefined}
      >
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
        onClick={scrollToNext}
        className="flex mx-auto w-fit cursor-pointer pointer-events-auto group"
        aria-label="Scroll to explore"
      >
        <span className="flex flex-col items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-platinum/80 group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <ChevronDown className="w-4 h-4 text-platinum/80 group-hover:text-white animate-bounce" />
        </span>
      </motion.button>
      </motion.div>
    </section>
  );
}
