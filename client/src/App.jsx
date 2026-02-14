/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Workshop from './components/Workshop';
import About from './components/About';
import Solutions from './components/Solutions';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard'; 
import PrivacyPolicy from './components/PrivacyPolicy'; 

import SmoothScroll from './components/ui/SmoothScroll';
import Cursor from './components/ui/Cursor';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // --- MODE CHECKS ---

  // 1. Admin Dashboard
  if (isAdminMode) {
    return <AdminDashboard onExit={() => setIsAdminMode(false)} />;
  }

  // 2. Privacy Policy Page
  if (showPrivacy) {
    return (
      <SmoothScroll>
        {/* [!] ADD CURSOR & BACKGROUND HERE SO IT PERSISTS */}
        <Cursor />
        <div className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-5"></div>
        
        <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
      </SmoothScroll>
    );
  }

  // --- MAIN WEBSITE ---
  return (
    <SmoothScroll>
      <Cursor />
      <div className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-5"></div>

      <Navbar onAdminClick={() => setIsAdminMode(true)} /> 
      
      <main className="relative z-10 flex flex-col w-full min-h-screen">
        <section id="hero" className="w-full"><Hero /></section>
        <section id="cta" className="w-full"><CTA /></section>
        <section id="workshop" className="w-full"><Workshop /></section>
        <section id="solutions" className="w-full"><Solutions /></section>
        <section id="about" className="w-full"><About /></section>
      </main>
      
      {/* 3. Pass the click handler to Footer */}
      <Footer onPrivacyClick={() => setShowPrivacy(true)} />

    </SmoothScroll>
  );
}

export default App;