"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";

export interface StoryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export const STORIES: StoryItem[] = [
  {
    id: "dispenser",
    category: "DISPENSER HARDWARE",
    title: "Air-Driven Dispenser",
    description: "Automotive-grade chrome hardware. Zero propellant air-compression simultaneously delivers exact 1:1 dual formula.",
    image: "/images/product-dispenser.jpg",
    ctaText: "SHOP NOW",
    ctaLink: "/product?shade=shade-1",
  },
  {
    id: "starter",
    category: "STARTER SYSTEM",
    title: "Complete Starter System",
    description: "Full in-shower ritual. Includes chrome dispenser, 50ml + 50ml dual pod cartridge, precision wand, and dish.",
    image: "/images/products/shade_4_img_26794_1024x1024.png",
    ctaText: "SHOP NOW",
    ctaLink: "/product?shade=shade-4",
  },
  {
    id: "shades",
    category: "PANTONE SYSTEM",
    title: "No.1 Jet Black System",
    description: "Ultra-pigmented pure obsidian black with 100% resistant gray root coverage. Silky cuticle health and shine.",
    image: "/images/products/shade_1_img_26771_1024x1024.png",
    ctaText: "SHOP NOW",
    ctaLink: "/product?shade=shade-1",
  },
  {
    id: "pods",
    category: "REFILL SYSTEM",
    title: "Dual-Chamber Refill Pods",
    description: "Pre-measured hermetic cartridges yield 4–6 root applications. Eliminates 90% of waste and single-use plastic.",
    image: "/images/spec_full_packaging.jpg",
    ctaText: "SHOP NOW",
    ctaLink: "/product?shade=shade-7",
  },
  {
    id: "aftercare",
    category: "PRECISION TOOLKIT",
    title: "Salon Precision Kit",
    description: "Includes hairline stain barrier, custom mixing dish, calibrated root wand, and nourishing salon aftercare.",
    image: "/images/spec_full_aftercare.jpg",
    ctaText: "SHOP NOW",
    ctaLink: "/product",
  },
];

const STORY_DURATION_MS = 5000; // 5 seconds per story
const PROGRESS_TICK_MS = 40;

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function StoryModal({ isOpen, onClose, initialIndex = 0 }: StoryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initial index
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    if (currentIndex < STORIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Autoplay progression timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (PROGRESS_TICK_MS / STORY_DURATION_MS) * 100;
        if (next >= 100) {
          handleNext();
          return 0;
        }
        return next;
      });
    }, PROGRESS_TICK_MS);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, handleNext]);

  if (!isOpen) return null;

  const currentStory = STORIES[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md select-none p-4">
      {/* Background Dim Dismiss Area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Floating Left Arrow */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="hidden md:flex absolute left-8 lg:left-16 z-30 h-12 w-12 rounded-full bg-white text-obsidian shadow-2xl items-center justify-center hover:scale-105 active:scale-95 transition-all"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
        </button>
      )}

      {/* Smartphone Story Container matching Image 2 */}
      <div
        ref={containerRef}
        className="relative z-20 w-full max-w-[360px] sm:max-w-[390px] h-[580px] sm:h-[620px] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-5 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Progress Segments & Controls */}
        <div className="space-y-3 z-30">
          {/* Segmented Progress Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {STORIES.map((_, i) => {
              let fillPercentage = 0;
              if (i < currentIndex) fillPercentage = 100;
              else if (i === currentIndex) fillPercentage = progress;

              return (
                <div
                  key={i}
                  className="flex-1 h-[2.5px] rounded-full bg-neutral-200 overflow-hidden relative cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(i);
                    setProgress(0);
                  }}
                >
                  <div
                    className="h-full bg-obsidian transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Avatar Monogram & Top Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                <div
                  className="absolute inset-0 rounded-full animate-spin [animation-duration:5s] [animation-timing-function:linear]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #D4AF37, #F6E27A, #C59B27, #FFF2A6, #AA771C, #D4AF37)",
                  }}
                />
                <div className="relative z-10 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center p-1 shadow-xs">
                  <SnoutIcon className="w-4 h-4 text-white" color="#FFFFFF" />
                </div>
              </div>
              <div>
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-obsidian block">
                  COLOURPIG
                </span>
                <span className="text-[9px] font-mono text-graphite block">
                  {currentIndex + 1} of {STORIES.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-obsidian flex items-center justify-center transition-colors"
                aria-label={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-obsidian ml-0.5" /> : <Pause className="w-3.5 h-3.5 fill-obsidian" />}
              </button>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-obsidian flex items-center justify-center transition-colors"
                aria-label="Close story"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Visual Canvas (Click center to shop product, click edges to navigate) */}
        <div className="relative flex-1 w-full my-3 rounded-2xl overflow-hidden bg-neutral-50/80 border border-neutral-100 flex items-center justify-center group">
          <Link
            href={currentStory.ctaLink}
            onClick={onClose}
            className="relative w-full h-full flex items-center justify-center z-10"
            title={`Shop ${currentStory.title}`}
          >
            <Image
              src={currentStory.image}
              alt={currentStory.title}
              fill
              sizes="390px"
              className="object-contain p-3 sm:p-5 object-center transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Left / Right invisible tap zones for stepping stories */}
          <div
            className="absolute left-0 inset-y-0 w-1/4 cursor-pointer z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePrev();
            }}
            title="Previous Story"
          />
          <div
            className="absolute right-0 inset-y-0 w-1/4 cursor-pointer z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNext();
            }}
            title="Next Story"
          />
        </div>

        {/* Bottom Content Area: Category, Title, Description, and CTA */}
        <div className="text-center space-y-2 pt-1 z-30">
          <span className="font-mono text-[10px] tracking-widest text-[#B58434] uppercase font-bold block">
            {currentStory.category}
          </span>
          <h3 className="font-headline font-bold text-lg sm:text-xl text-obsidian tracking-tight">
            {currentStory.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-graphite leading-relaxed max-w-[280px] mx-auto line-clamp-2">
            {currentStory.description}
          </p>

          <div className="pt-2">
            <Link
              href={currentStory.ctaLink}
              onClick={onClose}
              className="inline-flex items-center justify-center w-full py-2.5 px-6 rounded-full bg-obsidian text-white font-mono text-[11px] uppercase tracking-widest font-semibold hover:bg-steel active:scale-98 transition-all shadow-md group"
            >
              <span>{currentStory.ctaText}</span>
              <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Right Arrow */}
      {currentIndex < STORIES.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="hidden md:flex absolute right-8 lg:right-16 z-30 h-12 w-12 rounded-full bg-white text-obsidian shadow-2xl items-center justify-center hover:scale-105 active:scale-95 transition-all"
          aria-label="Next story"
        >
          <ChevronRight className="w-6 h-6 stroke-[2]" />
        </button>
      )}
    </div>
  );
}

export default StoryModal;
