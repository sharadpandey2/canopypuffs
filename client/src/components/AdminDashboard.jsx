/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Unlock, LogOut, Trash2, Database, User, Mail, Phone, 
  MapPin, FileText, MessageSquare, GraduationCap, Shield, Activity, RefreshCw, ArrowLeft, X 
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db, auth } from "../firebase"; 
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

// --- IMPORT YOUR CUSTOM CURSOR ---
// Make sure this path is correct based on your folder structure
import Cursor from "./ui/Cursor"; 

// --- LOGIN SCREEN COMPONENT ---
const LoginView = ({ onLogin, onExit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setError("Access Denied: Invalid Credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden cursor-default">
      {/* [!] ADD CURSOR HERE */}
      <Cursor />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      
      {/* --- RETURN TO SITE BUTTON --- */}
      <button 
        onClick={onExit}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-50 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-mono uppercase tracking-widest">Return to Base</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Classified Access</h2>
          <p className="text-gray-500 text-sm mt-2 font-mono">Canopy Puffs Command Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Admin Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500/50 outline-none transition-colors placeholder:text-gray-600" 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Passcode" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500/50 outline-none transition-colors placeholder:text-gray-600" 
            />
          </div>
          
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
              {error}
            </motion.div>
          )}

          <button 
            disabled={loading} 
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Authenticating..." : <>Decrypt & Enter <Unlock className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- DATA CARD COMPONENT ---
const DataCard = ({ data, type, onDelete }) => {
  const isLead = type === 'lead';
  const isWorkshop = type === 'workshop';
  
  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="bg-[#0f0f0f] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all group cursor-auto" // Added cursor-auto
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
            isLead ? 'bg-white/10 border-white/20 text-white' : 
            isWorkshop ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 
            'bg-purple-500/10 border-purple-500/20 text-purple-400'
          }`}>
            {isLead ? <Shield className="w-4 h-4" /> : isWorkshop ? <GraduationCap className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">{data.name}</h3>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{type}</span>
          </div>
        </div>
        <button 
          onClick={() => onDelete(data.id, type)} 
          className="text-gray-600 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete Record"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-md">
          <Mail className="w-3 h-3" /> {data.email}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-md">
          <Phone className="w-3 h-3" /> {data.phone}
        </div>
        {data.city && (
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-md col-span-2">
            <MapPin className="w-3 h-3" /> {data.city}
          </div>
        )}
      </div>
      
      {(data.purpose || data.reason) && (
        <div className="p-3 bg-black border border-white/5 rounded-lg text-xs text-gray-300 leading-relaxed">
          <span className="text-gray-600 font-bold uppercase text-[9px] block mb-1">Message Payload:</span>
          {data.purpose || data.reason}
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-gray-600 font-mono">
        <span>ID: {data.id.slice(0,8)}...</span>
        <span>{new Date(data.date).toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboard({ onExit }) {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const leadsSnap = await getDocs(query(collection(db, "leads"), orderBy("date", "desc")));
      const workshopsSnap = await getDocs(query(collection(db, "workshops"), orderBy("date", "desc")));
      const contactsSnap = await getDocs(query(collection(db, "contacts"), orderBy("date", "desc")));

      setLeads(leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setWorkshops(workshopsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setContacts(contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchData();
      else setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id, type) => {
    if(!window.confirm("CONFIRM DELETION: This action cannot be undone.")) return;
    
    const colName = type === 'lead' ? 'leads' : type === 'workshop' ? 'workshops' : 'contacts';
    
    try {
      await deleteDoc(doc(db, colName, id));
      if(type === 'lead') setLeads(prev => prev.filter(i => i.id !== id));
      if(type === 'workshop') setWorkshops(prev => prev.filter(i => i.id !== id));
      if(type === 'contact') setContacts(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white cursor-default"><RefreshCw className="animate-spin mr-2"/> Initializing...</div>;
  
  // Passed onExit to LoginView here
  if (!user) return <LoginView onLogin={() => {}} onExit={onExit} />;

  const allData = [
    ...leads.map(i => ({...i, type: 'lead'})), 
    ...workshops.map(i => ({...i, type: 'workshop'})), 
    ...contacts.map(i => ({...i, type: 'contact'}))
  ].sort((a,b) => new Date(b.date) - new Date(a.date));

  const filteredData = activeTab === 'all' ? allData : allData.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen bg-black text-white font-sans cursor-default">
      {/* [!] ADD CURSOR HERE */}
      <Cursor />

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-500 rounded-lg flex items-center justify-center">
              <Database className="text-black w-4 h-4" />
            </div>
            <h1 className="font-bold tracking-widest text-sm">ADMIN <span className="text-gray-500">// DATABASE</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="p-2 text-gray-500 hover:text-white transition-colors" title="Refresh Data">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-4 w-px bg-white/10"></div>
            <button onClick={() => signOut(auth)} className="text-[10px] font-bold text-red-500 hover:text-red-400 flex items-center gap-2 px-3 py-1.5 border border-red-500/20 rounded-md hover:bg-red-500/10 transition-colors uppercase tracking-wider">
              Logout <LogOut className="w-3 h-3" />
            </button>
            
            {/* EXIT BUTTON (When Logged In) */}
            <button onClick={onExit} className="p-2 text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total Records</p>
            <p className="text-2xl font-bold text-white">{allData.length}</p>
          </div>
          <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Leads (Hero)</p>
            <p className="text-2xl font-bold text-white">{leads.length}</p>
          </div>
          <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Workshops</p>
            <p className="text-2xl font-bold text-cyan-400">{workshops.length}</p>
          </div>
          <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Inquiries</p>
            <p className="text-2xl font-bold text-purple-400">{contacts.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'lead', label: 'Access Requests' },
            { id: 'workshop', label: 'Workshops' },
            { id: 'contact', label: 'Messages' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List View */}
        <AnimatePresence mode="popLayout">
          {filteredData.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <Activity className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No records found in this sector.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((item) => (
                <DataCard key={item.id} data={item} type={item.type} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}