"use client";

import React from "react";

export function SnoutEmblem({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" fill={color} />
      <circle cx="37" cy="50" r="10" fill="#0D151C" />
      <circle cx="63" cy="50" r="10" fill="#0D151C" />
    </svg>
  );
}

export function ColourpigWordmark({
  className = "h-7",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className="font-headline font-bold text-2xl tracking-tighter flex items-center leading-none" style={{ color }}>
        C
        {/* The signature snout 'O' */}
        <span className="inline-block relative w-[1.1em] h-[1.1em] mx-[0.04em] self-center">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full align-middle">
            <circle cx="50" cy="50" r="46" fill={color} />
            <circle cx="37" cy="50" r="9" fill="#0D151C" />
            <circle cx="63" cy="50" r="9" fill="#0D151C" />
          </svg>
        </span>
        LOURPIG
        <span className="text-[0.4em] align-top ml-1 font-mono tracking-normal opacity-70">
          TM
        </span>
      </span>
    </div>
  );
}

export function CircularSeal({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full animate-spin-slow">
        <defs>
          <path
            id="textcircle"
            d="M 80, 80 m -62, 0 a 62,62 0 1,1 124, 0 a 62,62 0 1,1 -124, 0"
          />
        </defs>
        <text className="text-[11.5px] uppercase font-mono tracking-[0.24em] fill-ash">
          <textPath href="#textcircle" startOffset="0%">
            COLOURPIG • EST. 2025 • NORMAN &amp; BROWN •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <SnoutEmblem className="w-7 h-7" color="#CED1D0" />
      </div>
    </div>
  );
}
