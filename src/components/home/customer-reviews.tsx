"use client";

import React from "react";
import Image from "next/image";
import { Star, CheckCircle } from "lucide-react";

const REVIEWS = [
  {
    name: "Emma S.",
    role: "Product Designer, 32",
    shade: "Ash Blond #1903",
    avatar: "/images/model-ash-blond.jpg",
    review:
      "I read specifications and dismiss hype. Sustainability matters only when engineered in. Colourpig cuts 90% waste with salon-grade pigment that actually stays unoxidized.",
  },
  {
    name: "Sophia M.",
    role: "Strategy VP, 38",
    shade: "Natural Brunette #2401",
    avatar: "/images/model-brunette.jpg",
    review:
      "Time is my currency. Traditional hair colour was a scheduling nightmare with guilt over plastic throwaways. Having Colourpig in my shower for 8 weeks is pure radical convenience.",
  },
  {
    name: "Claire D.",
    role: "Architect, 41",
    shade: "Auburn Russet #3204",
    avatar: "/images/model-auburn.jpg",
    review:
      "The chrome dispenser is automotive-grade industrial design. No messy chemical drip, no staining on the hairline. The root wand delivers exactly 10ml with micro-precision.",
  },
  {
    name: "Margaret T.",
    role: "Former Educator, 68",
    shade: "Platinum Silver #1105",
    avatar: "/images/model-silver.jpg",
    review:
      "Norman & Brown's salon heritage gave me immediate trust. Decades of gray coverage made simple, intuitive, and dignified. It's the first time hair care felt designed by engineers.",
  },
];

export function CustomerReviews() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          WHAT OUR CLIENTS SAY
        </h2>
        <p className="text-[11px] font-mono tracking-widest uppercase text-graphite font-semibold">
          REAL REVIEWS FROM REAL CLIENTS
        </p>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 4 Cards Grid with Crisp White Cards floating on Image 3 (#CED1D0) Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-white text-obsidian border border-black/5 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header with Real Portrait Avatar and Stars */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-black/10 shadow-sm">
                <Image
                  src={rev.avatar}
                  alt={rev.name}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
            </div>

            {/* Review Quote */}
            <p className="text-xs font-normal text-obsidian leading-relaxed text-center italic">
              &ldquo;{rev.review}&rdquo;
            </p>

            {/* Footer Client Details */}
            <div className="pt-4 border-t border-black/10 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-headline font-bold text-xs text-obsidian">
                  {rev.name}
                </span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[10px] font-mono text-graphite font-medium">{rev.role}</p>
              <p className="text-[9px] font-mono text-graphite/80">
                Verified: {rev.shade}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
