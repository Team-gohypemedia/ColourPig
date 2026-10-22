"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export function BehindTheScience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 0);
  };

  return (
    <section id="engineering" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1500px] mx-auto select-none">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          THE SYSTEM
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Cinematic Video Showcase */}
      <div
        ref={containerRef}
        onClick={togglePlay}
        className="group relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl cursor-pointer"
      >
        {/* Colourpig spectrum accent line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF671F] via-[#FFC72C] via-[#7AC142] via-[#00A3E0] to-[#B584C4] z-20" />

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover sm:object-contain bg-black"
        >
          <source src="/system-canister.mp4" type="video/mp4" />
          <source src="/WhatsApp%20Video%202026-10-13%20at%2012.56.12%20PM.mp4" type="video/mp4" />
        </video>

        {/* Ambient Top Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Play/Pause Center Indicator (shows when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl transition-transform transform scale-100">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
        >
          {/* Seek Bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/bar"
          >
            <div
              className="h-full bg-gradient-to-r from-[#FF671F] via-[#00A3E0] to-[#7AC142] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white text-white" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1.5"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white/70" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
                <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-white/70">
                  {isMuted ? "Unmute" : "Mute"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase text-white/60">
                Patented Air-Driven Technology
              </span>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle Fullscreen"
              >
                <Maximize className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Specs Grid Below Video */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
          <p className="font-mono text-[10px] tracking-widest text-[#FFC72C] uppercase font-semibold">
            01 • DUAL-CHAMBER
          </p>
          <h4 className="font-headline font-semibold text-sm sm:text-base text-white">
            Pre-Measured Ratio
          </h4>
          <p className="text-xs text-ash/80 font-light leading-relaxed">
            Dispenses the exact scientific ratio of salon color and developer synchronously with one push.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
          <p className="font-mono text-[10px] tracking-widest text-[#00A3E0] uppercase font-semibold">
            02 • AIR-DRIVEN
          </p>
          <h4 className="font-headline font-semibold text-sm sm:text-base text-white">
            Zero Oxidation
          </h4>
          <p className="text-xs text-ash/80 font-light leading-relaxed">
            Hermetically sealed canister protects formula freshness for multiple repeat touch-up applications.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
          <p className="font-mono text-[10px] tracking-widest text-[#7AC142] uppercase font-semibold">
            03 • SUSTAINABLE
          </p>
          <h4 className="font-headline font-semibold text-sm sm:text-base text-white">
            Reusable System
          </h4>
          <p className="text-xs text-ash/80 font-light leading-relaxed">
            Keep the precision hardware for life and simply click in refill cartridges when ready.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BehindTheScience;
