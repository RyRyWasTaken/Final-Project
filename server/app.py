from flask import request, jsonify, session
from dotenv import load_dotenv
from config import app, db
from models import User

load_dotenv()

@app.route("/profiles")
def home():
    users = User.query.all()
    users_json = [user.to_json() for user in users]
    return jsonify(users_json)

@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username, password=password).first()
    if user:
        # User found, return success response
        return jsonify({"message": "Sign in successful", "user": user.to_json()}), 200
    else:
        # User not found or incorrect credentials, return error response
        return jsonify({"error": "Invalid username or password"}), 401

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    # Check if username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    # Create a new user
    new_user = User(username=username, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Sign up successful", "user": new_user.to_json()}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
