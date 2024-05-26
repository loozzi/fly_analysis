from src.services.pred_service import PredService
from src.utils.response import HttpResponse


class PredController:
    def __init__(self):
        self.pred_service = PredService()

    def predict(self, request):
        try:
            data = request.get_json()
            result = self.pred_service.predict(data)
            return HttpResponse(200, "Success", result)
        except Exception as e:
            return HttpResponse(500, str(e))
