from .db import db

class Post(db.Model):
    __tablename__='posts'

    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))
    category_id = db.Column(db.Integer, db.ForeginKey('categories.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    