"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SnoutEmblem } from "@/components/brand/brand-logo";
import { Wind, Shield, Droplets, Zap, Layers, RefreshCw } from "lucide-react";

export function EngineeringSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate headline
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate cards staggered
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      num: "01",
      title: "Smart Innovation",
      desc: "We solve real problems with real engineering. Air-driven precision, reusable design, 90% less waste—this is innovation that actually matters, not just marketing fluff.",
      icon: <Zap className="w-5 h-5 text-platinum" />,
    },
    {
      num: "02",
      title: "Radical Convenience",
      desc: "10-20ml per use. Keeps in your shower for up to 8 weeks. Roots-only precision. We respect your time because we know you have better things to do.",
      icon: <Droplets className="w-5 h-5 text-platinum" />,
    },
    {
      num: "03",
      title: "Sustainability Without Sacrifice",
      desc: "75% less plastic in the starter kit. Plastic-free refills. No compromise on results. You shouldn't have to choose between looking good and doing good.",
      icon: <RefreshCw className="w-5 h-5 text-platinum" />,
    },
    {
      num: "04",
      title: "Confident Empowerment",
      desc: "Normalizing gray hair care without shame or stigma. Join the 'Airheads' community and take control of your look on your own terms.",
      icon: <Shield className="w-5 h-5 text-platinum" />,
    },
  ];

  return (
    <section
      id="technology"
      ref={containerRef}
      className="py-24 px-6 max-w-7xl mx-auto border-b border-brand/50"
    >
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-ash">
          Brand Values &amp; Architecture
        </span>
        <h2
          ref={headlineRef}
          className="font-headline font-black text-3xl sm:text-5xl text-platinum tracking-tight mt-2"
        >
          Engineering that respects <br />
          <span className="text-ash font-light italic">your intelligence and the planet.</span>
        </h2>
        <p className="text-ash text-base sm:text-lg mt-4 font-light leading-relaxed">
          For over a century, at-home hair colour has been fundamentally broken: single-use bottles, excessive chemical waste, and imprecise application. Colourpig replaces outdated habits with aerospace precision.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((v) => (
          <div
            key={v.num}
            className="p-8 rounded-2xl bg-midnight border border-brand/60 hover:border-ash/40 transition-colors space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-ash tracking-widest uppercase">
                VALUE {v.num}
              </span>
              <div className="w-9 h-9 rounded-lg bg-steel/60 border border-brand/50 flex items-center justify-center">
                {v.icon}
              </div>
            </div>

            <h3 className="font-headline font-bold text-xl text-platinum">
              {v.title}
            </h3>

            <p className="text-ash text-sm leading-relaxed font-light">
              {v.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison Matrix following Talking Rule #4 (Challenge through contrast) */}
      <div className="mt-16 p-8 rounded-3xl bg-obsidian border border-brand overflow-x-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Contrast Audit
          </span>
          <h3 className="font-headline font-bold text-2xl text-platinum mt-1">
            Traditional Box Dye vs. Colourpig
          </h3>
        </div>

        <table className="w-full text-left font-mono text-xs min-w-[500px]">
          <thead>
            <tr className="border-b border-brand text-ash uppercase">
              <th className="py-3 px-4">Metric</th>
              <th className="py-3 px-4 text-red-300">Legacy Box Dye</th>
              <th className="py-3 px-4 text-emerald-300">Colourpig MK-1</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/30 text-platinum">
            <tr>
              <td className="py-4 px-4 text-ash">Dosage Waste</td>
              <td className="py-4 px-4 text-red-300/80">100ml single-use dump</td>
              <td className="py-4 px-4 font-bold text-emerald-300">10-20ml precision dose (90% reduction)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-ash">Plastic Waste</td>
              <td className="py-4 px-4 text-red-300/80">Single-use throwaway plastic</td>
              <td className="py-4 px-4 font-bold text-emerald-300">Permanent reusable cylinder (75% less plastic)</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-ash">Active Shelf Life</td>
              <td className="py-4 px-4 text-red-300/80">Oxidizes in 30 minutes once mixed</td>
              <td className="py-4 px-4 font-bold text-emerald-300">Up to 8 weeks shower life unoxidized</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-ash">Touch-up Focus</td>
              <td className="py-4 px-4 text-red-300/80">Messy all-over overflow</td>
              <td className="py-4 px-4 font-bold text-emerald-300">Roots-only targeted precision wand</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
