"use client";

import React from "react";

export function SnoutIcon({
  className = "w-6 h-6",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="46" fill={color} />
      <circle cx="37" cy="50" r="10" fill="#0D151C" />
      <circle cx="63" cy="50" r="10" fill="#0D151C" />
    </svg>
  );
}

export function ColourpigLogo({
  className = "h-7",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span
        className="font-headline font-bold text-2xl tracking-tighter flex items-center leading-none"
        style={{ color }}
      >
        C
        {/* The signature snout 'O' from page 16 of Brand Guide */}
        <span className="inline-block relative w-[1.08em] h-[1.08em] mx-[0.05em] self-center">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full align-middle">
            <circle cx="50" cy="50" r="46" fill={color} />
            <circle cx="37" cy="50" r="9.5" fill="#0D151C" />
            <circle cx="63" cy="50" r="9.5" fill="#0D151C" />
          </svg>
        </span>
        LOURPIG
        <span className="text-[0.45em] align-top ml-1 font-mono tracking-normal opacity-70">
          TM
        </span>
      </span>
    </div>
  );
}
