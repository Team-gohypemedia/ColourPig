"use client";

import React from "react";

export function PressTicker() {
  const publications = [
    { name: "VOGUE", quote: "The Dyson moment of haircare." },
    { name: "WIRED", quote: "Precision engineering replacing 100ml waste." },
    { name: "GQ", quote: "Built to last. Single-use is officially over." },
    { name: "WALL STREET JOURNAL", quote: "Intelligent luxury DTC disruption." },
    { name: "FORBES", quote: "Norman & Brown revolutionizing personal care." },
  ];

  return (
    <div className="w-full bg-midnight border-y border-white/10 py-7 sm:py-9 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-around gap-6 sm:gap-8 text-center">
        {publications.map((p, idx) => (
          <div key={idx} className="group space-y-1 transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-headline font-bold text-base sm:text-lg tracking-widest uppercase text-white">
                {p.name}
              </span>
            </div>
            <p className="text-xs font-montserrat text-white/80 tracking-wide italic font-medium">
              &ldquo;{p.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
