/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { 
  Plane,       // ASTRA
  Bot,         // Rover
  ShieldAlert, // SkyGuardian
  Crosshair,   // CIWS
  ArrowRight,
  Plus
} from "lucide-react";

// --- ASSETS ---
// [!] IMPORTANT: Ensure these files match exactly in your 'src/assets' folder
import AstraImg from "../assets/astra.jpeg"; 
import RoverImg from "../assets/astra1.jpg";   // Added for Rover (Check extension .jpeg/.png)
import DefenseImg from "../assets/defence.jpeg";
import CiwsImg from "../assets/cisi.jpg";      // Added for CIWS (Check extension .jpeg/.png)

// --- LUXURY CARD COMPONENT ---
const ShowroomCard = ({ title, subtitle, icon: Icon, features, index, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-[#080808] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/30"
    >
      {/* --- IMAGE SECTION (Top Half - Full Color) --- */}
      <div className="relative h-56 w-full overflow-hidden border-b border-white/5 bg-white/5">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        )}
      </div>

      {/* --- CONTENT SECTION (Bottom Half) --- */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 border border-white/10 rounded-full bg-black/50 group-hover:bg-white group-hover:text-black transition-all duration-500">
              <Icon className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 bg-white/5 px-2 py-1 rounded">
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h3 className="text-xl font-serif text-white mb-2 group-hover:translate-x-1 transition-transform duration-500">
              {title}
            </h3>
            <p className="text-[9px] font-sans tracking-[0.2em] text-white/60 uppercase">
              {subtitle}
            </p>
          </div>

          {/* Minimalist Divider */}
          <div className="h-[1px] w-full bg-white/10 mb-6 group-hover:w-1/2 transition-all duration-700" />

          {/* Specs List */}
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-[10px] text-gray-400 font-light uppercase tracking-wider">
                <Plus className="w-3 h-3 text-white/30" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Action */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-white opacity-60 group-hover:opacity-100 transition-opacity">Launching Soon</span>
          <button className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500 bg-black/50">
            <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-32 bg-black text-white overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="block text-xs font-bold tracking-[0.3em] uppercase opacity-50 mb-4">
              Defensive Matrix
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-none">
              Autonomous <br /> Excellence.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-gray-400 leading-relaxed font-light">
            Our specialized fleet covers every layer of operation: from precision agriculture 
            to kinetic aerial defense.
          </p>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. ASTRA PLUS */}
          <ShowroomCard 
            index={0}
            title="AGRI DRONE"
            subtitle="Aerial Sprinkling"
            icon={Plane}
            image={AstraImg} 
            features={[
              "Autonomous Flight",
              "Precision Liquid Dispersal",
              "120 NM Range",
              "Drift-Reduction",
              "Rapid Payload Swap"
            ]}
          />

          {/* 2. SMART ROVER (Using astra1 image) */}
          <ShowroomCard 
            index={1}
            title="ASTRA"
            subtitle="Infection Treatment"
            icon={Bot}
            image={RoverImg} // [!] Updated to use astra1
            features={[
              "AI Infection Diagnosis",
              "Selective Spraying",
              "All-Terrain Nav",
              "Plant-by-Plant Analysis",
              "Zero-Waste Protocol "
            ]}
          />

          {/* 3. SkyGuardian */}
          <ShowroomCard 
            index={2}
            title="SkyGuardian"
            subtitle="Tactical Surveillance"
            icon={ShieldAlert}
            image={DefenseImg}
            features={[
              "Thermal Night Vision",
              "AES-256 Encrypted",
              "Target Locking",
              "Perimeter Breach Alert",
              "Anti-Jamming GPS"
            ]}
          />

          {/* 4. CIWS (Using cisi image) */}
          <ShowroomCard 
            index={3}
            title="CIWS"
            subtitle="Kinetic Defense"
            icon={Crosshair}
            image={CiwsImg} // [!] Updated to use cisi
            features={[
              "4,500 Rounds/Min",
              "Radar-Guided Track",
              "Cost-Effective Ammo",
              "Anti-Swarm Ballistics",
              "Terminal Defense"
            ]}
          />
           
        </div>

        {/* --- BOTTOM SPECS STRIP --- */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
          {[
          
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col gap-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{stat.label}</span>
              <span className="text-2xl font-serif text-white">{stat.value}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}