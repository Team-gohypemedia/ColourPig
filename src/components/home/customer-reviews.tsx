"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
  shade?: string;
  rating?: number;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

// ===== Custom Hook: Outside Click =====
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// ===== Carousel Component =====
export const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 280 : 360;
      const gap = 16;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full mt-6">
      {/* Scrollable Track */}
      <div
        className="flex w-full overflow-x-auto scroll-smooth [scrollbar-width:none] py-6 px-4 sm:px-8"
        ref={carouselRef}
        onScroll={checkScrollability}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-row justify-start gap-4 sm:gap-6 mx-auto">
          {items.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.45,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
                key={`card-${index}`}
                className="shrink-0"
              >
                {React.cloneElement(item, {
                  onCardClose: () => handleCardClose(index),
                })}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2.5 mt-4 px-4 sm:px-8 max-w-7xl mx-auto">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-obsidian text-white flex items-center justify-center disabled:opacity-30 hover:bg-steel active:scale-95 transition-all shadow-md"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
          aria-label="Previous review"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-obsidian text-white flex items-center justify-center disabled:opacity-30 hover:bg-steel active:scale-95 transition-all shadow-md"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
          aria-label="Next review"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// ===== Testimonial Card Component =====
export const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen overflow-hidden z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-obsidian/75 backdrop-blur-md h-full w-full fixed inset-0"
              onClick={handleCollapse}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              ref={containerRef}
              className="max-w-2xl w-full bg-white text-obsidian z-[60] p-6 sm:p-10 rounded-2xl relative shadow-2xl border border-ash/30 max-h-[90vh] overflow-y-auto"
            >
              <button
                className="absolute top-5 right-5 h-9 w-9 rounded-full flex items-center justify-center bg-obsidian/5 hover:bg-obsidian/10 text-obsidian transition-colors"
                onClick={handleCollapse}
                aria-label="Close review"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-obsidian/10 shadow-sm shrink-0">
                  <Image
                    src={testimonial.profileImage}
                    alt={testimonial.name}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg text-obsidian">
                      {testimonial.name}
                    </h3>
                    <CheckCircle className="w-4 h-4 text-[#7AC142]" />
                  </div>
                  <p className="font-mono text-xs text-graphite">
                    {testimonial.designation}
                  </p>
                  {testimonial.shade && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#13212E]/5 border border-black/10 text-[9px] font-mono text-graphite font-semibold">
                      Verified: {testimonial.shade}
                    </span>
                  )}
                </div>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFC72C] text-[#FFC72C]"
                  />
                ))}
              </div>

              <div className="relative py-4 text-obsidian text-lg sm:text-xl font-normal font-headline leading-relaxed">
                <Quote className="h-8 w-8 text-[#FFC72C]/40 mb-2" />
                <p>&ldquo;{testimonial.description}&rdquo;</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Card */}
      <motion.button
        onClick={handleExpand}
        className="text-left focus:outline-none"
        whileHover={{
          scale: 1.02,
          y: -4,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
      >
        <div className="rounded-2xl bg-white border border-ash/30 h-[480px] sm:h-[520px] w-72 sm:w-80 p-6 flex flex-col justify-between items-center text-center relative z-10 shadow-sm hover:shadow-xl hover:border-obsidian transition-all duration-300 group">
          {/* Top: Avatar & Rating */}
          <div className="flex flex-col items-center space-y-3 pt-2">
            <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-[#FFC72C] text-[#FFC72C]"
                />
              ))}
            </div>
          </div>

          {/* Center: Quote Preview */}
          <div className="py-2 flex-1 flex items-center justify-center">
            <p className="text-obsidian font-headline text-sm sm:text-base font-normal leading-relaxed italic line-clamp-6 px-1">
              &ldquo;
              {testimonial.description.length > 180
                ? `${testimonial.description.slice(0, 180)}...`
                : testimonial.description}
              &rdquo;
            </p>
          </div>

          {/* Bottom: Client Meta */}
          <div className="pt-4 border-t border-black/10 w-full space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <span className="font-headline font-bold text-sm text-obsidian">
                {testimonial.name}
              </span>
              <CheckCircle className="w-3.5 h-3.5 text-[#7AC142]" />
            </div>
            <p className="text-[11px] font-mono text-graphite truncate px-2">
              {testimonial.designation}
            </p>
            {testimonial.shade && (
              <div className="pt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#13212E]/5 border border-black/10 text-[9px] font-mono text-graphite font-semibold">
                  Verified: {testimonial.shade}
                </span>
              </div>
            )}
            <span className="block pt-1 text-[10px] font-mono text-ash group-hover:text-obsidian transition-colors underline underline-offset-4">
              Read Full Story ↗
            </span>
          </div>
        </div>
      </motion.button>
    </>
  );
};

