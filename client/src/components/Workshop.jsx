/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, X, CheckCircle, Loader2, MapPin, 
  User, Mail, Phone, Calendar, Clock
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore"; 

// --- ASSETS ---
// Make sure this file exists in your assets folder!
import WorkshopImg from "../assets/workshop.png";

// --- LUXURY REGISTRATION MODAL ---
const WorkshopModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    purpose: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "workshops"), {
        ...formData,
        date: new Date().toISOString()
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: "", email: "", phone: "", city: "", purpose: "" });
        }, 300);
      }, 2000);

    } catch (error) {
      console.error("Error registering workshop:", error);
      alert("Registration failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content - White "Paper" Look */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white text-black p-10 shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>

            {!isSuccess ? (
              <>
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Invitation</span>
                  <h3 className="text-3xl font-serif mt-2">Request Session</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <input required type="text" placeholder="Coordinator Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-gray-400" />
                    
                    <div className="grid grid-cols-2 gap-6">
                      <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-gray-400" />
                      <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-gray-400" />
                    </div>

                    <input required type="text" placeholder="Institution / City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-gray-400" />
                    
                    <textarea required rows={2} placeholder="Objective (e.g. STEM Week)" value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})} className="w-full border-b border-gray-300 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-gray-400 resize-none" />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Confirm Request <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6">
                  <CheckCircle className="text-black w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-serif mb-2">Request Received</h3>
                <p className="text-gray-500 text-sm">Our team will contact you shortly.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN SECTION ---
export default function Workshop() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="workshop" className="relative bg-black text-white overflow-hidden">
      <WorkshopModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* --- LEFT: CINEMATIC IMAGE --- */}
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gray-900">
             {/* IMAGE IMPLEMENTATION */}
             <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={WorkshopImg} 
              alt="Workshop Session" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent lg:bg-gradient-to-t lg:from-black/80 lg:to-transparent" />
          
          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Module 01</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">The Art of <br/> Aerodynamics.</h2>
          </div>
        </div>

        {/* --- RIGHT: EDITORIAL CONTENT --- */}
        <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:py-0 bg-black relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[1px] w-12 bg-white/30 mb-8" />
            
            <h3 className="text-xl md:text-2xl font-serif mb-6 leading-relaxed text-white/90">
              "We don't just teach flight. <br />
              <span className="text-gray-500">We engineer the pilots of tomorrow.</span>"
            </h3>

            <p className="text-gray-400 font-light leading-relaxed mb-12 max-w-md">
              Our Future Engineers Program brings a fully equipped aerospace laboratory to your institution. 
              Students engage in rigourous hands-on assembly, physics simulations, and autonomous flight testing.
            </p>

            {/* Spec Sheet Style List */}
            <div className="border-t border-white/10 mb-12">
              {[
                { label: "Capacity", value: "30 - 100 Students" },
                { label: "Duration", value: "6 - 12 Hours" },
                { label: "Grades", value: "Class 6 - 12" },
                { label: "Equipment", value: "Provided by Canopy Puffs" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-2">
                  <span className="text-xs uppercase tracking-widest text-gray-500">{item.label}</span>
                  <span className="text-sm font-serif text-white">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <button 
              onClick={() => setShowModal(true)}
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-gray-300 transition-colors"
            >
              <span className="border-b border-white pb-1 group-hover:border-gray-300">Schedule Workshop</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

          </motion.div>
        </div>

      </div>
    </section>
  );
}