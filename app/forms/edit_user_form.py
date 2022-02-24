from tokenize import String
from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField

class EditUserForm(FlaskForm):
    description = TextAreaField("Description")
    name = StringField("Name")
    email = StringField("Email")