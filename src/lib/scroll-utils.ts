"use client";

/**
 * Smoothly scrolls the window to the STARTER SYSTEMS section (#shades)
 * and centers it in the visible viewport between the fixed navbar and the bottom of the screen,
 * ensuring neither the top heading nor the bottom of the product cards are cut off.
 */
export function scrollToStarterSystems() {
  if (typeof window === "undefined") return;

  const el = document.getElementById("shades");
  if (!el) {
    if (window.location.pathname !== "/") {
      window.location.href = "/#shades";
    }
    return;
  }

  // Calculate actual fixed header height: 116px on desktop (announcement bar + header), ~96px on mobile
  const isDesktop = window.innerWidth >= 640;
  const navHeight = isDesktop ? 116 : 96;

  const rect = el.getBoundingClientRect();
  const elTop = rect.top + window.scrollY;
  const elHeight = el.offsetHeight;
  const availableHeight = window.innerHeight - navHeight;

  let targetScrollY: number;

  if (elHeight < availableHeight) {
    // Center the entire section vertically in the visible viewport space below the navbar
    const extraSpace = availableHeight - elHeight;
    targetScrollY = elTop - navHeight - extraSpace / 2;
  } else {
    // If the section is taller than available space, align its top with clean padding right below the navbar
    targetScrollY = elTop - navHeight - 16;
  }

  // Ensure scroll target is clamped to valid document bounds
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));

  const lenis = (window as any).lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(targetScrollY, { duration: 1.1 });
  } else {
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }

  if (window.location.hash !== "#shades") {
    window.history.pushState(null, "", "/#shades");
  }
}
