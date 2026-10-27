"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { motion, transform, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useHasMounted } from "@/components/motion/motion-primitives";

// Height of the fixed navbar from the sm breakpoint up (announcement bar + header)
const NAV_HEIGHT_LG = 116;

export function ShadeFinder({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(OFFICIAL_SHADES[3]); // Default No.4 Medium Brown
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [added, setAdded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth, elegant sinusoidal sweep animation with zero-velocity entry and exit
  const triggerSweepAnimation = useCallback((duration = 1800) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth envelope: reaches ~77% (After), sweeps to ~23% (Before roots), settles back at 50%
      const envelope = Math.sin(progress * Math.PI);
      const wave = Math.sin(progress * Math.PI * 2);
      const offset = wave * envelope * 38;
      setSliderPos(50 + offset);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setSliderPos(50);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const stopAutoAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  // 1. Trigger sweep on initial page load / mount
  useEffect(() => {
    triggerSweepAnimation(2000);
    return () => stopAutoAnimation();
  }, [triggerSweepAnimation, stopAutoAnimation]);

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoAnimation();
    setIsDragging(true);
    handlePointerMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoAnimation();
    setIsDragging(true);
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handlePointerMove(e.clientX);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
      }
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseup", handleWindowMouseUp);
      window.addEventListener("touchmove", handleWindowTouchMove);
      window.addEventListener("touchend", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("touchend", handleWindowMouseUp);
    };
  }, [isDragging, handlePointerMove]);

  // ---- Scroll choreography (all scroll-position driven, so scrolling back up plays it in reverse) ----
  // Laptop/desktop (lg+): the section is taller than the screen and its content pins below the navbar.
  //   1. It slides up over the previous section (which holds still underneath) while the photo opens
  //      from a thin strip on its left edge.
  //   2. Once it covers the screen it pins, and the photo keeps opening to its full half-screen width.
  //   3. Then the heading and the shade picker fade in, and the page moves on.
  // Phones/tablets (stacked layout, no pin): the photo opens and the text fades in as the section scrolls up.
  const isLg = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      isLg.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress: pinProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const { scrollYProgress: enterProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 15%"] });

  // Share of the lg timeline spent sliding in (until the section top meets the navbar); the rest is the pin
  const coveredAt = () => {
    const el = sectionRef.current;
    return el && el.offsetHeight > 0 ? Math.min(0.9, (window.innerHeight - NAV_HEIGHT_LG) / el.offsetHeight) : 0.46;
  };
  const pinAt = (c: number, f: number) => c + (1 - c) * f; // point f (0-1) through the pinned stretch

  const photoReveal = useTransform([pinProgress, enterProgress], ([pin, enter]: number[]) => {
    if (!isLg.current) return transform(enter, [0.1, 0.85], [0.06, 1]);
    const c = coveredAt();
    return transform(pin, [0, c, pinAt(c, 0.5)], [0.03, 0.35, 1]);
  });
  // Counter-scale keeps the photo itself at natural size while its frame opens (GPU transforms, no repaint)
  const photoCounter = useTransform(photoReveal, (r) => 1 / Math.max(r, 0.001));

  const textOpacity = useTransform([pinProgress, enterProgress], ([pin, enter]: number[]) => {
    if (!isLg.current) return transform(enter, [0.35, 0.8], [0, 1]);
    const c = coveredAt();
    return transform(pin, [pinAt(c, 0.3), pinAt(c, 0.6)], [0, 1]);
  });
  const panelOpacity = useTransform([pinProgress, enterProgress], ([pin, enter]: number[]) => {
    if (!isLg.current) return transform(enter, [0.55, 1], [0.1, 1]);
    const c = coveredAt();
    return transform(pin, [pinAt(c, 0.45), pinAt(c, 0.8)], [0, 1]);
  });
  const textY = useTransform(textOpacity, (o) => (1 - o) * 24);
  const panelY = useTransform(panelOpacity, (o) => (1 - o) * 32);

  // Play the slider's demo sweep each time the photo finishes opening
  const swept = useRef(false);
  useMotionValueEvent(photoReveal, "change", (r) => {
    if (r >= 0.98 && !swept.current) {
      swept.current = true;
      triggerSweepAnimation(1800);
    } else if (r < 0.5) {
      swept.current = false;
    }
  });

  // ---- Fit the right column into the pinned screen (lg) ------------------------------------------
  // On short laptop screens the heading + 9 shades + order box are taller than the space below the
  // navbar; measure both and scale the column down just enough that nothing is cut off.
  const fitOuterRef = useRef<HTMLDivElement>(null);
  const fitInnerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  useEffect(() => {
    const outer = fitOuterRef.current;
    const inner = fitInnerRef.current;
    if (!outer || !inner) return;
    const measure = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return setFitScale(1);
      const cs = getComputedStyle(outer);
      const available = outer.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const natural = inner.offsetHeight; // layout height, unaffected by the transform
      setFitScale(natural > 0 && available > 0 ? Math.min(1, available / natural) : 1);
    };
    const ro = new ResizeObserver(measure); // fires once right away, then on any size change
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  // Scroll-linked styles only after hydration, and never for reduced-motion users
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;
  const textStyle = animate ? { opacity: textOpacity, y: textY } : undefined;
  const panelStyle = animate ? { opacity: panelOpacity, y: panelY } : undefined;

  const handleAddCurrentShade = () => {
    if (onAddToCart) {
      onAddToCart({
        code: selectedShade.code,
        name: selectedShade.name,
        hex: selectedShade.hex,
        undertone: selectedShade.category,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  return (
    // lg: two screens tall, so the stage below can pin for one screen of scrolling
    <section id="shade-finder" ref={sectionRef} className="relative lg:h-[calc(200svh-116px)]">
      <div className="py-10 sm:py-14 px-4 sm:px-8 max-w-5xl mx-auto lg:max-w-none lg:p-0 lg:sticky lg:top-[116px] lg:h-[calc(100svh-116px)] lg:overflow-hidden">
      {/* Title (phones/tablets: centred above; lg: shown in the right column instead) */}
      <motion.div className="lg:hidden text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1" style={textStyle}>
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-medium">
          RESULTS
        </span>
        <h2 className="font-headline font-bold text-xl sm:text-2xl lg:text-3xl text-obsidian tracking-wider uppercase">
          BEFORE &amp; AFTER
        </h2>
      </motion.div>

      {/* Main Split Grid: Perfectly sized to fit within laptop viewports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 gap-6 lg:gap-0 items-center lg:items-stretch lg:h-full">
        {/* Left Column: Interactive Before & After Slider */}
        <div className="flex flex-col items-center lg:h-full">
          {/* Opening frame: scales out from its left edge; the slider inside is counter-scaled to natural size */}
          <motion.div
            className="w-full max-w-[360px] lg:max-w-none lg:h-full overflow-hidden rounded-md lg:rounded-none origin-left will-change-transform"
            style={animate ? { scaleX: photoReveal } : undefined}
          >
          <motion.div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={() => setSliderPos(50)}
            className="relative w-full aspect-[3/4] max-h-[460px] lg:max-h-none lg:aspect-auto lg:h-full rounded-md lg:rounded-none overflow-hidden border border-black/10 lg:border-0 bg-[#0F141A] select-none cursor-ew-resize group origin-left will-change-transform"
            style={
              animate
                ? { touchAction: isDragging ? "none" : "pan-y", scaleX: photoCounter }
                : { touchAction: isDragging ? "none" : "pan-y" }
            }
          >
            {/* 1. AFTER Image (Clean Portrait with selected shade) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                key={selectedShade.id}
                src={selectedShade.modelImage}
                alt={`${selectedShade.name} After`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center pointer-events-none transition-opacity duration-300"
              />
            </div>

            {/* 2. BEFORE Image (Clipped Overlay - Natural Grey Roots) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <Image
                src="/images/results/model_before_gray_roots.jpg"
                alt="Before - Natural Regrowth"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center pointer-events-none"
              />
            </div>

            {/* BEFORE Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono font-medium tracking-widest text-white uppercase shadow-sm">
                BEFORE
              </span>
            </div>

            {/* AFTER Badge */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono font-medium tracking-widest text-white uppercase shadow-sm">
                AFTER
              </span>
            </div>

            {/* Vertical Divider Line with Drag Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Minimal White Line */}
              <div className="w-[2px] h-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.5)] -translate-x-1/2" />

              {/* Minimal Circular Drag Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-obsidian shadow-lg border border-black/10 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
                <span className="text-[10px] font-mono font-bold tracking-tight select-none">
                  &lt;&gt;
                </span>
              </div>
            </div>
          </motion.div>
          </motion.div>

          {/* Under Slider Caption (phones/tablets) */}
          <div className="lg:hidden w-full max-w-[360px] flex items-center justify-between mt-2.5 text-[10px] font-mono text-graphite/80 px-1">
            <span>Drag slider to compare</span>
            <span>Root Regrowth vs. Finish</span>
          </div>
        </div>

        {/* Right Column: heading (lg) + 9 Clean Shade Cards.
            lg: the pinned screen has a fixed height, so the content is scaled down to fit when the screen is short */}
        <div
          ref={fitOuterRef}
          className="max-w-[420px] lg:max-w-[620px] mx-auto w-full lg:px-12 xl:px-16 lg:py-6 lg:h-full lg:min-h-0 lg:flex lg:items-center lg:justify-center"
        >
        <div
          ref={fitInnerRef}
          className="flex flex-col justify-center gap-4 lg:gap-5 w-full origin-center"
          style={fitScale < 1 ? { transform: `scale(${fitScale})` } : undefined}
        >
          <motion.div className="hidden lg:block space-y-1" style={textStyle}>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-medium">
              RESULTS
            </span>
            <h2 className="font-headline font-bold text-3xl xl:text-4xl text-obsidian tracking-wider uppercase">
              BEFORE &amp; AFTER
            </h2>
          </motion.div>

          <motion.div className="space-y-4" style={panelStyle}>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-obsidian">
                SELECT SHADE
              </h3>
              <span className="text-[10px] font-mono text-graphite">
                9 Shades
              </span>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {OFFICIAL_SHADES.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <div
                    key={shade.id}
                    onClick={() => {
                      setSelectedShade(shade);
                      triggerSweepAnimation(1600);
                    }}
                    className={`p-2 sm:p-2.5 rounded-md border transition-all duration-150 cursor-pointer flex flex-col items-center text-center space-y-1.5 group/card ${
                      isSelected
                        ? "bg-white border-obsidian shadow-sm ring-1 ring-obsidian"
                        : "bg-white/80 border-ash/40 hover:border-obsidian/40 hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    {/* Swatch circular element */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-black/10 relative shadow-inner bg-[#EAECEB]">
                      <Image
                        src={shade.swatchImage}
                        alt={shade.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <span className="text-[9px] font-mono text-graphite block">
                        {shade.code}
                      </span>
                      <h4 className="font-montserrat font-semibold text-[11px] text-obsidian truncate">
                        {shade.name.replace(/No\.\S+\s*/, "")}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Shade Order Drawer */}
          <div className="p-3.5 sm:p-4 rounded-md bg-white border border-ash/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <div className="truncate">
                  <h4 className="font-montserrat font-bold text-xs sm:text-sm text-obsidian uppercase truncate">
                    {selectedShade.name}
                  </h4>
                  <span className="text-[10px] font-mono text-graphite">
                    {selectedShade.category}
                  </span>
                </div>
              </div>
              <span
                className="font-mono text-xs sm:text-sm !font-normal font-[400] text-obsidian shrink-0"
                style={{ fontWeight: 400 }}
              >
                ${selectedShade.price}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleAddCurrentShade}
                className="w-full py-2.5 sm:py-3 px-3 rounded-full bg-obsidian hover:bg-black text-white text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase transition-all shadow-xs active:scale-98 flex items-center justify-center gap-1.5"
              >
                <span>{added ? "Added" : `Add to Bag`}</span>
              </button>

              <Link
                href={`/product?shade=${selectedShade.id}`}
                className="w-full py-2.5 sm:py-3 px-3 rounded-full border border-ash/40 bg-platinum/30 hover:bg-platinum/70 text-obsidian text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1 text-center"
              >
                <span>Full Details →</span>
              </Link>
            </div>
          </div>
          </motion.div>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
