"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Check, AlertCircle, ShoppingBag, ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { useStore } from "@/context/store-context";

interface HairSuitabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialShade?: ShadeProduct | null;
}

const NATURAL_BASES = [
  { id: "base-black", name: "Deep Black", level: "L1–2", numericLevel: 2, hex: "#1C1B1F", bestShadeId: "shade-1" },
  { id: "base-dark-brown", name: "Dark Brown", level: "L3", numericLevel: 3, hex: "#2A211D", bestShadeId: "shade-3" },
  { id: "base-med-brown", name: "Medium Brown", level: "L4", numericLevel: 4, hex: "#4A392F", bestShadeId: "shade-4" },
  { id: "base-light-brown", name: "Light Brown", level: "L5", numericLevel: 5, hex: "#634E3F", bestShadeId: "shade-5" },
  { id: "base-dark-blonde", name: "Dark Blonde", level: "L6", numericLevel: 6, hex: "#7E644B", bestShadeId: "shade-6" },
  { id: "base-med-blonde", name: "Golden Blonde", level: "L7", numericLevel: 7, hex: "#A8835B", bestShadeId: "shade-7" },
  { id: "base-light-blonde", name: "Light Blonde", level: "L8", numericLevel: 8, hex: "#CEAA81", bestShadeId: "shade-8" },
  { id: "base-very-light", name: "Platinum", level: "L9+", numericLevel: 9, hex: "#E8D3BD", bestShadeId: "shade-9" },
];

const GRAY_PERCENTAGES = [
  { id: "gray-0", label: "0% Gray", sub: "Gloss / Tone" },
  { id: "gray-10-30", label: "10% – 30%", sub: "Early Regrowth" },
  { id: "gray-30-60", label: "30% – 60%", sub: "Moderate" },
  { id: "gray-60-100", label: "60% – 100%", sub: "Resistant White" },
];

const getShadeLevel = (shade: ShadeProduct): number => {
  if (shade.id === "shade-0-0") return 0;
  const parsed = parseFloat(shade.formula) || parseInt(shade.code.replace(/\D/g, "")) || 4;
  return Math.round(parsed);
};

