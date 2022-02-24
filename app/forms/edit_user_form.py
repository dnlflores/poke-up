from flask_wtf import FlaskForm
from wtforms import TextAreaField

class EditUserForm(FlaskForm):
    description = TextAreaField("Description")