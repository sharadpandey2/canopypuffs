"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workshop from "@/components/Workshop";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import PrivacyPolicy from "@/components/PrivacyPolicy";
// Removed W1 import from here because it will become its own page

export default function Home() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  // REMOVED showW1 state completely!

  // Admin Dashboard Mode
  if (isAdminMode) {
    return <AdminDashboard onExit={() => setIsAdminMode(false)} />;
  }

  // Privacy Policy Mode
  if (showPrivacy) {
    return (
      <div className="bg-black min-h-screen text-white">
        <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
      </div>
    );
  }

  // REMOVED the if(showW1) block completely!

  // Main Website
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar onAdminClick={() => setIsAdminMode(true)} />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col w-full">
        <section id="hero">
          <Hero />
        </section>

        <section id="cta">
          <CTA />
        </section>

        <section id="workshop">
          {/* REMOVED the onScheduleClick prop. The Workshop component will now handle its own Link */}
          <Workshop />
        </section>

        <section id="solutions">
          <Solutions />
        </section>

        <section id="about">
          <About />
        </section>
      </main>

      {/* Footer */}
      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
    </div>
  );
}