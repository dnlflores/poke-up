from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_list_form import CreateListForm
from app.forms.edit_list_form import EditListForm
from app.models import db, List, Post