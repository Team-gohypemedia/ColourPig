"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { X, Check, Sparkles, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { useStore } from "@/context/store-context";

interface HairSuitabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialShade?: ShadeProduct | null;
}

const NATURAL_BASES = [
  { id: "base-black", name: "Jet / Deep Black", level: "Level 1–2", hex: "#1C1B1F", bestShadeId: "shade-1" },
  { id: "base-dark-brown", name: "Dark Espresso Brown", level: "Level 3", hex: "#2A211D", bestShadeId: "shade-3" },
  { id: "base-med-brown", name: "Medium Chestnut Brown", level: "Level 4", hex: "#4A392F", bestShadeId: "shade-4" },
  { id: "base-light-brown", name: "Light Amber Brown", level: "Level 5", hex: "#634E3F", bestShadeId: "shade-5" },
  { id: "base-dark-blonde", name: "Dark Honey Blonde", level: "Level 6", hex: "#7E644B", bestShadeId: "shade-6" },
  { id: "base-med-blonde", name: "Medium Golden Blonde", level: "Level 7", hex: "#A8835B", bestShadeId: "shade-7" },
  { id: "base-light-blonde", name: "Light Sunlit Blonde", level: "Level 8", hex: "#CEAA81", bestShadeId: "shade-8" },
  { id: "base-very-light", name: "Very Light / Platinum", level: "Level 9+", hex: "#E8D3BD", bestShadeId: "shade-9" },
];

