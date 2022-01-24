from flask_wtf import FlaskForm
from wtforms import StringField

class EditListForm(FlaskForm):
    name = StringField("Name")