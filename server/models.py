from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(10), default='user', nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "role": self.role,
            "is_admin": self.is_admin
        }