import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/DragDropGame.css';

function DragDropGame({ settings }) {
  const navigate = useNavigate();
  const { speak } = useSpeech();
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  // Game data (Nepali words)
  const levels = [
    {
      level: 1,
      items: [
        { id: 1, name: 'स्याउ', emoji: '🍎', basket: 'फलफूल' },
        { id: 2, name: 'फुलबलुन', emoji: '🎈', basket: 'खेलौना' },
        { id: 3, name: 'मुटु', emoji: '❤️', basket: 'आकार' }
      ],
      baskets: ['फलफूल', 'खेलौना', 'आकार']
    },
    {
      level: 2,
      items: [
        { id: 4, name:  'केरा', emoji: '🍌', basket: 'फलफूल' },
        { id: 5, name: 'कार', emoji: '🚗', basket: 'सवारी' },
        { id: 6, name: 'तारा', emoji: '⭐', basket: 'आकार' }
      ],
      baskets: ['फलफूल', 'सवारी', 'आकार']
    }
  ];

  const currentLevelData = levels[currentLevel - 1];
  const [items, setItems] = useState(currentLevelData.items);
  const [baskets, setBaskets] = useState(
    currentLevelData.baskets.reduce((acc, basket) => {
      acc[basket] = [];
      return acc;
    }, {})
  );

  useEffect(() => {
    speak('वस्तुलाई सही टोकरीमा तान्नुहोस्', { lang: 'ne-NP', rate: 0.8 });
  }, []);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (basketName) => {
    if (!draggedItem) return;

    if (draggedItem.basket === basketName) {
      // Correct! 
      setBaskets(prev => ({
        ...prev,
        [basketName]: [...prev[basketName], draggedItem]
      }));
      setItems(prev => prev.filter(item => item.id !== draggedItem.id));
      setScore(score + 10);
      setFeedback('✅ उत्कृष्ट! ');
      speak('उत्कृष्ट', { lang: 'ne-NP' });

      // Check if level complete
      if (items.length === 1) {
        setTimeout(() => {
          if (currentLevel < levels.length) {
            nextLevel();
          } else {
            gameComplete();
          }
        }, 1500);
      }
    } else {
      // Wrong! 
      setFeedback('❌ पुन:  प्रयास गर्नुहोस्');
      speak('पुन: प्रयास गर्नुहोस्', { lang: 'ne-NP' });
    }

    setDraggedItem(null);
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const nextLevel = () => {
    const nextLevelIndex = currentLevel;
    setCurrentLevel(currentLevel + 1);
    const nextLevelData = levels[nextLevelIndex];
    setItems(nextLevelData.items);
    setBaskets(
      nextLevelData.baskets.reduce((acc, basket) => {
        acc[basket] = [];
        return acc;
      }, {})
    );
    setFeedback('');
    speak('अर्को तह', { lang: 'ne-NP' });
  };

  const gameComplete = () => {
    speak('बधाई छ!  तपाईंले खेल पूरा गर्नुभयो! ', { lang: 'ne-NP' });
    alert(`बधाई छ! 🎉\nतपाईंको स्कोर: ${score}`);
    navigate('/games');
  };

  return (
    <div className="drag-drop-game">
      {/* Header */}
      <div className="game-header">
        <button className="back-btn" onClick={() => navigate('/games')}>
          ← पछाडि
        </button>
        <div className="level-info">{currentLevel} / {levels.length}</div>
        <div className="score-display">स्कोर: {score}</div>
      </div>

      {/* Instruction */}
      <div className="instruction-box">
        <h2>वस्तुलाई सही टोकरीमा तान्नुहोस्</h2>
      </div>

      {/* Draggable Items */}
      <div className="items-container">
        {items. map(item => (
          <div
            key={item.id}
            className="draggable-item"
            draggable
            onDragStart={() => handleDragStart(item)}
          >
            <div className="item-emoji">{item.emoji}</div>
            <div className="item-name">{item.name}</div>
          </div>
        ))}
      </div>

      {/* Baskets */}
      <div className="baskets-container">
        {currentLevelData.baskets.map(basketName => (
          <div
            key={basketName}
            className="basket"
            onDrop={() => handleDrop(basketName)}
            onDragOver={handleDragOver}
          >
            <div className="basket-icon">🧺</div>
            <div className="basket-label">{basketName}</div>
            <div className="basket-items">
              {baskets[basketName]?.map(item => (
                <span key={item.id} className="basket-item">{item.emoji}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`feedback-message ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default DragDropGame;
