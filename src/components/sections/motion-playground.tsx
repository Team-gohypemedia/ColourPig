"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, Palette, Orbit, Play, RefreshCw, CheckCircle2 } from "lucide-react";

export function MotionPlayground() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Spring Physics",
      icon: <Sparkles className="w-4 h-4 mr-2" />,
      desc: "Simulate natural mass, damping, and stiffness across dynamic UI states.",
    },
    {
      id: 1,
      title: "Interactive Swatches",
      icon: <Palette className="w-4 h-4 mr-2" />,
      desc: "Instant color interpolation with reactive reactive glass reflections.",
    },
    {
      id: 2,
      title: "Gesture Feedback",
      icon: <Orbit className="w-4 h-4 mr-2" />,
      desc: "Drag, hover, tap, and tilt with fluid inertia and dampening.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 md:p-12 relative overflow-hidden glow-mesh">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div>
            <Badge variant="glow" className="mb-3">
              Framer Motion v14 Engine
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Interactive Micro-Gestures &amp; Physics
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl">
              Switch states dynamically to observe zero-layout-shift layoutId transitions and spring feedback.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-950/60 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md shadow-purple-600/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  {tab.icon}
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-400" />
                  {tabs[activeTab].title}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {tabs[activeTab].desc}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    variant="glow"
                    size="lg"
                    onClick={() => {
                      setScale((s) => (s === 1 ? 1.25 : 1));
                      setRotation((r) => r + 45);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Trigger Spring State
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setScale(1);
                      setRotation(0);
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center min-h-[300px]">
            <motion.div
              drag
              dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale, rotate: rotation }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-64 h-64 rounded-3xl p-6 glassmorphism border border-purple-500/40 cursor-grab active:cursor-grabbing flex flex-col justify-between shadow-[0_0_35px_rgba(168,85,247,0.25)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest text-purple-300 font-bold">
                  Interactive Node
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Drag &amp; Rotate Me</p>
                <p className="text-xs text-slate-400 mt-1">
                  Bounded elastic spring gestures
                </p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{ width: ["20%", "90%", "50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
