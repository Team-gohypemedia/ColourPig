"use client";

import React from "react";

const MARQUEE_ITEMS = [
  {
    type: "lockup",
    content: (
      <span className="font-headline font-bold text-base sm:text-lg tracking-wider uppercase">
        <span className="text-white">GREY TOUCH UP</span>
      </span>
    ),
  },
  {
    type: "text",
    color: "#E5E5E5",
    text: "NO MIXING",
  },
  {
    type: "text",
    color: "#E5E5E5",
    text: "REUSABLE",
  },
  {
    type: "text",
    color: "#E5E5E5",
    text: "AIR DRIVEN DISPENSER",
  },
  {
    type: "text",
    color: "#E5E5E5",
    text: "9 NATURAL BASE SHADES",
  },
  {
    type: "text",
    color: "#E5E5E5",
    text: "100% GREY COVERAGE",
  },
];

// The list is short, so repeat it within each set to keep the ticker
// wider than large screens and avoid a visible gap in the loop.
const TICKER_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export function ColorfulMarquee() {
  const renderItemSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
      {TICKER_ITEMS.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <div className="flex items-center shrink-0">
            {item.type === "lockup" ? (
              item.content
            ) : (
              <span
                className="font-montserrat font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase whitespace-nowrap transition-transform hover:scale-105"
                style={{ color: item.color }}
              >
                {item.text}
              </span>
            )}
          </div>
          {/* Multi-colored separator star */}
          <span
            className="text-[10px] sm:text-xs shrink-0 select-none animate-pulse"
            style={{
              color: "#8A8A8A",
            }}
          >
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="relative w-full bg-black border-y border-white/10 py-3.5 sm:py-4.5 overflow-hidden select-none z-30">
      {/* Subtle edge fade gradient mask */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling ticker */}
      <div className="animate-marquee flex items-center">
        {renderItemSet("set-1")}
        {renderItemSet("set-2")}
      </div>
    </div>
  );
}
