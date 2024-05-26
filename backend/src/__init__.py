from flask import Flask
from flask_cors import CORS
from src.routes import api

app = Flask(__name__)
CORS(app, supports_credentials=True)


app.register_blueprint(api, url_prefix="/api")