// ===== Profile Image Component =====
export const ProfileImage = ({ src, alt }: { src: string; alt?: string }) => {
  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full border-2 border-obsidian/10 shadow-sm relative shrink-0 group-hover:border-obsidian/40 transition-colors">
      <Image
        className="w-full h-full object-cover object-top"
        src={src}
        fill
        sizes="96px"
        alt={alt || "Profile image"}
      />
    </div>
  );
};

// ===== Reviews Dataset =====
const CLIENT_TESTIMONIALS: iTestimonial[] = [
  {
    name: "Emma S.",
    designation: "Product Designer, 32",
    shade: "Ash Blond #1903",
    profileImage: "/images/model-ash-blond.jpg",
    description:
      "I read specifications and dismiss hype. Sustainability matters only when engineered in. Colourpig cuts 90% waste with salon-grade pigment that actually stays unoxidized. The dual canister delivery delivers pure precision.",
  },
  {
    name: "Sophia M.",
    designation: "Strategy VP, 38",
    shade: "Natural Brunette #2401",
    profileImage: "/images/model-brunette.jpg",
    description:
      "Time is my currency. Traditional hair colour was a scheduling nightmare with guilt over plastic throwaways. Having Colourpig in my shower for 8 weeks is pure radical convenience. No mess on hairline and perfect natural blending.",
  },
  {
    name: "Claire D.",
    designation: "Architect, 41",
    shade: "Auburn Russet #3204",
    profileImage: "/images/model-auburn.jpg",
    description:
      "The chrome dispenser is automotive-grade industrial design. No messy chemical drip, no staining on the hairline. The root wand delivers exactly 10ml with micro-precision. The undertone depth is unbelievable.",
  },
  {
    name: "Margaret T.",
    designation: "Former Educator, 68",
    shade: "Platinum Silver #1105",
    profileImage: "/images/model-silver.jpg",
    description:
      "Norman & Brown's salon heritage gave me immediate trust. Decades of gray coverage made simple, intuitive, and dignified. It's the first time hair care felt designed by true cosmetic engineers.",
  },
  {
    name: "David Kim",
    designation: "Creative Director, 35",
    shade: "Espresso Noir #0802",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description:
      "Precision touch-up that seamlessly matches my natural tone. The 30-minute ritual fits effortlessly into my schedule without booking costly salon slots. Best grooming investment I made this year.",
  },
  {
    name: "Alena Rosser",
    designation: "Editorial Stylist, 29",
    shade: "Honey Blonde #1903",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    description:
      "We tested ColourPig across high-intensity fashion shoots. The pigments maintain shine, multidimensional tone, and silky cuticle health wash after wash. The reusable dispenser is pure innovation.",
  },
];

// ===== Main CustomerReviews Section =====
export function CustomerReviews() {
  const cards = CLIENT_TESTIMONIALS.map((testimonial, index) => (
    <TestimonialCard
      key={testimonial.name}
      testimonial={testimonial}
      index={index}
    />
  ));

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-8 max-w-[1700px] mx-auto overflow-hidden">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          WHAT OUR CLIENTS SAY
        </h2>
        <p className="text-[11px] font-mono tracking-widest uppercase text-graphite font-semibold">
          REAL REVIEWS FROM REAL CLIENTS
        </p>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Interactive Carousel */}
      <Carousel items={cards} />
    </section>
  );
}

export default CustomerReviews;
