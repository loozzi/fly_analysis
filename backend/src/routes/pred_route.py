from flask import Blueprint, request
from src.controllers.pred_controller import PredController
from src.utils.response import HttpResponse

pred_route = Blueprint("pred_route", __name__)
predController = PredController()


@pred_route.route("/health", methods=["GET"])
def health():
    return HttpResponse(200, "Success", "Healthy")


@pred_route.route("/predict", methods=["POST"])
def predict():
    file = request.files["file"]
    if not file:
        return HttpResponse(status=400, message="No file found")

    return predController.predict(file)


@pred_route.route("/download", methods=["GET"])
def download():
    return predController.download()
