import React from "react";
import { ColourpigWordmark, SnoutEmblem } from "@/components/brand/brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-brand/50 bg-obsidian text-ash py-16 px-6 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <ColourpigWordmark color="#CED1D0" className="h-6" />
            <p className="text-ash/80 max-w-sm font-light text-xs leading-relaxed font-body">
              The world&apos;s first reusable, air-driven precision hair colour system by Norman &amp; Brown. Eliminating 90% of product waste and 75% of plastic.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[11px] text-ash">
              <span>Norman &amp; Brown Labs</span>
              <span>•</span>
              <span>Est. 2025</span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-platinum font-semibold uppercase tracking-wider block">
                The System
              </span>
              <ul className="space-y-2 text-ash/80">
                <li><a href="#system" className="hover:text-platinum transition-colors">Starter Kit</a></li>
                <li><a href="#shades" className="hover:text-platinum transition-colors">Refill Dual-Pods</a></li>
                <li><a href="#system" className="hover:text-platinum transition-colors">Precision Wand</a></li>
                <li><a href="#technology" className="hover:text-platinum transition-colors">Air-Compression Tech</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-platinum font-semibold uppercase tracking-wider block">
                Brand &amp; Science
              </span>
              <ul className="space-y-2 text-ash/80">
                <li><a href="#heritage" className="hover:text-platinum transition-colors">Norman &amp; Brown</a></li>
                <li><a href="#technology" className="hover:text-platinum transition-colors">Zero-Waste Audit</a></li>
                <li><a href="#impact" className="hover:text-platinum transition-colors">The Airheads</a></li>
                <li><a href="#shades" className="hover:text-platinum transition-colors">Shade Formulary</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-platinum font-semibold uppercase tracking-wider block">
                Verification
              </span>
              <ul className="space-y-2 text-ash/80">
                <li>Patent Pending MK-1</li>
                <li>ISO 14040 Certified</li>
                <li>Cruelty-Free / Leaping Bunny</li>
                <li>Shower-Safe Hermetic Seal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Palette Swatch Bar (Page 27 of Guide) */}
        <div className="pt-8 border-t border-brand/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-ash/60 uppercase tracking-widest mr-2">
              Brand Palette:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-obsidian border border-white/20" title="Obsidian #0D151C" />
              <span className="w-3.5 h-3.5 rounded-full bg-midnight border border-white/20" title="Midnight #13212E" />
              <span className="w-3.5 h-3.5 rounded-full bg-steel border border-white/20" title="Steel Grey #253744" />
              <span className="w-3.5 h-3.5 rounded-full bg-graphite border border-white/20" title="Graphite #495B69" />
              <span className="w-3.5 h-3.5 rounded-full bg-ash border border-white/20" title="Ash Grey #949FA3" />
              <span className="w-3.5 h-3.5 rounded-full bg-platinum border border-white/20" title="Platinum #CED1D0" />
            </div>
          </div>

          <div className="text-[11px] text-ash/70 flex items-center gap-2">
            <SnoutEmblem className="w-4 h-4 opacity-50" color="#CED1D0" />
            <span>© 2025 ColourPig by Norman &amp; Brown. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
