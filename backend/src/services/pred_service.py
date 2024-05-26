import pandas as pd
from joblib import load


class PredService:
    def __init__(self) -> None:
        pass

    def handle_missing_values(self, df: pd.DataFrame) -> pd.DataFrame:
        dict_fill = {}
        for i in range(len(df.columns)):
            if df.dtypes[i] == "object":
                dict_fill.update({df.columns[i]: df[df.columns[i]].mode()[0]})
            else:
                dict_fill.update({df.columns[i]: df[df.columns[i]].mean()})

        df.fillna(value=dict_fill, inplace=True)

        return df

    def predict(self, df: pd.DataFrame) -> dict:
        # Xử lý missing values
        if "Unnamed: 0" in df.columns:
            df.drop("Unnamed: 0", axis=1, inplace=True)
        if "id" in df.columns:
            df.drop("id", axis=1, inplace=True)

        new_df = self.handle_missing_values(df)

        # Load model
        model = load("./src/models/bagging_model.joblib")

        # Predict
        X_data = new_df
        y_pred = model.predict(X_data)
        df["Satisfaction"] = y_pred
        df.to_csv("./src/uploads/predict.csv", index=False)

        return {"result": "success", "predict": y_pred.tolist()}
