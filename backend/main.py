from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from budget import reset_budget_data, add_expense, add_income

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
    income_data, expense_data = reset_budget_data(DATA_FILE)

    return {
        "income": income_data,
        "expenses": expense_data
    }

@app.post("/expenses")
def create_expense(expense_item: dict):
    income_data, expense_data = add_expense(DATA_FILE, expense_item)

    return {
        "income": income_data,
        "expenses": expense_data
    }

@app.post("/income")
def create_income(income_item: dict):
    income_data, expense_data = add_income(DATA_FILE, income_item)

    return {
        "income": income_data,
        "expenses": expense_data
    }