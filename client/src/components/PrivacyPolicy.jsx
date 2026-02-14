/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Globe, Mail, MapPin } from "lucide-react";

export default function PrivacyPolicy({ onBack }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative z-50">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- Header --- */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">Privacy Policy</h1>
          <p className="text-gray-400 text-sm tracking-wide">
            Last Updated: <span className="text-white">February 02, 2026</span>
          </p>
        </div>

        {/* --- Content Area --- */}
        <div className="space-y-12 text-gray-300 font-light leading-relaxed">
          
          {/* Introduction */}
          <div className="space-y-4 text-lg">
            <p>
              At <strong className="text-white">Canopy Puffs</strong> ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, store, and safeguard your information when you visit our website, use our services, 
              purchase our products, download our software, interact with our AI/drone technologies, or communicate with us in any way.
            </p>
            <p className="text-sm border-l border-white/30 pl-4 italic text-gray-500">
              By accessing or using our website, services, or products, you agree to the terms of this Privacy Policy. 
              If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-serif text-white mb-6 mt-12 border-b border-white/10 pb-2">
              1. Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">Personal Information You Provide Voluntarily</h3>
                <ul className="list-disc pl-5 space-y-1 marker:text-white/50 text-sm">
                  <li>Name, Email address, Phone number.</li>
                  <li>Postal address (if applicable).</li>
                  <li>Organization, institution, or company details.</li>
                  <li>Payment information (processed securely via third-party providers; we do not store full card details).</li>
                  <li>Any other information you voluntarily submit through contact forms, emails, support tickets, surveys, registrations, or communications.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Automatically Collected Technical Information</h3>
                <ul className="list-disc pl-5 space-y-1 marker:text-white/50 text-sm">
                  <li>IP address, Browser type and version.</li>
                  <li>Device type, operating system, and unique device identifiers.</li>
                  <li>Pages visited, time and date of visits, interaction data (e.g., clicks, scrolls).</li>
                  <li>Geolocation data (approximate, derived from IP).</li>
                </ul>
              </div>
              <p className="text-sm bg-white/5 p-4 rounded border border-white/10">
                <strong>Cookies and Similar Tracking Technologies:</strong> We use cookies, web beacons, pixels, and similar technologies to enhance functionality, analyze usage, remember preferences, and deliver personalized experiences. We aim to collect only the data necessary for the purposes described (data minimization principle).
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-serif text-white mb-6 mt-12 border-b border-white/10 pb-2">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">We use your information for lawful purposes, including:</p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm">
              <li className="bg-white/5 p-4 rounded border border-white/10">Providing, operating, maintaining, and improving our website, services, products, software, and AI/drone technologies.</li>
              <li className="bg-white/5 p-4 rounded border border-white/10">Processing inquiries, orders, registrations, and support requests.</li>
              <li className="bg-white/5 p-4 rounded border border-white/10">Communicating with you (e.g., updates, newsletters, service announcements, customer support).</li>
              <li className="bg-white/5 p-4 rounded border border-white/10">Conducting research, development, testing, innovation, and training of AI models (using anonymized or aggregated data where possible).</li>
              <li className="bg-white/5 p-4 rounded border border-white/10">Performing analytics, monitoring performance, detecting errors, and optimizing user experience.</li>
              <li className="bg-white/5 p-4 rounded border border-white/10">Ensuring security, preventing fraud, and detecting unauthorized access.</li>
              <li className="bg-white/5 p-4 rounded border border-white/10">Internal business operations, auditing, and decision-making.</li>
            </ul>
            <p className="mt-4 text-sm italic text-gray-500">We process data based on your consent, contractual necessity, legitimate interests, or legal requirements.</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-serif text-white mb-6 mt-12 border-b border-white/10 pb-2">
              3. Data Sharing and Disclosure
            </h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-white/50 text-sm">
              <li>Service providers, contractors, and partners (e.g., hosting, cloud storage, analytics, payment processors, email services) who act on our behalf under strict confidentiality.</li>
              <li>Legal authorities if required by law, court order, government request, or to protect rights/safety.</li>
              <li>In connection with mergers, acquisitions, restructurings, asset sales, or bankruptcy.</li>
              <li>Business partners for joint services (with your consent where required).</li>
            </ul>
            <p className="mt-4 text-white">We do not sell your personal data as a core business practice. Any sharing is limited and purpose-bound.</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-serif text-white mb-6 mt-12 border-b border-white/10 pb-2">
              4. Intellectual Property & AI Training
            </h2>
            <p className="mb-4">
              All content, software, designs, drone models, algorithms, AI systems, documentation, and materials related to Canopy Puffs are our exclusive intellectual property (unless stated otherwise).
            </p>
            <p className="mb-2">We may use anonymized, aggregated, or de-identified data (stripped of personal identifiers) for:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-white/50 text-sm">
              <li>Analysis, research, product improvement.</li>
              <li>Developing, testing, and training AI/ML models and automated systems.</li>
            </ul>
          </section>

          {/* Section 5 (Highlighting Prohibited Uses) */}
          <section className="mt-12 bg-red-900/10 border border-red-900/30 p-8 rounded-lg">
            <h2 className="text-2xl font-serif text-red-200 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6" /> 5. Restricted and Prohibited Uses
            </h2>
            <p className="text-red-200/90 mb-4">
              Our technologies (including drones, software, and AI tools) are intended for <strong className="text-red-100">civilian and non-lethal purposes only</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-red-400 mb-2 text-sm uppercase tracking-wider">Prohibited Uses</h4>
                <ul className="list-disc pl-5 space-y-1 marker:text-red-500 text-red-200/70 text-sm">
                  <li>Weaponized or offensive defense drones.</li>
                  <li>Military combat, lethal autonomous systems, or surveillance for harm.</li>
                  <li>Any illegal, harmful, or unethical activities violating laws/regulations.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-400 mb-2 text-sm uppercase tracking-wider">Permitted Uses</h4>
                <ul className="list-disc pl-5 space-y-1 marker:text-green-500 text-gray-300 text-sm">
                  <li>Research and Education.</li>
                  <li>Agriculture and Environmental Monitoring.</li>
                  <li>Disaster Rescue and Humanitarian Efforts.</li>
                  <li>Non-weaponized surveillance and Civilian Security.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-red-200/50">We reserve the right to investigate, deny access, or terminate services if misuse is suspected.</p>
          </section>

          {/* Sections 6-12 */}
          <section className="space-y-12 mt-12">
            
            <div>
              <h2 className="text-xl font-bold text-white mb-2">6. Cookies Policy</h2>
              <p className="text-sm">We use essential cookies for core functionality, analytics cookies to improve performance, and marketing cookies for personalization. You can manage preferences via your browser settings.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">7. Data Security</h2>
              <p className="text-sm">We implement reasonable administrative, technical, and physical measures (encryption, access controls, firewalls) to protect your data. However, no internet transmission is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">8. Data Retention</h2>
              <p className="text-sm">We retain personal data only as long as necessary for the collected purposes, legal obligations, or dispute resolution. Anonymized data may be retained indefinitely.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">9. Your Rights and Choices</h2>
              <p className="text-sm mb-2">Subject to applicable laws (including DPDP Act, 2023 in India), you may have rights to:</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-white/50 text-sm">
                <li>Access, correct, or erase your personal data.</li>
                <li>Restrict processing or withdraw consent.</li>
                <li>Lodge a complaint with the relevant authority (e.g., Data Protection Board of India).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">10. International Data Transfers</h2>
              <p className="text-sm">If we transfer data outside India, we ensure appropriate safeguards (contracts, adequacy decisions) per applicable laws.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-2">11. Third-Party Links</h2>
              <p className="text-sm">Our site may link to third-party services. We are not responsible for their privacy practices.</p>
            </div>

             <div>
              <h2 className="text-xl font-bold text-white mb-2">12. Changes to This Policy</h2>
              <p className="text-sm">We may update this policy. Continued use after changes constitutes acceptance.</p>
            </div>
          </section>

          {/* Section 13: Contact */}
          <section className="border-t border-white/10 pt-12 mt-16">
            <h2 className="text-3xl font-serif text-white mb-8">13. Contact Us / Grievance Officer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white/5 p-8 rounded border border-white/10">
                <MapPin className="w-6 h-6 text-white mb-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Registered Office</h3>
                <p className="text-lg text-white font-serif">
                  Canopy Puffs Aeronautics Pvt Ltd <br />
                  ,Rajahi, Gorakhpur, Uttar Pradesh, India
                </p>
              </div>

              <div className="bg-white/5 p-8 rounded border border-white/10">
                <Mail className="w-6 h-6 text-white mb-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Digital Contact</h3>
                <div className="space-y-2">
                  <p>Email: <a href="mailto:canopypuffs@gmail.com" className="text-white border-b border-white/30 hover:border-white transition-colors">canopypuffs@gmail.com</a></p>
                  <p>Website: <a href="https://canopypuffs.in" target="_blank" rel="noreferrer" className="text-white border-b border-white/30 hover:border-white transition-colors">canopypuffs.in</a></p>
                </div>
              </div>

            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              We have appointed a Grievance Officer for data-related issues. Contact the above email with "Grievance" in the subject.
              <br /><br />
              Thank you for trusting Canopy Puffs.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}