from random import randint


class FileService:
    def __init__(self):
        pass

    def save_file(self, file: any):
        file_name = f"./src/uploads/{randint(0, 100000)}_{file.filename}"
        open(file_name, "wb").write(file.read())
        return file_name
