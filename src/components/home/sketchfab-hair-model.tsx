"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import { Rotate3d, Loader2 } from "lucide-react";
import { ShadeProduct } from "@/data/shades";

interface SketchfabHairModelProps {
  selectedShade: ShadeProduct;
}

// Convert Hex string (#RRGGBB) to linear RGB array [0..1, 0..1, 0..1]
function hexToLinearRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  // Convert sRGB to linear approximation for PBR
  return [Math.pow(r, 2.2), Math.pow(g, 2.2), Math.pow(b, 2.2)];
}

export function SketchfabHairModel({ selectedShade }: SketchfabHairModelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Function to apply shade color to hair materials
  const applyShadeColor = useCallback((api: any, shade: ShadeProduct) => {
    if (!api) return;

    const [r, g, b] = hexToLinearRgb(shade.hex);

    api.getMaterialList((err: any, materials: any[]) => {
      if (err || !materials) return;

      materials.forEach((mat) => {
        const name = (mat.name || "").toLowerCase();
        // Target hair subtools ('hair', 'hair_high', 'hair modified')
        // Exclude face/head
        const isHair =
          name.includes("hair") ||
          name.includes("strand") ||
          (!name.includes("head") &&
            !name.includes("face") &&
            !name.includes("skin") &&
            !name.includes("eye") &&
            !name.includes("lash"));

        if (isHair && mat.channels) {
          // Update Albedo / Base Color
          if (mat.channels.AlbedoPBR) {
            mat.channels.AlbedoPBR.color = [r, g, b];
            mat.channels.AlbedoPBR.factor = 1.0;
          }
          if (mat.channels.DiffuseColor) {
            mat.channels.DiffuseColor.color = [r, g, b];
            mat.channels.DiffuseColor.factor = 1.0;
          }
          if (mat.channels.DiffusePBR) {
            mat.channels.DiffusePBR.color = [r, g, b];
            mat.channels.DiffusePBR.factor = 1.0;
          }

          // Adjust roughness & metalness based on shade
          if (mat.channels.RoughnessPBR) {
            mat.channels.RoughnessPBR.factor = shade.code === "No.0/0" ? 0.25 : 0.45;
          }

          api.setMaterial(mat);
        }
      });
    });
  }, []);

  // Initialize Sketchfab viewer when script and iframe are ready
  const initViewer = useCallback(() => {
    if (!iframeRef.current || !(window as any).Sketchfab || apiRef.current) return;

    const client = new (window as any).Sketchfab(iframeRef.current);

    client.init("2a458cd22e57452c8b3782b08d8e06de", {
      success: (api: any) => {
        apiRef.current = api;
        api.start();
        api.addEventListener("viewerready", () => {
          setIsLoaded(true);
          // Apply initial color
          applyShadeColor(api, selectedShade);
        });
      },
      error: () => {
        console.error("Sketchfab viewer failed to initialize");
      },
      autostart: 1,
      transparent: 1,
      ui_theme: "dark",
      ui_infos: 0,
      ui_controls: 1,
      ui_stop: 0,
      ui_watermark: 0,
      ui_hint: 0,
      ui_help: 0,
      ui_settings: 0,
      ui_inspector: 0,
      ui_vr: 0,
      ui_ar: 0,
      dnt: 1,
    });
  }, [applyShadeColor, selectedShade]);

  useEffect(() => {
    if (scriptLoaded) {
      initViewer();
    }
  }, [scriptLoaded, initViewer]);

  // When selected shade changes, update the 3D model hair material
  useEffect(() => {
    if (apiRef.current && isLoaded) {
      applyShadeColor(apiRef.current, selectedShade);
    }
  }, [selectedShade, isLoaded, applyShadeColor]);

  return (
    <div className="relative w-full h-full bg-[#11161B] flex items-center justify-center overflow-hidden">
      {/* Load Sketchfab Viewer API Script */}
      <Script
        src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Ambient shade backlight */}
      <div
        className="absolute -inset-10 opacity-30 blur-3xl transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: selectedShade.hex }}
      />

      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-[#0F141A] text-white">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          <span className="text-xs font-mono tracking-widest text-ash uppercase">
            Loading 3D Model &amp; Shader...
          </span>
        </div>
      )}

      {/* Sketchfab Iframe */}
      <iframe
        ref={iframeRef}
        title="Hair 58 3D Model"
        id="sketchfab-hair-frame"
        className="w-full h-full border-0 transition-opacity duration-700"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />

      {/* 360 Rotation Hint Badge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur border border-white/15 text-[10px] font-mono text-white/90">
        <Rotate3d className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
        <span>360° DRAG ORBIT</span>
      </div>

      {/* Active Shade Indicator Badge */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-black/80 backdrop-blur border border-white/15">
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-sm transition-colors duration-500"
          style={{ backgroundColor: selectedShade.hex }}
        />
        <div className="text-left">
          <span className="text-[9px] font-mono text-ash uppercase block">
            Hair Material Shade
          </span>
          <span className="text-xs font-headline font-bold text-white uppercase">
            {selectedShade.name}
          </span>
        </div>
      </div>
    </div>
  );
}
