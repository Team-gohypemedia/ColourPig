"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface GallerySlide {
  id: number;
  title: string;
  image: string;
  video?: string;
  aspectClass: string;
  widthClass: string;
}

const GALLERY_ITEMS: GallerySlide[] = [
  {
    id: 1,
    title: "STACKED & READY",
    image: "/gallary/web/warehouse-portrait-1.jpg",
    aspectClass: "aspect-[3/4]",
    widthClass: "w-[220px] sm:w-[250px] md:w-[270px] lg:w-[285px] xl:w-[305px]",
  },
  {
    id: 2,
    title: "LAUNCH DAY AT THE WAREHOUSE",
    image: "/gallary/web/warehouse-wide-1.jpg",
    aspectClass: "aspect-[16/9]",
    widthClass: "w-[310px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[480px]",
  },
  {
    id: 3,
    title: "PALLETS READY TO SHIP",
    image: "/gallary/web/warehouse-wide-2.jpg",
    aspectClass: "aspect-[16/9]",
    widthClass: "w-[310px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[480px]",
  },
  {
    id: 4,
    title: "FRESH OFF THE LINE",
    image: "/gallary/web/warehouse-portrait-2.jpg",
    aspectClass: "aspect-[3/4]",
    widthClass: "w-[220px] sm:w-[250px] md:w-[270px] lg:w-[285px] xl:w-[305px]",
  },
  {
    id: 5,
    title: "THE FIRST RUN",
    image: "/gallary/web/warehouse-wide-3.jpg",
    aspectClass: "aspect-[16/9]",
    widthClass: "w-[310px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[480px]",
  },
  {
    id: 6,
    title: "INSIDE THE WAREHOUSE",
    image: "/gallary/web/warehouse-walkthrough-poster.jpg",
    video: "/gallary/web/warehouse-walkthrough.mp4",
    aspectClass: "aspect-[3/4]",
    widthClass: "w-[220px] sm:w-[250px] md:w-[270px] lg:w-[285px] xl:w-[305px]",
  },
];

export function AirheadsCommunity() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GallerySlide | null>(null);

  // Dynamic max scroll distance calculated based on actual track width vs viewport width
  const [maxScrollX, setMaxScrollX] = useState(0);

  // Mouse position for custom interactive cursor pill
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [cursorContent, setCursorContent] = useState<"VIEW" | "PLAY" | "SCROLL">("SCROLL");

  // Track if section viewport is actively pinned on screen
  useEffect(() => {
    const checkActive = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const active = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;
      setIsSectionActive(active);
    };
    window.addEventListener("scroll", checkActive, { passive: true });
    window.addEventListener("resize", checkActive);
    checkActive();
    return () => {
      window.removeEventListener("scroll", checkActive);
      window.removeEventListener("resize", checkActive);
    };
  }, []);

  // Measure actual overflow distance across all device screen sizes
  useEffect(() => {
    const updateScrollWidth = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const overflow = Math.max(0, trackWidth - viewportWidth + 60);
        setMaxScrollX(overflow);
      }
    };

    updateScrollWidth();
    // Allow fonts and layout to settle
    const timer = setTimeout(updateScrollWidth, 300);
    window.addEventListener("resize", updateScrollWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollWidth);
    };
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Smoothly translates from 0px to -maxScrollX px across all cards
  const x = useTransform(smoothProgress, [0, 1], [0, -maxScrollX]);
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={targetRef}
      className="relative w-full h-[260vh] sm:h-[280vh] bg-white text-obsidian select-none"
    >
      {/* Sticky Screen Viewport pinned during vertical scroll */}
      <div
        onMouseMove={(e) => {
          setMousePos({ x: e.clientX, y: e.clientY });
        }}
        onMouseEnter={() => setIsHoveringTrack(true)}
        onMouseLeave={() => {
          setIsHoveringTrack(false);
          setCursorContent("SCROLL");
        }}
        className="sticky top-0 h-screen w-full flex flex-col justify-center py-4 sm:py-6 lg:py-8 overflow-hidden"
      >
        {/* 1. Header with Brand Style */}
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center shrink-0 mb-3 sm:mb-4 lg:mb-5">
          <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
            GALLERY SHOTS COLLECTION
          </h2>
        </div>

        {/* 2. Responsive Locked Horizontal Scroll Carousel */}
        <div className="relative w-full overflow-hidden py-1 sm:py-2 flex items-center lg:cursor-none">
          {/* Unified Horizontal Track with useTransform translation */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-10 px-4 sm:px-8 lg:px-12 xl:px-16 items-start will-change-transform w-max"
          >
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => setCursorContent(item.video ? "PLAY" : "VIEW")}
                onMouseLeave={() => setCursorContent("SCROLL")}
                className={`flex-none flex flex-col group cursor-pointer lg:cursor-none ${item.widthClass}`}
              >
                {/* Sharp Edged Image / Video Container matching native image ratio with flush top alignment */}
                <div
                  className={`relative ${item.aspectClass} w-full rounded-none overflow-hidden bg-neutral-100 shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
                >
                  {item.video ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={(el) => {
                          if (el) {
                            el.defaultMuted = true;
                            el.muted = true;
                            el.play().catch(() => {});
                          }
                        }}
                        src={item.video}
                        poster={item.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                        <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white ml-0.5" />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 440px, 520px"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Minimal Clean Caption directly below */}
                <p className="mt-2.5 font-montserrat font-semibold text-[11px] sm:text-xs tracking-wider uppercase text-obsidian truncate">
                  {item.title}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3. Bottom Progress Line Indicator */}
        <div className="w-full flex justify-center px-4 shrink-0 mt-4 sm:mt-6">
          <div className="w-28 sm:w-40 md:w-48 h-[2px] bg-black/15 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-obsidian rounded-full"
              style={{
                width: lineWidth,
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Fullscreen Lightbox Modal on Click */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-none overflow-hidden bg-black flex items-center justify-center">
                {selectedItem.video ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        el.play().catch(() => {});
                      }
                    }}
                    src={selectedItem.video}
                    poster={selectedItem.image}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 1200px"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Title Caption in Modal */}
              <div className="mt-3 sm:mt-4 text-center">
                <p className="font-montserrat font-bold text-xs sm:text-base text-white tracking-widest uppercase">
                  {selectedItem.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Custom Floating Circular Cursor: Placed at ROOT with z-[9999] so it is ALWAYS on top of all images and videos */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:flex items-center justify-center w-[78px] h-[78px] rounded-full border border-obsidian/80 bg-white text-obsidian shadow-[0_14px_35px_rgba(0,0,0,0.2)]"
        animate={{
          x: mousePos.x - 39,
          y: mousePos.y - 39,
          opacity: isHoveringTrack && isSectionActive && !selectedItem ? 1 : 0,
          scale: isHoveringTrack && isSectionActive && !selectedItem ? 1 : 0.35,
        }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 280,
          mass: 0.1,
        }}
      >
        <div className="flex items-center justify-center gap-1 select-none">
          <span className="font-montserrat font-bold text-[11px] tracking-[0.2em] uppercase text-obsidian">
            {cursorContent}
          </span>
          {cursorContent === "SCROLL" && <span className="text-[10px] text-obsidian font-bold ml-0.5">▸</span>}
        </div>
      </motion.div>
    </section>
  );
}

export default AirheadsCommunity;
