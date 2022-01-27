from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, List, Post

post_list_routes = Blueprint('post-list', __name__)

@post_list_routes.route('/')
@login_required
def get_post_list():
    post_list = Post.query