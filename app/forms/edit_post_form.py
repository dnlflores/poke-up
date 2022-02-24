from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField

class EditPostForm(FlaskForm):
    title = StringField("Title")
    category_id = SelectField("Category", coerce=int)
    description = TextAreaField("Description")
    price = IntegerField("Price")
    quantity = IntegerField("Quantity")