export function HairSuitabilityModal({
  isOpen,
  onClose,
  initialShade,
}: HairSuitabilityModalProps) {
  const store = useStore();
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(initialShade || OFFICIAL_SHADES[3]);
  const [naturalBase, setNaturalBase] = useState<string>("base-med-brown");
  const [grayLevel, setGrayLevel] = useState<string>("gray-30-60");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (initialShade) {
      setSelectedShade(initialShade);
      const matchedBase = NATURAL_BASES.find((b) => b.bestShadeId === initialShade.id);
      if (matchedBase) {
        setNaturalBase(matchedBase.id);
      }
    }
  }, [initialShade, isOpen]);

  // Prevent background scrolling while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setJustAdded(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeBaseObj = useMemo(
    () => NATURAL_BASES.find((b) => b.id === naturalBase) || NATURAL_BASES[2],
    [naturalBase]
  );

  const recommendedShade = useMemo(() => {
    return OFFICIAL_SHADES.find((s) => s.id === activeBaseObj.bestShadeId) || selectedShade;
  }, [activeBaseObj, selectedShade]);

  const selectedLevel = getShadeLevel(selectedShade);
  const rootLevel = activeBaseObj.numericLevel;
  const levelDiff = selectedLevel - rootLevel;

  // Intelligent, transparent salon match logic explaining WHY
  const matchVerdict = useMemo(() => {
    // 1. Universal Clear Gloss (No.0/0)
    if (selectedShade.id === "shade-0-0") {
      let grayNote = "Adds high-gloss mirror shine and condition without shifting your hair color.";
      if (grayLevel === "gray-60-100") {
        grayNote = "Softens coarse white roots and blends silver hair into glistening natural highlights (salt & pepper blending).";
      } else if (grayLevel === "gray-0") {
        grayNote = "Gives translucent glass-hair gloss with zero pigment.";
      }
      return {
        type: "perfect" as const,
        badge: "Universal Clear Gloss",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        boxColor: "bg-emerald-50/80 border-emerald-200",
        title: "100% Compatible (Universal Formula)",
        explanation: `No.0/0 contains zero pigment — it works universally across all root colors from ${activeBaseObj.name} to Platinum.`,
        grayImpact: grayNote,
        isMatch: true,
      };
    }

    // 2. Exact Level Match (Tone-on-Tone)
    if (levelDiff === 0) {
      let grayNote = "Colourpig's 30-min air-driven formula provides 100% salon-grade permanent coverage on new regrowth.";
      if (grayLevel === "gray-60-100") {
        grayNote = "Formulated with dense micro-pigments to penetrate stubborn, resistant white roots with zero translucency.";
      } else if (grayLevel === "gray-0") {
        grayNote = "Refreshes your natural root depth and restores radiant shine without altering tone.";
      } else if (grayLevel === "gray-10-30") {
        grayNote = "Effortlessly camouflages emerging greys with a seamless natural blend.";
      }

      return {
        type: "perfect" as const,
        badge: "Exact Level Match",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        boxColor: "bg-emerald-50/80 border-emerald-200",
        title: `Perfect Match for ${activeBaseObj.name}`,
        explanation: `${selectedShade.name} is Level ${selectedLevel}, exactly matching your natural ${activeBaseObj.name} roots (Level ${rootLevel}).`,
        grayImpact: grayNote,
        isMatch: true,
      };
    }

    // 3. One Shade Deeper (-1 Level) -> Soft Shadow Root
    if (levelDiff === -1) {
      let grayNote = "Provides full opaque coverage on grey regrowth with a rich, velvety finish.";
      if (grayLevel === "gray-60-100") {
        grayNote = "Excellent for resistant white roots — slightly deeper pigment locks into stubborn hair cuticles.";
      }
      return {
        type: "compatible" as const,
        badge: "Soft Shadow Blend",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
        boxColor: "bg-sky-50/80 border-sky-200",
        title: `Compatible — Richer Shadow Root`,
        explanation: `${selectedShade.name} (Level ${selectedLevel}) is 1 shade deeper than your natural ${activeBaseObj.name} (Level ${rootLevel}). This creates a subtle, salon-style shadow root.`,
        grayImpact: grayNote,
        isMatch: true,
      };
    }

    // 4. One Shade Lighter (+1 Level) -> Soft Dimension
    if (levelDiff === 1) {
      let grayNote = "Blends greys into soft multi-dimensional highlights.";
      if (grayLevel === "gray-60-100") {
        grayNote = "For 60%+ gray, this will result in a softer translucent highlight effect rather than solid opaque dark coverage.";
      }
      return {
        type: "compatible" as const,
        badge: "Soft Dimension Blend",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
        boxColor: "bg-sky-50/80 border-sky-200",
        title: `Compatible — Softer Dimension`,
        explanation: `${selectedShade.name} (Level ${selectedLevel}) is 1 shade softer than your natural ${activeBaseObj.name} (Level ${rootLevel}), giving a gentle luminous blend.`,
        grayImpact: grayNote,
        isMatch: true,
      };
    }

    // 5. Mismatch (>= 2 Levels Difference)
    const isTooDark = levelDiff < -1;
    const levelCount = Math.abs(levelDiff);

    let explanation = "";
    if (isTooDark) {
      explanation = `${selectedShade.name} (Level ${selectedLevel}) is ${levelCount} shades darker than your ${activeBaseObj.name} roots (Level ${rootLevel}). Applying dark pigment onto light roots creates a harsh demarcation band.`;
    } else {
      explanation = `${selectedShade.name} (Level ${selectedLevel}) is ${levelCount} shades lighter than your ${activeBaseObj.name} roots (Level ${rootLevel}). Permanent root color cannot lift dark hair without bleach.`;
    }

    let grayNote = `To blend your ${GRAY_PERCENTAGES.find((g) => g.id === grayLevel)?.label} gray naturally, switch to ${recommendedShade.name}.`;
    if (grayLevel === "gray-60-100" && activeBaseObj.id === "base-very-light") {
      grayNote = "For high percentage white/gray roots on light hair, No.9 or No.0/0 Clear blends seamlessly without dark banding.";
    }

    return {
      type: "mismatch" as const,
      badge: isTooDark ? "Shade Is Too Dark" : "Shade Is Too Light",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      boxColor: "bg-amber-50/80 border-amber-200",
      title: `Recommended Switch: ${recommendedShade.name}`,
      explanation,
      grayImpact: grayNote,
      isMatch: false,
    };
  }, [selectedShade, selectedLevel, rootLevel, levelDiff, activeBaseObj, grayLevel, recommendedShade]);

  const handleAddToCart = () => {
    store.addToCart({
      id: `prod-${selectedShade.id}`,
      name: `${selectedShade.name} System`,
      variant: `${selectedShade.undertone} • Match Verified`,
      price: selectedShade.price,
      image: selectedShade.cardImage,
      shadeCode: selectedShade.code,
      shadeHex: selectedShade.hex,
    });
    setJustAdded(true);
    setTimeout(() => {
      onClose();
      store.openCart();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-ash/30 flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-hidden z-10 text-obsidian animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-ash/20 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 shadow-2xs"
              style={{ backgroundColor: selectedShade.hex }}
            />
            <div className="leading-none">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-obsidian">
                {selectedShade.code} • {selectedShade.name}
              </span>
              <span className="block text-[10px] font-mono text-graphite/80 mt-0.5">
                Formula {selectedShade.formula} • Level {selectedLevel || "Universal"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-graphite hover:text-obsidian transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          {/* Header Title & Subtitle */}
          <div>
            <h2 className="font-headline font-bold text-base sm:text-lg tracking-tight text-obsidian">
              Does this shade match your hair?
            </h2>
            <p className="text-xs text-graphite mt-0.5 leading-relaxed">
              Compare this shade against your natural roots and grey percentage to verify a seamless salon blend.
            </p>
          </div>

          {/* Question 1: Natural Root Color */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-graphite block">
                1. Your Natural Root Color
              </span>
              <span className="text-[10px] font-mono text-graphite/70">
                Level 1 (Darkest) to 9 (Lightest)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {NATURAL_BASES.map((base) => {
                const isSelected = naturalBase === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setNaturalBase(base.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-obsidian text-white border-obsidian shadow-2xs scale-[1.02]"
                        : "bg-[#F7F8F8] border-ash/40 hover:bg-white hover:border-obsidian/30 text-obsidian"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-2xs"
                      style={{ backgroundColor: base.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold truncate leading-tight">
                        {base.name}
                      </p>
                      <p className={`text-[9px] font-mono leading-none mt-0.5 ${isSelected ? "text-white/70" : "text-graphite"}`}>
                        {base.level}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Gray Hair Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-graphite block">
                2. Gray Coverage Needed
              </span>
              <span className="text-[10px] font-mono text-graphite/70">
                At Regrowth Line
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {GRAY_PERCENTAGES.map((gray) => {
                const isSelected = grayLevel === gray.id;
                return (
                  <button
                    key={gray.id}
                    type="button"
                    onClick={() => setGrayLevel(gray.id)}
                    className={`py-2 px-2 rounded-lg border text-center cursor-pointer transition-all ${
                      isSelected
                        ? "bg-obsidian text-white border-obsidian shadow-2xs scale-[1.02]"
                        : "bg-[#F7F8F8] border-ash/40 hover:bg-white hover:border-obsidian/30 text-obsidian"
                    }`}
                  >
                    <span className="block font-mono text-xs font-bold leading-tight">
                      {gray.label}
                    </span>
                    <span className={`block text-[9px] font-mono mt-0.5 ${isSelected ? "text-white/75" : "text-graphite"}`}>
                      {gray.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Breadcrumb Pill */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F0F2F2] border border-ash/30 text-[10px] font-mono text-graphite">
            <div className="flex items-center gap-1.5">
              <span>Evaluating:</span>
              <span className="font-bold text-obsidian">{selectedShade.code} (L{selectedLevel || "0"})</span>
            </div>
            <span>vs</span>
            <div className="flex items-center gap-1.5">
              <span>Your Roots:</span>
              <span className="font-bold text-obsidian">{activeBaseObj.name} ({activeBaseObj.level})</span>
            </div>
          </div>

          {/* Intelligent Verdict Card Explaining WHY */}
          <div className={`p-4 rounded-xl border flex flex-col gap-2.5 transition-all ${matchVerdict.boxColor}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${matchVerdict.badgeColor}`}>
                {matchVerdict.type === "perfect" && <Check className="w-3 h-3" />}
                {matchVerdict.type === "compatible" && <Sparkles className="w-3 h-3" />}
                {matchVerdict.type === "mismatch" && <AlertCircle className="w-3 h-3" />}
                <span>{matchVerdict.badge}</span>
              </span>

              {levelDiff !== 0 && selectedLevel > 0 && (
                <span className="text-[10px] font-mono font-semibold text-graphite">
                  {levelDiff > 0 ? `+${levelDiff} Levels Lighter` : `${levelDiff} Levels Darker`}
                </span>
              )}
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-obsidian">
                {matchVerdict.title}
              </h4>
              <p className="text-xs text-graphite mt-1 leading-relaxed">
                {matchVerdict.explanation}
              </p>
            </div>

            {/* Gray Coverage Application Insight */}
            <div className="pt-2 border-t border-black/10 text-xs">
              <p className="text-obsidian/90 font-medium flex items-start gap-1.5 leading-relaxed">
                <span className="font-mono text-[10px] uppercase font-bold text-graphite shrink-0 mt-0.5">Coverage:</span>
                <span>{matchVerdict.grayImpact}</span>
              </p>
            </div>

            {/* 1-Click Switch Button if Mismatched */}
            {!matchVerdict.isMatch && recommendedShade && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedShade(recommendedShade)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-obsidian text-white text-[11px] font-mono font-bold tracking-wider uppercase hover:bg-black transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>Switch to {recommendedShade.code} {recommendedShade.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F9FAFA] border-t border-ash/20 flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0">
            <span className="font-mono text-xs font-bold text-obsidian block truncate">
              {selectedShade.code} • ${selectedShade.price} USD
            </span>
            <span className="text-[10px] font-mono text-graphite block truncate">
              {selectedShade.name} System
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg border border-ash/50 text-obsidian text-xs font-mono font-semibold tracking-wider uppercase hover:border-obsidian transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={justAdded}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-obsidian hover:bg-black text-white"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Confirm &amp; Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HairSuitabilityModal;
