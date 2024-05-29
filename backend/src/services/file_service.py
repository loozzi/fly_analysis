from random import randint

import pandas as pd


class FileService:
    def __init__(self):
        pass

    def check_folder_exists(self, folder_path: str):
        import os

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

    def save_file(self, file: any):
        self.check_folder_exists("./src/uploads")
        file_name = f"./src/uploads/{randint(0, 100000)}_{file.filename}"
        open(file_name, "wb").write(file.read())
        return file_name

    def read_file(self, filepath: str) -> pd.DataFrame:
        print(filepath)
        if filepath.endswith(".csv"):
            return self.read_csv(filepath)
        elif filepath.endswith(".xlsx"):
            return self.read_excel(filepath)
        elif filepath.endswith(".json"):
            return self.read_json(filepath)
        else:
            raise Exception("Invalid file format")

    def read_csv(self, filepath: str) -> pd.DataFrame:
        return pd.read_csv(filepath)

    def read_excel(self, filepath: str) -> pd.DataFrame:
        return pd.read_excel(filepath)

    def read_json(self, filepath: str) -> pd.DataFrame:
        return pd.read_json(filepath)

    def remove(self, filepath: str):
        import os

        os.remove(filepath)
