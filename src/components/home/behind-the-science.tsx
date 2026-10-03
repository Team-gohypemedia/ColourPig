"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export function BehindTheScience() {
  return (
    <section id="engineering" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          NORMAN &amp; BROWN ATELIER
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          BEHIND THE SCIENCE
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Dual Split Editorial Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1: Aerospace Chrome Dispenser Engineering */}
        <div className="relative rounded-3xl bg-gradient-to-b from-steel/50 via-midnight to-obsidian border border-brand/60 p-8 sm:p-12 min-h-[480px] flex flex-col justify-between overflow-hidden group">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ash">
              01 • PROPRIETARY HARDWARE
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-platinum leading-tight">
              A century of single-use <br />
              <span className="italic font-light text-ash">dismantled in one click.</span>
            </h3>
          </div>

          <div className="space-y-4 pt-12">
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Engineered with automotive tolerances. Air-driven compression forces micro-droplets directly onto the follicle line without messy spray bottles or aerosol propellants.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum group-hover:text-white transition-colors">
              <span>Read Engineering Whitepaper</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Banner 2: Salon Mastery Lineage */}
        <div className="relative rounded-3xl bg-gradient-to-b from-midnight via-steel/30 to-obsidian border border-brand/60 p-8 sm:p-12 min-h-[480px] flex flex-col justify-between overflow-hidden group">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ash">
              02 • NORMAN &amp; BROWN MASTERY
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-platinum leading-tight">
              Salon-grade unoxidized <br />
              <span className="italic font-light text-ash">pigment in your shower.</span>
            </h3>
          </div>

          <div className="space-y-4 pt-12">
            <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
              Developed by London colorist veterans. Our dual-chamber aluminum capsule keeps peroxide and base separate until the millisecond of release, delivering fresh vibrancy for 8 weeks.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum group-hover:text-white transition-colors">
              <span>Explore The Formulation Standards</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
