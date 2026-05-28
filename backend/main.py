from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from budget import reset_budget_data, add_expense

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "data/budget.json"

@app.post("/reset-data")
def reset_data():
    budget, expenses = reset_budget_data(DATA_FILE)

    return {
        "budget": budget,
        "expenses": expenses
    }

@app.post("/expenses")
def create_expense(expense: dict):
    budget, expenses = add_expense(DATA_FILE, expense)

    return {
        "budget": budget,
        "expenses": expenses
    }