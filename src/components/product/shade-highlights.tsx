"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ShadeProduct } from "@/data/shades";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/catalog";
import { EASE } from "@/components/motion/motion-primitives";

/* ==========================================================================
   PRODUCT HIGHLIGHTS — editorial image/copy rows for the key stories, the
   six application steps side by side, a swipeable card row for the rest and
   a "find your number" banner.
   Every tile is specific to the selected shade only.
   Images come from the shade's Shopify product (the infographic series,
   recognised by file name); shades without them use
   public/brand-assets/PDP Images/<shade folder>/ (4000×4000 squares).
   ========================================================================== */

type Highlight = {
  id: string;
  src: string;
  alt: string;
  title: string;
  body: string;
  /** Image carries its own text near the edges, so it must not be cropped */
  infographic?: boolean;
  /** One of the application-step images, shown in the steps block */
  step?: boolean;
};

/**
 * Copy for each image in a shade's Shopify infographic series, matched on the
 * file name ("05SymptomcheckNo.4.jpg"). Listed in the order the rows appear.
 */
const SHOPIFY_SERIES: { id: string; file: RegExp; title: string; body: string }[] = [
  {
    id: "symptoms",
    file: /symptom/i,
    title: "Sound familiar?",
    body: "Grey roots back again, a colour darker than the box promised, and a whole kit used up just to touch up your roots.",
  },
  {
    id: "women",
    file: /women/i,
    title: "Women told us",
    body: "We shared the idea before launch. The reaction: they couldn't wait to try it.",
  },
  {
    id: "how",
    file: /howitworks|how_it_works/i,
    title: "Air driven",
    body: "PIGment and developer sit in separate chambers. Air dispenses them together in a fixed, equal ratio, even when you only need enough for your roots.",
  },
  {
    id: "kit",
    file: /starterkit|starter_kit/i,
    title: "Your Starter Kit",
    body: "The dispenser with your first cartridge, a tint brush, cape and gloves, instructions, and after-colour shampoo, conditioner and stain remover sachets. The lid doubles as your bowl.",
  },
  {
    id: "box",
    file: /thebox|vsbox/i,
    title: "Not another box",
    body: "Box colour means mixing the lot for a single use, then using it or throwing it out. Colourpig needs no mixing, lasts multiple uses, and the rest keeps.",
  },
  {
    id: "before-after",
    file: /beforeandafter|before_and_after/i,
    title: "Real tester. No filter.",
    body: "Unretouched before and after photos from a real tester's roots.",
  },
  {
    id: "steps-1",
    file: /sixsteps1|steps1to3/i,
    title: "Six steps: 1 to 3",
    body: "Dispense into the lid, pick up the brush and apply straight to your roots.",
  },
  {
    id: "steps-2",
    file: /sixsteps4|steps4to6/i,
    title: "Six steps: 4 to 6",
    body: "Develop for 30 minutes, rinse with the after-colour shampoo and conditioner, then wipe away any marks with the stain remover.",
  },
  {
    id: "specialists",
    file: /specialist/i,
    title: "Made by colour specialists",
    body: "Created by Ian and John, colour specialists.",
  },
  {
    id: "cost",
    file: /costperuse|cost_per_use/i,
    title: "Cost per use",
    body: "One kit covers several root touch-ups, so each colour costs less per use, and less again with a refill subscription.",
  },
  {
    id: "risk",
    file: /riskreversal|risk/i,
    title: "Easy to try",
    body: "Replaced if faulty, cancel your subscription anytime, and whatever you don't use keeps for next time.",
  },
  {
    id: "find",
    file: /findyourshade|find_your_shade/i,
    title: "Not sure of your number?",
    body: "Answer a few quick questions in the shade finder and we'll match you to your number.",
  },
];

const fileName = (url: string) => decodeURIComponent(url.split("?")[0].split("/").pop() ?? "");

