# 📚 Nepali Dyslexia Learning App

An AI-powered educational application designed specifically for dyslexic children to learn the Nepali language (Devanagari script) through interactive, multi-sensory learning experiences with engaging gamification. 

## 🎯 Project Overview

This application addresses the unique challenges faced by dyslexic children learning to read and write in Nepali. It combines dyslexia-friendly UI/UX principles with artificial intelligence to create a personalized, adaptive learning experience.

### Key Features

✅ **Dyslexia-Friendly Design**
- Large, clear fonts with optimal spacing
- High-contrast color schemes (cream backgrounds, dark gray text)
- Audio support for all text content
- Clean, uncluttered interface

✅ **Nepali Language Support**
- Complete Devanagari script (स्वर and व्यञ्जन)
- Text-to-Speech in Nepali (ne-NP)
- Visual associations with familiar objects
- Progressive difficulty levels

✅ **AI-Powered Adaptive Learning**
- Personalized lesson ordering based on performance
- Automatic difficulty adjustment
- Pattern recognition for struggling areas
- Real-time progress tracking

✅ **Interactive Learning Modules**
- Letter recognition and tracing
- Word building exercises
- Audio pronunciation feedback
- Immediate corrective feedback
- Image-based visual learning

✅ **🎮 Gamification Features (NEW! )**
- **Drag & Drop Basket Game**:  Match objects to their correct categories
- **Number Shooter Game**: Shoot the correct Nepali numbers in space
- Score tracking and achievement system
- Multi-level progression
- Engaging animations and sound feedback

✅ **Progress Tracking & Analytics**
- Performance dashboards
- AI-generated insights
- Achievement system
- Parent/teacher reports



## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React.js 19.2.0 (Vite 7.2.4)
- React Router for navigation
- Web Speech API for text-to-speech
- Axios for API calls
- Custom CSS (dyslexia-optimized)
- HTML5 Drag & Drop API

**Backend:**
- Python Flask (REST API)
- Machine Learning (Adaptive Learning Algorithm)
- JSON-based data storage
- CORS enabled for cross-origin requests

**AI/ML Components:**
- Adaptive difficulty algorithm
- Performance pattern recognition
- Personalized content recommendation
- Progress prediction and insights



## 📁 Project Structure

```
dyslexic-app/
│
├── frontend/                      # React frontend application
│   ├── src/
│   │   ├── pages/                # Main application pages
│   │   │   ├── Homepage.jsx      # Welcome screen with progress
│   │   │   ├── Learningpage.jsx  # Interactive lesson module
│   │   │   ├── ProgressPage.jsx  # Analytics dashboard
│   │   │   ├── Settingspage.jsx  # User preferences
│   │   │   ├── GamesPage.jsx     # 🎮 Game selection page (NEW)
│   │   │   ├── DragDropGame.jsx  # 🧺 Drag & Drop game (NEW)
│   │   │   └── NumberShooterGame.jsx  # 🚀 Number Shooter (NEW)
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── useSpeech.jsx     # Text-to-Speech hook
│   │   │
│   │   ├── styles/               # CSS stylesheets
│   │   │   ├── App.css           # Global styles
│   │   │   ├── HomePage.css      # Home page styles
│   │   │   ├── LearningPage.css  # Learning module styles
│   │   │   ├── ProgressPage. css  # Progress page styles
│   │   │   ├── SettingsPage. css  # Settings page styles
│   │   │   ├── GamesPage.css     # 🎮 Games page styles (NEW)
│   │   │   ├── DragDropGame.css  # Drag & Drop styles (NEW)
│   │   │   └── NumberShooterGame.css  # Number Shooter styles (NEW)
│   │   │
│   │   ├── assets/               # Static assets
│   │   │   └── images/           # Image files
│   │   │       └── letters/      # Letter learning images
│   │   │
│   │   ├── components/           # Reusable React components (future)
│   │   ├── services/             # API service layer (future)
│   │   ├── App.jsx               # Main application component
│   │   ├── main.jsx              # Application entry point
│   │   └── index.css             # Base CSS
│   │
│   ├── public/                   # Static public assets
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   └── eslint.config.js          # ESLint configuration
│
├── backend/                       # Python Flask backend
│   ├── models/
│   │   ├── __init__.py           # Package initializer
│   │   └── adaptive_learning.py  # AI adaptive learning engine
│   │
│   ├── data/
│   │   ├── nepali_content.json   # Lesson content database
│   │   └── user_progress.json    # User progress data (auto-generated)
│   │
│   ├── app.py                     # Flask application & API routes
│   └── requirements.txt          # Python dependencies
│
├── . gitignore                     # Git ignore rules
└── README.md                      # This file
```



## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Step 1: Clone the Project

```bash
# Clone repository
git clone https://github.com/naggynab/dyslexic-app.git
cd dyslexic-app
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows: 
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install Flask Flask-CORS

# Run the backend server
python app.py
```

**Expected output:**
```
🚀 Flask server starting... 
📚 Nepali Dyslexia Learning App Backend
🌐 Running on http://localhost:5000
```

### Step 3: Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Install additional required packages
npm install axios react-router-dom

# Start development server
npm run dev
```

**Expected output:**
```
VITE v7.2.4  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173/
```



## 🎮 Usage Guide

### For Students

1. **Home Screen**
   - Click the speaker icon (🔊) to hear greetings in Nepali
   - View your progress stars and completed lessons
   - Click **"सिक्न जारी राख्नुहोस्"** to start learning
   - Click **"🎮 खेलहरू"** to play educational games

2. **Learning Module**
   - See the Nepali letter displayed large
   - Click 🔊 to hear pronunciation
   - View the associated image and word
   - Type the letter in the input box
   - Click **"जाँच गर्नुहोस्"** to check your answer
   - Navigate with **"अघिल्लो"** (Previous) and **"अर्को"** (Next)

3. **🎮 Games Section (NEW! )**
   
   **🧺 Drag & Drop Basket Game:**
   - Drag objects to their correct named baskets
   - Match fruits, toys, and shapes
   - 2 levels with increasing difficulty
   - Score 10 points for each correct match
   
   **🚀 Number Shooter Game:**
   - Listen to the target Nepali number
   - Click/tap the correct number to shoot
   - 6 questions per game
   - Practice number recognition (1-21)

4. **Progress Page**
   - View stars earned and lessons completed
   - See AI insights about your learning
   - Check achievements unlocked
   - Track game scores

5. **Settings**
   - Change your name
   - Adjust font size (साधारण, ठूलो, धेरै ठूलो)
   - Select background color (cream, blue, green)
   - Adjust audio speed for pronunciation

### For Parents/Teachers

- Monitor progress through the Progress Dashboard
- Review AI-generated insights and recommendations
- Track accuracy and completion rates in lessons and games
- Identify areas where the child needs support
- Use game scores to measure engagement



## 🤖 AI Features Explained

### 1. Adaptive Lesson Ordering

The AI analyzes student performance and prioritizes lessons based on:
- **0-40% accuracy**: High priority (struggling)
- **40-70% accuracy**:  Highest priority (needs practice)
- **70-90% accuracy**: Medium priority (good progress)
- **90%+ accuracy**: Low priority (mastered)

### 2. Performance Tracking

Every attempt is recorded with:
- Lesson ID
- Correctness (true/false)
- Timestamp
- Response time

### 3. AI Insights Generation

The system generates personalized feedback:
- **Strengths**:  Areas where the student excels
- **Improvements**: Letters/concepts needing practice
- **Recommendations**:  Actionable next steps

### 4. Progress Prediction

The AI identifies patterns and predicts: 
- Which letters will be confused
- Optimal practice frequency
- When to introduce new content



## 📊 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get Adaptive Lessons
```http
GET /api/get-lesson?userId=user1
```

**Response:**
```json
{
  "lessons": [
    {
      "id": 1,
      "type": "letter",
      "letter": "अ",
      "audio": "a",
      "image": "🍎",
      "word": "अनार",
      "meaning": "Pomegranate"
    }
  ],
  "message": "Lessons retrieved successfully"
}
```

#### 2. Record Progress
```http
POST /api/record-progress
Content-Type:  application/json

