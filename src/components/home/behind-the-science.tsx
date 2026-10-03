"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function BehindTheScience() {
  return (
    <section id="engineering" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
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
        <div className="relative rounded-3xl overflow-hidden border border-brand/60 min-h-[540px] flex flex-col justify-end p-8 sm:p-12 group shadow-2xl">
          <Image
            src="/images/behind-scenes-lab.jpg"
            alt="Norman & Brown Formulation Laboratory"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
              01 • NORMAN &amp; BROWN ATELIER
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white leading-tight">
              Decades of salon mastery <br />
              <span className="italic font-light text-ash">distilled into unoxidized dosing.</span>
            </h3>
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Developed by London colorist veterans. Our dual-chamber capsule isolates active pigment from air until the millisecond of release, delivering fresh vibrancy for 8 weeks in shower.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum group-hover:text-white transition-colors">
              <span>Read Laboratory Formulation Story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Banner 2: Aerospace Chrome Dispenser */}
        <div className="relative rounded-3xl overflow-hidden border border-brand/60 min-h-[540px] flex flex-col justify-end p-8 sm:p-12 group shadow-2xl">
          <Image
            src="/images/product-dispenser.jpg"
            alt="Aerospace Chrome Dispenser Engineering"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
              02 • HARDWARE ARCHITECTURE
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white leading-tight">
              A century of single-use waste <br />
              <span className="italic font-light text-ash">dismantled in one press.</span>
            </h3>
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Engineered with automotive precision. Proprietary air-compression replaces single-use aerosol canisters, delivering 10-20ml micrometric drops directly onto root follicles.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum group-hover:text-white transition-colors">
              <span>Explore The Engineering Whitepaper</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
