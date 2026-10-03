"use client";

import React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { GsapShowcase } from "@/components/sections/gsap-showcase";
import { MotionPlayground } from "@/components/sections/motion-playground";
import { Footer } from "@/components/navigation/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Sparkles,
  Zap,
  Cpu,
  Palette,
  Terminal,
  ArrowUpRight,
  Code2,
} from "lucide-react";

export default function Home() {
  const stackItems = [
    {
      name: "Next.js 16 (App Router)",
      desc: "Server/Client boundaries, React 19 architecture, lightning fast bundling.",
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      tag: "Framework",
    },
    {
      name: "Tailwind CSS v3.4",
      desc: "Utility-first design tokens, custom glassmorphism, responsive breakpoints.",
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      tag: "Styling",
    },
    {
      name: "Lenis Smooth Scroll",
      desc: "Buttery smooth normalized physics-based wheel and gesture scrolling.",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      tag: "Scroll UX",
    },
    {
      name: "Framer Motion",
      desc: "Declarative springs, layoutId morphs, and interactive micro-gestures.",
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      tag: "Animation",
    },
    {
      name: "GSAP & ScrollTrigger",
      desc: "High precision timeline animations hooked directly to Lenis virtual loop.",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      tag: "Scroll Engine",
    },
    {
      name: "React Three Fiber & Three.js",
      desc: "Dynamic WebGL 3D canvas with distortion shaders and orbital camera controls.",
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      tag: "3D Canvas",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white relative">
      <Navbar />

      <main className="pt-24 pb-12 space-y-16">
        {/* Hero with 3D Canvas */}
        <HeroSection />

        {/* GSAP ScrollTrigger Sequence */}
        <div id="gsap-section">
          <GsapShowcase />
        </div>

        {/* Framer Motion Interactive Playground */}
        <div id="motion-section">
          <MotionPlayground />
        </div>

        {/* Tech Stack Matrix Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="glow" className="mb-3">
              Full Stack Motion Architecture
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Integrated Creative Tech Matrix
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3">
              Every library seamlessly connected to deliver unified 3D, physics, and scrolling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stackItems.map((item, idx) => (
              <Card
                key={idx}
                className="group border-white/10 hover:border-purple-500/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick CTA Box */}
          <div className="mt-16 rounded-3xl p-8 md:p-12 glassmorphism border border-white/10 text-center relative overflow-hidden glow-mesh">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
              Ready to expand ColourPig?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base">
              Add your custom 3D models, shaders, ScrollTrigger pins, and dynamic UI components in a fully configured environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="glow"
                size="lg"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Back to Top
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  window.open("https://github.com/Team-gohypemedia/ColourPig", "_blank");
                }}
              >
                <Code2 className="w-4 h-4 mr-2" />
                View Source Code
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
