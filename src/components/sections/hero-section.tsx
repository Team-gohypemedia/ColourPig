"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

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

const TOTAL_FRAMES = 240;

const getFrameSrc = (frameIndex: number) => {
  const padded = String(frameIndex).padStart(6, "0");
  return `/hero%20frames/frame_${padded}.webp`;
};

interface HeroSectionProps {
  onAddToCart?: (shade: ShadeItem) => void;
}

export function HeroSection({ onAddToCart }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Draw target frame onto canvas with aspect-ratio preserving cover/contain
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameNumber - 1];
    if (!img || !img.complete) {
      // Find closest loaded frame to keep display smooth
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prevImg = imagesRef.current[frameNumber - 1 - offset];
        if (prevImg && prevImg.complete) {
          img = prevImg;
          break;
        }
        const nextImg = imagesRef.current[frameNumber - 1 + offset];
        if (nextImg && nextImg.complete) {
          img = nextImg;
          break;
        }
      }
    }

    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;

    // Preserving 1280x720 aspect ratio (16:9)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgAspect;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    currentFrameRef.current = frameNumber;
  }, []);

  // Update canvas resolution with devicePixelRatio for ultra-sharp Retina rendering
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Preload initial frames instantly, then progressively buffer all 240 frames
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    const firstImg = new window.Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      updateCanvasSize();
      drawFrame(1);
    };

    // Buffer remaining frames in small batches
    const loadRemainingFrames = () => {
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i - 1] = img;
          if (currentFrameRef.current === i) {
            drawFrame(i);
          }
        };
      }
    };

    const timer = setTimeout(loadRemainingFrames, 30);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [drawFrame, updateCanvasSize]);

  // 250vh Scroll animation tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      setScrollProgress(progress);

      const targetFrame = Math.min(
        Math.max(Math.floor(progress * (TOTAL_FRAMES - 1)) + 1, 1),
        TOTAL_FRAMES
      );

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(() => {
        drawFrame(targetFrame);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCanvasSize, { passive: true });
    handleScroll();
    updateCanvasSize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame, updateCanvasSize]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-[#070D12] select-none"
    >
      {/* Sticky Fullscreen Canvas Viewport playing all 240 frames on scroll */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#070D12]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />

        {/* Minimal Scroll Cue */}
        <div
          className={`absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center justify-center gap-2 pointer-events-none transition-opacity duration-500 z-20 ${
            scrollProgress > 0.06 ? "opacity-0" : "opacity-80"
          }`}
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-platinum/70">
            Scroll to play
          </span>
          <ChevronDown className="w-4 h-4 text-platinum/70 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
