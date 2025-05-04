// ChronocraftTabs.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./ChronocraftTabs.css";

const ChronocraftTabs = () => {
  const tabs = [
    { id: "concept", label: "Concept" },
    { id: "timeline", label: "Timeline" },
    { id: "judging", label: "Judging" },
    { id: "journey", label: "Journey" },
    { id: "unique", label: "USP" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [progress, setProgress] = useState(20);
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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Set progress based on tab
    const progressMap = {
      "concept": 20,
      "timeline": 40,
      "judging": 60,
      "journey": 80,
      "unique": 100
    };
    setProgress(progressMap[tabId]);
  };

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
  
  const eras = [
    {
      id: 'paleolithic',
      name: 'Paleolithic Era',
      icon: '🗿',
      description: 'Analog-only ideation with paper, markers, and physical materials.',
      duration: '30 minutes',
      focus: 'Core problem understanding'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Era',
      icon: '🌾',
      description: 'Basic prototyping with craft materials like clay, cardboard, and string.',
      duration: '30 minutes',
      focus: 'Physical model creation'
    },
    {
      id: 'industrial',
      name: 'Industrial Era',
      icon: '🏭',
      description: 'Limited digital access (50% screen masking) with structured production methods.',
      duration: '30 minutes',
      focus: 'Material constraints'
    },
    {
      id: 'information',
      name: 'Information Age',
      icon: '💻',
      description: 'Full digital tool access with rotating stakeholder perspectives.',
      duration: '30 minutes',
      focus: 'Digital collaboration'
    },
    {
      id: 'future',
      name: 'Future Phase',
      icon: '🚀',
      description: 'Unlock "future tech" capability cards for speculative problem-solving.',
      duration: '30 minutes',
      focus: 'Integration & speculation'
    }
  ];

  return (
    <div className={`chronocraft-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
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
          damping: 20,
          stiffness: 300
        }}
      />
      
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="theme-toggle"
        onMouseEnter={() => setCursorVariant("button")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <header className="chronocraft-header">
        <h1 
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          CHRONOCRAFT
        </h1>
        <p className="subtitle">Time-Travel Innovation Challenge</p>
      </header>

      <div className="tabs-container">
        <div className="tab-buttons">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="tab-background"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="progress-container">
        <motion.div 
          className="progress-bar" 
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="progress-label">{progress}% Complete</div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="tab-content"
      >
        {activeTab === "concept" && (
          <div className="concept-section">
            <div className="concept-quote">
              <blockquote>
                "Innovation doesn't happen in isolation-it evolves through constraints, contexts, and changing realities."
              </blockquote>
            </div>
            
            <div className="concept-description">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Core Concept ✨
              </motion.h3>
              <p>Chronocraft is an immersive innovation challenge that simulates how ideas evolve across time periods. Teams solve the same problem through five distinct "eras," each with unique constraints - from analog-only ideation to futuristic speculative technologies.</p>
              
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Objective 🎯
              </motion.h3>
              <ul>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Train creative resilience and adaptability under changing conditions
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Master rapid prototyping with varied resource constraints
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Develop cross-era thinking that bridges ancient wisdom with future innovation
                </motion.li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="timeline-section">
            <h2 
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              The Five Eras of Innovation
            </h2>
            <div className="bento-grid">
              {eras.map((era, index) => (
                <motion.div 
                  key={era.id}
                  className={`bento-item ${index === 0 ? 'large' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" 
                  }}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className={`era-icon ${era.id}-icon`}>{era.icon}</div>
                  <h3>{era.name}</h3>
                  <p className="era-duration">{era.duration}</p>
                  <p>{era.description}</p>
                  <p className="era-focus">✨ <strong>Focus:</strong> {era.focus}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="duration-options">
              <h3>Duration Options</h3>
              <ul>
                <li><strong>Standard:</strong> 2.5 Hours</li>
                <li><strong>Express:</strong> 75 minutes</li>
                <li><strong>Extended:</strong> 5 Hours</li>
                <li><strong>Multi-Day Format Available</strong></li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "judging" && (
          <div className="judging-section">
            <h2
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Judging Criteria & Interaction
            </h2>
            
            <div className="criteria-cards">
              <motion.div 
                className="criteria-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Evolution of Idea</h3>
                <div className="weight">25%</div>
                <p>How solution transforms across eras</p>
              </motion.div>
              
              <motion.div 
                className="criteria-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Adaptability</h3>
                <div className="weight">25%</div>
                <p>Response to changing constraints</p>
              </motion.div>
              
              <motion.div 
                className="criteria-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Innovation</h3>
                <div className="weight">20%</div>
                <p>Creative problem-solving approaches</p>
              </motion.div>
              
              <motion.div 
                className="criteria-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Feasibility</h3>
                <div className="weight">15%</div>
                <p>Practicality of final solution</p>
              </motion.div>
              
              <motion.div 
                className="criteria-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Team Dynamics</h3>
                <div className="weight">15%</div>
                <p>Communication and role flexibility</p>
              </motion.div>
            </div>
            
            <div className="engagement-points">
              <h3>Engagement Touchpoints</h3>
              <ul>
                <li><strong>Era Guides:</strong> Domain experts available during each phase</li>
                <li><strong>Time Portal Sessions:</strong> AMAs between eras (5-min quick consulting)</li>
                <li><strong>Artifact Assessment:</strong> Feedback shared after each round</li>
                <li><strong>Era Leaderboard:</strong> Updated rankings after each phase</li>
                <li><strong>Quantum Leap Moments:</strong> Surprise challenge modifications</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "journey" && (
          <div className="journey-section">
            <h2
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              The Chronocraft Experience
            </h2>
            
            <div className="journey-steps">
              <motion.div 
                className="journey-step"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>1. Time Traveler Onboarding ✨</h3>
                <ul>
                  <li>Register team (3-4 members)</li>
                  <li>Access interactive orientation via app/portal</li>
                  <li>Receive challenge brief and era guidelines</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="journey-step"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>2. Era Progression 🚀</h3>
                <ul>
                  <li>Transition through time periods with "era shift" announcements</li>
                  <li>Adapt to new tools, constraints, and perspectives</li>
                  <li>Document evolution of solution at each stage</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="journey-step"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>3. Cross-Era Collaboration 🤝</h3>
                <ul>
                  <li>Team roles evolve across eras</li>
                  <li>Skills adaptation based on available tools</li>
                  <li>Knowledge transfer between phases</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="journey-step"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>4. Final Convergence 🏆</h3>
                <ul>
                  <li>Integrate learnings from all eras</li>
                  <li>Submit final prototype/pitch (3-minute video or deck)</li>
                  <li>Present evolution story and solution impact</li>
                </ul>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "unique" && (
          <div className="usp-section">
            <h2
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Why Chronocraft Stands Apart
            </h2>
            
            <div className="usp-cards">
              <motion.div 
                className="usp-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Time-Locked Creativity</h3>
                <p>Constraints evolve systematically, forcing innovation adaptation</p>
              </motion.div>
              
              <motion.div 
                className="usp-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Evolutionary Thinking</h3>
                <p>Solutions must bridge primitive approaches with futuristic thinking</p>
              </motion.div>
              
              <motion.div 
                className="usp-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Multisensory Immersion</h3>
                <p>Audio environments and visual transformations change with each era</p>
              </motion.div>
              
              <motion.div 
                className="usp-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <h3>Gen Z Alignment</h3>
                <p>Balances digital and analog, purpose-driven challenges tied to UN SDGs</p>
              </motion.div>
            </div>
            
            <div className="cta-section">
              <h2>Ready to Travel Through Time?</h2>
              <p>Join the Chronocraft challenge and develop your innovation skills across different eras.</p>
              <motion.button 
                className="register-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Register Your Team
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChronocraftTabs;
