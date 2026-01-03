import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/HomePage.css';

function HomePage({ userName }) {
  const navigate = useNavigate();
  const { speak } = useSpeech(); 
  const [progress, setProgress] = useState({ stars: 0, lessonsCompleted: 0 });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage. getItem('progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    
    speak(`नमस्ते ${userName}`);
  }, [userName]);

  const handleContinueLearning = () => {
    navigate('/learning');
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <button className="audio-btn" onClick={() => speak(`नमस्ते ${userName}`)}>
          🔊
        </button>
        <h1 className="greeting">नमस्ते, {userName}!</h1>
      </div>

      {/* Avatar and Progress */}
      <div className="profile-section">
        <div className="avatar">👦</div>
        <div className="stars">
          {[... Array(5)].map((_, i) => (
            <span key={i} className="star">
              {i < progress.stars ? '⭐' : '☆'}
            </span>
          ))}
        </div>
        <p className="progress-text">
          तपाईंले {progress.lessonsCompleted} पाठहरू पूरा गर्नुभयो!  
        </p>
      </div>

      {/* Main Button */}
      <button className="main-btn continue-btn" onClick={handleContinueLearning}>
        <span className="btn-icon">📖</span>
        <span className="btn-text">सिक्न जारी राख्नुहोस्</span>
        <button className="audio-icon" onClick={(e) => {
          e.stopPropagation();
          speak('सिक्न जारी राख्नुहोस्');
        }}>🔊</button>
      </button>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => navigate('/learning')}>
          <span className="btn-icon">📚</span>
          <span className="btn-text">सबै पाठहरू</span>
        </button>

        <button className="nav-btn" onClick={() => alert('Games coming soon!')}>
          <span className="btn-icon">🎮</span>
          <span className="btn-text">खेलहरू</span>
        </button>

        <button className="nav-btn" onClick={() => navigate('/progress')}>
          <span className="btn-icon">📊</span>
          <span className="btn-text">मेरो प्रगति</span>
        </button>
      </div>

      {/* Footer */}
      <div className="footer">
        <button className="footer-btn" onClick={() => navigate('/settings')}>
          <span>⚙️ सेटिङहरू</span>
        </button>
        <button className="footer-btn" onClick={() => alert('Parent dashboard coming soon!')}>
          <span>👨‍👩‍👧 अभिभावक</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
