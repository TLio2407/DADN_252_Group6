from src.preprocess import load_data, preprocess, check_missing
from src.train import train_model
from src.predict import predict

df = load_data("data/raw/iot_telemetry_data.csv")

check_missing(df)

df = preprocess(df)
X = df[["temp", "humidity"]]
y = df["fan"]

train_model(X, y)

result = predict(30, 70)
print("\nPrediction:", result)