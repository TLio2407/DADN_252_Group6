import pandas as pd

def load_data(path):
    return pd.read_csv(path)

def check_missing(df):
    missing = df.isnull().sum()
    missing_percent = (missing / len(df)) * 100

    report = pd.DataFrame({
        "Missing Count": missing,
        "Percentage (%)": missing_percent
    })
    print("=== MISSING VALUE REPORT ===")
    print(report)
    print("\nTotal missing values:", missing.sum())

    return report

def preprocess(df):
    df = df[["temp", "humidity"]].copy()

    print("\n=== DATA TYPES ===")
    print(df.dtypes)

    df["temp"] = df["temp"].astype(float)
    df["humidity"] = df["humidity"].astype(float)

    df["fan"] = df["temp"].apply(lambda x: 1 if x > 28 else 0)

    return df