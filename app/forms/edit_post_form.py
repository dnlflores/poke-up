from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired

class EditPostForm(FlaskForm):
    title = StringField("Title")
    category_id = SelectField("Category", coerce=int)
    description = StringField("Description")
    price = IntegerField("Price")
    quantity = IntegerField("Quantity")