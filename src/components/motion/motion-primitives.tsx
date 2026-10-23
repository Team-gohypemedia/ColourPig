"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** House easing: fast out, long soft settle */
export const EASE = [0.16, 1, 0.3, 1] as const;

const noopSubscribe = () => () => {};
/** false during SSR and hydration, true afterwards (for scroll-linked styles that must not cause a hydration mismatch) */
export function useHasMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/** prefers-reduced-motion, but false until hydrated, since the server can't know it and markup must match */
function useReducedMotionAfterMount() {
  const reduce = useReducedMotion();
  return useHasMounted() && !!reduce;
}

// ---------------------------------------------------------------------------
// Reveal: fade-up once when scrolled into view (section headings, blocks)
// Renders a plain motion.div with the caller's className, so layout is unchanged.
// ---------------------------------------------------------------------------
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerItem: grid / list item that rises and settles, staggered by index
// ---------------------------------------------------------------------------
export function StaggerItem({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.07 }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Image tile reveal: the card root watches itself; its image wipes up from the
// bottom while zooming out, and its label rises in shortly after.
//   <RevealCard index={i} className="..."> ... <RevealImage>img</RevealImage> ... <RevealLabel>text</RevealLabel>
// ---------------------------------------------------------------------------
const RevealCardContext = createContext<{ inView: boolean; delay: number; reduce: boolean }>({
  inView: true,
  delay: 0,
  reduce: true,
});

export function RevealCard({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotionAfterMount();
  return (
    <div ref={ref} className={className}>
      <RevealCardContext.Provider value={{ inView, delay: index * 0.1, reduce }}>{children}</RevealCardContext.Provider>
    </div>
  );
}

/** Fills its (relative, overflow-hidden) frame; wrap the image / image link with it */
export function RevealImage({ children }: { children: React.ReactNode }) {
  const { inView, delay, reduce } = useContext(RevealCardContext);
  // After the wipe, drop the clip-path entirely so nothing (hover zoom, focus rings) is ever clipped by it
  const [done, setDone] = useState(false);
  if (reduce) return <div className="absolute inset-0">{children}</div>;
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      transition={{ duration: 1.1, ease: EASE, delay }}
      onAnimationComplete={() => inView && setDone(true)}
      style={done ? { clipPath: "none" } : undefined}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 1.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function RevealLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  const { inView, delay } = useContext(RevealCardContext);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay: delay + 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ParallaxLayer: an image layer slightly taller than its frame that drifts
// against the scroll. Put it inside a relative, overflow-hidden frame.
// ---------------------------------------------------------------------------
export function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionAfterMount();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Layer overhangs the frame by 7% top and bottom; ±5% of its own height stays inside that overhang
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <motion.div ref={ref} className="absolute inset-x-0 -top-[7%] -bottom-[7%]" style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ReplayTitle: banner title that animates letter by letter every time the
// banner comes (mostly) into view, and resets once it has fully left.
// Pair with ReplayCopy for the line beneath it.
// ---------------------------------------------------------------------------
export function useReplayReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) setRevealed(true);
        else if (entry.intersectionRatio < 0.03) setRevealed(false);
      },
      { threshold: [0, 0.03, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, revealed };
}

export function ReplayTitle({
  text,
  revealed,
  className,
}: {
  text: string;
  revealed: boolean;
  className?: string;
}) {
  const reduce = useReducedMotionAfterMount();
  if (reduce) return <h3 className={className}>{text}</h3>;
  let i = 0;
  return (
    <h3 className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 && " "}
          {/* Letters of a word stay together so wrapping still happens between words */}
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {Array.from(word).map((ch) => {
              const delay = 0.1 + i++ * 0.075;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={false}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.6em" }}
                  transition={revealed ? { duration: 0.6, ease: EASE, delay } : { duration: 0 }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        </React.Fragment>
      ))}
    </h3>
  );
}

export function ReplayCopy({
  children,
  revealed,
  className,
}: {
  children: React.ReactNode;
  revealed: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={revealed ? { duration: 0.7, ease: EASE, delay: 0.55 } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SwapText: small y-fade whenever the value changes (counters, captions)
// ---------------------------------------------------------------------------
export function SwapText({ value, className }: { value: string | number; className?: string }) {
  return (
    <span className={`inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        key={value}
        className="col-start-1 row-start-1"
        initial={{ opacity: 0, y: "60%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {value}
      </motion.span>
    </span>
  );
}