{
  "userId": "user1",
  "lessonId": 1,
  "correct": true,
  "timestamp":  "2026-01-03T10:30:00Z"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Progress recorded"
}
```

#### 3. Get AI Insights
```http
GET /api/get-insights?userId=user1
```

**Response:**
```json
{
  "overall_accuracy": 0.75,
  "total_attempts": 20,
  "strengths": ["अ", "आ", "इ"],
  "needs_practice": ["क", "ख"],
  "recommendations": "Practice consonants more"
}
```

#### 4. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "Backend is running"
}
```



## 🎨 Design Principles

### Dyslexia-Friendly Features

1. **Typography**
   - Font size: 20-24px (adjustable)
   - Font family: Sans-serif, OpenDyslexic compatible
   - Letter spacing: 0.1em
   - Line height: 1.8

2. **Colors**
   - Background: #FAFAF8 (cream, not white)
   - Text: #333333 (dark gray, not black)
   - High contrast ratios (WCAG AAA compliant)
   - Alternative color schemes (blue, green)

3. **Layout**
   - Minimal clutter
   - One task per screen
   - Large click/touch targets (>44px)
   - Generous whitespace

4. **Multi-Sensory Learning**
   - Visual: Images, colors, animations
   - Auditory: Text-to-Speech in Nepali
   - Kinesthetic: Drag & drop, typing, clicking



## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Text-to-Speech (ne-NP) may vary by browser



## 🐛 Troubleshooting

### Backend not starting? 
```bash
# Make sure you're in the backend folder
cd backend

# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install --force-reinstall Flask Flask-CORS
```

### Frontend not loading?
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+
```

### Text-to-Speech not working?
- Check browser compatibility (Chrome/Edge recommended)
- Ensure system has Nepali language support
- Check browser permissions for audio
- Try adjusting audio speed in settings

### Games not displaying properly?
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)
- Ensure all CSS files are loaded
- Verify image paths in code



## 🚧 Future Enhancements

### Planned Features

- [ ] More lesson content (complete Devanagari alphabet)
- [ ] Additional games (Memory Match, Word Builder, Spelling Bee)
- [ ] User authentication and profiles
- [ ] Parent/teacher dashboard
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Multiplayer games
- [ ] Voice recognition for pronunciation practice
- [ ] Certificate generation
- [ ] Progress reports (PDF export)
- [ ] Localization (English interface option)



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Test thoroughly before submitting
- Update documentation as needed
- Keep accessibility in mind



## 🙏 Acknowledgments

- **Dyslexia Research**:  Based on principles from International Dyslexia Association
- **Nepali Language**: Devanagari script resources
- **Accessibility**: WCAG 2.1 guidelines
- **Open Source Community**: React, Flask, and Web Speech API teams



## 📞 Contact & Support

- **Repository**: [https://github.com/naggynab/dyslexic-app](https://github.com/naggynab/dyslexic-app)
- **Issues**: [Report bugs or request features](https://github.com/naggynab/dyslexic-app/issues)
- **Author**: [@naggynab](https://github.com/naggynab)



## 📊 Project Stats

![Language Composition](https://img.shields.io/badge/JavaScript-49. 7%25-yellow)
![Language Composition](https://img.shields.io/badge/CSS-25.3%25-blue)
![Language Composition](https://img.shields.io/badge/Python-24.1%25-blue)
![Language Composition](https://img.shields.io/badge/HTML-0.9%25-orange)

---

**Made with ❤️ for dyslexic learners**

**⭐ Star this repository if you find it helpful!**
