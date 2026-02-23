"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Plus, Cpu, ShieldCheck, GraduationCap } from "lucide-react";

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

// --- Sub-Component: What We Do Card ---
const ServiceCard = ({ number, title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="group p-8 border border-white/10 bg-[#050505] hover:bg-[#0a0a0a] hover:border-white/30 transition-all duration-500 flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-12">
      <div className="p-4 bg-white/5 rounded-full text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
        <Icon className="w-6 h-6 stroke-[1.5px]" />
      </div>
      <span className="text-white/20 font-serif italic text-2xl group-hover:text-white/40 transition-colors">
        {number}
      </span>
    </div>
    <h3 className="text-2xl font-serif text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500">
      {title}
    </h3>
    <div className="h-[1px] w-12 bg-white/20 mb-6 group-hover:w-full transition-all duration-700" />
    <p className="text-sm text-gray-400 font-light leading-relaxed">
      {description}
    </p>
  </motion.div>
);

// --- Sub-Component: Team Member Card (Achievements removed) ---
const TeamMember = ({ name, role, imageSrc, linkedinUrl, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="group relative flex flex-col w-full h-full bg-[#050505] border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
  >
    {/* Profile Image Area */}
    <div className="relative aspect-square overflow-hidden bg-[#0a0a0a] shrink-0">
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={name} 
          // Image remains colorful, just scales slightly on hover
          className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
        />
      ) : (
        /* Placeholder if image is missing */
        <div className="absolute inset-0 flex items-center justify-center border-b border-white/5">
           <span className="text-white/10 text-4xl font-serif">CP</span>
        </div>
      )}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Content Area */}
    <div className="p-6 border-t border-white/10 flex flex-col flex-grow justify-between">
      <div>
        <h4 className="text-xl font-serif text-white mb-1">{name}</h4>
        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">
          {role}
        </div>
      </div>
      
      {/* LinkedIn Link */}
      <div className="pt-4 border-t border-white/5 mt-auto">
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span>Connect</span>
        </a>
      </div>
    </div>
  </motion.div>
);

// --- Team Data (Achievements removed) ---
const teamData = [
  {
    name: "Ayush Kumar Singh",
    role: "Co-Founder",
    linkedinUrl: "https://www.linkedin.com/in/ayush-kumar-singh-46838931b/",
    imageSrc: "/Ayush.jpg"
  },
  {
    name: "Sumanyu Singh",
    role: "Co-Founder",
    linkedinUrl: "https://www.linkedin.com/in/sumanyu-singh-a4bb57281/",
    imageSrc: "/sumanyu.jpg"
  },
  {
    name: "Aniket Dwivedi",
    role: "CFO",
    linkedinUrl: "https://www.linkedin.com/in/aniket-dwivedi14/",
    imageSrc: "/aniket.jpeg"
  },
  {
    name: "Sharad Pandey",
    role: "COO",
    linkedinUrl: "https://www.linkedin.com/in/sharad7415/",
    imageSrc: "/sharad.jpeg"
  },
  {
    name: "Dhruv Kumar",
    role: "Associate Researcher",
    linkedinUrl: "https://www.linkedin.com/in/dhruvkumar-linkdin/",
    imageSrc: "/dhruv.jpg"
  },
  {
    name: "Abhinav Shakya",
    role: "Associate Researcher",
    linkedinUrl: "https://www.linkedin.com/in/abhinav-shakya-a6ab28244/",
    imageSrc: "/abhinav.jpeg"
  },
  {
    name: "Arjun Tyagi",
    role: "CMO",
    linkedinUrl: "https://www.linkedin.com/in/arjun231/", 
    imageSrc: "/arjun.jpg"
  }
];

