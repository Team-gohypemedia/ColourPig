"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-0.5 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/60 transition-shadow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              ColourPig
              <Badge variant="glow" className="text-[10px] py-0 px-1.5">
                PRO
              </Badge>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase -mt-0.5">
              Creative Tech Suite
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#scene-section"
            className="hover:text-purple-400 transition-colors"
          >
            3D Canvas
          </a>
          <a
            href="#gsap-section"
            className="hover:text-purple-400 transition-colors"
          >
            GSAP Engine
          </a>
          <a
            href="#motion-section"
            className="hover:text-purple-400 transition-colors"
          >
            Framer Motion
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open("https://github.com/Team-gohypemedia/ColourPig", "_blank")
            }
            className="hidden sm:inline-flex"
          >
            <GithubIcon className="w-4 h-4 mr-1.5" />
            Repo
          </Button>
          <Button
            variant="glow"
            size="sm"
            onClick={() => {
              window.scrollTo({ top: 800, behavior: "smooth" });
            }}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
