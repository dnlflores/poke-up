from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from app.models import Category

def get_categories():
    categories = Category.query.all()

    print("CATEGORIES ==> ", categories)

    return categories;

class CreatePostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    category_id = SelectField("Category", choices=get_categories, validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])