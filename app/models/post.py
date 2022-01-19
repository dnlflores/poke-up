from .db import db

class Post(db.Model):
    __tablename__='posts'

    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    user = db.relationship('User', back_populates="posts")
    lists = db.relationship('List', back_populates="posts")
    category = db.relationship('Category', back_populates="posts")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "list_id": self.list_id,
            "category_id": self.category_id,
            "image_url": self.image_url,
            "description": self.description,
            "price": self.price,
            "quantity": self.quantity
        }