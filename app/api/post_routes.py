from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_post_form import CreatePostForm
from app.models import db, User, Post, Category
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()

    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/', methods=["POST"])
@login_required
def add_post():
    form = CreatePostForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    print("         THIS IS THE FORM CATEGORY => ", form.data['category_id'], 5, "5")

    form.category_id.choices = [(category.id, category.name) for category in Category.query.all()]; 

    if form.validate_on_submit():
        title = form.data['title']
        user_id = current_user.id
        category_id = form.data['category_id']
        description = form.data['description']
        price = form.data['price']
        quantity = form.data['quantity']

        post = Post(
            title=title,
            user_id=user_id,
            category_id=category_id,
            image_url=url,
            description=description,
            price=price,
            quantity=quantity
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors": form.errors}


@post_routes.route("/<int:id>", method=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    db.session.delete(post)
    db.commit()

    return post.to_dict()