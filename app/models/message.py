from .db import db
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    
    user = db.relationship('User', back_populates="messages")
    chat = db.relationship('Chat', back_populates="messages")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chat_id": self.chat_id,
            "content": self.content,
            "timestamp": self.timestamp
        }