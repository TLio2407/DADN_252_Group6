import joblib
import pandas as pd

def predict(temp, humidity):
    model = joblib.load("models/model.pkl")

    # tạo DataFrame đúng format
    df = pd.DataFrame([[temp, humidity]], columns=["temp", "humidity"])

    return model.predict(df)