const GRAY_PERCENTAGES = [
  { id: "gray-10-30", label: "10% – 30%", desc: "Early stray greys at temples or part" },
  { id: "gray-30-60", label: "30% – 60%", desc: "Moderate visible silver regrowth" },
  { id: "gray-60-100", label: "60% – 100%", desc: "Dense, resistant silver/white roots" },
  { id: "gray-0", label: "0% (No Greys)", desc: "Seeking gloss shine and rich tone" },
];

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
      // Auto-set natural base closest to selected shade
      const matchedBase = NATURAL_BASES.find((b) => b.bestShadeId === initialShade.id);
      if (matchedBase) {
        setNaturalBase(matchedBase.id);
      }
    }
  }, [initialShade, isOpen]);

  // Lock body scroll when modal is open
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

  // Verdict calculation
  const matchVerdict = useMemo(() => {
    if (selectedShade.id === "shade-0-0") {
      return {
        isMatch: true,
        badge: "UNIVERSAL COMPATIBLE",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        title: "✓ Universal Compatibility",
        message:
          "No.0/0 Clear Gloss contains translucent salon pigment that blends seamlessly with any natural base without altering your underlying colour.",
      };
    }

    if (selectedShade.id === recommendedShade.id) {
      return {
        isMatch: true,
        badge: "100% PERFECT MATCH",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        title: `✓ Excellent Match for ${activeBaseObj.name}`,
        message: `${selectedShade.name} is calibrated with optimal pigment load for ${activeBaseObj.level} hair, providing 100% grey root coverage with zero brassiness.`,
      };
    }

    return {
      isMatch: false,
      badge: "COLOR SHIFT ADVISORY",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      title: `Recommended: ${recommendedShade.name}`,
      message: `Your selected ${selectedShade.name} may produce a multi-tone contrast with your ${activeBaseObj.name} base. For seamless root touch-up blending, our lab recommends ${recommendedShade.name}.`,
    };
  }, [selectedShade, recommendedShade, activeBaseObj]);

  const handleAddToCart = () => {
    store.addToCart({
      id: `prod-${selectedShade.id}`,
      name: `${selectedShade.name} System`,
      variant: `${selectedShade.undertone} • Suitability Verified`,
      price: selectedShade.price,
      image: selectedShade.cardImage,
      shadeCode: selectedShade.code,
      shadeHex: selectedShade.hex,
    });
    setJustAdded(true);
    setTimeout(() => {
      onClose();
      store.openCart();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-ash/40 overflow-hidden z-10 my-auto text-obsidian animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-ash/25 flex items-center justify-between bg-[#F8F9F9]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-graphite">
              SALON COLOR MATCH LAB
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-graphite hover:text-obsidian transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
          {/* Headline & Currently Selected Shade */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-ash/20">
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl tracking-tight text-obsidian">
                Are you sure this shade is suitable for your hair?
              </h2>
              <p className="text-xs text-graphite font-mono mt-1">
                Confirm your natural base and gray percentage for 100% root blending precision.
              </p>
            </div>
            {/* Active Shade Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#EAECEB] border border-black/5 shadow-2xs shrink-0">
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: selectedShade.hex }}
              />
              <span className="font-mono text-xs font-bold text-obsidian uppercase">
                {selectedShade.code} {selectedShade.name.replace(/No\.\S+\s*/, "")}
              </span>
            </div>
          </div>

          {/* STEP 1: Current / Natural Base Hair Color */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono tracking-wider font-bold text-obsidian uppercase flex items-center gap-1.5">
              <span>1. WHAT IS YOUR NATURAL BASE / REGROWTH COLOR?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NATURAL_BASES.map((base) => {
                const isSelected = naturalBase === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setNaturalBase(base.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all duration-150 flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? "bg-white border-obsidian ring-2 ring-obsidian shadow-xs"
                        : "bg-[#F7F8F8] border-ash/40 hover:bg-white hover:border-obsidian/40"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                      style={{ backgroundColor: base.hex }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-headline font-bold text-obsidian truncate">
                        {base.name}
                      </p>
                      <p className="text-[9px] font-mono text-graphite truncate">
                        {base.level}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Gray Hair Percentage */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono tracking-wider font-bold text-obsidian uppercase flex items-center gap-1.5">
              <span>2. HOW MUCH GRAY OR SILVER ROOTS DO YOU HAVE?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRAY_PERCENTAGES.map((gray) => {
                const isSelected = grayLevel === gray.id;
                return (
                  <button
                    key={gray.id}
                    type="button"
                    onClick={() => setGrayLevel(gray.id)}
                    className={`p-3 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-white border-obsidian ring-2 ring-obsidian shadow-xs"
                        : "bg-[#F7F8F8] border-ash/40 hover:bg-white hover:border-obsidian/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-obsidian">
                        {gray.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-obsidian" />}
                    </div>
                    <p className="text-[10px] text-graphite leading-snug">
                      {gray.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VERDICT BOX: Dynamic Compatibility Feedback */}
          <div
            className={`p-4 rounded-xl border transition-all duration-300 ${
              matchVerdict.isMatch
                ? "bg-emerald-50/70 border-emerald-200"
                : "bg-amber-50/70 border-amber-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  matchVerdict.isMatch
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-600 text-white"
                }`}
              >
                {matchVerdict.isMatch ? (
                  <Sparkles className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${matchVerdict.badgeColor}`}
                  >
                    {matchVerdict.badge}
                  </span>
                  <h4 className="font-headline font-bold text-sm text-obsidian">
                    {matchVerdict.title}
                  </h4>
                </div>
                <p className="text-xs text-graphite leading-relaxed">
                  {matchVerdict.message}
                </p>

                {/* If alternative recommended, offer 1-click switch */}
                {!matchVerdict.isMatch && recommendedShade && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedShade(recommendedShade)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-obsidian text-white text-[11px] font-mono font-bold tracking-wider uppercase hover:bg-black transition-colors shadow-2xs"
                    >
                      <span>Switch to {recommendedShade.code} {recommendedShade.name.replace(/No\.\S+\s*/, "")}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-5 sm:px-7 py-4 bg-[#F8F9F9] border-t border-ash/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-graphite">
            <span>Selected Formula:</span>
            <span className="font-bold text-obsidian">
              {selectedShade.code} • {selectedShade.name}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-ash/60 text-obsidian text-xs font-mono font-semibold tracking-wider uppercase hover:bg-white hover:border-obsidian transition-colors"
            >
              Browse Shades
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={justAdded}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-obsidian hover:bg-black text-white"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>CONFIRMED &amp; ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>CONFIRM &amp; ADD (${selectedShade.price} USD)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
