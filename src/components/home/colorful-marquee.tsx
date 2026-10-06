"use client";

import React from "react";

const MARQUEE_ITEMS = [
  {
    type: "lockup",
    content: (
      <span className="font-headline font-black tracking-wider uppercase">
        <span className="text-[#FFC72C]">GREY</span>{" "}
        <span className="text-[#F08EAB]">TOUCH</span>{" "}
        <span className="text-[#00A3E0]">UP</span>
      </span>
    ),
  },
  {
    type: "text",
    color: "#FF671F",
    text: "AIR DRIVEN DISPENSER",
  },
  {
    type: "text",
    color: "#7AC142",
    text: "NO MIXING • NO MESS",
  },
  {
    type: "text",
    color: "#B584C4",
    text: "PERMANENT SYSTEM",
  },
  {
    type: "text",
    color: "#00A3E0",
    text: "REUSABLE CANISTER HARDWARE",
  },
  {
    type: "text",
    color: "#F08EAB",
    text: "NORMAN & BROWN SYDNEY",
  },
  {
    type: "text",
    color: "#FFC72C",
    text: "30-MINUTE DEVELOPMENT",
  },
  {
    type: "text",
    color: "#7AC142",
    text: "SALON GRADE PIGMENTS",
  },
  {
    type: "text",
    color: "#FF671F",
    text: "DUAL-CHAMBER DELIVERY",
  },
  {
    type: "text",
    color: "#B584C4",
    text: "PANTONE COLOUR SCIENCE",
  },
];

export function ColorfulMarquee() {
  const renderItemSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
      {MARQUEE_ITEMS.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <div className="flex items-center shrink-0">
            {item.type === "lockup" ? (
              item.content
            ) : (
              <span
                className="font-headline font-black text-xs sm:text-sm tracking-[0.22em] uppercase whitespace-nowrap transition-transform hover:scale-105"
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
              color: [
                "#FFC72C",
                "#F08EAB",
                "#00A3E0",
                "#FF671F",
                "#7AC142",
                "#B584C4",
              ][idx % 6],
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
