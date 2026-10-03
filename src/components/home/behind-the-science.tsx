"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function BehindTheScience() {
  return (
    <section id="engineering" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          BEHIND THE SCIENCE
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Dual Split Full-Bleed Editorial Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1: Norman & Brown Formulation Atelier */}
        <div className="relative rounded-3xl overflow-hidden border border-brand/60 bg-toc min-h-[540px] flex flex-col justify-end p-8 sm:p-12 group shadow-2xl">
          <Image
            src="/images/behind-scenes-lab.jpg"
            alt="Norman & Brown Formulation Laboratory"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142431] via-[#142431]/90 to-black/25" />

          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
              01 • NORMAN &amp; BROWN
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white leading-tight">
              Salon color mastery <br />
              <span className="italic font-light text-ash">in a reusable system.</span>
            </h3>
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Formulated in Australia by Norman Brown Pty Ltd. Dual-chamber technology preserves formula freshness for multiple root touch-ups.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum group-hover:text-white transition-colors">
              <span>Discover The Formula</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Banner 2: Reusable Air Dispenser */}
        <div className="relative rounded-3xl overflow-hidden border border-brand/60 bg-toc min-h-[540px] flex flex-col justify-end p-8 sm:p-12 group shadow-2xl">
          <Image
            src="/images/product-dispenser.jpg"
            alt="Reusable Air-Driven Canister Dispenser"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142431] via-[#142431]/90 to-black/25" />

          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
              02 • AIR-DRIVEN DISPENSER
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white leading-tight">
              No mixing. No aerosols. <br />
              <span className="italic font-light text-ash">Just press to dispense.</span>
            </h3>
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Engineered to replace single-use aerosol cans and plastic waste. Dispenses the exact ratio of colour base and developer with zero hassle.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum group-hover:text-white transition-colors">
              <span>Explore The Dispenser</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
