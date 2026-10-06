"use client";

import React from "react";

export function PressTicker() {
  const publications = [
    { name: "VOGUE", quote: "The Dyson moment of haircare.", color: "#FFC72C", code: "123C" },
    { name: "WIRED", quote: "Precision engineering replacing 100ml waste.", color: "#00A3E0", code: "299C" },
    { name: "GQ", quote: "Built to last. Single-use is officially over.", color: "#FF671F", code: "165C" },
    { name: "WALL STREET JOURNAL", quote: "Intelligent luxury DTC disruption.", color: "#7AC142", code: "375C" },
    { name: "FORBES", quote: "Norman & Brown revolutionizing personal care.", color: "#B584C4", code: "2572C" },
  ];

  return (
    <div className="w-full bg-[#E5E8E7] border-y border-ash/30 py-8 px-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-around gap-8 text-center">
        {publications.map((p, idx) => (
          <div key={idx} className="group space-y-1 transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span
                className="font-headline font-black text-base sm:text-lg tracking-widest uppercase"
                style={{ color: p.color }}
              >
                {p.name}
              </span>
            </div>
            <p className="text-[10px] font-mono text-graphite tracking-wide italic font-medium">
              &ldquo;{p.quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
