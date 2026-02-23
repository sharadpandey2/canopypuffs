/* eslint-disable no-unused-vars */
"use client"; 
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, ArrowRight, X, Loader2, 
  ArrowUpRight
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore"; 

// --- LUXURY DARK CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        date: new Date().toISOString()
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: "", email: "", phone: "", reason: "" });
        }, 300);
      }, 2000);

    } catch (error) {
      console.error("Error sending contact request:", error);
      alert("Transmission failed. Check network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-10 shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {!isSuccess ? (
              <>
                <div className="mb-10 border-b border-white/10 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Inquiry</span>
                  <h3 className="text-3xl font-serif mt-2 text-white">Start a Conversation</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="group relative">
                        <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b border-white/20 py-2 text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-gray-600 bg-transparent" />
                      </div>
                      <div className="group relative">
                        <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border-b border-white/20 py-2 text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-gray-600 bg-transparent" />
                      </div>
                    </div>

                    <div className="group relative">
                      <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-white/20 py-2 text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-gray-600 bg-transparent" />
                    </div>

                    <div className="group relative">
                      <textarea required rows={2} placeholder="How can we assist you?" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full border-b border-white/20 py-2 text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-gray-600 bg-transparent resize-none" />
                    </div>
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Send Message <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6">
                  <CheckCircle className="text-white w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-serif mb-2 text-white">Message Sent</h3>
                <p className="text-gray-500 text-sm">We will be in touch shortly.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function CTA() {
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative py-32 bg-black text-white overflow-hidden">
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* --- Minimalist Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
             <div className="h-12 w-[1px] bg-white/20" />
          </div>

          <h2 className="text-5xl md:text-8xl font-serif font-light tracking-tight mb-8">
            Begin Your <br />
            <span className="italic text-gray-500">Ascent.</span>
          </h2>
        </motion.div>

        <motion.p 
          className="text-lg text-gray-400 max-w-xl mx-auto mb-16 font-light leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Whether for commercial partnerships, advanced technology demos, or 
          defense contracts, Canopy Puffs is ready to deploy.
        </motion.p>

        {/* --- Luxury Button (Inverted for Dark Mode) --- */}
        <motion.div style={{ y }} className="relative inline-block">
          <button 
            onClick={() => setShowModal(true)}
            className="group relative px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              Connect With Us <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* --- Footer Links (Removed Links as requested) --- */}
        <div className="mt-32 pt-12 border-t border-white/10 flex justify-center items-center text-[10px] uppercase tracking-widest text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Systems Operational
          </div>
        </div>

      </div>
    </section>
  );
}