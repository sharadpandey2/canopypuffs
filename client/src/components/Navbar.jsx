/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Lock, ChevronRight } from "lucide-react"; 
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import LogoImg from "../assets/logo.png"; 

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Links Configuration
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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  // Handler for admin button click
  const handleAdminClick = () => {
    if (onAdminClick) onAdminClick();
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-colors duration-700 ease-in-out font-sans",
          isScrolled 
            ? "bg-black text-white py-4 shadow-2xl" 
            : "bg-gradient-to-b from-black/90 to-transparent text-white py-8"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-end border-b border-white/20 pb-4">
          
          {/* --- BRAND SECTION --- */}
          <div className="flex items-center gap-6 z-50">
            <a href="#" className="group flex items-center gap-4">
              {/* Logo Image */}
              <img 
                src={LogoImg} 
                alt="Canopy Puffs" 
               // NEW (Shows the logo exactly as it is in the file)
className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"/>
              
              <div className="flex flex-col">
                <span className="text-xl font-serif tracking-wide leading-none text-white">
                  CANOPY PUFFS
                </span>
                <span className="text-[9px] font-sans tracking-[0.3em] opacity-60 mt-1 uppercase group-hover:opacity-100 transition-opacity">
                  Aeronautics
                </span>
              </div>
            </a>
          </div>

          {/* --- DESKTOP MENU --- */}
          <ul className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <li key={link.name} className="relative group">
                <a
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors block py-2"
                >
                  {link.name}
                </a>
                
                {link.isNew && (
                  <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}

                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* --- ACTIONS (Cleaned Up) --- */}
          <div className="hidden md:flex items-center gap-6 pl-6 border-l border-white/20">
            {/* ONLY Admin Button Remains */}
            <button 
              onClick={handleAdminClick} 
              className="text-white/60 hover:text-white transition-colors p-2"
              title="Admin Access"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex items-center justify-center text-white opacity-80 hover:opacity-100 transition-opacity"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-[#050505] text-white flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-8">
              {LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => setIsMobileOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 pb-6 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-serif font-light tracking-wide group-hover:pl-2 transition-all duration-300">
                      {link.name}
                    </span>
                    
                    {link.isNew && (
                      <span className="text-[9px] font-bold uppercase tracking-widest border border-white/30 px-2 py-0.5">
                        New
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </motion.a>
              ))}

              {/* Mobile Admin Link */}
              <motion.button
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 onClick={() => { setIsMobileOpen(false); handleAdminClick(); }}
                 className="flex items-center gap-3 text-white/50 hover:text-white mt-8 text-xs uppercase tracking-[0.2em]"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Access</span>
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}