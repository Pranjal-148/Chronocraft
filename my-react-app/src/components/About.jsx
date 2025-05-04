// src/components/About.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./About.css";
// Import your profile image
import profileImage from "../assets/pj.jpg"; // Update this path

const About = () => {
  // Add cursor tracking state and effects (same as in your other components)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const requestRef = useRef(null);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth cursor animation
  useEffect(() => {
    const animateCursor = () => {
      const smoothFactor = 0.1;
      
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothFactor,
        y: prev.y + (mousePosition.y - prev.y) * smoothFactor
      }));
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    requestRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      mixBlendMode: "difference"
    },
    button: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(233, 69, 96, 0.5)",
      mixBlendMode: "difference"
    },
    text: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(155, 89, 182, 0.5)",
      mixBlendMode: "difference"
    }
  };

  const handleButtonHover = (isHovering) => {
    setCursorVariant(isHovering ? "button" : "default");
  };

  const handleTextHover = (isHovering) => {
    setCursorVariant(isHovering ? "text" : "default");
  };

  return (
    <div className="about-container">
      {/* Custom cursor elements */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
      
      <motion.div
        className="cursor-ring"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 700
        }}
      />
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => handleTextHover(true)}
        onMouseLeave={() => handleTextHover(false)}
      >
        About the Creator
      </motion.h1>
      
      <div className="about-content">
        <div className="creator-info">
          <motion.img 
            src={profileImage} 
            alt="Pranjal Kumar"
            className="creator-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
          />
          
          <motion.div 
            className="creator-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 
              onMouseEnter={() => handleTextHover(true)}
              onMouseLeave={() => handleTextHover(false)}
            >
              Pranjal Kumar
            </h2>
            <p className="creator-title">B.Tech CSE Student</p>
            <p className="creator-institution">Delhi Technological University</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="creator-bio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 
            onMouseEnter={() => handleTextHover(true)}
            onMouseLeave={() => handleTextHover(false)}
          >
            About Me
          </h3>
          <p>
            I'm a Computer Science Engineering student at Delhi Technological University, passionate about creating innovative solutions that bridge technology and creativity. Chronocraft represents my vision for a new kind of innovation challenge that helps participants develop adaptable thinking across different contexts and constraints.
          </p>
          
          <h3 
            onMouseEnter={() => handleTextHover(true)}
            onMouseLeave={() => handleTextHover(false)}
          >
            Project Vision
          </h3>
          <p>
            Chronocraft was developed as a unique approach to innovation challenges, designed to train participants in adapting their thinking across different technological eras. By simulating constraints from the analog past to the digital future, it helps build more resilient and flexible problem-solving skills.
          </p>
          
          <div className="contact-section">
            <h3 
              onMouseEnter={() => handleTextHover(true)}
              onMouseLeave={() => handleTextHover(false)}
            >
              Connect With Me
            </h3>
            <div className="contact-links">
              <a 
                href="https://github.com/Pranjal-148" // Replace with your GitHub URL
                className="contact-link"
                onMouseEnter={() => handleButtonHover(true)}
                onMouseLeave={() => handleButtonHover(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                href="https://www.instagram.com/k_pran_jal/" // Replace with your Instagram URL
                className="contact-link instagram-link"
                onMouseEnter={() => handleButtonHover(true)}
                onMouseLeave={() => handleButtonHover(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a 
                href="mailto:pranjal14805@gmail.com" // Replace with your email
                className="contact-link email-link"
                onMouseEnter={() => handleButtonHover(true)}
                onMouseLeave={() => handleButtonHover(false)}
              >
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
