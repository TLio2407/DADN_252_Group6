from sklearn.tree import DecisionTreeClassifier
import joblib

def train_model(X, y):
    model = DecisionTreeClassifier()
    model.fit(X, y)

    # save model
    joblib.dump(model, "models/model.pkl")

    return model