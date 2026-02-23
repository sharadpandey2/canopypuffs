"use client"; // <-- This is required for framer-motion in Next.js!

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// --- ASSETS ---
const WorkshopImg = "/workshop.png";

// --- MAIN SECTION ---
export default function Workshop() {
  return (
    <section id="workshop" className="relative bg-black text-white overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* --- LEFT: CINEMATIC IMAGE --- */}
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gray-900">
             <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={WorkshopImg} 
              alt="Workshop Session" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent lg:bg-gradient-to-t lg:from-black/80 lg:to-transparent" />
          
          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Module 01</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">The Art of <br/> Aerodynamics.</h2>
          </div>
        </div>

        {/* --- RIGHT: EDITORIAL CONTENT --- */}
        <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:py-0 bg-black relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[1px] w-12 bg-white/30 mb-8" />
            
            <h3 className="text-xl md:text-2xl font-serif mb-6 leading-relaxed text-white/90">
              "We don't just teach flight. <br />
              <span className="text-gray-500">We engineer the pilots of tomorrow.</span>"
            </h3>

            <p className="text-gray-400 font-light leading-relaxed mb-12 max-w-md">
              Our Future Engineers Program brings a fully equipped aerospace laboratory to your institution. 
              Students engage in rigourous hands-on assembly, physics simulations, and autonomous flight testing.
            </p>

            {/* Spec Sheet Style List */}
            <div className="border-t border-white/10 mb-12">
              {[
                { label: "Capacity", value: "30 - 100 Students" },
                { label: "Duration", value: "6 - 12 Hours" },
                { label: "Grades", value: "Class 6 - 12" },
                { label: "Training", value: "Provided by Canopy Puffs" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-2">
                  <span className="text-xs uppercase tracking-widest text-gray-500">{item.label}</span>
                  <span className="text-sm font-serif text-white">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Call to Action -> This correctly points to your /workshop folder */}
            <Link 
              href="/workshop"
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-gray-300 transition-colors inline-flex"
            >
              <span className="border-b border-white pb-1 group-hover:border-gray-300">Schedule Workshop</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

          </motion.div>
        </div>

      </div>
    </section>
  );
}