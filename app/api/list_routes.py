from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_list_form import CreateListForm
from app.forms.edit_list_form import EditListForm
from app.models import db, List, Post
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

list_routes = Blueprint('lists', __name__)

@list_routes.route('/')
@login_required
def get_user_lists():
    lists = List.query.all()

    user_lists = [user_list for user_list in lists if user_list.user_id == current_user.id]

    return {"lists": [user_list.to_dict() for user_list in user_lists] }


@list_routes.route('/', methods=["POST"])
@login_required
def create_list():
    form = CreateListForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        url = "https://pokeup.s3.us-west-1.amazonaws.com/Pokeball-PNG-Photos.png"
    else:

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

    if form.validate_on_submit():
        name = form.data['name']
        user_id = current_user.id

        new_list = List(
            name=name,
            user_id=user_id,
            image_url=url
        )

        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
    return {"errors": form.errors}



@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_list(id):
    listed = List.query.get(id)

    db.session.delete(listed)
    db.session.commit()

    return listed.to_dict()


@list_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def edit_list(id):
    form = EditListForm()

    new_list = List.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        url = None
    else:

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

    if form.validate_on_submit():
        if form.data['name']:
            new_list.name = form.data['name']
        if url:
            new_list.image_url = url

        db.session.commit()
        return new_list.to_dict()
    return {"errors": form.errors}


@list_routes.route('/<int:id>')
@login_required
def get_posts(id):
    post_list = List.query.get(id)

    return {"posts": [post.to_dict() for post in post_list.posts]}


@list_routes.route('/<int:listId>/<int:postId>', methods=["POST"])
@login_required
def add_to_list(listId, postId):
    post_list = List.query.get(listId)

    post = Post.query.get(postId)

    post_list.posts.append(post)
    
    db.session.commit()

    return post_list.to_dict() 


@list_routes.route('/<int:listId>/<int:postId>', methods=["DELETE"])
@login_required
def remove_from_list(listId, postId):
    post_list = List.query.get(listId)

    post = Post.query.get(postId)

    post_list.posts.remove(post)
    
    db.session.commit()

    return post.to_dict() 