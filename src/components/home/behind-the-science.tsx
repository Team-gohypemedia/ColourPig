"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useHasMounted } from "@/components/motion/motion-primitives";

export function BehindTheScience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Ambient loop that only downloads once the section is near the screen (preload="none" + poster),
  // and pauses while off screen, so it doesn't compete with the hero on first load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // ---- Scroll-driven "window" -----------------------------------------------------------------
  // Tied to scroll position: the banner grows from a small centre window to the full frame while the
  // section scrolls up to ~35% of the screen, and shrinks back the same way when scrolling up past it.
  // Once fully open it stays full while pinned and as it scrolls away downwards.
  const { scrollYProgress: openProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 35%"] });
  // Spring on top of the (already Lenis-smoothed) scroll so opening and closing glide rather than step
  const openSmooth = useSpring(openProgress, { stiffness: 90, damping: 22, mass: 0.6 });

  // Window size via transforms (GPU-composited, no per-frame repaint of the playing video):
  // the frame scales down to the window, and the content inside is counter-scaled back to full size
  const frameScaleX = useTransform(openSmooth, [0, 1], [0.22, 1]);
  const frameScaleY = useTransform(openSmooth, [0, 1], [0.6, 1]);
  const contentScaleX = useTransform(frameScaleX, (s) => 1 / s);
  const contentScaleY = useTransform(frameScaleY, (s) => 1 / s);

  // Gentle parallax drift of the video across the whole time the section is on screen
  const { scrollYProgress: passProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const videoY = useTransform(passProgress, [0, 1], ["-5%", "5%"]);

  // Scroll-linked styles only after hydration, and never for reduced-motion users
  const mounted = useHasMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  return (
    // md+: the section is taller than the screen, so the frame pins below the navbar and the whole
    // video stays in view (filling the screen) for a while before the page moves on.
    // Phones: a normal 16:9 banner that opens as it scrolls in.
    <section
      ref={sectionRef}
      id="engineering"
      className="relative w-full select-none md:h-[calc(170svh-116px)]"
    >
      {/* Heading kept for screen readers / SEO only — the video carries the section visually */}
      <h2 className="sr-only">The System</h2>

      <div className="md:sticky md:top-[116px] w-full aspect-video md:aspect-auto md:h-[calc(100svh-116px)] overflow-hidden">
        {/* The window */}
        <motion.div
          className="relative w-full h-full overflow-hidden bg-black will-change-transform"
          style={animate ? { scaleX: frameScaleX, scaleY: frameScaleY } : undefined}
        >
          {/* Full-size content, counter-scaled so it never stretches while the window opens */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={animate ? { scaleX: contentScaleX, scaleY: contentScaleY } : undefined}
          >
            {/* Colourpig spectrum accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF671F] via-[#FFC72C] via-[#7AC142] via-[#00A3E0] to-[#B584C4] z-20" />

            {/* Video layer overhangs top and bottom so the parallax drift never shows an edge */}
            <motion.div className="absolute inset-x-0 -top-[6%] -bottom-[6%]" style={animate ? { y: videoY } : undefined}>
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                poster="/system-exploded-poster.jpg"
                className="w-full h-full object-cover bg-black"
              >
                <source src="/system-exploded-hd.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* Ambient Top Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default BehindTheScience;
