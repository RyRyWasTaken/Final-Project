from config import db
from models import User

def create_tables():
    db.create_all()
    print("Tables created successfully")

def populate_database():
    create_tables()

    example_users = [
        {"username": "admin_new", "password": "admin", "role": "admin"},
        {"username": "john_doe_new", "password": "johnpass", "role": "user"},
        {"username": "alice_smith_new", "password": "alicepass", "role": "user"},
        {"username": "bob_johnson_new", "password": "johnsonpass", "role": "user"}
    ]

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