/** Highlights built from the shade's Shopify images; empty if it has none of the series. */
function buildShopifyHighlights(shade: ShadeProduct, gallery: GalleryItem[]): Highlight[] {
  const images = gallery.filter((g) => g.type === "image");
  return SHOPIFY_SERIES.flatMap((row) => {
    const image = images.find((g) => row.file.test(fileName(g.src)));
    return image
      ? [{ id: row.id, src: image.src, alt: image.alt || `${shade.name}: ${row.title}`, title: row.title, body: row.body, infographic: true, step: row.id.startsWith("steps") }]
      : [];
  });
}

function buildHighlights(shade: ShadeProduct): Highlight[] {
  const isClear = shade.id === "shade-0-0";
  const n = isClear ? "0-0" : shade.id.replace("shade-", "");
  const dir = `/brand-assets/PDP Images/Shade ${isClear ? "0_0" : `0${n}`}`;
  const ext = n === "3" ? "png" : "jpg"; // Shade 03 ships as PNG
  const file = (name: string) => `${dir}/${name}.${ext}`;
  // Shade 08's grey-coverage file has a different name in the source folder
  const coverage = n === "8" ? file("Image Listing 04 (3)") : file("Image Listing 04");

  const name = shade.name.replace(shade.code, "").trim();

  return [
    {
      id: "canister",
      src: file("Main Image 01"),
      alt: `${shade.name} Colourpig canister`,
      title: shade.name,
      body: shade.description,
    },
    {
      id: "look",
      src: file("Image Listing 02"),
      alt: `${shade.name} worn by model`,
      title: "Your shade, worn",
      body: "Rich, even colour from root to tip — designed to read as your own, only fresher.",
    },
    {
      id: "coverage",
      src: coverage,
      alt: `${shade.name} before and after grey coverage`,
      title: "100% grey coverage",
      body: "Precisely applied colour refreshes visible grey and tops up your shade between appointments.",
    },
    {
      id: "develop",
      src: file("Image Listing 03"),
      alt: `${shade.name} results on different starting colours`,
      title: "See it develop",
      body: `How ${name} settles on lighter, mid and darker starting hair.`,
    },
    {
      id: "ritual",
      src: file("Image Listing 06"),
      alt: `${shade.name} four-step application ritual`,
      title: "Four steps. Thirty minutes.",
      body: "Dispense, brush, develop, rinse — no mixing bowls, no waste, the same precise dose every time.",
    },
  ];
}

/** Shopify highlights shown as large editorial rows (image beside copy) */
const FEATURE_IDS = new Set(["how", "before-after"]);
/** "Find your number" image: not shown here — the product page has the full shade band instead */
const CTA_ID = "find";

