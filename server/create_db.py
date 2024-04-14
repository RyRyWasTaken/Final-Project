from config import app, db
from models import User

def create_tables():
    db.create_all()

def populate_database():
    with app.app_context():
        create_tables()

        example_users = [
            {"username": "admin", "password": "admin", "role": "admin", "points": 0},
            {"username": "john_doe", "password": "johnpass", "role": "user", "points": 0},
            {"username": "alice_smith", "password": "alicepass", "role": "user", "points": 0},
            {"username": "bob_johnson", "password": "johnsonpass", "role": "user", "points": 0}
        ]

        for user_data in example_users:
            is_admin = user_data["role"] == "admin"
            user = User(
                username=user_data["username"],
                password=user_data["password"],
                role=user_data["role"],
                is_admin=is_admin
            )
            db.session.add(user)
        
        db.session.commit()

if __name__ == "__main__":
    populate_database()
