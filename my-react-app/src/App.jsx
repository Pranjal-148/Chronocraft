// src/App.jsx
import { useState } from 'react'
import './App.css'
import ChronocraftTabs from './components/ChronocraftTabs'
import ExperienceOverview from './components/ExperienceOverview'
import About from './components/About'
import Navbar from './components/Navbar'

function App() {
  const [currentView, setCurrentView] = useState('overview');
  
  return (
    <div className="App">
      <Navbar setCurrentView={setCurrentView} />
      
      {currentView === 'overview' && <ChronocraftTabs />}
      {currentView === 'experience' && <ExperienceOverview />}
      {currentView === 'about' && <About />}
    </div>
  )
}

export default App
