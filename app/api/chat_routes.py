from cmath import log
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_post_form import CreatePostForm
from app.forms.edit_post_form import EditPostForm
from app.models import db, User, Post, Category, Message, Chat
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

chat_routes = Blueprint('chats', __name__)

@chat_routes.route('/')
@login_required
def get_chats():
    chats = Chat.query.all()
    selling_posts = Post.query.where(Post.user_id == current_user.id).all()

    post_chats = []

    for post in selling_posts:
        for chat in chats:
            if post.id == chat.post_id:
                post_chats.append(chat)
    for chat in chats:
        if chat.buyer_id == current_user.id:
            post_chats.append(chat)

    return {"chats": [chat.to_dict() for chat in post_chats]}

@chat_routes.route('/<int:chatId>/messages')
@login_required
def get_messages(chatId):
    messages = Message.query.filter_by(chat_id=chatId).all()

    return {"messages": [message.to_dict() for message in messages]}