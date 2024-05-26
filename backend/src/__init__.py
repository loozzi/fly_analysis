from flask import Flask, send_from_directory
from flask_cors import CORS
from src.routes import api

app = Flask(__name__, static_folder="dist", static_url_path="/")
CORS(app, supports_credentials=True)


app.register_blueprint(api, url_prefix="/api")


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
