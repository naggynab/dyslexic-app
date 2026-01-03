import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Existing Pages
import HomePage from './pages/Homepage';
import LearningPage from './pages/Learningpage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/Settingspage';

// ✅ NEW: Game Pages
import GamesPage from './pages/GamesPage';
import DragDropGame from './pages/DragDropGame';
import NumberShooterGame from './pages/NumberShooterGame';

function App() {
  const [userName, setUserName] = useState('बच्चा');
  const [settings, setSettings] = useState({
    fontSize: 'large',
    backgroundColor: '#FAFAF8',
    textColor: '#333333',
    audioSpeed: 0.8  
  });

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedSettings = localStorage.getItem('settings');
    
    if (savedName) setUserName(savedName);
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  return (
    <Router>
      <div 
        className="App" 
        style={{
          backgroundColor: settings.backgroundColor,
          color: settings.textColor,
          fontSize: settings.fontSize === 'large' ? '20px' : settings.fontSize === 'xlarge' ? '24px' : '16px',
          minHeight: '100vh'  
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage userName={userName} />} />
          <Route path="/learning" element={<LearningPage settings={settings} />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route 
            path="/settings" 
            element={
              <SettingsPage 
                settings={settings} 
                setSettings={setSettings} 
                setUserName={setUserName} 
              />
            } 
          />
          
          {/* ✅ NEW ROUTES */}
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/drag-drop" element={<DragDropGame settings={settings} />} />
          <Route path="/games/number-shooter" element={<NumberShooterGame settings={settings} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
