"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CalendarClock } from 'lucide-react';
import Link from 'next/link';

// --- FIREBASE IMPORTS ---
// This path goes up two folders from app/workshop to reach src/firebase.js
import { db } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";

export default function WorkshopSchedulePage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    contact: '',
    address: '',
    scheduleDate: '',
    duration: '3 hr'
  });

  // Added a loading state so the user can't spam the submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- FIREBASE SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Turn on loading state

    try {
      // Send the data to a Firestore collection named 'workshopRequests'
      await addDoc(collection(db, 'workshopRequests'), {
        ...formData,
        timestamp: new Date(), // Saves the exact time they clicked submit
      });
      
      alert('Clearance Confirmed. Your workshop request has been received.');
      
      // Clear the form back to blank after successful submission
      setFormData({
        name: '',
        organization: '',
        contact: '',
        address: '',
        scheduleDate: '',
        duration: '3 hr'
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Transmission Failed. Please check your network and try again.');
    } finally {
      setIsSubmitting(false); // Turn off loading state
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation / Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:-translate-x-1" />
            Return to Base
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-6 bg-white" />
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
              Module Activation
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-light leading-tight mb-3">
            Schedule a Workshop
          </h1>
          <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
            Request deployment of the Canopy Puffs Future Engineers Program to your institution. Select your preferred authorization method below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Option 1: Quick Fill (Google Form) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col h-full"
          >
            <div className="p-6 md:p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-colors duration-500 flex flex-col justify-center items-center text-center h-full min-h-[300px]">
              
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-5 rounded-full bg-white/5">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              
              <h2 className="text-lg md:text-xl font-serif mb-3">Express Authorization</h2>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 max-w-[200px] mx-auto">
                Utilize our secured Google Form gateway for a rapid scheduling protocol.
              </p>
              
              <a 
                href="https://forms.gle/ndqc8kwgzFpDEtD99" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-5 py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-white hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                Initiate Google Form
                <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>

          {/* Option 2: Manual Data Entry */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <div className="p-6 md:p-8 bg-[#050505] border border-white/10 h-full">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-5">
                <CalendarClock className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                <h2 className="text-xl md:text-2xl font-serif text-white">Manual Request Protocol</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1.5">Representative Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-xs md:text-sm py-2 outline-none transition-colors font-light placeholder:text-gray-700" 
                      placeholder="Enter Your Full Name"
                    />
                  </div>

                  {/* Organization Input */}
                  <div>
                    <label htmlFor="organization" className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1.5">Organization Name</label>
                    <input 
                      type="text" 
                      name="organization" 
                      id="organization" 
                      required 
                      value={formData.organization} 
                      onChange={handleChange} 
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-xs md:text-sm py-2 outline-none transition-colors font-light placeholder:text-gray-700" 
                      placeholder="e.g. Canopy Puffs Aeronautics"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Contact Input */}
                  <div>
                    <label htmlFor="contact" className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1.5">Comm Link (Phone)</label>
                    <input 
                      type="tel" 
                      name="contact" 
                      id="contact" 
                      required 
                      value={formData.contact} 
                      onChange={handleChange} 
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-xs md:text-sm py-2 outline-none transition-colors font-light placeholder:text-gray-700" 
                      placeholder="+91 00000 00000"
                    />
                  </div>

                  {/* Date Input */}
                  <div>
                    <label htmlFor="scheduleDate" className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1.5">Requested Date</label>
                    <input 
                      type="date" 
                      name="scheduleDate" 
                      id="scheduleDate" 
                      required 
                      value={formData.scheduleDate} 
                      onChange={handleChange} 
                      className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-xs md:text-sm py-2 outline-none transition-colors font-light [color-scheme:dark]" 
                    />
                  </div>
                </div>
                {/* Address Input */}
                <div>
                  <label htmlFor="address" className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1.5">Deployment Coordinates (Address)</label>
                  <textarea 
                    name="address" 
                    id="address" 
                    rows="2" 
                    required 
                    value={formData.address} 
                    onChange={handleChange} 
                    className="w-full bg-transparent border-b border-white/20 focus:border-white text-white text-xs md:text-sm py-2 outline-none transition-colors font-light placeholder:text-gray-700 resize-none"
                    placeholder="Enter full organizational address..."
                  ></textarea>
                </div>
                {/* Duration Radio Buttons */}
                <div className="pt-1">
                  <label className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Operational Duration</label>
                  <div className="flex flex-wrap gap-6">
                    {['3 hr', '6 hr', '7+ hr'].map((time) => (
                      <label key={time} className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center justify-center w-4 h-4 md:w-5 md:h-5 mr-2">
                          <input 
                            type="radio" 
                            name="duration" 
                            value={time} 
                            checked={formData.duration === time} 
                            onChange={handleChange} 
                            className="peer sr-only" 
                          />
                          <div className="w-4 h-4 md:w-5 md:h-5 border border-white/30 rounded-full peer-checked:border-white transition-colors" />
                          <div className={`absolute w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full transition-opacity ${formData.duration === time ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                        <span className="text-xs md:text-sm font-light text-gray-300 group-hover:text-white transition-colors">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Submit Button - Updated with disabled state */}
                <div className="pt-6 mt-4 border-t border-white/10">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white bg-white/10 hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Transmitting Data..." : "Transmit Request"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}