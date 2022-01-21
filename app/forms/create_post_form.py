from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from app.models import Category, Post
class CreatePostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    category_id = SelectField("Category", coerce=int, validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])