/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane,       // ASTRA
  Bot,         // Rover
  ShieldAlert, // SkyGuardian
  Crosshair,   // CIWS
  ArrowRight,
  Plus,
  X            // Added X icon for the close button
} from "lucide-react";

// --- MAIN THUMBNAILS ---
const AstraImg = "/astra.jpeg";
const RoverImg = "/astra1.jpg";
const DefenseImg = "/defence.jpeg";
const CiwsImg = "/cisi.jpg";

// --- FULLSCREEN POPUP COMPONENT (SINGLE IMAGE) ---
const DetailedPopup = ({ title, image, description, onClose }) => {
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]"
    >
      {/* Modal Content - Scrollable on mobile, flex on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full h-full md:flex md:flex-row overflow-y-auto md:overflow-hidden"
      >
        {/* Top/Right Close Button (X) - Fixed on mobile so it stays visible while scrolling */}
        <button 
          onClick={onClose}
          className="fixed md:absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 bg-black/60 backdrop-blur-sm hover:bg-white hover:text-black rounded-full text-white transition-all duration-300 border border-white/20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* --- IMAGE SECTION (Single Image) --- */}
        <div className="h-[45vh] md:h-full md:w-1/2 shrink-0 relative z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-80" 
          />
          {/* Gradient overlays to blend into background */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080808] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* --- CONTENT AREA --- */}
        <div className="flex flex-col justify-start md:justify-center p-6 sm:p-8 md:p-16 lg:p-24 bg-[#080808] relative z-10 md:w-1/2 min-h-0">
          
          <div className="max-w-2xl w-full mx-auto md:h-full flex flex-col">
            <h4 className="text-white font-serif text-3xl md:text-5xl mb-6 flex items-center gap-4">
              <div className="w-2 h-8 md:h-10 bg-white shrink-0" /> {title}
            </h4>
            
            {/* Scrollable Text Container on Desktop, normal flow on Mobile */}
            <div 
              className="md:overflow-y-auto pr-0 md:pr-8 custom-scrollbar outline-none focus:ring-1 focus:ring-white/20 flex-1"
              tabIndex={0} 
            >
              <p className="text-[14px] md:text-base leading-relaxed md:leading-loose text-gray-300 font-light text-justify whitespace-pre-line pb-8">
                {description}
              </p>
            </div>
            
            {/* Footer */}
            <div className="mt-6 md:mt-8 pt-6 border-t border-white/10 flex justify-between items-center shrink-0">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold italic">
                Astra Systems v4.0
              </span>
              <button 
                onClick={onClose}
                className="px-6 md:px-8 py-3 bg-white hover:bg-gray-200 text-black text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                Return <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- LUXURY CARD COMPONENT ---
