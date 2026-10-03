"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SceneWrapper } from "@/components/canvas/scene-wrapper";
import { ArrowRight, Box, Compass, Sparkles, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 space-y-6 text-left"
        >
          <div className="flex items-center gap-3">
            <Badge variant="glow" className="py-1 px-3 text-xs tracking-wider uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-purple-400" />
              Creative Tech Suite Active
            </Badge>
            <span className="text-xs text-slate-500 font-mono">v1.0.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Next-Gen Web <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Dimensional Motion
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
            A harmonized architecture combining <strong>Next.js App Router</strong>, <strong>Tailwind CSS</strong>, <strong>Lenis Smooth Scroll</strong>, <strong>Framer Motion</strong>, <strong>GSAP</strong>, and <strong>React Three Fiber</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="glow"
              size="lg"
              onClick={() => {
                const el = document.getElementById("scene-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore 3D Canvas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.open("https://github.com/Team-gohypemedia/ColourPig", "_blank");
              }}
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              GitHub Repository
            </Button>
          </div>

          {/* Quick tech specs tags */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">120 FPS</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                Lenis + GSAP
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">WebGL</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                Three.js + R3F
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">Radix</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                Shadcn UI Tokens
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Canvas Viewport */}
        <motion.div
          id="scene-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 relative"
        >
          <div className="absolute -top-3 -right-3 z-20">
            <Badge variant="glow" className="flex items-center gap-1.5 px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Interactive R3F Orbit
            </Badge>
          </div>
          <SceneWrapper />
          <p className="text-center text-xs text-slate-400 mt-3 font-mono">
            Drag to rotate • Real-time WebGL shader distortion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
