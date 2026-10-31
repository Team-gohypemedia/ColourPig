"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight, Grid, Film, ArrowRight } from "lucide-react";

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  video?: string;
  aspectClass: string;
  widthClass: string;
  description?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "STACKED & READY",
    category: "Warehouse",
    image: "/gallary/web/warehouse-portrait-1.jpg",
    aspectClass: "aspect-[3/4]",
    widthClass: "w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]",
    description: "Pallets of boxed ColourPig starter canisters lined up for allocation and distribution.",
  },
  {
    id: 2,
    title: "LAUNCH DAY AT THE WAREHOUSE",
    category: "Launch",
    image: "/gallary/web/warehouse-wide-1.jpg",
    aspectClass: "aspect-[16/9]",
    widthClass: "w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px]",
    description: "Panoramic overview of the Sydney facility on launch week.",
  },
  {
    id: 3,
    title: "PALLETS READY TO SHIP",
    category: "Dispatch",
    image: "/gallary/web/warehouse-wide-2.jpg",
    aspectClass: "aspect-[16/9]",
    widthClass: "w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px]",
    description: "Wrapped and inspected bulk dispatches prepared for global express courier transit.",
  },
  {
    id: 4,
    title: "FRESH OFF THE LINE",
    category: "Production",
    image: "/gallary/web/warehouse-portrait-2.jpg",
    aspectClass: "aspect-[3/4]",
    widthClass: "w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]",
    description: "Quality assurance batch run fresh from the automated filling lines.",
  },
  {
    id: 5,
    title: "THE FIRST RUN",
    category: "Production",
    image: "/gallary/web/warehouse-wide-3.jpg",
    aspectClass: "aspect-[16/9]",
    widthClass: "w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px]",
    description: "Aisle-wide staging area showcasing early production units and dual-chamber packaging.",
  },
  {
    id: 6,
    title: "INSIDE THE WAREHOUSE",
    category: "Walkthrough",
    image: "/gallary/web/warehouse-walkthrough-poster.jpg",
    video: "/gallary/web/warehouse-walkthrough.mp4",
    aspectClass: "aspect-[3/4]",
    widthClass: "w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]",
    description: "Exclusive behind-the-scenes video walk-through across our active warehouse floor.",
  },
];

