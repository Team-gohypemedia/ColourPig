"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Check, AlertTriangle, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { useStore } from "@/context/store-context";

interface HairSuitabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialShade?: ShadeProduct | null;
}

const NATURAL_BASES = [
  { id: "base-black", name: "Black", level: "1–2", numericLevel: 2, hex: "#1C1B1F", bestShadeId: "shade-1" },
  { id: "base-dark-brown", name: "Dark Brown", level: "3", numericLevel: 3, hex: "#2A211D", bestShadeId: "shade-3" },
  { id: "base-med-brown", name: "Medium Brown", level: "4", numericLevel: 4, hex: "#4A392F", bestShadeId: "shade-4" },
  { id: "base-light-brown", name: "Light Brown", level: "5", numericLevel: 5, hex: "#634E3F", bestShadeId: "shade-5" },
  { id: "base-dark-blonde", name: "Dark Blonde", level: "6", numericLevel: 6, hex: "#7E644B", bestShadeId: "shade-6" },
  { id: "base-med-blonde", name: "Medium Blonde", level: "7", numericLevel: 7, hex: "#A8835B", bestShadeId: "shade-7" },
  { id: "base-light-blonde", name: "Light Blonde", level: "8", numericLevel: 8, hex: "#CEAA81", bestShadeId: "shade-8" },
  { id: "base-very-light", name: "Very Light", level: "9", numericLevel: 9, hex: "#E8D3BD", bestShadeId: "shade-9" },
];

const GRAY_PERCENTAGES = [
  { id: "gray-0", label: "None", sub: "0%", fill: 0 },
  { id: "gray-10-30", label: "A little", sub: "10–30%", fill: 22 },
  { id: "gray-30-60", label: "About half", sub: "30–60%", fill: 48 },
  { id: "gray-60-100", label: "Mostly", sub: "60–100%", fill: 82 },
] as const;

type GrayId = (typeof GRAY_PERCENTAGES)[number]["id"];
type Tone = "match" | "close" | "switch";

interface Verdict {
  tone: Tone;
  title: string;
  body: string;
  coverage: string;
  suggest?: ShadeProduct;
}

const TONE_STYLES: Record<Tone, { box: string; icon: string; label: string }> = {
  match: { box: "bg-emerald-50 border-emerald-200", icon: "bg-emerald-600 text-white", label: "Great match" },
  close: { box: "bg-sky-50 border-sky-200", icon: "bg-sky-600 text-white", label: "Good match" },
  switch: { box: "bg-amber-50 border-amber-200", icon: "bg-amber-500 text-white", label: "Not the best fit" },
};

const CLEAR_ID = "shade-0-0";

// Pigmented shades carry their depth in the formula (e.g. No.1 Black is formula 2.0 → level 2)
const getShadeLevel = (shade: ShadeProduct): number => {
  if (shade.id === CLEAR_ID) return 0;
  return Math.round(parseFloat(shade.formula) || parseInt(shade.code.replace(/\D/g, "")) || 4);
};

const levels = (n: number) => `${n} level${n === 1 ? "" : "s"}`;

