"use client";

import React from "react";
import Image from "next/image";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const COMMUNITY_POSTS = [
  {
    id: 1,
    shade: "#1903 Blonde",
    user: "@emma.studio",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    shade: "#2401 Brunette",
    user: "@sophia.consults",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    shade: "#0802 Noir",
    user: "@studio_noir",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    shade: "#3204 Auburn",
    user: "@claire.paris",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    shade: "#1105 Silver",
    user: "@silver.demure",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    shade: "#2712 Chestnut",
    user: "@normanbrown.salon",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    shade: "#1903 Honey",
    user: "@alexa_style",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    shade: "#2401 Espresso",
    user: "@marcus.hair",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
];

export function AirheadsCommunity() {
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          REAL RESULTS • #AIRHEADS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          COMMUNITY ARCHIVE
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Grid with Real Unsplash Client Photography */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {COMMUNITY_POSTS.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square rounded-xl sm:rounded-2xl bg-[#EAECEB] border border-ash/30 overflow-hidden cursor-pointer flex flex-col justify-between p-3 sm:p-4 transition-all duration-300 hover:border-obsidian hover:shadow-xl shadow-xs"
          >
            {/* Photographic Image */}
            <Image
              src={post.image}
              alt={post.user}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Subtle Gradient Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 group-hover:via-black/10 transition-colors" />

            <div className="relative z-10 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/90 font-medium">
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur border border-white/20">
                {post.shade}
              </span>
              <InstagramIcon className="w-3.5 h-3.5 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="relative z-10 text-left">
              <span className="font-mono text-xs sm:text-sm text-white font-bold drop-shadow">
                {post.user}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
