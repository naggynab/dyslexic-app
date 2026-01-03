import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProgressPage.css';

function ProgressPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({ stars: 0, lessonsCompleted: 0 });
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    loadProgress();
    fetchAIInsights();
  }, []);

  const loadProgress = () => {
    const savedProgress = JSON.parse(localStorage.getItem('progress')) || { stars: 0, lessonsCompleted: 0 };
    setProgress(savedProgress);
  };

  const fetchAIInsights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-insights', {
        params: { userId:  'user1' }
      });
      setAiInsights(response.data);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    }
  };

  return (
    <div className="progress-container">
      <div className="progress-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← पछाडि
        </button>
        <h1>मेरो प्रगति</h1>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{progress.stars}/5</div>
          <div className="stat-label">ताराहरू</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{progress. lessonsCompleted}</div>
          <div className="stat-label">पूरा पाठहरू</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{progress.lessonsCompleted > 0 ? '85%' : '0%'}</div>
          <div className="stat-label">सटीकता</div>
        </div>
      </div>

      {aiInsights && (
        <div className="ai-insights">
          <h2>🤖 AI अन्तर्दृष्टि</h2>
          <div className="insight-card">
            <p><strong>शक्ति:</strong> {aiInsights.strengths || 'स्वर पहिचान'}</p>
            <p><strong>सुधार क्षेत्र:</strong> {aiInsights.improvements || 'व्यञ्जन अभ्यास'}</p>
            <p><strong>सिफारिस:</strong> {aiInsights. recommendation || 'दैनिक १५ मिनेट अभ्यास गर्नुहोस्'}</p>
          </div>
        </div>
      )}

      <div className="achievements">
        <h2>🏆 उपलब्धिहरू</h2>
        <div className="achievement-list">
          <div className={`achievement ${progress.lessonsCompleted >= 1 ? 'unlocked' : 'locked'}`}>
            🎉 पहिलो पाठ पूरा
          </div>
          <div className={`achievement ${progress.stars >= 3 ? 'unlocked' :  'locked'}`}>
            ⭐ ३ ताराहरू प्राप्त
          </div>
          <div className={`achievement ${progress.lessonsCompleted >= 5 ? 'unlocked' :  'locked'}`}>
            📖 ५ पाठहरू पूरा
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;