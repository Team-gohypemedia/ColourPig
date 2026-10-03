import React from "react";
import { Palette, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">ColourPig</span>
          <span className="text-slate-500 text-sm ml-2">
            © {new Date().getFullYear()} Team GoHypeMedia.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <span>Next.js 16</span>
          <span>•</span>
          <span>Tailwind CSS v3</span>
          <span>•</span>
          <span>Lenis</span>
          <span>•</span>
          <span>GSAP</span>
          <span>•</span>
          <span>Three.js</span>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" /> for modern web experiences.
        </div>
      </div>
    </footer>
  );
}
