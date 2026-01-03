import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingsPage.css';

function SettingsPage({ settings, setSettings, setUserName }) {
  const navigate = useNavigate();
  const [tempName, setTempName] = useState('');

  const handleFontSizeChange = (size) => {
    const newSettings = { ...settings, fontSize: size };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  const handleBackgroundChange = (color) => {
    const newSettings = { ...settings, backgroundColor: color };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      localStorage.setItem('userName', tempName);
      alert('नाम सेभ भयो!');
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← पछाडि
        </button>
        <h1>सेटिङहरू</h1>
      </div>

      <div className="settings-section">
        <h2>नाम परिवर्तन गर्नुहोस्</h2>
        <input
          type="text"
          className="name-input"
          placeholder="तपाईंको नाम"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
        <button className="save-btn" onClick={handleSaveName}>
          सेभ गर्नुहोस्
        </button>
      </div>

      <div className="settings-section">
        <h2>फन्ट साइज</h2>
        <div className="button-group">
          <button 
            className={settings.fontSize === 'medium' ? 'active' : ''}
            onClick={() => handleFontSizeChange('medium')}
          >
            साधारण
          </button>
          <button 
            className={settings.fontSize === 'large' ? 'active' : ''}
            onClick={() => handleFontSizeChange('large')}
          >
            ठूलो
          </button>
          <button 
            className={settings.fontSize === 'xlarge' ? 'active' :  ''}
            onClick={() => handleFontSizeChange('xlarge')}
          >
            धेरै ठूलो
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>पृष्ठभूमि रंग</h2>
        <div className="color-options">
          <button 
            className="color-btn"
            style={{ backgroundColor: '#FAFAF8' }}
            onClick={() => handleBackgroundChange('#FAFAF8')}
          >
            क्रीम
          </button>
          <button 
            className="color-btn"
            style={{ backgroundColor: '#E8F4F8' }}
            onClick={() => handleBackgroundChange('#E8F4F8')}
          >
            नीलो
          </button>
          <button 
            className="color-btn"
            style={{ backgroundColor:  '#E8F5E9' }}
            onClick={() => handleBackgroundChange('#E8F5E9')}
          >
            हरियो
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;