function getVerdict(
  shade: ShadeProduct,
  base: (typeof NATURAL_BASES)[number] | null,
  gray: GrayId | null
): Verdict | null {
  const best = base ? OFFICIAL_SHADES.find((s) => s.id === base.bestShadeId) : undefined;
  const suggestion = best && best.id !== shade.id ? best : undefined;

  // Clear has no pigment: root colour doesn't matter, grey amount decides everything
  if (shade.id === CLEAR_ID) {
    if (!gray) return null;
    if (gray === "gray-0") {
      return {
        tone: "match",
        title: "Perfect as a shine gloss",
        body: "No.0/0 has no pigment, so it won't change your colour. It adds glassy shine and works on every root colour.",
        coverage: "No grey to cover, so you get pure gloss.",
      };
    }
    if (gray === "gray-10-30") {
      return {
        tone: "close",
        title: "Softens greys, won't hide them",
        body: "Clear turns a few greys into a soft, silvery shimmer. It blends them but doesn't colour them.",
        coverage: suggestion
          ? `Want them fully covered? ${suggestion.name} matches your roots.`
          : "Want them fully covered? Pick your root colour and we'll suggest a shade.",
        suggest: suggestion,
      };
    }
    return {
      tone: "switch",
      title: "Clear won't cover this much grey",
      body: "With this much grey you need a shade with pigment. Clear on its own will leave greys visible.",
      coverage: suggestion
        ? `${suggestion.name} matches your roots and gives full grey coverage.`
        : "Pick your root colour above and we'll show the shade that covers it.",
      suggest: suggestion,
    };
  }

  if (!base) return null;

  const diff = getShadeLevel(shade) - base.numericLevel;
  const steps = Math.abs(diff);

  const coverage = (() => {
    if (!gray) return "Tell us how much grey you have to see coverage advice.";
    if (gray === "gray-0") return "No grey to cover. This refreshes your root depth and shine.";
    if (gray === "gray-60-100" && diff > 0)
      return "On mostly-grey roots a lighter shade looks softer, more like blended highlights than solid colour.";
    if (gray === "gray-60-100") return "Dense pigment covers even stubborn white roots.";
    if (gray === "gray-30-60") return "Full, opaque coverage on moderate grey.";
    return "Fully covers early greys with a natural blend.";
  })();

  if (diff === 0) {
    return {
      tone: "match",
      title: `Perfect match for ${base.name.toLowerCase()} roots`,
      body: `${shade.name} is the same depth as your natural roots, so regrowth blends in invisibly.`,
      coverage,
    };
  }

  if (diff === -1) {
    return {
      tone: "close",
      title: "Works well, a touch richer",
      body: `${shade.name} is 1 level deeper than your roots. That gives a soft, natural-looking shadow root.`,
      coverage,
      suggest: suggestion,
    };
  }

  if (diff === 1) {
    return {
      tone: "close",
      title: "Works well, a touch brighter",
      body: `${shade.name} is 1 level lighter than your roots, for a gentle lift of brightness.`,
      coverage,
      suggest: gray === "gray-60-100" ? suggestion : undefined,
    };
  }

  if (diff < 0) {
    return {
      tone: "switch",
      title: "Too dark for your roots",
      body: `${shade.name} is ${levels(steps)} darker than your roots. It would leave a heavy, flat band at the regrowth line.`,
      coverage,
      suggest: suggestion,
    };
  }

  return {
    tone: "switch",
    title: "Too light for your roots",
    body: `${shade.name} is ${levels(steps)} lighter than your roots. Root colour can't lighten natural hair that far, so greys would turn light while the rest stays dark.`,
    coverage,
    suggest: suggestion,
  };
}

/** Dark → light depth bar with markers for the shade and the user's roots */
function LevelScale({ shadeLevel, rootLevel, shadeHex, rootHex }: {
  shadeLevel: number;
  rootLevel: number;
  shadeHex: string;
  rootHex: string;
}) {
  const pos = (level: number) => `${((level - 1) / 8) * 100}%`;
  const gradient = `linear-gradient(to right, #111, ${NATURAL_BASES.map((b) => b.hex).join(", ")})`;

  return (
    // Markers (dot + label, ~34px) hang above and below the bar, so leave room for them on both sides
    <div className="pt-10 pb-3 px-8">
      <div className="relative h-2.5 rounded-full" style={{ background: gradient }}>
        <div className="absolute -top-1 -translate-x-1/2 -translate-y-full flex flex-col items-center transition-all duration-500" style={{ left: pos(shadeLevel) }}>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-obsidian whitespace-nowrap">This shade</span>
          <span className="w-3.5 h-3.5 rounded-full border-2 border-white shadow ring-1 ring-black/20 mt-0.5" style={{ backgroundColor: shadeHex }} />
        </div>
        <div className="absolute -bottom-1 -translate-x-1/2 translate-y-full flex flex-col items-center transition-all duration-500" style={{ left: pos(rootLevel) }}>
          <span className="w-3.5 h-3.5 rounded-full border-2 border-white shadow ring-1 ring-black/20 mb-0.5" style={{ backgroundColor: rootHex }} />
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-obsidian whitespace-nowrap">Your roots</span>
        </div>
      </div>
      <div className="flex justify-between mt-11 text-[9px] font-mono text-obsidian/70 uppercase tracking-wider">
        <span>Darkest</span>
        <span>Lightest</span>
      </div>
    </div>
  );
}

