from flask_wtf import FlaskForm
from wtforms import StringField

class EditUserForm(FlaskForm):
    description = StringField("Description")