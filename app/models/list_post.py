from .db import db

posts_lists = db.Table(
    "posts_lists",
    db.Column(
        "post_id", 
        db.Integer, 
        db.ForeignKey("posts.id"), 
        primary_key=True
    ),
    db.Column(
        "list_id", 
        db.Integer, 
        db.ForeignKey("lists.id"), 
        primary_key=True
    )
)

class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255))

    user = db.relationship('User', back_populates='lists')
    posts = db.relationship(
        'Post',
        secondary=posts_lists,
        back_populates="lists"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "image_url": self.image_url
        }


class Post(db.Model):
    __tablename__='posts'

    id = db.Column(db.Integer, primary_key=True)
    
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    user = db.relationship('User', back_populates="posts")
    category = db.relationship('Category', back_populates="posts")
    chats = db.relationship('Chat', back_populates="post", cascade="all, delete")

    lists = db.relationship(
        'List',
        secondary=posts_lists,
        back_populates="posts"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "image_url": self.image_url,
            "description": self.description,
            "price": self.price,
            "quantity": self.quantity
        }