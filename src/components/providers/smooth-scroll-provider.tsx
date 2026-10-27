"use client";

import React, { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MotionConfig } from "framer-motion";

import { scrollToStarterSystems } from "@/lib/scroll-utils";

function RouteScrollReset() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // If navigating to a specific hash anchor (e.g. #reviews), don't override
    if (typeof window !== "undefined") {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(0, { immediate: true });
        }

        // Re-assert after layout paint to guarantee page opens from the top
        const timer = setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          const currentLenis = (window as any).lenis;
          if (currentLenis && typeof currentLenis.scrollTo === "function") {
            currentLenis.scrollTo(0, { immediate: true });
          }
        }, 50);

        return () => clearTimeout(timer);
      } else {
        // If navigating to a specific hash anchor (e.g. #shades), smoothly scroll to target element
        const hash = window.location.hash.slice(1);
        const timer = setTimeout(() => {
          if (hash === "shades") {
            scrollToStarterSystems();
            return;
          }
          const el = document.getElementById(hash);
          if (el) {
            const currentLenis = (window as any).lenis;
            if (currentLenis && typeof currentLenis.scrollTo === "function") {
              currentLenis.scrollTo(el, { offset: -120 });
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, 200);

        return () => clearTimeout(timer);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

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

    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      bodyObserver.disconnect();
      delete (window as any).lenis;
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user": framer-motion drops transform/layout animations when the OS asks for reduced motion
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <RouteScrollReset />
      </Suspense>
      <div className="smooth-scroll-wrapper">{children}</div>
    </MotionConfig>
  );
}
