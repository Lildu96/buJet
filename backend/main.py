from fastapi import FastAPI
from budget import reset_budget_data

app = FastAPI()

DATA_FILE = "data/budget.json"

@app.post("/reset-data")
def reset_data():
    budget, expenses = reset_budget_data(DATA_FILE)

    return reset_budget_data(DATA_FILE)