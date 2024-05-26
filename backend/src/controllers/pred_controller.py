from src.services.file_service import FileService
from src.services.pred_service import PredService
from src.utils.response import HttpFileResponse, HttpResponse


class PredController:
    def __init__(self):
        self.pred_service = PredService()
        self.file_service = FileService()

    def predict(self, file):
        try:
            filepath = self.file_service.save_file(file)
            df = self.file_service.read_file(filepath)
            result = self.pred_service.predict(df)
            self.file_service.remove(filepath)
            return HttpResponse(200, "Success", result)
        except Exception as e:
            return HttpResponse(500, str(e))

    def download(self):
        try:
            return HttpFileResponse("./uploads/predict.csv")
        except Exception as e:
            return HttpResponse(500, str(e))
