"use client";

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from "framer-motion";
import { Menu, X, Lock, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Next.js public image path
const LogoImg = "/logo.png";

// Tailwind merge helper
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Links
const LINKS = [
  { name: "Who we are", href: "#about" },
  { name: "Workshop", href: "#workshop", isNew: true },
  { name: "Solutions", href: "#solutions" },
  { name: "Contact", href: "#cta" },
];

export default function Navbar({ onAdminClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMobileOpen]);

  // Admin click handler
  const handleAdminClick = () => {
    if (onAdminClick) onAdminClick();
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 font-sans",
          isScrolled
            ? "bg-black text-white py-4 shadow-2xl"
            : "bg-gradient-to-b from-black/90 to-transparent text-white py-4 md:py-8"
        )}
      >
        {/* Changed items-end to items-center to ensure strict vertical alignment on mobile */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex justify-between items-center border-b border-white/20 pb-4">

          {/* BRAND */}
          {/* Added flex-1 on mobile so it takes available space without pushing the menu button away */}
          <div className="flex items-center gap-4 md:gap-6 z-50 flex-1">
            <a href="#" className="group flex items-center gap-3 md:gap-4">
              
              {/* LOGO */}
              {/* Scaled down logo slightly on mobile to save space */}
              <img
                src={LogoImg}
                alt="Canopy Puffs"
                className="h-6 md:h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />

              <div className="flex flex-col justify-center">
                {/* Scaled down text slightly on mobile */}
                <span className="text-base md:text-xl font-serif tracking-wide text-white leading-tight">
                  CANOPY PUFFS
                </span>
                <span className="text-[7px] md:text-[9px] tracking-[0.3em] opacity-60 uppercase group-hover:opacity-100 leading-tight">
                  Aeronautics
                </span>
              </div>
            </a>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <li key={link.name} className="relative group">
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
                {link.isNew && (
                  <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </li>
            ))}
          </ul>

          {/* DESKTOP ADMIN BUTTON */}
          <div className="hidden md:flex items-center gap-6 pl-6 border-l border-white/20">
            <button
              onClick={handleAdminClick}
              className="text-white/60 hover:text-white transition-colors"
              title="Admin Access"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden z-50 flex items-center ml-4">
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 -mr-2 text-white" // Added padding for a larger tap target
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#050505] text-white flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-6 mt-8">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-3xl font-serif border-b border-white/10 pb-6"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button
              onClick={handleAdminClick}
              className="flex items-center gap-3 mt-12 text-xs uppercase text-gray-400 hover:text-white transition-colors w-fit"
            >
              <Lock className="w-3 h-3" />
              Admin Access
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}