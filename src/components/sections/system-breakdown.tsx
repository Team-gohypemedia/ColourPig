"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { SnoutEmblem } from "@/components/brand/brand-logo";
import { ArrowRight, Check, Droplet, Wind, ShieldAlert, Sparkles, RefreshCcw } from "lucide-react";

export function SystemBreakdown() {
  const { addItem } = useCart();

  const products = [
    {
      id: "starter-system",
      badge: "Flagship Innovation",
      name: "The Complete Colourpig System",
      price: 89,
      period: "One-time purchase",
      description:
        "The permanent air-driven dispenser engineered in aerospace chrome, including 2x recyclable pigment pods (50ml + 50ml), magnetic shower dock, and root precision wand.",
      specs: [
        "Chrome & steel body engineered to endure",
        "Dual 50ml unoxidized pigment chambers",
        "Eliminates 90% product waste per session",
        "Shower-stable for up to 8 weeks",
      ],
      shade: { name: "Ash Blond", code: "#1903", hex: "#C9A77D" },
    },
    {
      id: "refill-dual-pack",
      badge: "Replenishment Pods",
      name: "Precision Refill Dual-Pack",
      price: 32,
      period: "50ml + 50ml Pods",
      description:
        "Hermetically sealed replacement cartridges. Delivers 4-6 precision root touch-ups without exposure to air until the exact millisecond of dispensing.",
      specs: [
        "100% recyclable aluminum casing",
        "75% less plastic than traditional box dye",
        "Click-in hermetic pressure seal",
        "Available across all 6 core shades",
      ],
      shade: { name: "Natural Brunette", code: "#2401", hex: "#432E20" },
    },
    {
      id: "precision-applicator",
      badge: "Targeted Tool",
      name: "Micro-Chamber Roots Wand",
      price: 18,
      period: "Ergonomic Brush",
      description:
        "Designed by Norman & Brown colorists to partition hairline follicles and distribute 10ml exact doses cleanly with zero drip or skin staining.",
      specs: [
        "Feathered micro-tip bristle array",
        "Chemical-resistant antimicrobial polymer",
        "Washable & built to endure",
      ],
      shade: { name: "Obsidian", code: "#0802", hex: "#1A1A1E" },
    },
  ];

  return (
    <section id="system" className="py-24 px-6 max-w-7xl mx-auto border-b border-brand/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Hardware &amp; Formulations
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-platinum tracking-tight mt-2">
            Hair colour <br className="hidden sm:inline" />
            <span className="text-ash font-light italic">like never before.</span>
          </h2>
        </div>
        <p className="text-ash text-sm sm:text-base max-w-md font-light leading-relaxed">
          Engineered from first principles. Traditional box dye sends 100ml of chemical waste into waterways. Colourpig dispenses 10-20ml with micrometric control.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="flex flex-col justify-between p-8 rounded-2xl bg-midnight border border-brand/60 hover:border-ash/50 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-steel/50 text-[10px] font-mono uppercase tracking-widest text-platinum border border-brand/40">
                  {prod.badge}
                </span>
                <SnoutEmblem className="w-5 h-5 opacity-40 group-hover:opacity-80 transition-opacity" color="#CED1D0" />
              </div>

              <h3 className="font-headline font-bold text-xl text-platinum mt-2">
                {prod.name}
              </h3>
              <p className="text-ash text-xs font-mono mt-1">{prod.period}</p>

              <div className="my-6 flex items-baseline gap-2">
                <span className="font-headline font-black text-3xl text-platinum">
                  ${prod.price}
                </span>
                <span className="text-xs font-mono text-ash">USD</span>
              </div>

              <p className="text-ash text-sm leading-relaxed mb-6 font-light">
                {prod.description}
              </p>

              <ul className="space-y-2.5 border-t border-brand/40 pt-6 mb-8 text-xs font-mono text-ash">
                {prod.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-platinum flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() =>
                addItem({
                  id: prod.id,
                  name: prod.name,
                  shadeName: prod.shade.name,
                  shadeCode: prod.shade.code,
                  shadeHex: prod.shade.hex,
                  price: prod.price,
                })
              }
              className="w-full py-3.5 rounded-xl bg-steel/60 hover:bg-platinum hover:text-obsidian text-platinum font-headline font-bold text-xs tracking-wider uppercase transition-all duration-200 border border-brand flex items-center justify-center gap-2 group-hover:bg-platinum group-hover:text-obsidian"
            >
              <span>Add to Dispatch Bag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
