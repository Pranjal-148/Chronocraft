// ExperienceOverview.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./ExperienceOverview.css";

const ExperienceOverview = () => {
  const [activeEra, setActiveEra] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const requestRef = useRef(null);
  
  const eras = [
    {
      id: 'paleolithic',
      name: 'Paleolithic Era',
      icon: '🗿',
      description: 'Analog-only ideation with paper, markers, and physical materials.',
      experience: 'Sketch ideas on physical paper, collaborate without digital tools, focus on core problem understanding.',
      color: '#8B5A2B'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Era',
      icon: '🌾',
      description: 'Basic prototyping with craft materials like clay, cardboard, and string.',
      experience: 'Build tangible models, experiment with physical materials, create 3D representations of your ideas.',
      color: '#6B8E23'
    },
    {
      id: 'industrial',
      name: 'Industrial Era',
      icon: '🏭',
      description: 'Limited digital access with structured production methods.',
      experience: 'Work with 50% screen masking, manage material constraints, develop production plans.',
      color: '#4A4A4A'
    },
    {
      id: 'information',
      name: 'Information Age',
      icon: '💻',
      description: 'Full digital tool access with rotating stakeholder perspectives.',
      experience: 'Utilize all digital tools, adapt to changing stakeholder needs, collaborate across functions.',
      color: '#0078D4'
    },
    {
      id: 'future',
      name: 'Future Phase',
      icon: '🚀',
      description: 'Unlock "future tech" capability cards for speculative problem-solving.',
      experience: 'Integrate concepts from all eras, incorporate future technologies, create your ultimate solution.',
      color: '#8A2BE2'
    }
  ];

  const eventDetails = {
    date: "June 15-17, 2025",
    location: "Virtual & In-Person Options Available",
    registration: "Teams of 3-4 members",
    deadline: "Registration closes June 1, 2025"
  };

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
      // Adjust this value to control smoothness (lower = smoother but more lag)
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
    era: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(155, 89, 182, 0.5)",
      mixBlendMode: "difference"
    }
  };

  function handleButtonHover(isHovering) {
    setCursorVariant(isHovering ? "button" : "default");
  }

  function handleEraHover(isHovering) {
    setCursorVariant(isHovering ? "era" : "default");
  }

  return (
    <div className="experience-container">
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
      
      <div className="hero-section">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => handleButtonHover(true)}
          onMouseLeave={() => handleButtonHover(false)}
        >
          CHRONOCRAFT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Experience Innovation Across Time
        </motion.p>
        
        <motion.div 
          className="era-timeline-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {eras.map((era, index) => (
            <motion.div 
              key={era.id}
              className="era-icon-container"
              whileHover={{ scale: 1.2, y: -10 }}
              onClick={() => setActiveEra(era.id)}
              onMouseEnter={() => handleEraHover(true)}
              onMouseLeave={() => handleEraHover(false)}
            >
              <div className="era-icon" style={{ backgroundColor: era.color }}>
                {era.icon}
              </div>
              <div className="era-name">{era.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="event-overview">
        <div className="event-details">
          <h2 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>Event Details</h2>
          <ul>
            <li><strong>Dates:</strong> {eventDetails.date}</li>
            <li><strong>Format:</strong> {eventDetails.location}</li>
            <li><strong>Teams:</strong> {eventDetails.registration}</li>
            <li><strong>Deadline:</strong> {eventDetails.deadline}</li>
          </ul>
          
          <div className="duration-options">
            <h3 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>Duration Options</h3>
            <div className="duration-cards">
              <div className="duration-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
                <h4>Standard</h4>
                <p>2.5 Hours</p>
              </div>
              <div className="duration-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
                <h4>Express</h4>
                <p>75 Minutes</p>
              </div>
              <div className="duration-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
                <h4>Extended</h4>
                <p>5 Hours</p>
              </div>
              <div className="duration-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
                <h4>Multi-Day</h4>
                <p>Custom Format</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="registration-cta">
          <h2 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>Ready to Travel Through Time?</h2>
          <p>Join teams from around the world in this unique innovation challenge</p>
          <motion.button 
            className="register-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
          >
            Register Your Team
          </motion.button>
        </div>
      </div>
      
      {activeEra && (
        <motion.div 
          className="era-experience"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <h2 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            Experience the {eras.find(era => era.id === activeEra).name}
          </h2>
          <div className="era-experience-content" style={{ borderColor: eras.find(era => era.id === activeEra).color }}>
            <div className="era-icon-large" style={{ backgroundColor: eras.find(era => era.id === activeEra).color }}>
              {eras.find(era => era.id === activeEra).icon}
            </div>
            <div className="era-description">
              <p>{eras.find(era => era.id === activeEra).description}</p>
              <h3 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>What You'll Experience:</h3>
              <p>{eras.find(era => era.id === activeEra).experience}</p>
            </div>
          </div>
          <button 
            className="close-button" 
            onClick={() => setActiveEra(null)}
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
          >
            Close
          </button>
        </motion.div>
      )}
      
      <div className="game-features">
        <h2 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>Why Chronocraft?</h2>
        <div className="features-grid">
          <div className="feature-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>Time-Locked Creativity</h3>
            <p>Constraints evolve systematically, forcing innovation adaptation</p>
          </div>
          <div className="feature-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>Evolutionary Thinking</h3>
            <p>Solutions must bridge primitive approaches with futuristic thinking</p>
          </div>
          <div className="feature-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>Multisensory Immersion</h3>
            <p>Audio environments and visual transformations change with each era</p>
          </div>
          <div className="feature-card" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>Gen Z Alignment</h3>
            <p>Balances digital and analog, purpose-driven challenges</p>
          </div>
        </div>
      </div>
      
      <div className="faq-section">
        <h2 onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>What skills do I need?</h3>
            <p>Teams benefit from diverse skills - design, technical, business, and creative thinking all play a role.</p>
          </div>
          <div className="faq-item" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>What materials are provided?</h3>
            <p>For in-person events, all necessary materials for each era are provided. Virtual participants receive a digital toolkit.</p>
          </div>
          <div className="faq-item" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>How are winners determined?</h3>
            <p>Teams are judged on idea evolution, adaptability, innovation, feasibility, and team dynamics.</p>
          </div>
          <div className="faq-item" onMouseEnter={() => handleButtonHover(true)} onMouseLeave={() => handleButtonHover(false)}>
            <h3>Can I participate remotely?</h3>
            <p>Yes! Chronocraft offers both in-person and virtual participation options.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceOverview;
