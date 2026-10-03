"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Layers, Cpu } from "lucide-react";

export function GsapShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // Cards staggered reveal
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "GSAP & ScrollTrigger",
      badge: "Motion Engine",
      description:
        "High-performance timeline sequencing orchestrated with Lenis smooth scroll delta hooks.",
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Framer Motion",
      badge: "Interactive UI",
      description:
        "Fluid spring physics, layout animations, gestures, and state-driven component transitions.",
    },
    {
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      title: "React Three Fiber",
      badge: "3D Graphics",
      description:
        "Declarative Three.js WebGL canvas with custom materials, lighting, and reactive transforms.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      title: "Shadcn & Tailwind",
      badge: "Design System",
      description:
        "Accessible tokens, Radix primitives, glassmorphism, and responsive CSS utilities.",
    },
  ];

  return (
    <section ref={containerRef} className="py-24 px-6 relative max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="glow" className="mb-4">
          GSAP Scroll-Triggered Pipeline
        </Badge>
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Cinematic Performance</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Lenis virtual scroll loop synchronized directly with GSAP Ticker, providing 120 FPS buttery scrolling and synchronized 3D interactions.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((item, idx) => (
          <Card
            key={idx}
            className="group relative overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <Badge variant="default" className="w-fit mb-2">
                {item.badge}
              </Badge>
              <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
