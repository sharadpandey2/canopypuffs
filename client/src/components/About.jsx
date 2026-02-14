/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Globe, Cpu, Database, Sprout, ShieldCheck } from "lucide-react";

// --- Sub-Component: Luxury Marquee ---
const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-black py-6 mb-24">
      <motion.div
        className="flex whitespace-nowrap gap-24 text-white/40 font-serif text-xs tracking-[0.3em] uppercase"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span>Agricultural Precision</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Kinetic Defense</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Autonomous Surveillance</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Neural Networks</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Secure Logistics</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// --- Sub-Component: Minimalist Radar ---
const Radar = () => (
  <div className="relative w-full h-full min-h-[200px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] border border-white/5">
    {/* Minimalist Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    {/* Concentric Circles (Thin lines) */}
    <div className="absolute w-[200px] h-[200px] rounded-full border border-white/10" />
    <div className="absolute w-[120px] h-[120px] rounded-full border border-white/10" />
    <div className="absolute w-[4px] h-[4px] rounded-full bg-white" />

    {/* Elegant Sweep (White Fade) */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      className="absolute w-[200px] h-[200px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(255,255,255,0.1)_360deg)]"
    />
    
    {/* Subtle Blips */}
    <motion.div
      animate={{ opacity: [0, 0.8, 0], scale: [1, 1.5, 1] }}
      transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
      className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full"
    />
  </div>
);

// --- Sub-Component: Luxury Card ---
const Card = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={`p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-colors duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

export default function About() {
  const ref = useRef(null);
  
  return (
    <section id="about" ref={ref} className="relative py-32 bg-black text-white overflow-hidden">
      
      <Marquee />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- Editorial Header: Mission Statement --- */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div className="max-w-3xl">
             <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                Our Spectrum
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-none mb-8">
              From Cultivation <br />
              <span className="italic text-gray-500">To Kinetic Defense.</span>
            </h2>
            
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
              Canopy Puffs bridges the divide between essential sustenance and sovereign security. 
              We deploy the same tier of autonomous precision to protect crop yields as we do to secure national borders.
            </p>
          </div>
          
          <div className="hidden md:block text-right opacity-50">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Established</div>
            <div className="text-xl font-serif">2025</div>
          </div>
        </div>

        {/* --- Minimalist Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 1: The Core Narrative (Agriculture to Defense) */}
          <Card className="md:col-span-4 flex flex-col justify-between min-h-[400px]">
             <div>
               <div className="flex gap-4 mb-8">
                 <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                   <Sprout className="w-4 h-4 text-white" />
                 </div>
                 <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                   <ShieldCheck className="w-4 h-4 text-white" />
                 </div>
               </div>
               
               <h3 className="text-3xl font-serif mb-6">Dual-Sector Engineering</h3>
               <p className="text-gray-400 font-light leading-relaxed max-w-lg mb-6">
                 In the field, our <span className="text-white border-b border-white/30">ASTRA</span> units utilize spectral imaging to eradicate pests with surgical accuracy, securing the global food supply.
               </p>
               <p className="text-gray-400 font-light leading-relaxed max-w-lg">
                 On the frontier, our <span className="text-white border-b border-white/30">SkyGuardian</span> and <span className="text-white border-b border-white/30">CIWS</span> systems form an impenetrable autonomous shield, neutralizing aerial threats before they breach the perimeter.
               </p>
             </div>

             {/* Specs Strip */}
             <div className="flex gap-12 mt-12 pt-8 border-t border-white/10">
               <div>
                 <div className="text-3xl font-serif">Dual</div>
                 <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Use Tech</div>
               </div>
               <div>
                 <div className="text-3xl font-serif">100%</div>
                 <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Autonomy</div>
               </div>
             </div>
          </Card>

          {/* Card 2: Active Sectors (Radar) */}
          <Card className="md:col-span-2 flex flex-col p-0 overflow-hidden" delay={0.2}>
            <div className="p-6 flex items-center justify-between border-b border-white/5 z-10 bg-[#050505]">
               <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                 <Globe className="w-3 h-3" /> Global Reach
               </h4>
               <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
            <div className="flex-grow">
               <Radar />
            </div>
          </Card>

          {/* Card 3: Sensors (Spans 3 columns) */}
          <Card className="md:col-span-3" delay={0.3}>
             <Cpu className="w-6 h-6 text-white mb-6 opacity-80" />
             <div className="text-5xl font-serif mb-2">64+</div>
             <div className="text-[10px] uppercase tracking-widest text-gray-500">Onboard Sensors</div>
          </Card>

          {/* Card 4: Data Processing (Spans 3 columns) */}
      

        </div>
      </div>
    </section>
  );
}