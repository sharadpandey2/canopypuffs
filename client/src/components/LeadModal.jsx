/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle, ArrowRight, Loader2, User, Mail, Phone } from "lucide-react";

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // 1. AUTO-OPEN TIMER (5 Seconds)
  useEffect(() => {
    const hasSubmitted = localStorage.getItem("lead_captured");
    if (!hasSubmitted) {
      const timer = setTimeout(() => setIsOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API
    setTimeout(() => {
      console.log("Lead Captured:", formData);
      setIsSubmitting(false);
      setSubmitted(true);
      localStorage.setItem("lead_captured", "true");
      setTimeout(() => setIsOpen(false), 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          
          {/* Backdrop using motion */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container using motion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_-10px_rgba(34,211,238,0.2)] overflow-hidden z-10"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                    <Lock className="text-cyan-400 w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Restricted Access</h2>
                  <p className="text-gray-400 text-sm">
                    Enter your details to unlock full site access.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <User className="absolute top-3 left-3 w-4 h-4 text-gray-500" />
                    <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute top-3 left-3 w-4 h-4 text-gray-500" />
                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute top-3 left-3 w-4 h-4 text-gray-500" />
                    <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full mt-2 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : <>Unlock Site <ArrowRight size={18} /></>}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                  <CheckCircle className="text-green-500 w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Access Granted</h3>
                <p className="text-gray-400">Welcome to Canopy Puffs.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}