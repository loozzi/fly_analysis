import pandas as pd
from joblib import load


class PredService:
    def __init__(self) -> None:
        pass

    def handle_missing_values(self, df: pd.DataFrame) -> pd.DataFrame:
        # thay thế các giá trị thiếu của cột Arrival Delay in Minutes bằng giá trị trung bình của cột
        df["Arrival Delay in Minutes"].fillna(
            df["Arrival Delay in Minutes"].mean(), inplace=True
        )
        # Đổi thời gian sang phút
        df["Departure/Arrival time convenient"] = (
            df["Departure/Arrival time convenient"] * 60
        )
        # Đổi khoảng cách sang mét
        df["Flight Distance"] *= 1000

        return df

    def predict(self, df: pd.DataFrame) -> dict:
        # Xử lý missing values
        df = self.handle_missing_values(df)

        # Load model
        model = load("./src/models/bagging_model.joblib")

        # Predict
        df.drop(["Unnamed: 0", "id"], axis=1, inplace=True)
        X_data = df
        y_pred = model.predict(X_data)
        df["Satisfaction"] = y_pred
        df.to_csv("./src/uploads/predict.csv", index=False)

        return {"result": "success", "predict": y_pred.tolist()}
