import pandas as pd
import matplotlib.pyplot as plt

# load data
def load_data(path):
    return pd.read_csv(path)

# check missing
def check_missing(df):
    print("=== MISSING VALUES ===")
    print(df.isnull().sum())
    print("\nTotal missing:", df.isnull().sum().sum())

# detect outliers bằng IQR
def detect_outliers(df, col):
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1

    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR

    outliers = df[(df[col] < lower) | (df[col] > upper)]

    print(f"\n=== OUTLIER CHECK: {col} ===")
    print(f"Lower bound: {lower}")
    print(f"Upper bound: {upper}")
    print(f"Number of outliers: {len(outliers)}")

# vẽ boxplot
def plot_boxplot(df):
    df[["temp", "humidity"]].boxplot()
    plt.title("Boxplot: Temp & Humidity")
    plt.show()

# vẽ histogram
def plot_hist(df):
    df["temp"].hist(bins=30)
    plt.title("Temperature Distribution")
    plt.show()

    df["humidity"].hist(bins=30)
    plt.title("Humidity Distribution")
    plt.show()

# main chạy EDA
def run_eda():
    df = load_data("data/raw/iot_telemetry_data.csv")

    check_missing(df)

    detect_outliers(df, "temp")
    detect_outliers(df, "humidity")

    plot_boxplot(df)
    plot_hist(df)


if __name__ == "__main__":
    run_eda()