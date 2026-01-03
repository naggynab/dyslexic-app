# 📚 Nepali Dyslexia Learning App

An AI-powered educational application designed specifically for dyslexic children to learn the Nepali language (Devanagari script) through interactive, multi-sensory learning experiences.

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
- Text-to-Speech in Nepali
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

✅ **Progress Tracking & Analytics**
- Performance dashboards
- AI-generated insights
- Achievement system
- Parent/teacher reports



## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React. js (Vite)
- React Router for navigation
- React Speech Kit for text-to-speech
- Axios for API calls
- Custom CSS (dyslexia-optimized)

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
nepali-dyslexia-app/
│
├── frontend/                      # React frontend application
│   ├── src/
│   │   ├── pages/                # Main application pages
│   │   │   ├── HomePage.js       # Welcome screen with progress
│   │   │   ├── LearningPage.js   # Interactive lesson module
│   │   │   ├── ProgressPage.js   # Analytics dashboard
│   │   │   └── SettingsPage.js   # User preferences
│   │   │
│   │   ├── styles/               # CSS stylesheets
│   │   │   ├── App.css           # Global styles
│   │   │   ├── HomePage.css      # Home page styles
│   │   │   ├── LearningPage.css  # Learning module styles
│   │   │   ├── ProgressPage. css  # Progress page styles
│   │   │   └── SettingsPage.css  # Settings page styles
│   │   │
│   │   ├── components/           # Reusable React components (future)
│   │   ├── services/             # API service layer (future)
│   │   ├── App.jsx               # Main application component
│   │   └── main.jsx              # Application entry point
│   │
│   ├── public/                   # Static assets
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration
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
│   ├── requirements. txt           # Python dependencies
│   └── venv/                      # Virtual environment (not in git)
│
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```



## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **Git** (optional) - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd nepali-dyslexia-app

# Or download and extract the ZIP file
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

# Start development server
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173/
```



## 🎮 Usage Guide

### For Students

1. **Home Screen**
   - Click the speaker icon (🔊) to hear greetings
   - View your progress stars and completed lessons
   - Click "सिक्न जारी राख्नुहोस्" to start learning

2. **Learning Module**
   - See the Nepali letter displayed large
   - Click 🔊 to hear pronunciation
   - View the associated image and word
   - Type the letter in the input box
   - Click "जाँच गर्नुहोस्" to check your answer
   - Navigate with "अघिल्लो" (Previous) and "अर्को" (Next)

3. **Progress Page**
   - View stars earned and lessons completed
   - See AI insights about your learning
   - Check achievements unlocked

4. **Settings**
   - Change your name
   - Adjust font size (साधारण, ठूलो, धेरै ठूलो)
   - Select background color (cream, blue, green)

### For Parents/Teachers

- Monitor progress through the Progress Dashboard
- Review AI-generated insights and recommendations
- Track accuracy and completion rates
- Identify areas where the child needs support



## 🤖 AI Features Explained

### 1. Adaptive Lesson Ordering

The AI analyzes student performance and prioritizes lessons based on:
- **0-40% accuracy**:  High priority (struggling)
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
- **Strengths**: Areas where the student excels
- **Improvements**: Letters/concepts needing practice
- **Recommendations**: Actionable next steps

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

#### 1. Get Lessons
```http
GET /api/get-lesson? userId=user1
