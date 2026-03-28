# 🌱 Smart Home AI - Sensor Data Processing & Prediction

## 📌 Overview

This project focuses on building a simple Machine Learning pipeline for processing IoT sensor data and predicting device behavior (e.g., turning a fan ON/OFF) based on environmental conditions.

The system includes:

* Data preprocessing
* Data validation
* Model training
* Prediction

---

## 📊 Dataset

We use the dataset from Kaggle:

👉 https://www.kaggle.com/datasets/garystafford/environmental-sensor-data-132k

### Dataset description:

The dataset contains telemetry data from IoT devices, including:

* `temp` – Temperature <- used
* `humidity` – Humidity <- used
* `co`, `lpg`, `smoke` – Gas measurements
* `motion`, `light` – Sensor states
* `ts` – Timestamp

---

## ⚙️ Setup Instructions

### Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🚀 Run the project

```bash
python main.py
```

---

## 🔄 Workflow

The system follows this pipeline:

```plaintext
Load Data → Validate → Preprocess → Train Model → Predict
```

---

## 🧠 Data Processing

* Selected features: `temp`, `humidity`
* Checked missing values (none found)
* Converted data types to float
* Generated label:

```python
fan = 1 if temp > 28 else 0
```

---

### 📊 Run Exploratory Data Analysis (EDA)
- `eda.py`: used to visualize and explore the dataset (distribution, outliers, and overall data patterns) for better understanding.

```bash
python src/eda.py
```
---

## 🤖 Model

* Algorithm: Decision Tree Classifier
* Input: Temperature, Humidity
* Output: Fan ON (1) / OFF (0)

---

## 📈 Results

Example prediction:

```plaintext
Input: temp = 30, humidity = 70  
Output: 1 (Fan ON)
```

---

## 📊 Data Analysis (EDA)

* No missing values detected
* Outliers analyzed using IQR and boxplot
* Temperature shows natural variation (not removed)
* Humidity remains stable

---

## 📁 Project Structure

```plaintext
iot/
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│   └── model.pkl
│
├── src/
│   ├── preprocess.py
│   ├── train.py
│   ├── predict.py
│   └── eda.py
│
├── main.py
├── requirements.txt
└── README.md
```

---

## 👨‍💻 Author

* Student project - Smart Home AI System
