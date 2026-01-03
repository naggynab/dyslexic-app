import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import '../styles/NumberShooterGame.css';

function NumberShooterGame({ settings }) {
  const navigate = useNavigate();
  const { speak } = useSpeech();
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(6);
  const [targetNumber, setTargetNumber] = useState(21);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [numbers, setNumbers] = useState([12, 11, 21]);

  const nepaliNumbers = {
    1: 'एक', 2: 'दुई', 3: 'तीन', 4: 'चार', 5: 'पाँच',
    6: 'छ', 7: 'सात', 8: 'आठ', 9: 'नौ', 10: 'दश',
    11: 'एघार', 12: 'बाह्र', 13: 'तेह्र', 14: 'चौध',
    15: 'पन्ध्र', 16: 'सोह्र', 17: 'सत्र', 18: 'अठार',
    19: 'उन्नाइस', 20: 'बीस', 21: 'एक्काइस'
  };

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const generateQuestion = () => {
    const target = Math.floor(Math.random() * 20) + 1;
    setTargetNumber(target);
    
    // Generate 3 random numbers including the target
    const nums = [target];
    while (nums.length < 3) {
      const num = Math.floor(Math.random() * 20) + 1;
      if (! nums.includes(num)) {
        nums.push(num);
      }
    }
    // Shuffle
    setNumbers(nums. sort(() => Math.random() - 0.5));
    
    // Speak instruction
    const nepaliNum = nepaliNumbers[target] || target;
    speak(`संख्या ${nepaliNum} मा गोली हान्नुहोस्`, { lang: 'ne-NP', rate: 0.8 });
  };

  const handleShoot = (number) => {
    if (number === targetNumber) {
      // Correct!
      setScore(score + 10);
      setFeedback('✅ सही! ');
      speak('उत्कृष्ट', { lang: 'ne-NP' });

      setTimeout(() => {
        if (currentQuestion < totalQuestions) {
          setCurrentQuestion(currentQuestion + 1);
          setFeedback('');
        } else {
          gameComplete();
        }
      }, 1500);
    } else {
      // Wrong!
      setFeedback('❌ गलत!  पुन: प्रयास गर्नुहोस्');
      speak('पुन: प्रयास गर्नुहोस्', { lang: 'ne-NP' });
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const gameComplete = () => {
    speak('बधाई छ! तपाईंले खेल पूरा गर्नुभयो!', { lang: 'ne-NP' });
    alert(`बधाई छ! 🎉\nतपाईंको स्कोर: ${score}`);
    navigate('/games');
  };

  const speakNumber = () => {
    const nepaliNum = nepaliNumbers[targetNumber] || targetNumber;
    speak(`संख्या ${nepaliNum}`, { lang: 'ne-NP', rate: 0.8 });
  };

  return (
    <div className="number-shooter-game">
      {/* Header */}
      <div className="game-header">
        <button className="back-btn" onClick={() => navigate('/games')}>
          ← पछाडि
        </button>
        <div className="question-counter">{currentQuestion} / {totalQuestions}</div>
        <div className="score-display">स्कोर: {score}</div>
      </div>

      {/* Game Area */}
      <div className="game-area">
        {/* Character */}
        <div className="character">
          <div className="fox">🦊</div>
        </div>

        {/* Instruction Bubble */}
        <div className="instruction-bubble">
          <p>संख्या {targetNumber} मा गोली हान्नुहोस्</p>
          <button className="audio-btn-bubble" onClick={speakNumber}>
            🔊
          </button>
        </div>

        {/* Rocket Ship */}
        <div className="rocket-ship">
          <div className="rocket">🚀</div>
        </div>

        {/* Number Targets */}
        <div className="targets-container">
          {numbers.map((num, index) => (
            <div
              key={index}
              className={`target target-${index + 1}`}
              onClick={() => handleShoot(num)}
            >
              <div className="target-number">{num}</div>
            </div>
          ))}
        </div>

        {/* Shooting Buttons */}
        <div className="shoot-buttons">
          <button className="shoot-btn shoot-up">▲</button>
          <button className="shoot-btn shoot-down">▼</button>
        </div>

        {/* Power Button */}
        <button className="power-btn">🚀</button>
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

export default NumberShooterGame;
