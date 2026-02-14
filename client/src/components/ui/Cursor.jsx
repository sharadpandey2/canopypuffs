/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  // Smooth physics for the cursor (delay effect)
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - 10); // -10 centers the 20px div
    mouse.y.set(clientY - 10);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    
    // Detect hover on interactive elements
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div 
      style={{ 
        left: smoothX, 
        top: smoothY,
      }} 
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? "rgba(34, 211, 238, 0.4)" : "rgba(255, 255, 255, 1)",
      }}
      className="fixed z-[9999] w-5 h-5 rounded-full pointer-events-none mix-blend-difference backdrop-blur-sm hidden md:block"
    >
      {/* Inner dot for precision */}
      {isHovered && <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full" />}
    </motion.div>
  );
}