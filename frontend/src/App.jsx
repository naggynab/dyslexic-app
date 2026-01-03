import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Pages
import HomePage from './pages/Homepage';
import LearningPage from './pages/Learningpage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/Settingspage';

function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'बच्चा';
  });
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      fontSize: 'large',
      backgroundColor: '#FAFAF8',
      textColor: '#333333',
      audioSpeed: 0.8  // ✅ Changed from 1.0 to 0.8 (safer default)
    };
  });

  return (
    <Router>
      <div 
        className="App" 
        style={{
          backgroundColor: settings.backgroundColor,
          color: settings.textColor,
          fontSize: settings.fontSize === 'large' ? '20px' : settings.fontSize === 'xlarge' ? '24px' :  '16px',
          minHeight: '100vh'  // ✅ Added to ensure full page coverage
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