export function HairSuitabilityModal({
  isOpen,
  onClose,
  initialShade,
}: HairSuitabilityModalProps) {
  const store = useStore();
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(initialShade || OFFICIAL_SHADES[3]);
  // Start unanswered: the user tells us about their hair, we never assume it matches
  const [naturalBase, setNaturalBase] = useState<string | null>(null);
  const [grayLevel, setGrayLevel] = useState<GrayId | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  // On each open, check the shade that was clicked (answers are kept between opens)
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      if (initialShade) setSelectedShade(initialShade);
      setJustAdded(false);
    }
  }

  // Lock background scroll and close on Escape while open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const base = useMemo(() => NATURAL_BASES.find((b) => b.id === naturalBase) || null, [naturalBase]);
  const isClear = selectedShade.id === CLEAR_ID;
  const verdict = useMemo(() => getVerdict(selectedShade, base, grayLevel), [selectedShade, base, grayLevel]);

  const handleAddToCart = () => {
    store.addToCart({
      id: `${selectedShade.id}-starter-system`,
      name: `Colourpig Starter System | ${selectedShade.name}`,
      variant: `${selectedShade.undertone} • Match Verified`,
      price: 2499,
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

  const pendingHint = isClear
    ? "Tell us how much grey you have to see if Clear is right for you."
    : "Pick your root colour to see your match.";

  return (
    // data-lenis-prevent: opening this locks body scroll, which stops Lenis, and a stopped Lenis cancels every
    // wheel / touchmove it sees — without this the modal's own content can't scroll
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-title"
      data-lenis-prevent
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />

      {/* Bottom sheet on phones, centred card from sm up */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-hidden z-10 text-obsidian">
        {/* Header: the shade being checked, switchable */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-ash/20 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="w-11 h-11 rounded-full shrink-0 ring-1 ring-black/10 shadow-inner"
                style={{ background: `radial-gradient(circle at 30% 30%, #ffffff55, transparent 55%), ${selectedShade.hex}` }}
              />
              <div className="min-w-0">
                <h2 id="match-title" className="font-headline font-bold text-lg leading-tight">
                  Is {selectedShade.name} right for you?
                </h2>
                <p className="text-xs text-obsidian mt-0.5">2 quick questions, about 10 seconds</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 -mr-1 rounded-full hover:bg-black/5 flex items-center justify-center text-obsidian hover:text-obsidian transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian shrink-0 mr-1">Shade</span>
            {OFFICIAL_SHADES.map((s) => {
              const active = s.id === selectedShade.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedShade(s)}
                  title={s.name}
                  aria-label={`Check ${s.name}`}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full ring-1 ring-black/15 transition-all cursor-pointer ${
                    active ? "w-7 h-7 ring-2 ring-obsidian ring-offset-2" : "w-5 h-5 hover:scale-110"
                  }`}
                  style={{ backgroundColor: s.hex }}
                />
              );
            })}
          </div>
        </div>

        <div className="px-5 sm:px-6 py-5 space-y-6 overflow-y-auto overscroll-contain flex-1 min-h-0">
          {/* Q1 */}
          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-headline font-semibold text-sm">
                <span className="text-obsidian font-mono mr-1.5">1</span>What colour are your natural roots?
              </h3>
              {isClear && <span className="text-[10px] font-mono text-obsidian shrink-0">Optional for Clear</span>}
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-3">
              {NATURAL_BASES.map((b) => {
                const active = naturalBase === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setNaturalBase(b.id)}
                    aria-pressed={active}
                    className="group flex flex-col items-center gap-1.5 cursor-pointer"
                  >
                    <span
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full ring-1 ring-black/10 transition-all ${
                        active ? "ring-2 ring-obsidian ring-offset-2 scale-105" : "group-hover:scale-105"
                      }`}
                      style={{ background: `radial-gradient(circle at 30% 30%, #ffffff40, transparent 55%), ${b.hex}` }}
                    >
                      {active && (
                        <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-obsidian text-white flex items-center justify-center">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                      )}
                    </span>
                    <span className={`text-[11px] leading-tight text-center ${active ? "font-bold text-obsidian" : "text-obsidian"}`}>
                      {b.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Q2 */}
          <section className="space-y-3">
            <h3 className="font-headline font-semibold text-sm">
              <span className="text-obsidian font-mono mr-1.5">2</span>How much grey is at your roots?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRAY_PERCENTAGES.map((g) => {
                const active = grayLevel === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGrayLevel(g.id)}
                    aria-pressed={active}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? "border-obsidian bg-obsidian text-white shadow-sm"
                        : "border-ash/40 bg-[#F7F8F8] hover:border-obsidian/40 hover:bg-white"
                    }`}
                  >
                    <span className={`block h-1.5 rounded-full overflow-hidden ${active ? "bg-white/25" : "bg-black/10"}`}>
                      <span
                        className={`block h-full rounded-full ${active ? "bg-white" : "bg-ash"}`}
                        style={{ width: `${g.fill}%` }}
                      />
                    </span>
                    <span className="block text-xs font-semibold mt-2 leading-tight">{g.label}</span>
                    <span className={`block text-[10px] font-mono mt-0.5 ${active ? "text-white/70" : "text-obsidian"}`}>{g.sub}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Result */}
          {verdict ? (
            <section className={`rounded-2xl border p-4 sm:p-5 ${TONE_STYLES[verdict.tone].box}`} aria-live="polite">
              <div className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${TONE_STYLES[verdict.tone].icon}`}>
                  {verdict.tone === "match" && <Check className="w-[18px] h-[18px]" strokeWidth={3} />}
                  {verdict.tone === "close" && <Sparkles className="w-4 h-4" />}
                  {verdict.tone === "switch" && <AlertTriangle className="w-4 h-4" />}
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-obsidian">
                    {TONE_STYLES[verdict.tone].label}
                  </span>
                  <h4 className="font-headline font-bold text-base leading-snug">{verdict.title}</h4>
                  <p className="text-[13px] text-obsidian mt-1 leading-relaxed">{verdict.body}</p>
                </div>
              </div>

              {!isClear && base && (
                <LevelScale
                  shadeLevel={getShadeLevel(selectedShade)}
                  rootLevel={base.numericLevel}
                  shadeHex={selectedShade.hex}
                  rootHex={base.hex}
                />
              )}

              <p className={`text-[13px] leading-relaxed ${!isClear && base ? "" : "mt-3"} pt-3 border-t border-black/10`}>
                <span className="font-semibold">Grey coverage: </span>
                <span className="text-obsidian">{verdict.coverage}</span>
              </p>

              {verdict.suggest && (
                <button
                  type="button"
                  onClick={() => setSelectedShade(verdict.suggest!)}
                  className="mt-4 w-full flex items-center gap-3 p-2.5 pr-3.5 rounded-xl bg-white border border-black/10 hover:border-obsidian transition-colors cursor-pointer text-left group"
                >
                  <span className="w-9 h-9 rounded-full ring-1 ring-black/10 shrink-0" style={{ backgroundColor: verdict.suggest.hex }} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-obsidian">
                      {verdict.tone === "switch" ? "We recommend" : "Best match for your roots"}
                    </span>
                    <span className="block text-sm font-bold truncate">{verdict.suggest.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider">
                    Switch <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              )}
            </section>
          ) : (
            <section className="rounded-2xl border border-dashed border-ash/60 bg-[#F7F8F8] p-5 text-center">
              <p className="text-sm text-obsidian">{pendingHint}</p>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 pt-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] bg-[#F9FAFA] border-t border-ash/20 flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <span className="block text-sm font-bold truncate">{selectedShade.name} System</span>
            <span className="block text-xs font-mono text-obsidian">${selectedShade.price} USD</span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={justAdded}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0 ${
              justAdded
                ? "bg-emerald-600 text-white"
                : verdict?.tone === "switch"
                  ? "bg-white text-obsidian border border-obsidian/30 hover:border-obsidian"
                  : "bg-obsidian hover:bg-black text-white shadow-sm"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{verdict?.tone === "switch" ? "Add anyway" : "Add to bag"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HairSuitabilityModal;
