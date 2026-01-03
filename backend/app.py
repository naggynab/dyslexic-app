from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
from models.adaptive_learning import AdaptiveLearning

app = Flask(__name__)
CORS(app)

# Initialize AI model
adaptive_model = AdaptiveLearning()

# Load Nepali content
def load_content():
    content_path = os.path.join('data', 'nepali_content. json')
    if os.path.exists(content_path):
        with open(content_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return get_default_content()

def get_default_content():
    return {
        "lessons": [
            {
                "id": 1,
                "type": "letter",
                "letter":  "अ",
                "audio": "a",
                "image": "🍎",
                "word": "अनार",
                "meaning": "Pomegranate"
            },
            {
                "id": 2,
                "type": "letter",
                "letter": "आ",
                "audio": "aa",
                "image": "🥭",
                "word": "आम",
                "meaning": "Mango"
            },
            {
                "id": 3,
                "type": "letter",
                "letter": "इ",
                "audio": "i",
                "image": "🧱",
                "word": "इँटा",
                "meaning": "Brick"
            },
            {
                "id": 4,
                "type": "letter",
                "letter": "क",
                "audio": "ka",
                "image": "🐦",
                "word": "कबुतर",
                "meaning": "Pigeon"
            },
            {
                "id": 5,
                "type": "letter",
                "letter": "ख",
                "audio": "kha",
                "image": "🐰",
                "word": "खरायो",
                "meaning": "Rabbit"
            }
        ]
    }

@app.route('/api/get-lesson', methods=['GET'])
def get_lesson():
    """Get adaptive lesson based on user progress"""
    user_id = request.args.get('userId', 'user1')
    
    # Load content
    content = load_content()
    
    # Get personalized lesson order from AI
    personalized_lessons = adaptive_model.get_next_lessons(user_id, content['lessons'])
    
    return jsonify({
        'lessons':  personalized_lessons,
        'message': 'Lessons retrieved successfully'
    })

@app.route('/api/record-progress', methods=['POST'])
def record_progress():
    """Record user progress and update AI model"""
    data = request.json
    user_id = data.get('userId')
    lesson_id = data.get('lessonId')
    correct = data.get('correct')
    timestamp = data.get('timestamp')
    
    # Update AI model
    adaptive_model.record_attempt(user_id, lesson_id, correct, timestamp)
    
    return jsonify({
        'status': 'success',
        'message': 'Progress recorded'
    })

@app.route('/api/get-insights', methods=['GET'])
def get_insights():
    """Get AI-generated insights about user progress"""
    user_id = request.args.get('userId', 'user1')
    
    insights = adaptive_model.generate_insights(user_id)
    
    return jsonify(insights)

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Backend is running'})

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    os.makedirs('models', exist_ok=True)
    
    print("🚀 Flask server starting...")
    print("📚 Nepali Dyslexia Learning App Backend")
    print("🌐 Running on http://localhost:5000")
    
    app.run(debug=True, port=5000)