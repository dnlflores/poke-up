from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import DataRequired

class CreatePostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    category_id = SelectField("Category", coerce=int, validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])