"use client";

/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Next.js public folder path
const FighterJet = "/fighterjet.png";

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

  // Scroll handlers
  const scrollToWorkshop = () => {
    document.getElementById("workshop")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSolutions = () => {
    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      // Allowed scrolling on very small heights to prevent overflow issues
      className="relative min-h-[100svh] w-full overflow-y-auto overflow-x-hidden md:overflow-hidden bg-black text-white flex flex-col justify-end"
    >
      
      {/* CINEMATIC BACKGROUND */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${FighterJet})`,
            filter: "brightness(0.7) contrast(1.1)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black/80 via-black/40 md:via-transparent to-transparent" />
      </motion.div>

      {/* CONTENT */}
      {/* FIX APPLIED HERE: Separated px/py and changed to justify-center */}
      <div className="relative z-20 w-full px-6 pt-40 pb-12 md:px-16 md:pt-48 md:pb-24 lg:px-24 lg:pt-56 flex flex-col justify-center min-h-[100svh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full"
        >
          
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-white" />
            <span className="text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/90">
              Future Aerospace Leaders
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-8xl lg:text-9xl font-serif font-medium leading-[1.2] md:leading-[0.9] tracking-tight text-white mb-6 md:mb-8"
          >
            We Are Built <br />
            <span className="text-white/90 italic">To Fly.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-xl text-gray-300 max-w-xl leading-relaxed md:leading-relaxed mb-8 md:mb-12 font-light border-l border-white/30 pl-4 md:pl-6"
          >
            Canopy Puffs designs AI-powered drones and smart security systems for defense, rescue, and automation.
            Our mission is to turn advanced technology into reliable real-world solutions.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 md:gap-6 w-full sm:w-auto">
            
            <button
              onClick={scrollToSolutions}
              className="w-full sm:w-auto px-6 py-4 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors text-center"
            >
              Explore Systems
            </button>

            <button
              onClick={scrollToWorkshop}
              className="group w-full sm:w-auto flex justify-center items-center gap-3 px-6 py-4 border border-white/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
            >
              <span>Book Workshop</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-8 hidden md:flex items-center gap-4 z-20"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-60">
          Scroll
        </span>
        <div className="h-[1px] w-16 bg-white/40" />
      </motion.div>

    </section>
  );
}