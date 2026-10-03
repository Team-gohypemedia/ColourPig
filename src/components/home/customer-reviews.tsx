"use client";

import React from "react";
import { Star, CheckCircle } from "lucide-react";

const REVIEWS = [
  {
    name: "Emma S.",
    role: "Product Designer, 32",
    shade: "Ash Blond #1903",
    avatarInitial: "ES",
    avatarBg: "#C9A77D",
    review:
      "I read specifications and dismiss hype. Sustainability matters only when engineered in. Colourpig cuts 90% waste with salon-grade pigment that actually stays unoxidized.",
  },
  {
    name: "Sophia M.",
    role: "Strategy VP, 38",
    shade: "Natural Brunette #2401",
    avatarInitial: "SM",
    avatarBg: "#432E20",
    review:
      "Time is my currency. Traditional hair colour was a scheduling nightmare with guilt over plastic throwaways. Having Colourpig in my shower for 8 weeks is pure radical convenience.",
  },
  {
    name: "Claire D.",
    role: "Architect, 41",
    shade: "Obsidian Black #0802",
    avatarInitial: "CD",
    avatarBg: "#1A1A1E",
    review:
      "The chrome dispenser is automotive-grade industrial design. No messy chemical drip, no staining on the hairline. The root wand delivers exactly 10ml with micro-precision.",
  },
  {
    name: "Margaret T.",
    role: "Former Educator, 68",
    shade: "Platinum Silver #1105",
    avatarInitial: "MT",
    avatarBg: "#949FA3",
    review:
      "Norman & Brown's salon heritage gave me immediate trust. Decades of gray coverage made simple, intuitive, and dignified. It's the first time hair care felt designed by engineers.",
  },
];

export function CustomerReviews() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          VERIFIED IN-SHOWER EXPERIENCES
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          WHAT OUR CLIENTS SAY
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-midnight border border-brand/50 flex flex-col justify-between space-y-6 hover:border-platinum/60 transition-all duration-300"
          >
            {/* Header with Avatar and Stars */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-headline font-bold text-sm text-white shadow-md"
                style={{ backgroundColor: rev.avatarBg }}
              >
                {rev.avatarInitial}
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>

            {/* Review Quote */}
            <p className="text-xs font-light text-platinum leading-relaxed text-center italic">
              &ldquo;{rev.review}&rdquo;
            </p>

            {/* Footer Client Details */}
            <div className="pt-4 border-t border-brand/40 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-headline font-bold text-xs text-white">
                  {rev.name}
                </span>
                <CheckCircle className="w-3 h-3 text-emerald-400" />
              </div>
              <p className="text-[10px] font-mono text-ash">{rev.role}</p>
              <p className="text-[9px] font-mono text-ash/80">
                Verified: {rev.shade}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