export default function About() {
  const ref = useRef(null);
  
  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 bg-black text-white overflow-hidden"
    >
      <Marquee />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- Header & Objectives Section --- */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 border-b border-white/10 pb-20">
          
          {/* Left Column: Mission & Objectives */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                Our Mission
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-light leading-none mb-10">
              Drone as a Service. <br />
              <span className="italic text-gray-500 text-4xl md:text-5xl mt-2 block">
                Agriculture to Defense.
              </span>
            </h2>
            
            <ul className="space-y-8 text-gray-400 font-light leading-relaxed text-sm md:text-base">
              <li className="flex gap-4">
                <span className="text-white/40 font-serif italic text-xl mt-1">01.</span>
                <p>The main objective of the company is to provide <strong>Drone-as-a-Service (DaaS)</strong>, spanning from the agriculture to defense sectors, with future expansions planned for firefighting and emergency response.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-white/40 font-serif italic text-xl mt-1">02.</span>
                <p>We provide specialized educational workshops to school and college students, actively aiming to shape the brightest future for the Indian Government aeronautics sector.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-white/40 font-serif italic text-xl mt-1">03.</span>
                <p>We supply advanced agricultural drones (Agri-drones) to farmers for precision pesticide sprinkling, while concurrently contributing robust technological advancements to the national defense sector.</p>
              </li>
            </ul>
          </div>

          {/* Right Column: Recognitions & News */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                Recognitions & Milestones
              </span>
            </div>
            
            {/* News Image Block */}
            <div className="w-full h-64 md:h-80 bg-white/5 border border-white/10 overflow-hidden mb-8 relative group">
              <img 
                src="/news.jpeg" 
                alt="Canopy Puffs News and Recognition" 
                // Assured no grayscale class is here
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white/80 text-[10px] uppercase tracking-widest font-bold">
                Latest Updates
              </div>
            </div>

            {/* Recognitions List */}
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li className="flex gap-4 items-start">
                <Plus className="w-4 h-4 text-white/40 shrink-0 mt-1" />
                <p>Recognized by the <strong>Ministry of Corporate Affairs</strong>.</p>
              </li>
              <li className="flex gap-4 items-start">
                <Plus className="w-4 h-4 text-white/40 shrink-0 mt-1" />
                <p>Recognized by the <strong>CSJM Innovation Foundation</strong>, held at SRM Institute of Technology in Feb 2025. Presented by Ayush Singh and Abhinav.</p>
              </li>
              <li className="flex gap-4 items-start">
                <Plus className="w-4 h-4 text-white/40 shrink-0 mt-1" />
                <p>Official website (<a href="https://www.canopypuffs.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 underline underline-offset-2 decoration-white/30 hover:decoration-white/80 transition-all">www.canopypuffs.in</a>) launched on <strong>14th Feb 2026</strong>, marked on Black Day in solemn remembrance of the martyrs of the Pulwama Attack.</p>
              </li>
            </ul>
          </div>

        </div>

        {/* --- NEW SECTION: WHAT WE DO --- */}
        <div className="mb-32">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-white/50" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                Core Operations
              </span>
              <div className="h-[1px] w-8 bg-white/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-none">
              What We Do.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              number="01"
              title="Make in India"
              description="Fostering self-reliance in drone technology by manufacturing advanced UAVs completely within India, ensuring maximum security and a robust domestic supply chain."
              icon={Cpu}
              delay={0.1}
            />
            <ServiceCard 
              number="02"
              title="Drone-as-a-Service"
              description="Deploying specialized UAVs across critical sectors. From providing 'Agri-drones' for precision crop spraying to engineering tactical drones for the Indian Defense sector."
              icon={ShieldCheck}
              delay={0.3}
            />
            <ServiceCard 
              number="03"
              title="Aeronautics Education"
              description="Shaping bright minds by organizing hands-on workshops for school and college students, teaching them how UAV components work, calibrate, and communicate."
              icon={GraduationCap}
              delay={0.5}
            />
          </div>
        </div>

        {/* --- Command Structure (Team) --- */}
        <div>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">
                Command Structure
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-none">
              Meet Our Team.
            </h2>
          </div>

          {/* Team Flexbox Layout (Fixes the "missing member" gap) */}
          <div className="flex flex-wrap justify-center gap-6">
            {teamData.map((member, index) => (
              <div 
                key={index} 
                // Dynamically calculates width to fit 4 per row on desktop, 2 on tablet, 1 on mobile, accounting for the 24px (1.5rem) gap
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <TeamMember 
                  name={member.name}
                  role={member.role}
                  linkedinUrl={member.linkedinUrl}
                  imageSrc={member.imageSrc}
                  delay={0.1 * index}
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
