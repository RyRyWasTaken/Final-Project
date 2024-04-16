from flask import request, jsonify
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from config import app, db
from models import User

load_dotenv()

app.config["JWT_SECRET_KEY"] = ";oiausdhfo;ajsdhf"
jwt = JWTManager(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    return response

@app.route("/profiles")
def home():
    users = User.query.all()
    users_json = [user.to_json() for user in users]
    return jsonify(users_json)

@app.route("/account")
def account():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"user": user.to_json()}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username, password=password).first()
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({"message": "Sign in successful", "access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "user")
    
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(username=username, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify({"message": "Sign up successful", "access_token": access_token}), 201

@app.route("/update_points", methods=["POST"])
@jwt_required()
def update_points():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user:
            data = request.get_json()
            points = data.get("points")
            user.points += points
            db.session.commit()
            return jsonify({"message": "Points updated successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/update_points", methods=["OPTIONS"])
def options_update_points():
    response = app.make_default_options_response()
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route("/protected")
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"user": user.to_json()}), 200

@app.route("/update_seal_count", methods=["POST"])
@jwt_required()
def update_seal_count():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user:
            data = request.get_json()
            seal_count = data.get("seal_count")
            user.seal_count = seal_count
            db.session.commit()
            return jsonify({"message": "Seal count updated successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/seal_count", methods=["GET"])
@jwt_required()
def get_seal_count():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user:
            return jsonify({"seal_count": user.seal_count}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
