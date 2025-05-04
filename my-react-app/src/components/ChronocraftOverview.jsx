// src/components/ChronocraftOverview.jsx
import { useState } from 'react';
import './ChronocraftOverview.css';

const ChronocraftOverview = () => {
  const [activeTab, setActiveTab] = useState('concept');

  const eras = [
    {
      id: 'paleolithic',
      name: 'Paleolithic Era',
      icon: '🗿',
      description: 'Analog-only ideation with paper, markers, and physical materials. No digital tools permitted.',
      duration: '30 minutes',
      focus: 'Core problem understanding'
    },
    {
      id: 'agricultural',
      name: 'Agricultural Era',
      icon: '🌾',
      description: 'Basic prototyping with craft materials like clay, cardboard, and string to build tangible solutions.',
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
      description: 'Full digital tool access with rotating stakeholder perspectives and cross-functional collaboration.',
      duration: '30 minutes',
      focus: 'Digital collaboration'
    },
    {
      id: 'future',
      name: 'Future Phase',
      icon: '🚀',
      description: 'Unlock "future tech" capability cards for speculative problem-solving and integration of concepts from all previous eras.',
      duration: '30 minutes',
      focus: 'Integration & speculation'
    }
  ];

  const judgingCriteria = [
    { name: 'Evolution of Idea', weight: '25%', description: 'How solution transforms across eras' },
    { name: 'Adaptability', weight: '25%', description: 'Response to changing constraints' },
    { name: 'Innovation', weight: '20%', description: 'Creative problem-solving approaches' },
    { name: 'Feasibility', weight: '15%', description: 'Practicality of final solution' },
    { name: 'Team Dynamics', weight: '15%', description: 'Communication and role flexibility' }
  ];

  return (
    <div className="chronocraft-container">
      <header className="chronocraft-header">
        <h1>CHRONOCRAFT</h1>
        <p className="subtitle">Time-Travel Innovation Challenge</p>
      </header>

      <nav className="chronocraft-nav">
        <button 
          className={activeTab === 'concept' ? 'active' : ''} 
          onClick={() => setActiveTab('concept')}
        >
          Concept
        </button>
        <button 
          className={activeTab === 'timeline' ? 'active' : ''} 
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </button>
        <button 
          className={activeTab === 'judging' ? 'active' : ''} 
          onClick={() => setActiveTab('judging')}
        >
          Judging
        </button>
        <button 
          className={activeTab === 'journey' ? 'active' : ''} 
          onClick={() => setActiveTab('journey')}
        >
          Journey
        </button>
      </nav>

      <main className="chronocraft-content">
        {activeTab === 'concept' && (
          <section className="concept-section">
            <h2>Concept & Objective</h2>
            <div className="concept-quote">
              <blockquote>
                "Innovation doesn't happen in isolation-it evolves through constraints, contexts, and changing realities."
              </blockquote>
            </div>
            
            <div className="concept-description">
              <h3>Core Concept</h3>
              <p>Chronocraft is an immersive innovation challenge that simulates how ideas evolve across time periods. Teams solve the same problem through five distinct "eras," each with unique constraints - from analog-only ideation to futuristic speculative technologies.</p>
              
              <h3>Objective</h3>
              <ul>
                <li>Train creative resilience and adaptability under changing conditions</li>
                <li>Master rapid prototyping with varied resource constraints</li>
                <li>Develop cross-era thinking that bridges ancient wisdom with future innovation</li>
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'timeline' && (
          <section className="timeline-section">
            <h2>The Five Eras of Innovation</h2>
            <div className="era-timeline">
              {eras.map((era) => (
                <div key={era.id} className="era-card">
                  <div className="era-icon">{era.icon}</div>
                  <h3>{era.name}</h3>
                  <p className="era-duration">{era.duration}</p>
                  <p className="era-description">{era.description}</p>
                  <p className="era-focus"><strong>Focus:</strong> {era.focus}</p>
                </div>
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
          </section>
        )}

        {activeTab === 'judging' && (
          <section className="judging-section">
            <h2>Judging Criteria & Interaction</h2>
            
            <div className="criteria-table">
              <div className="table-header">
                <div className="column">Criteria</div>
                <div className="column">Weight</div>
                <div className="column">What We're Looking For</div>
              </div>
              
              {judgingCriteria.map((criteria, index) => (
                <div key={index} className="table-row">
                  <div className="column">{criteria.name}</div>
                  <div className="column">{criteria.weight}</div>
                  <div className="column">{criteria.description}</div>
                </div>
              ))}
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
          </section>
        )}

        {activeTab === 'journey' && (
          <section className="journey-section">
            <h2>The Chronocraft Experience</h2>
            
            <div className="journey-steps">
              <div className="journey-step">
                <h3>1. Time Traveler Onboarding</h3>
                <ul>
                  <li>Register team (3-4 members)</li>
                  <li>Access interactive orientation via app/portal</li>
                  <li>Receive challenge brief and era guidelines</li>
                </ul>
              </div>
              
              <div className="journey-step">
                <h3>2. Era Progression</h3>
                <ul>
                  <li>Transition through time periods with "era shift" announcements</li>
                  <li>Adapt to new tools, constraints, and perspectives</li>
                  <li>Document evolution of solution at each stage</li>
                </ul>
              </div>
              
              <div className="journey-step">
                <h3>3. Cross-Era Collaboration</h3>
                <ul>
                  <li>Team roles evolve across eras</li>
                  <li>Skills adaptation based on available tools</li>
                  <li>Knowledge transfer between phases</li>
                </ul>
              </div>
              
              <div className="journey-step">
                <h3>4. Final Convergence</h3>
                <ul>
                  <li>Integrate learnings from all eras</li>
                  <li>Submit final prototype/pitch (3-minute video or deck)</li>
                  <li>Present evolution story and solution impact</li>
                </ul>
              </div>
            </div>
            
            <div className="unique-selling">
              <h3>Why Chronocraft Stands Apart</h3>
              <ul>
                <li><strong>Time-Locked Creativity:</strong> Constraints evolve systematically, forcing innovation adaptation</li>
                <li><strong>Evolutionary Thinking:</strong> Solutions must bridge primitive approaches with futuristic thinking</li>
                <li><strong>Multisensory Immersion:</strong> Audio environments and visual transformations change with each era</li>
                <li><strong>Gen Z Alignment:</strong> Balances digital and analog, purpose-driven challenges tied to UN SDGs</li>
              </ul>
            </div>
          </section>
        )}
      </main>

      <div className="cta-section">
        <h2>Ready to Travel Through Time?</h2>
        <p>Join the Chronocraft challenge and develop your innovation skills across different eras.</p>
        <button className="register-button">Register Your Team</button>
      </div>
    </div>
  );
};

export default ChronocraftOverview;
