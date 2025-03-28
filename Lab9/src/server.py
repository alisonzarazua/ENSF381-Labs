import joblib 
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/validate_login', methods=['POST'])
def validate_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user_credentials = {
        "alice": "password123",
        "bob": "secure456",
        "charlie": "qwerty789",
        "diana": "hunter2",
        "eve": "passpass",
        "frank": "letmein",
        "grace": "trustno1",
        "heidi": "admin123",
        "ivan": "welcome1",
        "judy": "password1"
        }

    if not username or not password:
        return jsonify({
            "success": False,
            "message": "Username and password are required."
        }), 400

    if username in user_credentials and user_credentials[username] == password:
        return jsonify({
            "success": True,
            "message": f"Login successful. Welcome, {username}!"
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    model = joblib.load("./src/random_forest_model.pkl")
    data = request.json

    cats = True if 'pets' in data and data['pets'] else False
    dogs = True if 'pets' in data and data['pets'] else False

    sample_data = [
        data['city'],
        data['province'],
        float(data['latitude']),
        float(data['longitude']),
        data['lease_term'],
        data['type'],
        float(data['beds']),
        float(data['baths']),
        float(data['sq_feet']),
        data['furnishing'],
        data['smoking'],
        cats,
        dogs
    ]
    
    sample_df = pd.DataFrame([sample_data], columns=[
        'city', 'province', 'latitude', 'longitude', 'lease_term',
        'type', 'beds', 'baths', 'sq_feet', 'furnishing',
        'smoking', 'cats', 'dogs'
    ])
    
    predicted_price = model.predict(sample_df)
    
    return jsonify({"predicted_price": float(predicted_price[0])})


if __name__ == '__main__':
    app.run(debug=True)