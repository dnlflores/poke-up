from sre_constants import CATEGORY_SPACE
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Category

cat_route = Blueprint('categories', __name__)

@cat_route.route('/')
def get_categories():
    categories = Category.query.all()

    return {"categories": [category.to_dict() for category in categories]}