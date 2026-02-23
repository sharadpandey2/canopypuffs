"use client"; 
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Unlock, LogOut, Trash2, Database, User, Mail, Phone, 
  MapPin, FileText, MessageSquare, GraduationCap, Shield, Activity, 
  RefreshCw, ArrowLeft, X, Download, Filter 
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db, auth } from "../firebase"; 
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      
      <button onClick={onExit} className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-50 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-mono uppercase tracking-widest">Return to Base</span>
      </button>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Classified Access</h2>
          <p className="text-gray-500 text-sm mt-2 font-mono">Canopy Puffs Command Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500/50 outline-none transition-colors placeholder:text-gray-600" />
          </div>
          <div>
            <input type="password" placeholder="Passcode" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500/50 outline-none transition-colors placeholder:text-gray-600" />
          </div>
          
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
              {error}
            </motion.div>
          )}

          <button disabled={loading} className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2">
            {loading ? "Authenticating..." : <>Decrypt & Enter <Unlock className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
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
  const [showFilters, setShowFilters] = useState(false); // Toggle for filter menu

  const fetchData = async () => {
    setRefreshing(true);
    try {
      // Fetching from standard collections
      const leadsSnap = await getDocs(query(collection(db, "leads")));
      const contactsSnap = await getDocs(query(collection(db, "contacts")));
      
      // FIXED: Fetching from the new workshopRequests collection and ordering by timestamp
      const workshopsSnap = await getDocs(query(collection(db, "workshopRequests"), orderBy("timestamp", "desc")));

      setLeads(leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setContacts(contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      // Normalize workshop timestamp to standard date string for global sorting
      setWorkshops(workshopsSnap.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          date: data.timestamp ? data.timestamp.toDate().toISOString() : new Date().toISOString()
        };
      }));
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
    
    // Fixed delete target for workshops
    const colName = type === 'lead' ? 'leads' : type === 'workshop' ? 'workshopRequests' : 'contacts';
    
    try {
      await deleteDoc(doc(db, colName, id));
      if(type === 'lead') setLeads(prev => prev.filter(i => i.id !== id));
      if(type === 'workshop') setWorkshops(prev => prev.filter(i => i.id !== id));
      if(type === 'contact') setContacts(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  // CSV Export Logic
  const exportToCSV = () => {
    const headers = ["ID", "Type", "Name", "Organization", "Email", "Phone", "Date", "Duration", "Context"];
    const csvRows = [headers.join(",")];

    filteredData.forEach(row => {
      const values = [
        row.id,
        row.type,
        `"${row.name || ''}"`,
        `"${row.organization || ''}"`,
        `"${row.email || ''}"`,
        `"${row.contact || row.phone || ''}"`,
        `"${new Date(row.date).toLocaleString()}"`,
        `"${row.duration || 'N/A'}"`,
        `"${(row.address || row.purpose || row.reason || '').replace(/"/g, '""')}"`
      ];
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `CanopyPuffs_Data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white cursor-default"><RefreshCw className="animate-spin mr-2"/> Initializing...</div>;
  if (!user) return <LoginView onLogin={() => {}} onExit={onExit} />;

  const allData = [
    ...leads.map(i => ({...i, type: 'lead'})), 
    ...workshops.map(i => ({...i, type: 'workshop'})), 
    ...contacts.map(i => ({...i, type: 'contact'}))
  ].sort((a,b) => new Date(b.date) - new Date(a.date));

  const filteredData = activeTab === 'all' ? allData : allData.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen bg-black text-white font-sans cursor-default">

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-500 rounded-lg flex items-center justify-center">
              <Database className="text-black w-4 h-4" />
            </div>
            <h1 className="font-bold tracking-widest text-sm">ADMIN <span className="text-gray-500">DATABASE</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="p-2 text-gray-500 hover:text-white transition-colors" title="Refresh Data">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-4 hidden md:flex">
                <button onClick={() => signOut(auth)} className="text-[10px] font-bold text-red-500 hover:text-red-400 flex items-center gap-2 px-3 py-1.5 border border-red-500/20 rounded-md hover:bg-red-500/10 transition-colors uppercase tracking-wider">
                  Logout <LogOut className="w-3 h-3" />
                </button>
                <button onClick={onExit} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total Records</p>
            <p className="text-3xl font-bold text-white">{allData.length}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Leads</p>
            <p className="text-3xl font-bold text-white">{leads.length}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl border-t-2 border-t-cyan-500">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Workshops</p>
            <p className="text-3xl font-bold text-cyan-400">{workshops.length}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-xl border-t-2 border-t-purple-500">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Inquiries</p>
            <p className="text-3xl font-bold text-purple-400">{contacts.length}</p>
          </div>
        </div>

        {/* Action Bar: Filters & Export */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border rounded-md transition-colors ${showFilters ? 'bg-white text-black border-white' : 'bg-[#0a0a0a] text-white border-white/20 hover:border-white/50'}`}>
              <Filter className="w-4 h-4" /> Filter Records
            </button>
            
            {/* Filter Tabs (Slide in) */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="flex items-center gap-2 overflow-hidden">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'lead', label: 'Leads' },
                    { id: 'workshop', label: 'Workshops' },
                    { id: 'contact', label: 'Messages' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest border transition-colors whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-white/10 text-white border-white/30' 
                        : 'bg-transparent text-gray-500 border-transparent hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md hover:bg-cyan-500 hover:text-black transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* --- TABLE VIEW --- */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-x-auto shadow-2xl">
          {filteredData.length === 0 ? (
             <div className="text-center py-24">
                <Activity className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No records found in this sector.</p>
             </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest font-mono text-gray-400">
                <tr>
                  <th className="px-6 py-4">Status / Type</th>
                  <th className="px-6 py-4">Personnel Info</th>
                  <th className="px-6 py-4">Comm Links</th>
                  <th className="px-6 py-4">Context / Payload</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {filteredData.map((row) => {
                  const isLead = row.type === 'lead';
                  const isWorkshop = row.type === 'workshop';
                  
                  return (
                    <motion.tr 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      key={row.id} 
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* TYPE ICON */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${
                            isLead ? 'bg-white/10 border-white/20 text-white' : 
                            isWorkshop ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 
                            'bg-purple-500/10 border-purple-500/20 text-purple-400'
                          }`}>
                            {isLead ? <Shield className="w-4 h-4" /> : isWorkshop ? <GraduationCap className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">{row.type}</p>
                            <p className="text-[9px] text-gray-500 font-mono">{new Date(row.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>

                      {/* NAME & ORG */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-white">{row.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{row.organization || 'No Organization'}</p>
                      </td>

                      {/* CONTACT INFO */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          {row.email && <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-gray-500"/> {row.email}</span>}
                          {(row.contact || row.phone) && <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-gray-500"/> {row.contact || row.phone}</span>}
                        </div>
                      </td>

                      {/* CONTEXT / DATA */}
                      <td className="px-6 py-4 max-w-xs truncate">
                        {isWorkshop ? (
                          <div className="text-xs flex flex-col gap-1">
                            <span className="text-cyan-400">Date: {row.scheduleDate} | {row.duration}</span>
                            <span className="text-gray-400 truncate"><MapPin className="w-3 h-3 inline mr-1"/>{row.address}</span>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 truncate" title={row.purpose || row.reason}>
                             {row.purpose || row.reason || <span className="text-gray-600 italic">No payload provided</span>}
                          </div>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(row.id, row.type)} 
                          className="text-gray-600 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}