const ShowroomCard = ({ title, subtitle, icon: Icon, features, index, image, detailedDesc, onClick }) => {
  return (
    <div 
      className="relative cursor-pointer h-full" 
      onClick={() => {
        if (detailedDesc) onClick({ title, image, description: detailedDesc });
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
        viewport={{ once: true }}
        className="group flex flex-col h-full bg-[#080808] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/30"
      >
        {/* --- IMAGE SECTION --- */}
        <div className="relative h-56 w-full overflow-hidden border-b border-white/5 bg-white/5 shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 border border-white/10 rounded-full bg-black/50 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Icon className="w-5 h-5 stroke-[1.5px]" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 bg-white/5 px-2 py-1 rounded">
                0{index + 1}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-serif text-white mb-2 group-hover:translate-x-1 transition-transform duration-500 uppercase tracking-tight">
                {title}
              </h3>
              <p className="text-[9px] font-sans tracking-[0.2em] text-white/60 uppercase">
                {subtitle}
              </p>
            </div>

            <div className="h-[1px] w-full bg-white/10 mb-6 group-hover:w-1/2 transition-all duration-700" />

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] text-gray-400 font-light uppercase tracking-wider">
                  <Plus className="w-3 h-3 text-white/30" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
            <span className="text-[9px] uppercase tracking-widest text-white opacity-60 group-hover:opacity-100 transition-opacity">
              Tap to view details
            </span>
            <button className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500 bg-black/50">
              <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Solutions() {
  const [activePopup, setActivePopup] = useState(null);

  // Texts
  const agriDroneDesc = `An Agricultural Drone (Agri Drone) is an unmanned aerial vehicle (UAV) specially designed to assist farmers in modern farming practices. These drones are mainly used for pesticide spraying, fertilizer application, crop monitoring, and field mapping. Most agri drones are multirotor systems equipped with a spray tank, high-efficiency nozzles, GPS navigation, and smart flight controllers. 

Agri drones operate using pre-programmed flight paths created through ground control software. With GPS or RTK positioning, the drone flies autonomously over the field at a fixed height and speed, ensuring uniform spraying. Advanced models use multispectral and thermal cameras to monitor crop health through NDVI analysis, helping detect diseases, nutrient deficiencies, and water stress at early stages.

One of the biggest advantages of agri drones is precision farming. They reduce chemical usage by 30–50%, minimize human exposure to harmful pesticides, and significantly cut labor costs. A typical 10–20 liter capacity drone can cover 1–2 acres per flight, depending on battery capacity and field conditions.`;

  const astraDesc = `ASTRA (Agri Smart Tech Robotic Automation) is an innovative, selective pesticide spraying system designed to modernize traditional farming through precision and automation. By integrating an ESP32 camera and advanced server-side processing, the robot can identify specific areas or plants requiring treatment rather than blanket-spraying an entire field. This targeted approach significantly reduces the volume of chemicals used, which not only lowers input costs for farmers but also minimizes the environmental impact and soil degradation associated with over-spraying.

For the modern farmer, ASTRA serves as a vital tool for increasing efficiency and safety. The autonomous nature of the system reduces the need for manual labor in harsh conditions, protecting workers from prolonged exposure to hazardous pesticides. Furthermore, the real-time data and monitoring capabilities allow for better crop management and resource allocation. By combining robotics with IoT connectivity, ASTRA ensures that agricultural practices are more sustainable, data-driven, and cost-effective, ultimately helping farmers improve their yield while preserving the health of their land.`;

  const skyGuardianDesc = `Sky Guardian is an advanced defense and surveillance drone developed by Canopy Puffs for army and border security operations. It is designed to support soldiers in high-risk environments by providing real-time aerial intelligence, threat detection, and autonomous navigation.

Sky Guardian is equipped with a high-resolution RGB camera and a thermal imaging camera for day and night surveillance. The thermal sensor detects human presence, heat signatures, and suspicious movement even in low-visibility conditions such as fog, smoke, or darkness. With AI-based object recognition, the drone can identify humans, vehicles, and potential threats automatically.

The drone uses GPS-based autonomous navigation and waypoint mission planning. It can patrol predefined routes, monitor sensitive areas, and return automatically to base when battery levels are low. Advanced obstacle avoidance sensors improve safety during low-altitude operations in complex terrains like forests or mountainous regions.

Sky Guardian is powered by high-efficiency BLDC motors and controlled via a long-range encrypted communication system. It supports live video transmission to a ground control station, allowing commanders to make quick tactical decisions. Future versions may integrate LiDAR for terrain mapping, swarm capability for coordinated missions, and payload dropping for medical or emergency supplies.

Key applications include border surveillance, anti-infiltration monitoring, search and rescue operations, disaster response, and battlefield reconnaissance. By reducing direct exposure of soldiers to danger zones, Sky Guardian enhances operational safety and mission efficiency.

This project reflects the vision of Canopy Puffs to develop indigenous, AI-enabled defense technologies that strengthen national security and modernize military surveillance systems.`;

  const ciwsDesc = `The Anti-Drone Gun System by Canopy Puffs is currently under development as an advanced short-range counter-UAV solution for army and defense applications. This project is designed to detect, track, and neutralize hostile drones that pose threats to military bases, border areas, and sensitive installations.

The system is being engineered with a daytime detection range of 800 meters, using a high-resolution optical zoom camera integrated with RF signal detection technology. For night operations, it incorporates a thermal or infrared imaging module capable of detecting drones up to 400 meters, ensuring 24/7 operational readiness. These dual detection systems allow soldiers to identify potential aerial threats early and respond effectively.

The proposed effective engagement range is 300 meters, within which the operator can accurately aim and neutralize an incoming enemy drone. The system includes a stabilized targeting unit with a live display interface, providing real-time visual feedback and distance estimation for improved precision. The structure is designed to be portable or tripod-mounted, allowing flexible deployment in various terrains.

Currently, the project is focusing on optimizing targeting accuracy, power efficiency, and system stability. Future upgrades may include AI-based automatic drone recognition, smart tracking algorithms, and enhanced resistance against electronic countermeasures.

As drone-based threats are increasing in modern warfare, this under-development anti-drone gun aims to strengthen tactical defense capabilities. By providing an indigenous, cost-effective counter-drone solution, Canopy Puffs seeks to contribute to national security and advanced battlefield technology innovation.`;

  return (
    <section id="solutions" className="relative py-32 bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="block text-xs font-bold tracking-[0.3em] uppercase opacity-50 mb-4">Defensive Matrix</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-none">Autonomous <br /> Excellence.</h2>
          </div>
          <p className="max-w-sm text-sm text-gray-400 leading-relaxed font-light">
            Our specialized fleet covers every layer of operation: from precision agriculture 
            to kinetic aerial defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ShowroomCard 
            index={0}
            title="AGRI DRONE"
            subtitle="Aerial Sprinkling"
            icon={Plane}
            image={AstraImg} 
            detailedDesc={agriDroneDesc}
            features={["Autonomous Flight", "Precision Liquid Dispersal", "120 NM Range", "Drift-Reduction", "Rapid Payload Swap"]}
            onClick={setActivePopup}
          />

          <ShowroomCard 
            index={1}
            title="ASTRA"
            subtitle="Infection Treatment"
            icon={Bot}
            image={RoverImg} 
            detailedDesc={astraDesc}
            features={["AI Infection Diagnosis", "Selective Spraying", "All-Terrain Nav", "Plant-by-Plant Analysis", "Zero-Waste Protocol"]}
            onClick={setActivePopup}
          />

          <ShowroomCard 
            index={2}
            title="SkyGuardian"
            subtitle="Tactical Surveillance"
            icon={ShieldAlert}
            image={DefenseImg} 
            detailedDesc={skyGuardianDesc}
            features={["Thermal Night Vision", "AES-256 Encrypted", "Target Locking", "Perimeter Breach Alert", "Anti-Jamming GPS"]}
            onClick={setActivePopup}
          />

          <ShowroomCard 
            index={3}
            title="CIWS"
            subtitle="Kinetic Defense"
            icon={Crosshair}
            image={CiwsImg} 
            detailedDesc={ciwsDesc}
            features={["4,500 Rounds/Min", "Radar-Guided Track", "Cost-Effective Ammo", "Anti-Swarm Ballistics", "Terminal Defense"]}
            onClick={setActivePopup}
          />
        </div>
      </div>

      {/* --- RENDER FULLSCREEN POPUP HERE --- */}
      <AnimatePresence>
        {activePopup && activePopup.description && (
          <DetailedPopup 
            title={activePopup.title} 
            image={activePopup.image} 
            description={activePopup.description} 
            onClose={() => setActivePopup(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}