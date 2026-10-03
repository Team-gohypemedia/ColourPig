"use client";

import React from "react";
import { SnoutIcon } from "@/components/brand/logo";

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
  { id: 1, shade: "#1903", user: "@emma.studio", hex: "#C9A77D" },
  { id: 2, shade: "#2401", user: "@sophia.consults", hex: "#432E20" },
  { id: 3, shade: "#0802", user: "@studio_noir", hex: "#1A1A1E" },
  { id: 4, shade: "#3204", user: "@claire.paris", hex: "#823824" },
  { id: 5, shade: "#1105", user: "@silver.demure", hex: "#D2D6DC" },
  { id: 6, shade: "#2712", user: "@normanbrown.salon", hex: "#5C4433" },
  { id: 7, shade: "#1903", user: "@alexa_style", hex: "#D4B28C" },
  { id: 8, shade: "#2401", user: "@marcus.hair", hex: "#3A281C" },
];

export function AirheadsCommunity() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          REAL RESULTS • #AIRHEADS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          COMMUNITY ARCHIVE
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Grid with Clean Light Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {COMMUNITY_POSTS.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square rounded-2xl bg-white border border-ash/30 overflow-hidden cursor-pointer flex flex-col justify-between p-4 transition-all duration-300 hover:border-obsidian hover:shadow-lg"
          >
            {/* Visual gradient backdrop simulating user portrait / hair pigment on clean light base */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
              style={{
                background: `radial-gradient(circle at 60% 40%, ${post.hex} 0%, #CED1D0 90%)`,
              }}
            />

            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-graphite font-semibold">
              <span>{post.shade}</span>
              <InstagramIcon className="w-3.5 h-3.5 text-obsidian opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="relative z-10 flex items-center justify-center my-auto">
              <SnoutIcon className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity" color="#0D151C" />
            </div>

            <div className="relative z-10 text-center">
              <span className="font-mono text-xs text-obsidian font-bold">
                {post.user}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
