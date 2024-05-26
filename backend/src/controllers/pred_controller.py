from src.services.file_service import FileService
from src.services.pred_service import PredService
from src.utils.response import HttpResponse


class PredController:
    def __init__(self):
        self.pred_service = PredService()
        self.file_service = FileService()

    def predict(self, file):
        try:
            file = self.file_service.save_file(file)
            result = self.pred_service.predict(file)
            return HttpResponse(200, "Success", result)
        except Exception as e:
            return HttpResponse(500, str(e))
