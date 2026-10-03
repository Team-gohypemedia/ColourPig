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
    <div className="w-full bg-[#E5E8E7] border-y border-ash/30 py-8 px-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-around gap-8 text-center">
        {publications.map((p, idx) => (
          <div key={idx} className="space-y-1">
            <span className="font-headline font-black text-base sm:text-lg tracking-widest uppercase text-obsidian">
              {p.name}
            </span>
            <p className="text-[10px] font-mono text-graphite tracking-wide italic font-medium">
              &ldquo;{p.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
