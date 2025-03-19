from flask import Flask, request, jsonify
from flask_cors import CORS
<<<<<<< HEAD
import joblib
import numpy as np
import pandas as pd
import os
from dotenv import load_dotenv
=======
import os
from dotenv import load_dotenv
from ml_model import HealthRecommendationModel
>>>>>>> 5bb22b8 (edit ui and api)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

<<<<<<< HEAD
# Load the trained model
# In a real app, you would load your trained model here
# model = joblib.load('model.pkl')

# Mock data for development
mock_diagnoses = {
    "fever+moderate+4_7_days": {
        "condition": "Influenza",
        "description": "A viral infection that attacks your respiratory system. Common symptoms include fever, body aches, and fatigue.",
        "confidence": 0.85,
        "firstAid": [
            "Rest and stay hydrated",
            "Take over-the-counter fever reducers",
            "Use a humidifier to ease congestion",
            "Consult a doctor if symptoms worsen",
        ],
    },
    "headache+severe+more_than_week": {
        "condition": "Migraine",
        "description": "A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.",
        "confidence": 0.78,
        "firstAid": [
            "Rest in a quiet, dark room",
            "Apply cold compresses to your forehead",
            "Try over-the-counter pain relievers",
            "Stay hydrated",
            "Consult a doctor for recurring migraines",
=======
# Initialize and load the model
model = HealthRecommendationModel()
model_loaded = False

# Try to load the pre-trained model
if os.path.exists("model.joblib"):
    model_loaded = model.load_model("model.joblib")
else:
    # If no pre-trained model exists, train a new one if the dataset exists
    if os.path.exists("dataset_penyakit_10000_cleaned.csv"):
        model.load_and_prepare_data("dataset_penyakit_10000_cleaned.csv")
        model.train_model()
        model.save_model("model.joblib")
        model_loaded = True

# Mock data for when the model is not available
mock_diagnoses = {
    "fever+moderate+4_7_days": {
        "condition": "Influenza",
        "description": "Infeksi virus yang menyerang sistem pernapasan Anda. Gejala umum termasuk demam, nyeri tubuh, dan kelelahan.",
        "confidence": 0.85,
        "firstAid": [
            "Istirahat dan tetap terhidrasi",
            "Minum obat penurun demam yang dijual bebas",
            "Gunakan humidifier untuk meredakan hidung tersumbat",
            "Konsultasikan dengan dokter jika gejala memburuk",
        ],
    },
    "headache+severe+more_than_week": {
        "condition": "Migrain",
        "description": "Sakit kepala dengan intensitas bervariasi, sering disertai mual dan sensitivitas terhadap cahaya dan suara.",
        "confidence": 0.78,
        "firstAid": [
            "Beristirahat di ruangan yang tenang dan gelap",
            "Aplikasikan kompres dingin pada dahi Anda",
            "Coba pereda nyeri yang dijual bebas",
            "Tetap terhidrasi",
            "Konsultasikan dengan dokter untuk migrain berulang",
>>>>>>> 5bb22b8 (edit ui and api)
        ],
    },
    "cough+moderate+1_3_days": {
        "condition": "Common Cold",
        "description": "A viral infection of your nose and throat. It's usually harmless, although it might not feel that way.",
        "confidence": 0.82,
        "firstAid": [
            "Get plenty of rest",
            "Drink fluids to prevent dehydration",
            "Use over-the-counter cold medications",
            "Try honey for cough relief",
        ],
    },
    "fatigue+mild+more_than_week": {
        "condition": "Chronic Fatigue",
        "description": "Extreme fatigue that can't be explained by an underlying medical condition.",
        "confidence": 0.65,
        "firstAid": [
            "Establish a regular sleep schedule",
            "Pace yourself during activities",
            "Avoid caffeine, alcohol, and nicotine",
            "Consider speaking with a healthcare provider",
        ],
    },
}

# Default diagnosis
default_diagnosis = {
<<<<<<< HEAD
    "condition": "General Discomfort",
    "description": "Your symptoms suggest a general discomfort that could be related to various factors including stress, minor illness, or lifestyle factors.",
    "confidence": 0.65,
    "firstAid": [
        "Rest and monitor your symptoms",
        "Stay hydrated",
        "Consult a healthcare professional if symptoms persist or worsen",
=======
    "condition": "Ketidaknyamanan Umum",
    "description": "Gejala Anda menunjukkan ketidaknyamanan umum yang mungkin terkait dengan berbagai faktor termasuk stres, penyakit ringan, atau faktor gaya hidup.",
    "confidence": 0.65,
    "firstAid": [
        "Istirahat dan pantau gejala Anda",
        "Tetap terhidrasi",
        "Konsultasikan dengan profesional kesehatan jika gejala berlanjut atau memburuk",
>>>>>>> 5bb22b8 (edit ui and api)
    ],
}

@app.route('/api/health', methods=['GET'])
def health_check():
<<<<<<< HEAD
    return jsonify({"status": "healthy", "message": "API is running"})
=======
    return jsonify({
        "status": "healthy", 
        "message": "API is running",
        "model_loaded": model_loaded,
        "model_accuracy": model.accuracy if model_loaded else None
    })
>>>>>>> 5bb22b8 (edit ui and api)

@app.route('/api/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    
<<<<<<< HEAD
    # In a real app, you would use your ML model to make a prediction
    # features = preprocess_input(data)
    # prediction = model.predict(features)
    # result = format_prediction(prediction)
    
    # For development, use mock data
    key = f"{data.get('symptom')}+{data.get('severity')}+{data.get('duration')}"
    result = mock_diagnoses.get(key, default_diagnosis)
    
    return jsonify(result)
=======
    if model_loaded:
        # Use the trained model for prediction
        result = model.predict({
            "symptom": data.get("symptom"),
            "severity": data.get("severity"),
            "duration": data.get("duration")
        })
        
        if "error" in result:
            return jsonify({"error": result["error"]}), 400
            
        # Format the response
        response = {
            "condition": result["condition"],
            "description": f"Based on your symptoms, you may have {result['condition']}.",
            "confidence": result["confidence"],
            "firstAid": get_first_aid_recommendations(result["condition"])
        }
        
        return jsonify(response)
    else:
        # Use mock data if model is not available
        key = f"{data.get('symptom')}+{data.get('severity')}+{data.get('duration')}"
        result = mock_diagnoses.get(key, default_diagnosis)
        
        return jsonify(result)

@app.route('/api/feature-options', methods=['GET'])
def get_feature_options():
    if model_loaded:
        return jsonify(model.get_feature_options())
    else:
        # Return mock options if model is not available
        return jsonify({
            "symptom": ["fever", "cough", "headache", "fatigue", "nausea", "dizziness", "sore_throat", "chest_pain"],
            "severity": ["mild", "moderate", "severe"],
            "duration": ["less_than_day", "1_3_days", "4_7_days", "more_than_week"]
        })

def get_first_aid_recommendations(condition):
    """Return first aid recommendations based on the condition"""
    # This would ideally come from a database or more sophisticated source
    recommendations = {
        "Influenza": [
            "Istirahat dan tetap terhidrasi",
            "Minum obat penurun demam yang dijual bebas",
            "Gunakan humidifier untuk meredakan hidung tersumbat",
            "Konsultasikan dengan dokter jika gejala memburuk",
        ],
        "Migrain": [
            "Beristirahat di ruangan yang tenang dan gelap",
            "Aplikasikan kompres dingin pada dahi Anda",
            "Coba pereda nyeri yang dijual bebas",
            "Tetap terhidrasi",
            "Konsultasikan dengan dokter untuk migrain berulang",
        ],
        # Add more conditions and recommendations as needed
    }
    
    return recommendations.get(condition, [
        "Istirahat dan pantau gejala Anda",
        "Tetap terhidrasi",
        "Konsultasikan dengan profesional kesehatan"
    ])
>>>>>>> 5bb22b8 (edit ui and api)

@app.route('/api/posts', methods=['GET'])
def get_posts():
    # Mock blog posts
    posts = [
        {
            "id": 1,
<<<<<<< HEAD
            "title": "Understanding Common Cold Symptoms",
            "excerpt": "Learn about the common symptoms of a cold and how to treat them effectively.",
            "content": "<p>The common cold is a viral infection of your nose and throat...</p>",
            "category": "Health Tips",
            "image_url": "/placeholder.svg?height=400&width=800&text=Common+Cold",
=======
            "title": "Memahami Gejala Flu Biasa",
            "excerpt": "Pelajari tentang gejala umum flu dan cara mengobatinya secara efektif.",
            "content": "<p>Flu biasa adalah infeksi virus pada hidung dan tenggorokan Anda...</p>",
            "category": "Tips Kesehatan",
            "image_url": "/placeholder.svg?height=400&width=800&text=Flu+Biasa",
>>>>>>> 5bb22b8 (edit ui and api)
            "created_at": "2023-01-15T12:00:00Z"
        },
        {
            "id": 2,
<<<<<<< HEAD
            "title": "First Aid for Minor Burns",
            "excerpt": "A guide to treating minor burns at home and when to seek medical attention.",
            "content": "<p>Burns are classified by their severity...</p>",
            "category": "First Aid",
            "image_url": "/placeholder.svg?height=400&width=800&text=Burns",
=======
            "title": "Pertolongan Pertama untuk Luka Bakar Ringan",
            "excerpt": "Panduan untuk menangani luka bakar ringan di rumah dan kapan harus mencari perhatian medis.",
            "content": "<p>Luka bakar diklasifikasikan berdasarkan tingkat keparahannya...</p>",
            "category": "Pertolongan Pertama",
            "image_url": "/placeholder.svg?height=400&width=800&text=Luka+Bakar",
>>>>>>> 5bb22b8 (edit ui and api)
            "created_at": "2023-02-10T14:30:00Z"
        }
    ]
    
    return jsonify({"posts": posts, "total": len(posts)})

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    # Mock single post
    post = {
        "id": post_id,
<<<<<<< HEAD
        "title": "Understanding Common Cold Symptoms" if post_id == 1 else "First Aid for Minor Burns",
        "excerpt": "Learn about the common symptoms of a cold and how to treat them effectively.",
        "content": "<p>The common cold is a viral infection of your nose and throat...</p>",
        "category": "Health Tips" if post_id == 1 else "First Aid",
=======
        "title": "Memahami Gejala Flu Biasa" if post_id == 1 else "Pertolongan Pertama untuk Luka Bakar Ringan",
        "excerpt": "Pelajari tentang gejala umum flu dan cara mengobatinya secara efektif.",
        "content": "<p>Flu biasa adalah infeksi virus pada hidung dan tenggorokan Anda...</p>",
        "category": "Tips Kesehatan" if post_id == 1 else "Pertolongan Pertama",
>>>>>>> 5bb22b8 (edit ui and api)
        "image_url": f"/placeholder.svg?height=400&width=800&text=Post+{post_id}",
        "created_at": "2023-01-15T12:00:00Z"
    }
    
    return jsonify(post)

<<<<<<< HEAD
=======
@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    if model_loaded:
        return jsonify({
            "accuracy": model.accuracy,
            "most_important_feature": model.most_important_feature,
            "features": list(model.cat_value_dicts.keys()),
            "target": model.final_colname
        })
    else:
        return jsonify({
            "error": "Model not loaded",
            "accuracy": None,
            "most_important_feature": None
        })

>>>>>>> 5bb22b8 (edit ui and api)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

