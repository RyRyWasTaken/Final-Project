from config import db, app
from models import User

def create_tables():
    with app.app_context():  # Use app context to work with the database
        db.create_all()
        print("Tables created successfully")

def populate_database():
    with app.app_context():  # Use app context to work with the database
        create_tables()
        create_example_users()
        db.session.commit()
        print("Database populated successfully")

def create_example_users():
    example_users = [
        {"username": "admin_new", "password": "admin", "role": "admin"},
        {"username": "john_doe_new", "password": "johnpass", "role": "user"},
        {"username": "alice_smith_new", "password": "alicepass", "role": "user"},
        {"username": "bob_johnson_new", "password": "johnsonpass", "role": "user"}
    ]

    with app.app_context():  # Use app context to work with the database
        for user_data in example_users:
            user = User(
                username=user_data["username"],
                password=user_data["password"],
                role=user_data["role"],
            )
            db.session.add(user)
        
        db.session.commit()
        print("Example users added successfully")

if __name__ == "__main__":
    populate_database()
