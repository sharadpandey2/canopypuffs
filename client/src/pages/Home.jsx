import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Solutions from "../components/Solutions";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Check Hero: If this has a 3D scene, ensure it doesn't block clicks! */}
      <section id="hero" className="w-full">
         <Hero />
      </section>

      <About />
      <Solutions />
      <CTA />
    </>
  );
}