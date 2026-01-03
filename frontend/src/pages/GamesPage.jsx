import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/GamesPage.css';

function GamesPage() {
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const games = [
    {
      id: 1,
      title: 'टोकरी खेल',
      subtitle: 'वस्तुलाई सही टोकरीमा राख्नुहोस्',
      emoji: '🧺',
      route: '/games/drag-drop',
      color: '#4FC3F7'
    },
    {
      id: 2,
      title: 'संख्या शूटर',
      subtitle: 'सही संख्यामा गोली हान्नुहोस्',
      emoji: '🚀',
      route: '/games/number-shooter',
      color: '#7E57C2'
    }
  ];

  const handleGameClick = (game) => {
    speak(game.title, { lang: 'ne-NP', rate: 0.8 });
    navigate(game.route);
  };

  return (
    <div className="games-page">
      {/* Header */}
      <div className="games-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← पछाडि
        </button>
        <h1 className="games-title">
          🎮 खेलहरू
          <button className="audio-btn" onClick={() => speak('खेलहरू', { lang: 'ne-NP' })}>
            🔊
          </button>
        </h1>
      </div>

      {/* Games Grid */}
      <div className="games-grid">
        {games.map(game => (
          <div 
            key={game.id}
            className="game-card"
            style={{ borderColor: game.color }}
            onClick={() => handleGameClick(game)}
          >
            <div className="game-emoji">{game.emoji}</div>
            <h2 className="game-title">{game.title}</h2>
            <p className="game-subtitle">{game.subtitle}</p>
            <button 
              className="play-btn" 
              style={{ backgroundColor: game.color }}
            >
              खेल्नुहोस् ▶
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
