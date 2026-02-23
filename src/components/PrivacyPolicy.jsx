"use client";

/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Shield,
  Mail,
  MapPin
} from "lucide-react";


export default function PrivacyPolicy({ onBack }) {

  // Safe scroll for Next.js
  useEffect(() => {

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

  }, []);


  return (

    <section className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative z-50">


      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"/>



      <div className="max-w-4xl mx-auto relative z-10">


        {/* HEADER */}
        <div className="mb-16 border-b border-white/10 pb-8">


          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs uppercase text-gray-500 hover:text-white mb-8 transition-colors"
          >

            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/>

            Back to Home

          </button>


          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            Privacy Policy
          </h1>


          <p className="text-gray-400 text-sm">
            Last Updated: February 02, 2026
          </p>


        </div>



        {/* CONTENT */}
        <div className="space-y-12 text-gray-300 font-light leading-relaxed">


          {/* INTRO */}
          <div className="space-y-4 text-lg">

            <p>

              At <strong className="text-white">Canopy Puffs</strong>,
              we respect your privacy and protect your personal data.

            </p>

            <p className="text-sm border-l border-white/30 pl-4 italic text-gray-500">

              By using our website or services,
              you agree to this Privacy Policy.

            </p>

          </div>



          {/* SECTION 1 */}
          <section>

            <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-2">

              1. Information We Collect

            </h2>


            <ul className="list-disc pl-5 space-y-2 text-sm">

              <li>Name, email, phone number</li>

              <li>Device and browser information</li>

              <li>Website interaction data</li>

              <li>Contact form submissions</li>

            </ul>

          </section>



          {/* SECTION 2 */}
          <section>

            <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-2">

              2. How We Use Data

            </h2>


            <ul className="list-disc pl-5 space-y-2 text-sm">

              <li>Provide and improve services</li>

              <li>Respond to inquiries</li>

              <li>Improve performance and security</li>

              <li>Research and development</li>

            </ul>

          </section>



          {/* RESTRICTED USE */}
          <section className="bg-red-900/10 border border-red-900/30 p-8 rounded-lg">

            <h2 className="text-2xl font-serif text-red-200 mb-4 flex items-center gap-3">

              <Shield className="w-6 h-6"/>

              Restricted Use

            </h2>


            <p className="text-red-200">

              Our systems are intended for civilian use only.

            </p>

          </section>



          {/* CONTACT */}
          <section className="border-t border-white/10 pt-12">

            <h2 className="text-3xl font-serif mb-8">

              Contact Us

            </h2>


            <div className="grid md:grid-cols-2 gap-6">


              <div className="bg-white/5 p-8 border border-white/10 rounded">

                <MapPin className="mb-4"/>

                <p>

                  Canopy Puffs Aeronautics Pvt Ltd

                  <br/>

                  Gorakhpur, Uttar Pradesh, India

                </p>

              </div>



              <div className="bg-white/5 p-8 border border-white/10 rounded">

                <Mail className="mb-4"/>

                <p>

                  Email:

                  <a
                    href="mailto:canopypuffs@gmail.com"
                    className="ml-2 underline"
                  >
                    canopypuffs@gmail.com
                  </a>

                </p>

              </div>


            </div>


          </section>


        </div>


      </div>


    </section>

  );

}