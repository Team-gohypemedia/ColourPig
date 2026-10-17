"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Check, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { useStore } from "@/context/store-context";

interface HairSuitabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialShade?: ShadeProduct | null;
}

const NATURAL_BASES = [
  { id: "base-black", name: "Deep Black", level: "L1–2", hex: "#1C1B1F", bestShadeId: "shade-1" },
  { id: "base-dark-brown", name: "Dark Brown", level: "L3", hex: "#2A211D", bestShadeId: "shade-3" },
  { id: "base-med-brown", name: "Medium Brown", level: "L4", hex: "#4A392F", bestShadeId: "shade-4" },
  { id: "base-light-brown", name: "Light Brown", level: "L5", hex: "#634E3F", bestShadeId: "shade-5" },
  { id: "base-dark-blonde", name: "Dark Blonde", level: "L6", hex: "#7E644B", bestShadeId: "shade-6" },
  { id: "base-med-blonde", name: "Golden Blonde", level: "L7", hex: "#A8835B", bestShadeId: "shade-7" },
  { id: "base-light-blonde", name: "Light Blonde", level: "L8", hex: "#CEAA81", bestShadeId: "shade-8" },
  { id: "base-very-light", name: "Platinum", level: "L9+", hex: "#E8D3BD", bestShadeId: "shade-9" },
];

const GRAY_PERCENTAGES = [
  { id: "gray-0", label: "0% Gray" },
  { id: "gray-10-30", label: "10% – 30%" },
  { id: "gray-30-60", label: "30% – 60%" },
  { id: "gray-60-100", label: "60% – 100%" },
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

  // Direct, simple match check
  const matchVerdict = useMemo(() => {
    if (selectedShade.id === "shade-0-0") {
      return {
        isMatch: true,
        title: "Universal Clear Gloss",
        message: "No.0/0 adds high-gloss shine across all hair colors without changing your shade.",
      };
    }

    if (selectedShade.id === recommendedShade.id) {
      return {
        isMatch: true,
        title: `Perfect match for ${activeBaseObj.name}`,
        message: `${selectedShade.name} blends naturally with your roots and provides even gray coverage.`,
      };
    }

    return {
      isMatch: false,
      title: `Recommended: ${recommendedShade.name}`,
      message: `For your ${activeBaseObj.name} hair, ${recommendedShade.name} will blend more naturally.`,
    };
  }, [selectedShade, recommendedShade, activeBaseObj]);

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
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-ash/30 flex flex-col max-h-[90dvh] sm:max-h-[85vh] overflow-hidden z-10 text-obsidian animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header - Fixed */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-ash/20 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-black/15 shrink-0"
              style={{ backgroundColor: selectedShade.hex }}
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-obsidian">
              {selectedShade.code} {selectedShade.name.replace(/No\.\S+\s*/, "")}
            </span>
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
          {/* Title */}
          <div>
            <h2 className="font-headline font-bold text-base sm:text-lg tracking-tight text-obsidian">
              Does this shade match your hair?
            </h2>
            <p className="text-xs text-graphite mt-0.5">
              Select your root color and gray amount to confirm a natural blend.
            </p>
          </div>

          {/* Question 1: Natural Root Color */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-graphite block">
              1. Your Root Color
            </span>
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
                        ? "bg-obsidian text-white border-obsidian shadow-2xs"
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
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-graphite block">
              2. Gray Coverage Needed
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {GRAY_PERCENTAGES.map((gray) => {
                const isSelected = grayLevel === gray.id;
                return (
                  <button
                    key={gray.id}
                    type="button"
                    onClick={() => setGrayLevel(gray.id)}
                    className={`py-2 px-2.5 rounded-lg border text-center font-mono text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? "bg-obsidian text-white border-obsidian shadow-2xs"
                        : "bg-[#F7F8F8] border-ash/40 hover:bg-white hover:border-obsidian/30 text-obsidian"
                    }`}
                  >
                    {gray.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verdict Box - Clean & Minimal */}
          <div
            className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 transition-all ${
              matchVerdict.isMatch
                ? "bg-emerald-50/70 border-emerald-200"
                : "bg-amber-50/70 border-amber-200"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {matchVerdict.isMatch ? (
                <Check className="w-4 h-4 text-emerald-700" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-700" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-headline font-bold text-xs sm:text-sm text-obsidian">
                {matchVerdict.title}
              </h4>
              <p className="text-xs text-graphite mt-0.5 leading-relaxed">
                {matchVerdict.message}
              </p>

              {/* If different shade recommended, offer 1-click switch */}
              {!matchVerdict.isMatch && recommendedShade && (
                <button
                  type="button"
                  onClick={() => setSelectedShade(recommendedShade)}
                  className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian text-white text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
                >
                  <span>Switch to {recommendedShade.code} {recommendedShade.name.replace(/No\.\S+\s*/, "")}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-4 sm:px-6 py-3 bg-[#F9FAFA] border-t border-ash/20 flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0">
            <span className="font-mono text-xs font-bold text-obsidian block truncate">
              {selectedShade.code} • ${selectedShade.price} USD
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
