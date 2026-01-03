import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { useSpeech } from '../hooks/useSpeech'; 
import '../styles/LearningPage.css';

// Import images
import anarImg from '../assets/images/anar.jpg';
import aamImg from '../assets/images/aap.jpg';
import ittaImg from '../assets/images/itta.jpg';
import parewaImg from '../assets/images/parewa.webp';
import kharayoImg from '../assets/images/kharayo.jpg';

function LearningPage({ settings }) {
  const navigate = useNavigate();
  const { speak } = useSpeech();  
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios. get('http://localhost:5000/api/get-lesson');
      setLessons(response.data. lessons);
      setCurrentLesson(response.data.lessons[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      loadStaticLessons();
    }
  };

  const loadStaticLessons = () => {
    const staticLessons = [
      {
        id: 1,
        type: 'letter',
        letter: 'अ',
        audio: 'a',
        image: anarImg, // ✅ Use imported image
        word: 'अनार',
        meaning: 'Pomegranate'
      },
      {
        id: 2,
        type: 'letter',
        letter: 'आ',
        audio: 'aa',
        image: aamImg, // ✅ Use imported image
        word: 'आम',
        meaning: 'Mango'
      },
      {
        id: 3,
        type: 'letter',
        letter: 'इ',
        audio: 'i',
        image: ittaImg, // ✅ Use imported image
        word: 'इँटा',
        meaning: 'Brick'
      },
      {
        id: 4,
        type: 'letter',
        letter: 'प',
        audio: 'ka',
        image: parewaImg, // ✅ Use imported image
        word: 'परेवा',
        meaning: 'Pigeon'
      },
      {
        id: 5,
        type: 'letter',
        letter: 'ख',
        audio: 'kha',
        image: kharayoImg, // ✅ Use imported image
        word:  'खरायो',
        meaning: 'Rabbit'
      }
    ];
    
    setLessons(staticLessons);
    setCurrentLesson(staticLessons[0]);
    setLoading(false);
  };

  const speakText = (text) => {
    speak(text, { 
      lang: 'ne-NP', 
      rate: settings?. audioSpeed || 0.8 
    });
  };

  const handleNext = async () => {
    if (currentIndex < lessons.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentLesson(lessons[nextIndex]);
      setUserAnswer('');
      setFeedback('');
      
      await sendProgressToAI(currentLesson.id, true);
    } else {
      updateProgress();
      alert('बधाई छ! तपाईंले पाठ पूरा गर्नुभयो! ');
      navigate('/');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentLesson(lessons[prevIndex]);
      setUserAnswer('');
      setFeedback('');
    }
  };

  const checkAnswer = async () => {
    if (userAnswer.trim() === currentLesson.letter) {
      setFeedback('✅ उत्कृष्ट! सही उत्तर! ');
      speakText('उत्कृष्ट');
      await sendProgressToAI(currentLesson.id, true);
      
      setTimeout(() => {
        handleNext();
      }, 2000);
    } else {
      setFeedback('❌ पुन: प्रयास गर्नुहोस्');
      speakText('पुन:  प्रयास गर्नुहोस्');
      await sendProgressToAI(currentLesson.id, false);
    }
  };

  const sendProgressToAI = async (lessonId, correct) => {
    try {
      await axios.post('http://localhost:5000/api/record-progress', {
        userId:  'user1',
        lessonId,
        correct,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending progress:', error);
    }
  };

  const updateProgress = () => {
    const savedProgress = JSON.parse(localStorage. getItem('progress')) || { stars: 0, lessonsCompleted: 0 };
    savedProgress.lessonsCompleted += 1;
    savedProgress. stars = Math.min(5, savedProgress.stars + 1);
    localStorage.setItem('progress', JSON.stringify(savedProgress));
  };

  if (loading) {
    return <div className="loading">लोड हुँदैछ... </div>;
  }

  if (!currentLesson) {
    return <div className="loading">कुनै पाठ भेटिएन</div>;
  }

  return (
    <div className="learning-container">
      <div className="learning-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← पछाडि
        </button>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }}
          ></div>
        </div>
        <span className="lesson-counter">{currentIndex + 1}/{lessons.length}</span>
      </div>

      <div className="lesson-content">
        <h1 className="letter-display">
          {currentLesson.letter}
          <button className="audio-btn-large" onClick={() => speakText(currentLesson.letter)}>
            🔊
          </button>
        </h1>

        <div className="image-display">
          {/* ✅ Replace emoji with actual image */}
          <img 
            src={currentLesson.image} 
            alt={currentLesson.word}
            className="lesson-image"
          />
        </div>

        <div className="word-display">
          <h2>{currentLesson.word}</h2>
          <button className="audio-btn" onClick={() => speakText(currentLesson.word)}>
            🔊
          </button>
          <p className="meaning">({currentLesson.meaning})</p>
        </div>

        <div className="interactive-section">
          <p className="instruction">यो अक्षर लेख्नुहोस्: </p>
          <input
            type="text"
            className="answer-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e. target.value)}
            placeholder="यहाँ लेख्नुहोस्..."
          />
          <button className="check-btn" onClick={checkAnswer}>
            जाँच गर्नुहोस् ✓
          </button>

          {feedback && (
            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
              {feedback}
            </div>
          )}
        </div>

        <div className="lesson-navigation">
          <button 
            className="nav-btn-lesson" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← अघिल्लो
          </button>
          <button 
            className="nav-btn-lesson" 
            onClick={handleNext}
          >
            अर्को →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
