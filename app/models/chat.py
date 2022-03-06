from .db import db

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    buyer = db.relationship('User', back_populates="buying")
    post = db.relationship('Post', back_populates="chats")
    messages = db.relationship('Message', back_populates="chat")

    def to_dict(self):
        return {
            "id": self.id,
            "buyer_id": self.buyer_id,
            "post_id": self.post_id
        }