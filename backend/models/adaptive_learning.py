import json
import os
from datetime import datetime

class AdaptiveLearning:
    def __init__(self):
        self.user_data = {}
        self. load_user_data()
    
    def load_user_data(self):
        """Load user progress data"""
        data_path = 'data/user_progress.json'
        if os.path.exists(data_path):
            with open(data_path, 'r', encoding='utf-8') as f:
                self.user_data = json.load(f)
    
    def save_user_data(self):
        """Save user progress data"""
        data_path = 'data/user_progress.json'
        with open(data_path, 'w', encoding='utf-8') as f:
            json.dump(self.user_data, f, ensure_ascii=False, indent=2)
    
    def record_attempt(self, user_id, lesson_id, correct, timestamp):
        """Record a learning attempt"""
        if user_id not in self.user_data:
            self.user_data[user_id] = {
                'attempts': [],
                'lesson_scores': {},
                'total_correct': 0,
                'total_attempts': 0
            }
        
        # Record attempt
        attempt = {
            'lesson_id': lesson_id,
            'correct': correct,
            'timestamp': timestamp
        }
        self.user_data[user_id]['attempts'].append(attempt)
        
        # Update scores
        if str(lesson_id) not in self.user_data[user_id]['lesson_scores']: 
            self.user_data[user_id]['lesson_scores'][str(lesson_id)] = {
                'correct': 0,
                'total':  0,
                'last_attempt': timestamp
            }
        
        lesson_score = self.user_data[user_id]['lesson_scores'][str(lesson_id)]
        lesson_score['total'] += 1
        if correct:
            lesson_score['correct'] += 1
            self.user_data[user_id]['total_correct'] += 1
        
        self.user_data[user_id]['total_attempts'] += 1
        lesson_score['last_attempt'] = timestamp
        
        self.save_user_data()
    
    def get_next_lessons(self, user_id, all_lessons):
        """
        AI-powered adaptive lesson selection
        Returns lessons ordered by difficulty and user performance
        """
        if user_id not in self.user_data:
            # New user - return default order
            return all_lessons
        
        user_progress = self.user_data[user_id]
        lesson_scores = user_progress. get('lesson_scores', {})
        
        # Calculate difficulty score for each lesson
        scored_lessons = []
        for lesson in all_lessons:
            lesson_id = str(lesson['id'])
            
            if lesson_id in lesson_scores: 
                score_data = lesson_scores[lesson_id]
                accuracy = score_data['correct'] / score_data['total'] if score_data['total'] > 0 else 0
                
                # AI Logic: Prioritize lessons with 40-70% accuracy (need practice)
                if accuracy < 0.4:
                    priority = 100  # Struggling - high priority
                elif 0.4 <= accuracy < 0.7:
                    priority = 200  # Need practice - highest priority
                elif 0.7 <= accuracy < 0.9:
                    priority = 50   # Good - medium priority
                else: 
                    priority = 10   # Mastered - low priority
            else:
                priority = 150  # Not attempted - high priority
            
            scored_lessons.append({
                'lesson':  lesson,
                'priority': priority
            })
        
        # Sort by priority (higher first)
        scored_lessons.sort(key=lambda x: x['priority'], reverse=True)
        
        return [item['lesson'] for item in scored_lessons]
    
    def generate_insights(self, user_id):
        """Generate AI insights about user performance"""
        if user_id not in self.user_data:
            return {
                'strengths': 'नयाँ प्रयोगकर्ता - अझै डेटा छैन',
                'improvements': 'सिक्न सुरु गर्नुहोस्! ',
                'recommendation': 'पहिलो पाठ सुरु गर्नुहोस्'
            }
        
        user_progress = self.user_data[user_id]
        total_attempts = user_progress['total_attempts']
        total_correct = user_progress['total_correct']
        
        if total_attempts == 0:
            accuracy = 0
        else: 
            accuracy = (total_correct / total_attempts) * 100
        
        # AI-generated insights
        strengths = ""
        improvements = ""
        recommendation = ""
        
        if accuracy >= 80:
            strengths = "उत्कृष्ट प्रगति!  तपाईं धेरै राम्रो गर्दै हुनुहुन्छ।"
            improvements = "नयाँ पाठहरू प्रयास गर्नुहोस्"
            recommendation = "अर्को स्तरमा जानुहोस्"
        elif accuracy >= 60:
            strengths = "राम्रो काम!  तपाईं सिक्दै हुनुहुन्छ।"
            improvements = "केही अक्षरहरू थप अभ्यास गर्नुहोस्"
            recommendation = "दैनिक १५ मिनेट अभ्यास गर्नुहोस्"
        else:
            strengths = "तपाईं प्रयास गर्दै हुनुहुन्छ!"
            improvements = "आधारभूत अक्षरहरूमा फोकस गर्नुहोस्"
            recommendation = "बिस्तारै अभ्यास गर्नुहोस्, हतार नगर्नुहोस्"
        
        # Identify weak lessons
        lesson_scores = user_progress.get('lesson_scores', {})
        weak_lessons = []
        for lesson_id, scores in lesson_scores.items():
            if scores['total'] > 0:
                acc = (scores['correct'] / scores['total']) * 100
                if acc < 50:
                    weak_lessons. append(lesson_id)
        
        if weak_lessons:
            improvements += f" (पाठ:  {', '.join(weak_lessons)})"
        
        return {
            'strengths': strengths,
            'improvements': improvements,
            'recommendation': recommendation,
            'accuracy': round(accuracy, 1),
            'total_lessons': len(lesson_scores)
        }