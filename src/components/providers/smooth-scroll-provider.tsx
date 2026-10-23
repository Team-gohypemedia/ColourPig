"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MotionConfig } from "framer-motion";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Native scrolling for anyone who asked the OS for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: true,
      // Scrollable panels (drawers, modals, carousels) scroll themselves instead of the page
      allowNestedScroll: true,
      touchMultiplier: 2,
    });

    // Pause Lenis when modal/drawers lock body scroll, resume when unlocked
    const bodyObserver = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      bodyObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user": framer-motion drops transform/layout animations when the OS asks for reduced motion
  return (
    <MotionConfig reducedMotion="user">
      <div className="smooth-scroll-wrapper">{children}</div>
    </MotionConfig>
  );
}
