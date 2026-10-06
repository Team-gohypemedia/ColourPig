"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function BehindTheScience() {
  return (
    <section id="engineering" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          THE SYSTEM
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* 2. Dual Split Full-Bleed Editorial Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Banner 1: Norman & Brown Formulation Atelier */}
        <div className="relative rounded-lg overflow-hidden border border-brand/60 bg-toc min-h-[420px] sm:min-h-[540px] flex flex-col justify-end p-6 sm:p-12 group shadow-xl">
          <Image
            src="/images/behind-scenes-lab.jpg"
            alt="Norman & Brown Formulation Laboratory"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142431] via-[#142431]/90 to-black/25" />

          {/* Color accent top border */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FFC72C] via-[#F08EAB] to-[#00A3E0]" />

          <div className="relative z-10 space-y-3 sm:space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
              01 • NORMAN &amp; BROWN
            </span>
            <h3 className="font-headline font-bold text-xl sm:text-3xl text-white leading-tight">
              Salon color. <br />
              <span className="font-light text-ash">Made in Sydney, Australia.</span>
            </h3>
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Formulated by Norman Brown for professional salon results at home. Gentle on roots with natural shine and zero brassiness.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFC72C] group-hover:text-white transition-colors">
              <span>Learn About The Formula</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Banner 2: Reusable Air Dispenser */}
        <div className="relative rounded-lg overflow-hidden border border-brand/60 bg-toc min-h-[420px] sm:min-h-[540px] flex flex-col justify-end p-6 sm:p-12 group shadow-xl">
          <Image
            src="/images/product-dispenser.jpg"
            alt="Reusable Air-Driven Canister Dispenser"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142431] via-[#142431]/90 to-black/25" />

          {/* Color accent top border */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF671F] via-[#7AC142] to-[#B584C4]" />

          <div className="relative z-10 space-y-3 sm:space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
              02 • REUSABLE DISPENSER
            </span>
            <h3 className="font-headline font-bold text-xl sm:text-3xl text-white leading-tight">
              Ready to use. <br />
              <span className="font-light text-ash">No mixing. No mess.</span>
            </h3>
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Air-driven canister dispenses the exact ratio of color and developer at the touch of a button. Multiple applications in one system.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00A3E0] group-hover:text-white transition-colors">
              <span>See The Dispenser</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
