"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ShadeProduct } from "@/data/shades";
import { EASE } from "@/components/motion/motion-primitives";

/* ==========================================================================
   PRODUCT HIGHLIGHTS — editorial zig-zag grid (image tile ⇄ copy tile).
   Every tile is specific to the selected shade only.
   Assets: public/brand-assets/PDP Images/<shade folder>/ (4000×4000 squares)
   ========================================================================== */

type Highlight = {
  id: string;
  src: string;
  alt: string;
  title: string;
  body: string;
};

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

export function ShadeHighlights({ shade }: { shade: ShadeProduct }) {
  const reduce = !!useReducedMotion();
  const highlights = buildHighlights(shade);

  return (
    <section id="shade-highlights" className="w-full bg-white py-14 sm:py-20">
      {/* Header — same type scale as the other product-page section titles */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-center px-4 mb-10 sm:mb-14"
      >
        <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
          Product Highlights
        </h2>
        <span aria-hidden className="mx-auto mt-4 block h-px w-14 bg-obsidian/40" />
      </motion.div>

      {/* Zig-zag grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        <div className="border-t border-ash/30">
          {highlights.map((h, i) => (
            <HighlightRow key={h.id} item={h} imageRight={i % 2 === 1} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

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

  // Gentle parallax drift of the photo inside its frame while scrolling
  const { scrollYProgress } = useScroll({ target: tileRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-2.5%", "2.5%"]);

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
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Image tile */}
      <div ref={tileRef} className={`relative aspect-square overflow-hidden bg-platinum/30 group ${imageRight ? "md:order-2" : ""}`}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { clipPath: closed }}
          animate={inView ? (reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }) : undefined}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.div className="absolute -inset-[3%]" style={{ y }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduce ? 1 : 1.18 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copy tile */}
      <div className={`flex items-center bg-white px-6 py-10 sm:px-12 md:aspect-square md:py-0 lg:px-20 ${imageRight ? "md:order-1" : ""}`}>
        <motion.div
          variants={copy}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-md"
        >
          <motion.h3
            variants={line}
            className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight"
          >
            {item.title}
          </motion.h3>
          <motion.span
            aria-hidden
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } } }}
            className="my-5 block h-px w-12 origin-left bg-obsidian/40"
          />
          <motion.p variants={line} className="text-xs sm:text-sm font-mono text-obsidian leading-relaxed">
            {item.body}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default ShadeHighlights;
