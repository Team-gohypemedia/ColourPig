"use client";

import React from "react";

export interface PantoneColor {
  code: string;
  label: string;
  name: string;
  hex: string;
  word: string;
}

export const PANTONE_PALETTE: PantoneColor[] = [
  {
    code: "123C",
    label: "PANTONE 123C",
    name: "Warm Golden Yellow",
    hex: "#FFC72C",
    word: "GREY",
  },
  {
    code: "1905C",
    label: "PANTONE 1905C",
    name: "Soft Rose Pink",
    hex: "#F08EAB",
    word: "TOUCH",
  },
  {
    code: "299C",
    label: "PANTONE 299C",
    name: "Vibrant Cyan Blue",
    hex: "#00A3E0",
    word: "UP",
  },
  {
    code: "165C",
    label: "PANTONE 165C",
    name: "Tangerine Orange",
    hex: "#FF671F",
    word: "AIR",
  },
  {
    code: "375C",
    label: "PANTONE 375C",
    name: "Fresh Lime Green",
    hex: "#7AC142",
    word: "DRIVEN",
  },
  {
    code: "2572C",
    label: "PANTONE 2572C",
    name: "Lilac Lavender",
    hex: "#B584C4",
    word: "SYSTEM",
  },
];

/**
 * 1. PantoneColorStrip
 * Faithfully reproduces the vertical or horizontal Pantone swatch block from brand guidelines.
 */
export function PantoneColorStrip({
  orientation = "horizontal",
  className = "",
  showLabels = false,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
  showLabels?: boolean;
}) {
  if (orientation === "vertical") {
    return (
      <div
        className={`inline-flex flex-col rounded-lg overflow-hidden shadow-2xl border border-white/10 ${className}`}
      >
        {PANTONE_PALETTE.map((color) => (
          <div
            key={color.code}
            style={{ backgroundColor: color.hex }}
            className="w-24 sm:w-28 h-10 sm:h-12 flex flex-col justify-center px-2.5 text-white transition-transform hover:scale-105"
          >
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider leading-none drop-shadow-xs">
              PANTONE
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-extrabold tracking-wider leading-none drop-shadow-xs">
              {color.code}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Horizontal layout
  return (
    <div
      className={`inline-flex items-center rounded-full p-1 bg-black/40 backdrop-blur-md border border-white/15 gap-1.5 shadow-lg ${className}`}
    >
      {PANTONE_PALETTE.map((color) => (
        <div
          key={color.code}
          style={{ backgroundColor: color.hex }}
          className="group relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-transform hover:scale-125 cursor-pointer shadow-xs"
          title={`${color.label} • ${color.name}`}
        >
          {showLabels && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-black text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow">
              {color.code}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * 2. PantoneSystemLockup
 * The exact typographic lockup from Image 2:
 * GREY TOUCH UP
 * AIR DRIVEN
 * SYSTEM
 */
export function PantoneSystemLockup({
  size = "default",
  align = "left",
  className = "",
}: {
  size?: "sm" | "default" | "lg" | "xl";
  align?: "left" | "center";
  className?: string;
}) {
  const sizeClasses = {
    sm: "text-lg sm:text-xl leading-tight font-bold tracking-tight",
    default: "text-2xl sm:text-3xl lg:text-4xl leading-[1.08] font-black tracking-tight",
    lg: "text-3xl sm:text-5xl lg:text-6xl leading-[1.05] font-black tracking-tighter",
    xl: "text-4xl sm:text-6xl lg:text-7xl leading-[1.02] font-black tracking-tighter",
  };

  const alignClasses = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`font-headline select-none ${sizeClasses[size]} ${alignClasses} ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3">
        <span style={{ color: "#FFC72C" }} className="hover:brightness-110 transition-all">
          GREY
        </span>
        <span style={{ color: "#F08EAB" }} className="hover:brightness-110 transition-all">
          TOUCH
        </span>
        <span style={{ color: "#00A3E0" }} className="hover:brightness-110 transition-all">
          UP
        </span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3">
        <span style={{ color: "#FF671F" }} className="hover:brightness-110 transition-all">
          AIR
        </span>
        <span style={{ color: "#7AC142" }} className="hover:brightness-110 transition-all">
          DRIVEN
        </span>
      </div>
      <div>
        <span style={{ color: "#B584C4" }} className="hover:brightness-110 transition-all">
          SYSTEM
        </span>
      </div>
    </div>
  );
}

/**
 * 3. PantoneRainbowLine
 * Ultra-thin 2px/3px gradient or segmented line for borders and headers
 */
export function PantoneRainbowLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-[3px] bg-gradient-to-r from-[#FFC72C] via-[#F08EAB] via-[#00A3E0] via-[#FF671F] via-[#7AC142] to-[#B584C4] ${className}`}
    />
  );
}

/**
 * 4. PantoneBadge
 * Small colorful tag for category badges or feature chips
 */
export function PantoneBadge({
  color,
  text,
  className = "",
}: {
  color: "yellow" | "pink" | "blue" | "orange" | "green" | "purple";
  text: string;
  className?: string;
}) {
  const colorMap = {
    yellow: { bg: "bg-[#FFC72C]/15", text: "text-[#FFC72C]", border: "border-[#FFC72C]/30" },
    pink: { bg: "bg-[#F08EAB]/15", text: "text-[#F08EAB]", border: "border-[#F08EAB]/30" },
    blue: { bg: "bg-[#00A3E0]/15", text: "text-[#00A3E0]", border: "border-[#00A3E0]/30" },
    orange: { bg: "bg-[#FF671F]/15", text: "text-[#FF671F]", border: "border-[#FF671F]/30" },
    green: { bg: "bg-[#7AC142]/15", text: "text-[#7AC142]", border: "border-[#7AC142]/30" },
    purple: { bg: "bg-[#B584C4]/15", text: "text-[#B584C4]", border: "border-[#B584C4]/30" },
  };

  const c = colorMap[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold border ${c.bg} ${c.text} ${c.border} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {text}
    </span>
  );
}
