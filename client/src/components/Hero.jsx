/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, PlayCircle } from "lucide-react";

// --- Configuration ---
import FighterJet from "../assets/fighterjet.png"; 

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Hero() {
  const ref = useRef(null);
  
  // Scroll Animation (Parallax)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // --- SCROLL HANDLERS ---
  const scrollToWorkshop = () => document.getElementById('workshop')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToSolutions = () => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      
      {/* --- CINEMATIC BACKGROUND LAYER --- */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
              backgroundImage: `url(${FighterJet})`,
              // Subtle darkening to make text pop, but keeping image clear
              filter: 'brightness(0.7) contrast(1.1)' 
          }}
        />
        {/* Luxury Gradient: Darkens the bottom left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* --- EDITORIAL CONTENT (Bottom Left) --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-24">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="max-w-4xl"
        >
          
          {/* Eyebrow Text */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/90">
              Future Aerospace Leaders
            </span>
          </motion.div>

          {/* Main Headline - Serif for Luxury */}
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tight text-white mb-8">
            We Are Built <br />
            <span className="text-white/90 italic">To Fly.</span>
          </motion.h1>

          {/* Description - FIXED CLOSING TAG HERE */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-12 font-light border-l border-white/30 pl-6">
            Canopy Puffs designs AI-powered drones and smart security systems for defense, rescue, and automation.
            Our mission is to turn advanced technology into reliable real-world solutions.
          </motion.p>

          {/* --- LUXURY BUTTONS --- */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
            
            {/* Primary Button: Solid White */}
            <button 
              onClick={scrollToSolutions} 
              className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
            >
              Explore Systems
            </button>

            {/* Secondary Button: Transparent with Arrow */}
            <button 
              onClick={scrollToWorkshop} 
              className="group flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
            >
              <span>Book Workshop</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </motion.div>

        </motion.div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-8 hidden md:flex items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-60">Scroll</span>
        <div className="h-[1px] w-16 bg-white/40" />
      </motion.div>

    </section>
  );
}