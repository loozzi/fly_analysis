from flask import Blueprint

from .pred_route import pred_route

api = Blueprint("api", __name__)
api.register_blueprint(pred_route, url_prefix="/ml")
