import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Pages
import HomePage from './pages/Homepage';
import LearningPage from './pages/Learningpage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/Settingspage';

function App() {
  const [userName, setUserName] = useState('बच्चा');
  const [settings, setSettings] = useState({
    fontSize: 'large',
    backgroundColor: '#FAFAF8',
    textColor: '#333333',
    audioSpeed: 0.8  
  });

  useEffect(() => {
    // Load user data from localStorage
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
          fontSize: settings.fontSize === 'large' ? '20px' : settings.fontSize === 'xlarge' ? '24px' :  '16px',
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
