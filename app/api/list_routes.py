from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_list_form import CreateListForm
from app.models import db, List
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