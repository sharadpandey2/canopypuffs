"use client";

/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";


// ✅ Next.js public folder path
const LogoImg = "/logo.png";



// ================= SOCIAL LINK =================

const SocialLink = ({ icon: Icon, href }) => (

  <motion.a

    href={href}

    target="_blank"

    rel="noopener noreferrer"

    whileHover={{
      y: -3,
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "#000"
    }}

    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:border-white"

  >

    <Icon className="w-4 h-4" />

  </motion.a>

);




// ================= FOOTER =================

export default function Footer({ onPrivacyClick }) {

  return (

    <footer className="relative bg-black text-white border-t border-white/10 pt-24 pb-12 overflow-hidden">


      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />


      {/* WATERMARK */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">

        <h1 className="text-[18vw] font-serif font-black text-white/[0.03] leading-none tracking-tighter text-center translate-y-[30%]">

          CANOPY

        </h1>

      </div>



      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">


        {/* MAIN CONTENT */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">


          {/* BRAND */}
          <div className="space-y-8 max-w-md">


            <div className="flex items-center gap-4">


              <div className="h-12 w-auto flex items-center justify-center">

                <img

                  src={LogoImg}

                  alt="Canopy Puffs"

                  className="h-full w-auto object-contain opacity-90"

                />

              </div>


              <span className="text-xl font-serif tracking-widest text-white border-l border-white/30 pl-4">

                CANOPY PUFFS

              </span>

            </div>



            <p className="text-sm text-gray-400 font-light leading-relaxed tracking-wide">

              Redefining aerial dominance through autonomous systems.

              <br />

              Built for the farm, hardened for the frontline.

            </p>



            {/* SOCIAL */}
            <div className="flex gap-4">

              <SocialLink

                icon={Instagram}

                href="https://www.instagram.com/canopy_puffs"

              />

              <SocialLink

                icon={Linkedin}

                href="https://www.linkedin.com/company/canopy-puffs-aeronautics-private-limited/"

              />

            </div>


          </div>



          {/* PRIVACY BUTTON */}
          <div className="flex flex-col items-start md:items-end">

            <button

              onClick={onPrivacyClick}

              className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"

            >

              Privacy Policy

            </button>

          </div>


        </div>



        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600">

          <p>

            © 2025 Canopy Puffs Aerospace. All rights reserved.

          </p>


          <div className="flex items-center gap-3">

            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />

            <span>

              System Operational

            </span>

          </div>


        </div>


      </div>
    </footer>

  );

}