export function ShadeHighlights({ shade }: { shade: ShadeProduct & { gallery?: GalleryItem[] } }) {
  const reduce = !!useReducedMotion();
  const fromShopify = shade.gallery ? buildShopifyHighlights(shade, shade.gallery) : [];

  // Shopify series: chosen stories as editorial rows, the steps as a pair and
  // the rest as a card row ("find your number" is left out).
  // Local images: the first two as editorial rows and the rest as cards.
  let features: Highlight[], steps: Highlight[], cards: Highlight[];
  if (fromShopify.length > 0) {
    features = fromShopify.filter((h) => FEATURE_IDS.has(h.id));
    steps = fromShopify.filter((h) => h.step);
    cards = fromShopify.filter((h) => !FEATURE_IDS.has(h.id) && !h.step && h.id !== CTA_ID);
  } else {
    const local = buildHighlights(shade);
    features = local.slice(0, 2);
    steps = [];
    cards = local.slice(2);
  }

  const fadeUp = {
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.8, ease: EASE },
  };
  const subheading =
    "text-center font-headline font-bold text-xl lg:text-[28px] text-obsidian tracking-wider uppercase leading-tight mb-8";

  return (
    <section id="shade-highlights" className="w-full bg-white py-14 sm:py-20">
      <motion.div {...fadeUp} className="text-center px-4 mb-10 sm:mb-14">
        <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
          Product Highlights
        </h2>
        <span aria-hidden className="mx-auto mt-4 block h-px w-14 bg-obsidian/40" />
      </motion.div>

      {/* Editorial zig-zag rows (image tile beside copy tile) */}
      {features.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-14">
          <div className="border-t border-ash/30">
            {features.map((h, i) => (
              <HighlightRow key={h.id} item={h} imageRight={i % 2 === 1} reduce={reduce} />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        {steps.length > 0 && (
          <motion.div {...fadeUp} className="mt-14 sm:mt-20">
            <h3 className={subheading}>Six steps</h3>
            {/* Side by side at every screen size */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
              {steps.map((s) => (
                <figure key={s.id}>
                  <HighlightImage item={s} sizes="(max-width: 640px) 50vw, 440px" />
                  <figcaption className="mt-2.5 sm:mt-4">
                    <p className="font-headline font-bold text-[11px] sm:text-base text-obsidian tracking-wider uppercase">
                      {s.title}
                    </p>
                    <p className="mt-1 sm:mt-1.5 text-[10px] leading-snug sm:text-sm sm:leading-relaxed font-mono text-obsidian">{s.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* Full-width card row (edge to edge, thin gaps) */}
      {cards.length > 0 && (
        <motion.div {...fadeUp} className="mt-14 sm:mt-20">
          <h3 className={`${subheading} px-4`}>Why Colourpig</h3>
          <HighlightCarousel items={cards} />
        </motion.div>
      )}
    </section>
  );
}

function HighlightImage({ item, sizes }: { item: Highlight; sizes: string }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-platinum/30 border border-ash/25">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        className={item.infographic ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

/** Editorial row: square image that reveals on scroll, beside its copy. */
function HighlightRow({
  item,
  imageRight,
  reduce,
}: {
  item: Highlight;
  imageRight: boolean;
  reduce: boolean;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  // Observe the (never-clipped) tile itself — observing the clipped layer never fires.
  const inView = useInView(tileRef, { once: true, amount: 0.25 });

  // Gentle parallax drift of the photo inside its frame while scrolling.
  // Infographics stay still and uncropped so their printed text isn't cut off.
  const still = reduce || !!item.infographic;
  const { scrollYProgress } = useScroll({ target: tileRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["-2.5%", "2.5%"]);

  const closed = imageRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";

  const copy = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: reduce ? 0 : 0.25 } },
  };
  const line = {
    hidden: { opacity: 0, x: reduce ? 0 : imageRight ? -24 : 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <div className="grid grid-cols-2">
      {/* Image tile */}
      <div ref={tileRef} className={`relative aspect-square overflow-hidden bg-platinum/30 group ${imageRight ? "order-2" : ""}`}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { clipPath: closed }}
          animate={inView ? (reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }) : undefined}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.div className={`absolute ${item.infographic ? "inset-0" : "-inset-[3%]"}`} style={{ y }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: still ? 1 : 1.18 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 580px"
                className={
                  item.infographic
                    ? "object-contain"
                    : "object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                }
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copy tile */}
      <div className={`flex items-center bg-white px-3 py-4 sm:px-10 md:aspect-square md:py-0 lg:px-16 ${imageRight ? "order-1" : ""}`}>
        <motion.div
          variants={copy}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-md"
        >
          <motion.h3
            variants={line}
            className="font-headline font-bold text-sm sm:text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight"
          >
            {item.title}
          </motion.h3>
          <motion.span
            aria-hidden
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } } }}
            className="my-2.5 sm:my-5 block h-px w-8 sm:w-12 origin-left bg-obsidian/40"
          />
          <motion.p variants={line} className="text-[10px] leading-snug sm:text-xs sm:leading-relaxed md:text-sm font-mono text-obsidian">
            {item.body}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

/** How long each position is shown before the row slides on (the active indicator fills over this time) */
const SLIDE_MS = 4000;

/**
 * Full-width row of large square cards with thin gaps (three across on desktop,
 * two on tablet, one and a peek on phones). It keeps sliding on by one card
 * every SLIDE_MS and loops back to the start; it only holds while a finger is
 * on it (so a swipe isn't fought). Arrow buttons (and the keyboard arrow keys)
 * move it by hand. Below it, one indicator per position: dots, with the current
 * one a short line that fills up like a loading bar until the next slide.
 */
function HighlightCarousel({ items }: { items: Highlight[] }) {
  const reduce = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState(items.length);
  const [touching, setTouching] = useState(false);

  /** Width of one card plus the gap after it */
  const step = (t: HTMLDivElement) => {
    const cards = t.children;
    return cards.length > 1
      ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
      : t.clientWidth;
  };

  // How many distinct start positions the row has at the current width
  // (e.g. 7 cards, 3 visible → 5 positions), and which one is showing
  const measure = () => {
    const t = trackRef.current;
    if (!t) return;
    const s = step(t);
    const visible = Math.max(1, Math.round(t.clientWidth / s));
    const count = Math.max(1, items.length - visible + 1);
    setPositions(count);
    setActive(Math.min(count - 1, Math.round(t.scrollLeft / s)));
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const goTo = (index: number) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollTo({ left: index * step(t), behavior: reduce ? "auto" : "smooth" });
  };

  const next = () => goTo((active + 1) % positions);
  const prev = () => goTo((active - 1 + positions) % positions);

  // Slide on once the current indicator has filled; restarts whenever the position changes
  useEffect(() => {
    if (reduce || touching || positions < 2) return;
    const timer = window.setTimeout(() => goTo((active + 1) % positions), SLIDE_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, touching, positions, reduce]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  const arrow =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-obsidian border border-ash/30 shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:bg-obsidian hover:text-white hover:border-obsidian transition-all active:scale-95 cursor-pointer " +
    // Laptop/desktop: only while the row is hovered (or an arrow has keyboard focus); always shown on touch screens
    "lg:opacity-0 lg:pointer-events-none lg:group-hover/why:opacity-100 lg:group-hover/why:pointer-events-auto lg:focus-visible:opacity-100 lg:focus-visible:pointer-events-auto";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Why Colourpig"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="focus-visible:outline-none"
    >
      <div className="relative group/why">
      <div
        ref={trackRef}
        onScroll={measure}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
        className="relative flex gap-1.5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <figure
            key={item.id}
            className="relative snap-start shrink-0 aspect-square w-[88%] sm:w-[calc((100%-0.375rem)/2)] lg:w-[calc((100%-0.75rem)/3)] bg-platinum/30"
          >
            {/* The image carries its own headline, so no caption is needed */}
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 34vw"
              className={item.infographic ? "object-contain" : "object-cover"}
            />
          </figure>
        ))}
      </div>

      {positions > 1 && (
        <>
          <button type="button" onClick={prev} className={`${arrow} left-3 sm:left-5`} aria-label="Previous highlight">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button type="button" onClick={next} className={`${arrow} right-3 sm:right-5`} aria-label="Next highlight">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}
      </div>

      {positions > 1 && (
        <div className="mt-4 px-4 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: positions }, (_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show highlight ${i + 1} of ${positions}`}
                aria-current={isActive}
                className={`relative h-1 rounded-full overflow-hidden transition-all duration-500 ease-out ${
                  isActive ? "w-8 bg-obsidian/15" : "w-1 bg-obsidian/30 hover:bg-obsidian/60"
                }`}
              >
                {isActive && (
                  <motion.span
                    // Restart the fill each time this position becomes active (or a touch ends)
                    key={`${active}-${touching}`}
                    className="absolute inset-y-0 left-0 w-full origin-left bg-obsidian"
                    initial={{ scaleX: reduce || touching ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduce || touching ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShadeHighlights;
