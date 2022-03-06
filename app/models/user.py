from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    profile_pic_url = db.Column(db.String(255))

    lists = db.relationship('List', back_populates="user", cascade="all, delete")
    posts = db.relationship('Post', back_populates="user", cascade="all, delete")
    buying = db.relationship('Chat', back_populates="buyer", cascade="all, delete")
    messages = db.relationship('Message', back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'description': self.description,
            'profile_pic_url': self.profile_pic_url
        }