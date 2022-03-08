from cmath import log
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import CreateMessageForm
from app.models import db, Post, Message, Chat

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


@chat_routes.route('/<int:chatId>/messages', methods=['POST'])
@login_required
def send_message(chatId):
    form = CreateMessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        content = form.data['content']

        new_message = Message(
            chat_id=chatId,
            user_id=current_user.id,
            content=content
        )

        db.session.add(new_message)
        db.session.commit()

        return {"message": new_message.to_dict()}
    return {"errors": form.errors}


@chat_routes.route('/<int:chatId>', methods=['DELETE'])
@login_required
def delete_chat(chatId):
    chat = Chat.query.get(chatId)

    db.session.delete(chat)
    db.session.commit()

    return {"message": "Chat deleted"}


@chat_routes.route('/<int:postId>', methods=['POST'])
@login_required
def create_chat(postId):
    chat = Chat(
        buyer_id=current_user.id,
        post_id=postId
    )

    post = Post.query.get(postId)

    post.chats.append(chat)

    db.session.add(chat)
    db.session.commit()

    return {"chat": chat.to_dict()}