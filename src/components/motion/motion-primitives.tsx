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
// Image tile reveal (once): the card root watches itself; its image wipes up from
// the bottom while zooming out, and its label rises in shortly after.
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
        initial={{ scale: 1 }}
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
// LetterTitle / LetterCopy: banner title that types in letter by letter, then its
// copy fades up. Plays ONCE, the first time the banner is mostly in view.
//   const { ref, revealed } = useRevealOnce<HTMLDivElement>();
// ---------------------------------------------------------------------------
export function useRevealOnce<T extends Element>(amount = 0.6) {
  const ref = useRef<T>(null);
  const revealed = useInView(ref, { once: true, amount });
  return { ref, revealed };
}

export function LetterTitle({
  text,
  revealed,
  className,
  wordColors,
}: {
  text: string;
  revealed: boolean;
  className?: string;
  /** Optional colour per word (cycles if there are more words than colours) */
  wordColors?: string[];
}) {
  const reduce = useReducedMotionAfterMount();
  const colorOf = (w: number) => (wordColors?.length ? { color: wordColors[w % wordColors.length] } : undefined);
  if (reduce)
    return (
      <h3 className={className}>
        {text.split(" ").map((word, w) => (
          <React.Fragment key={w}>
            {w > 0 && " "}
            <span style={colorOf(w)}>{word}</span>
          </React.Fragment>
        ))}
      </h3>
    );
  let i = 0;
  return (
    <h3 className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 && " "}
          {/* Letters of a word stay together so wrapping still happens between words */}
          <span className="inline-block whitespace-nowrap" aria-hidden="true" style={colorOf(w)}>
            {Array.from(word).map((ch) => {
              const delay = 0.1 + i++ * 0.075;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.6em" }}
                  animate={revealed ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.6, ease: EASE, delay }}
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

export function LetterCopy({
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
      initial={{ opacity: 0, y: 12 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
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

// ---------------------------------------------------------------------------
// StickyUnder: a section that stops moving once its bottom reaches the bottom of
// the screen, so the next section (positioned above it, z-10) slides up over it
// like a card. Wrap both in one container so it is released when they end.
// ---------------------------------------------------------------------------
export function StickyUnder({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Stick when the bottom edge meets the viewport bottom: top = viewport height - own height
    const update = () => setTop(window.innerHeight - el.offsetHeight);
    const ro = new ResizeObserver(update); // also fires once right away with the initial size
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div ref={ref} className={`sticky z-0 ${className ?? ""}`} style={top === null ? undefined : { top }}>
      {children}
    </div>
  );
}
