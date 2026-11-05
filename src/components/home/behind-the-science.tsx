"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useHasMounted } from "@/components/motion/motion-primitives";

// The video only starts once the opening "window" is (almost) fully open, and pauses if it closes again
const OPEN_PLAY_AT = 0.98;
const OPEN_PAUSE_BELOW = 0.9;

export function BehindTheScience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nearScreen = useRef(false);
  const hasStarted = useRef(false);

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

  // Start playback only when the window is fully open (from the first frame the first time),
  // pause again if the user scrolls back up and it starts closing
  const syncPlayback = (open: number) => {
    const video = videoRef.current;
    if (!video || !nearScreen.current) return;
    if (open >= OPEN_PLAY_AT && video.paused) {
      if (!hasStarted.current) {
        video.currentTime = 0;
        hasStarted.current = true;
      }
      video.play().catch(() => {});
    } else if (open < OPEN_PAUSE_BELOW && !video.paused) {
      video.pause();
    }
  };

  useMotionValueEvent(openSmooth, "change", (v) => {
    if (animate) syncPlayback(v);
  });

  // Starts buffering once the section is near the screen (so it's ready the moment the window opens),
  // pauses while off screen. Reduced-motion users have no opening animation, so it simply plays in view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        nearScreen.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          if (!animate) video.play().catch(() => {});
          else syncPlayback(openSmooth.get());
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return (
    // md+: the section is taller than the screen, so the frame pins below the navbar and the whole
    // video stays in view (filling the screen) for a while before the page moves on.
    // Phones: an edge-to-edge 16:9 banner (no frame, square corners) that opens as it scrolls in.
    <section
      ref={sectionRef}
      id="engineering"
      className="relative w-full select-none md:h-[calc(170svh-116px)] bg-midnight"
    >
      {/* Heading kept for screen readers / SEO only — the video carries the section visually */}
      <h2 className="sr-only">The System</h2>

      <div className="md:sticky md:top-[116px] w-full aspect-video md:aspect-auto md:h-[calc(100svh-116px)] overflow-hidden">
        {/* The window */}
        <motion.div
          className="relative w-full h-full overflow-hidden bg-black will-change-transform shadow-2xl"
          style={animate ? { scaleX: frameScaleX, scaleY: frameScaleY } : undefined}
        >
          {/* Full-size content, counter-scaled so it never stretches while the window opens */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={animate ? { scaleX: contentScaleX, scaleY: contentScaleY } : undefined}
          >
            {/* Colourpig spectrum accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/15 z-20" />

            {/* Video layer overhangs top and bottom so the parallax drift never shows an edge */}
            <motion.div className="absolute inset-x-0 -top-[6%] -bottom-[6%]" style={animate ? { y: videoY } : undefined}>
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-full object-cover bg-black"
              >
                <source src="/brand-assets/videos/colourpig-system.mp4" type="video/mp4" />
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
