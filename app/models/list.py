from .db import db

class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255))

    user = db.relationship('User', back_populates='lists', cascade="all, delete")
    posts = db.relationship('Post', back_populates='lists', cascade="all, delete")