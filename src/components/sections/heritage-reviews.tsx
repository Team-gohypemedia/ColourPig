"use client";

import React from "react";
import { CircularSeal, SnoutEmblem } from "@/components/brand/brand-logo";
import { Quote } from "lucide-react";

export function HeritageReviews() {
  const testimonials = [
    {
      name: "Emma S.",
      role: "Product Design Lead, 32",
      badge: "Early Adopter",
      quote:
        "I read specifications and dismiss hype. Sustainability matters only when engineered in from first principles, not greenwashed on with cardboard boxes. Colourpig's air-driven dosing delivers actual salon-grade pigment without the 100ml chemical waste dump.",
    },
    {
      name: "Sophia M.",
      role: "Strategy VP, 38",
      badge: "Conscious Professional",
      quote:
        "I measure value in minutes saved. Traditional hair colour was a scheduling nightmare with guilt over plastic throwaways. Having Colourpig in my shower for an 8-week unoxidized touch-up is the definition of radical convenience.",
    },
    {
      name: "Margaret T.",
      role: "Former Educator, 68",
      badge: "Silver Generation",
      quote:
        "Norman & Brown's colourist heritage gave me immediate confidence. Decades of gray coverage made simple, intuitive, and dignified. It's the first time hair care felt designed by genuine engineers rather than marketing teams.",
    },
  ];

  return (
    <section id="heritage" className="py-24 px-6 max-w-7xl mx-auto border-b border-brand/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Salon Lineage &amp; Heritage
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-platinum tracking-tight">
            Norman &amp; Brown. <br />
            <span className="text-ash font-light italic">Decades of colour mastery.</span>
          </h2>
          <p className="text-ash text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Colourpig was founded in collaboration with master colorists Norman &amp; Brown. That expertise, combined with breakthrough air-compression technology, proved that precision engineering belongs in personal care.
          </p>
        </div>

        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <CircularSeal className="w-36 h-36" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-midnight border border-brand/60 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <Quote className="w-6 h-6 text-ash/40" />
              <p className="text-sm font-light text-platinum leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-brand/40">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-headline font-bold text-sm text-platinum">
                    {t.name}
                  </h4>
                  <p className="text-xs font-mono text-ash">{t.role}</p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-steel/50 text-ash border border-brand/30">
                  {t.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
