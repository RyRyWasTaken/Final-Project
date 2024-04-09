from flask import request, jsonify, session
from config import app, db
from models import *

@app.route("/signin")
def signin():
    pass

@app.route("/signup")
def signup():
    pass

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)