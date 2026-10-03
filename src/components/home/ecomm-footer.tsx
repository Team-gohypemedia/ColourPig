"use client";

import React from "react";
import { ColourpigLogo } from "@/components/brand/logo";
import { Mail, MapPin, Globe } from "lucide-react";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.256 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
    </svg>
  );
}

export function EcommFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1015] text-ash pt-12 sm:pt-14 pb-2 sm:pb-3 px-6 sm:px-10 lg:px-14 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Main 4-Column Grid matching reference design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Column 1: Brand Logo, Bio & Circular Social Buttons */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-1.5">
              <ColourpigLogo color="#FFFFFF" className="h-6 w-auto" />
              <p className="text-[10px] font-mono tracking-wider uppercase text-ash/80">
                A Norman Brown Product • Sydney
              </p>
            </div>
            <p className="text-ash/70 text-xs sm:text-[13px] font-light leading-relaxed max-w-sm">
              Sydney&apos;s premier air-driven permanent hair colour system for root touch-ups. Formulated by Norman Brown Pty Ltd for professional salon results with zero mixing and zero mess.
            </p>
            {/* Circular Social Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ash hover:text-white hover:border-platinum/40 hover:bg-white/10 transition-all duration-300"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ash hover:text-white hover:border-platinum/40 hover:bg-white/10 transition-all duration-300"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ash hover:text-white hover:border-platinum/40 hover:bg-white/10 transition-all duration-300"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Website"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ash hover:text-white hover:border-platinum/40 hover:bg-white/10 transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shades (Treatments equivalent) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-platinum block">
              SHADES
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-ash/80">
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.0/0 Clear Gloss</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.1 Mineral Black</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.3 Espresso Brown</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.4 Medium Brown</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.5 Light Brown</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.6 Dark Blonde</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.7 Medium Blonde</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.8 Light Blonde</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">No.9 Light Ash Blonde</a></li>
            </ul>
          </div>

          {/* Column 3: The System (Practice equivalent) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-platinum block">
              THE SYSTEM
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-ash/80">
              <li><a href="#engineering" className="hover:text-white transition-colors">The Reusable Canister</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">Dual-Chamber Delivery</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">In-Shower Ritual</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Norman Brown Atelier</a></li>
              <li><a href="#shade-finder" className="hover:text-white transition-colors">Before &amp; After Results</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">How To Refill</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Ingredients &amp; Safety</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Airheads Archive</a></li>
            </ul>
          </div>

          {/* Column 4: Client Care & Head Office (Colourpig Real Content) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-platinum block">
              CLIENT CARE
            </span>

            <div className="space-y-3 text-xs sm:text-[13px] text-ash/80">
              {/* Location Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-platinum flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-ash/80 leading-relaxed text-xs">
                  <span className="text-white font-medium block">Norman Brown Pty Ltd</span>
                  <span>46 Oxford Street, Paddington</span>
                  <br />
                  <span>NSW 2021, Sydney, Australia</span>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:concierge@colourpig.com"
                className="flex items-center gap-3 group hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-platinum group-hover:border-platinum/40 group-hover:bg-white/10 transition-all flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono text-xs">concierge@colourpig.com</span>
              </a>
            </div>

            {/* Service & Guarantee Links */}
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-ash/80 pt-2 border-t border-white/10">
              <li><a href="#bestsellers" className="hover:text-white transition-colors">30-Day In-Shower Trial</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">Global Express Dispatch</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">Order &amp; Refill Tracking</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Salon Concierge &amp; FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Divider Bar & Legal Line */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-ash/60">
          <p className="text-center md:text-left">
            © 2026 ColourPig by Norman &amp; Brown. All rights reserved. Registered Norman Brown Pty Ltd.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-ash/70">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping &amp; Returns</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>

        {/* Massive Hollow Outlined Brand Typography matching reference bottom banner */}
        <div className="mt-2 sm:mt-3 overflow-hidden w-full select-none pointer-events-none flex justify-center">
          <span className="font-headline font-black uppercase tracking-tight text-transparent leading-[0.85] text-[13.5vw] sm:text-[14.5vw] whitespace-nowrap [-webkit-text-stroke:1.5px_rgba(206,209,208,0.22)] sm:[-webkit-text-stroke:2px_rgba(206,209,208,0.28)] transition-all">
            COLOURPIG
          </span>
        </div>
      </div>
    </footer>
  );
}
