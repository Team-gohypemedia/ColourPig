"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/motion-primitives";

const RITUAL_STEPS = [
  {
    step: "01",
    title: "USE ME",
    subtitle: "AIR-DRIVEN DISPENSER",
    image: "/images/ritual_step_1_icon.png",
  },
  {
    step: "02",
    title: "IN ME",
    subtitle: "APPLICATION TRAY",
    image: "/images/ritual_step_2_icon.png",
  },
  {
    step: "03",
    title: "WITH ME",
    subtitle: "PRECISION BRUSH",
    image: "/images/ritual_step_3_icon.png",
  },
  {
    step: "04",
    title: "DEVELOP ME",
    subtitle: "30-MIN TIMER",
    image: "/images/ritual_step_4_icon.png",
  },
  {
    step: "05",
    title: "RINSE WITH ME",
    subtitle: "SHAMPOO & CARE",
    image: "/images/ritual_step_5_icon.png",
  },
  {
    step: "06",
    title: "WIPE WITH ME",
    subtitle: "STAIN REMOVER",
    image: "/images/ritual_step_6_icon.png",
  },
];

export function InShowerRitual() {
  return (
    <section className="py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-12 xl:px-16 w-full select-none flex flex-col items-center justify-center text-center">
      {/* Title */}
      <Reveal className="text-center max-w-xl mx-auto mb-4 sm:mb-5 lg:mb-6 w-full">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-[34px] text-white tracking-wider uppercase leading-tight">
          THE RITUAL
        </h2>
      </Reveal>

      {/* Grid of All 6 Steps - Fully Visible Without Slider */}
      <Reveal className="relative w-full max-w-[1300px] mx-auto flex items-center justify-center" amount={0.2} delay={0.1}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 lg:gap-4 xl:gap-6 w-full max-w-[1300px] mx-auto place-items-center items-center justify-center">
          {RITUAL_STEPS.map((item) => (
            <div
              key={item.step}
              className="w-full group relative rounded-lg bg-transparent border-0 p-1 flex flex-col items-center justify-center text-center transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-[1.02]"
            >
              {/* Clean Step Title (Montserrat bold modern uppercase) */}
              <h3 className="font-montserrat font-bold text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs lg:text-[13px] tracking-wide sm:tracking-[0.2em] uppercase text-white mb-1.5 sm:mb-2 text-center whitespace-nowrap">
                {item.title}
              </h3>

              {/* Packaging Illustration Frame - Clean Transparent */}
              <div className="relative w-full aspect-[4/3] max-w-[85px] min-[360px]:max-w-[100px] sm:max-w-[125px] lg:max-w-[145px] xl:max-w-[160px] mx-auto bg-transparent flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 1024px) 140px, 160px"
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default InShowerRitual;
