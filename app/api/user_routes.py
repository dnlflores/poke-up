from flask import Blueprint, request
from flask_login import login_required
from app.forms.edit_user_form import EditUserForm
from app.models import db, User
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_user(id):
    form = EditUserForm()

    user = User.query.get(id)

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
        if form.data['description']:
            user.description = form.data['description']
        if url:
            user.profile_pic_url = url

        db.session.commit()
        return user.to_dict()
    return {'errors': form.errors}