export function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"reel" | "grid">("reel");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Horizontal Scroll Reel State
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScrollX, setMaxScrollX] = useState(0);

  // Interactive Cursor
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);
  const [cursorContent, setCursorContent] = useState<"VIEW" | "PLAY" | "SCROLL">("SCROLL");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(GALLERY_ITEMS.map((item) => item.category)));
    return ["all", ...cats];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeModalItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  // Track max scroll offset for the reel
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
    const timer = setTimeout(updateScrollWidth, 300);
    window.addEventListener("resize", updateScrollWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollWidth);
    };
  }, [filteredItems, viewMode]);

  // Handle ESC and arrows in lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;

      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
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
  }, [selectedIdx, filteredItems.length]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -maxScrollX]);
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full select-none bg-white text-obsidian pb-24">
      {/* 1. Page Header & Editorial Breadcrumb */}
      <section className="pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto text-center space-y-2">
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-montserrat text-obsidian tracking-wide">
          <Link
            href="/"
            className="hover:text-obsidian transition-colors underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <span className="text-black/30 font-normal">/</span>
          <span className="text-obsidian font-medium">Gallery Archive</span>
        </nav>

        <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-obsidian leading-tight">
          GALLERY ARCHIVE
        </h1>

        <p className="font-montserrat text-xs sm:text-sm text-obsidian/75 tracking-wide max-w-2xl mx-auto leading-relaxed">
          An inside look at Norman Brown&apos;s Sydney warehouse, automated filling lines, and global express dispatch facility.
        </p>

        {/* View Switcher & Category Filter Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/10 pb-4 max-w-[1600px] mx-auto">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedIdx(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-montserrat font-medium tracking-wide uppercase transition-all cursor-pointer ${
                    isSelected
                      ? "bg-obsidian text-white shadow-xs"
                      : "bg-white text-obsidian/70 hover:text-obsidian border border-black/10 hover:border-black/30"
                  }`}
                >
                  {cat === "all" ? "All Shots" : cat}
                </button>
              );
            })}
          </div>

          {/* View Toggle: Reel / Grid */}
          <div className="flex items-center gap-1 bg-black/5 p-1 rounded-full border border-black/10">
            <button
              type="button"
              onClick={() => setViewMode("reel")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-montserrat font-medium uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "reel" ? "bg-white text-obsidian shadow-xs" : "text-obsidian/60 hover:text-obsidian"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Reel</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-montserrat font-medium uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-white text-obsidian shadow-xs" : "text-obsidian/60 hover:text-obsidian"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2A. Cinematic Horizontal Scroll Reel Mode */}
      {viewMode === "reel" ? (
        <section
          ref={targetRef}
          className="relative w-full h-[240vh] sm:h-[260vh] bg-white text-obsidian select-none"
        >
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
              setIsHoveringTrack(true);
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
              setIsHoveringTrack(true);
            }}
            onMouseLeave={() => {
              setIsHoveringTrack(false);
              setCursorContent("SCROLL");
            }}
            className="sticky top-0 h-screen w-full flex flex-col justify-center py-4 sm:py-6 lg:py-8 overflow-hidden relative"
          >
            {/* Scroll instruction banner */}
            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between shrink-0 mb-3 sm:mb-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-obsidian/60">
                SCROLL TO EXPLORE ARCHIVE ({filteredItems.length} SHOTS)
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-obsidian/60 hidden sm:inline">
                CLICK TO ENLARGE &amp; PLAY
              </span>
            </div>

            {/* Horizontal Track */}
            <div className="relative w-full overflow-hidden py-2 flex items-center lg:cursor-none">
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-10 px-4 sm:px-8 lg:px-12 xl:px-16 items-start will-change-transform w-max"
              >
                {filteredItems.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIdx(idx)}
                    onMouseEnter={() => setCursorContent(item.video ? "PLAY" : "VIEW")}
                    onMouseLeave={() => setCursorContent("SCROLL")}
                    className={`flex-none group cursor-pointer lg:cursor-none ${item.widthClass}`}
                  >
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
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 440px, 540px"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Progress Line */}
            <div className="w-full flex justify-center px-4 shrink-0 mt-6 sm:mt-8">
              <div className="w-36 sm:w-48 md:w-64 h-[2px] bg-black/15 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-obsidian rounded-full"
                  style={{ width: lineWidth }}
                />
              </div>
            </div>

            {/* Custom Interactive Floating Cursor */}
            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-50 hidden lg:flex items-center justify-center w-[78px] h-[78px] rounded-full border border-obsidian/80 bg-white text-obsidian shadow-[0_14px_35px_rgba(0,0,0,0.2)]"
              animate={{
                x: mousePos.x - 39,
                y: mousePos.y - 39,
                opacity: isHoveringTrack && selectedIdx === null ? 1 : 0,
                scale: isHoveringTrack && selectedIdx === null ? 1 : 0.35,
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
          </div>
        </section>
      ) : (
        /* 2B. Editorial Grid Mode */
        <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedIdx(idx)}
                className="group cursor-pointer flex flex-col bg-white border border-black/10 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300"
              >
                <div className={`relative ${item.aspectClass} w-full bg-neutral-100 overflow-hidden`}>
                  {item.video ? (
                    <div className="relative w-full h-full">
                      <video
                        src={item.video}
                        poster={item.image}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
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
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 text-white text-[10px] font-mono tracking-widest uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-montserrat font-bold text-sm tracking-wider uppercase text-obsidian">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-xs font-mono text-obsidian/70 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-obsidian/60 group-hover:text-obsidian transition-colors">
                    <span>{item.video ? "Watch Walkthrough" : "Enlarge Shot"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Bottom CTA Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-16 text-center">
        <div className="p-8 sm:p-12 bg-midnight text-platinum rounded-2xl space-y-4">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-ash block">
            SYDNEY SALON HERITAGE • AIR-DRIVEN PRECISION
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
            Ready to experience the ritual?
          </h2>
          <p className="text-xs sm:text-sm text-ash max-w-xl mx-auto leading-relaxed">
            Discover all 9 patented shade systems, crafted with dual-chamber air propulsion and pure salon-grade pigment.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#shades"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-obsidian font-mono font-bold text-xs tracking-wider uppercase hover:bg-platinum transition-colors"
            >
              Explore Shades
            </Link>
            <Link
              href="/collection"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/30 text-white font-mono font-bold text-xs tracking-wider uppercase hover:bg-white/10 transition-colors"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Fullscreen Lightbox Modal */}
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
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                  {selectedIdx + 1} / {filteredItems.length}
                </span>
                <span className="text-xs font-mono tracking-widest uppercase text-white/70 hidden sm:inline">
                  {activeModalItem.category}
                </span>
              </div>

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
                setSelectedIdx((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
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
                setSelectedIdx((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
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
              className="relative max-w-5xl w-full max-h-[82vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[60vh] sm:h-[72vh] rounded-none overflow-hidden bg-black flex items-center justify-center">
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

              {/* Title & Description Caption */}
              <div className="mt-4 text-center max-w-xl">
                <p className="font-montserrat font-bold text-sm sm:text-base text-white tracking-widest uppercase">
                  {activeModalItem.title}
                </p>
                {activeModalItem.description && (
                  <p className="mt-1 text-xs font-mono text-white/70">
                    {activeModalItem.description}
                  </p>
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

