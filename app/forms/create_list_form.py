from logging.config import valid_ident
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CreateListForm(FlaskForm):

    name = StringField("name", validators=[DataRequired()])