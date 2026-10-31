"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  video?: string;
  aspectClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "STACKED & READY",
    image: "/gallary/web/warehouse-portrait-1.jpg",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "LAUNCH DAY AT THE WAREHOUSE",
    image: "/gallary/web/warehouse-wide-1.jpg",
    aspectClass: "aspect-[16/9]",
  },
  {
    id: 3,
    title: "PALLETS READY TO SHIP",
    image: "/gallary/web/warehouse-wide-2.jpg",
    aspectClass: "aspect-[16/9]",
  },
  {
    id: 4,
    title: "FRESH OFF THE LINE",
    image: "/gallary/web/warehouse-portrait-2.jpg",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 5,
    title: "THE FIRST RUN",
    image: "/gallary/web/warehouse-wide-3.jpg",
    aspectClass: "aspect-[16/9]",
  },
  {
    id: 6,
    title: "INSIDE THE WAREHOUSE",
    image: "/gallary/web/warehouse-walkthrough-poster.jpg",
    video: "/gallary/web/warehouse-walkthrough.mp4",
    aspectClass: "aspect-[3/4]",
  },
];

export function GalleryView() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const activeModalItem = selectedIdx !== null ? GALLERY_ITEMS[selectedIdx] : null;

  // Handle ESC and arrows in lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;

      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0));
      }
    };

    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIdx]);

  return (
    <div className="w-full bg-white text-obsidian select-none">
      {/* Clean Minimal Title */}
      <div className="pt-6 sm:pt-10 pb-2 sm:pb-4 text-center">
        <h1 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-obsidian">
          GALLERY
        </h1>
      </div>

      {/* Pure Media Gallery (Images & Videos Only) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className="break-inside-avoid mb-4 sm:mb-6 group cursor-pointer overflow-hidden relative bg-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
            >
              <div className={`relative ${item.aspectClass} w-full overflow-hidden`}>
                {item.video ? (
                  <div className="relative w-full h-full">
                    <video
                      src={item.video}
                      poster={item.image}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                {/* Subtle dark hover veil */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Top Bar with Counter and Close */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-50">
              <span className="text-xs font-mono tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                {selectedIdx + 1} / {GALLERY_ITEMS.length}
              </span>

              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0));
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0));
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Media Content */}
            <motion.div
              key={activeModalItem.id}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-none overflow-hidden bg-black flex items-center justify-center">
                {activeModalItem.video ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        el.play().catch(() => {});
                      }
                    }}
                    src={activeModalItem.video}
                    poster={activeModalItem.image}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 1200px"
                    className="object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GalleryView;
