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

    return {"chats": [chat.to_dict() for chat in chats]}