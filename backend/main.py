from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import init_budget_db, add_transaction, load_library, reset_budget_data, load_overview_data, load_accounts

app = FastAPI()

init_budget_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/library")
def get_library():
    return load_library()

@app.post("/reset-data")
def reset_data():
    reset_budget_data()

    return {
        "message": "Data reset succesfully"
    }

@app.post("/expenses")
def create_expense(expense_item: dict):
    add_transaction(
        date=expense_item["createdAt"],
        description=expense_item["description"],
        amount=expense_item["amount"],
        transaction_type="expense",
        account_name=expense_item["account"],
        category_name=expense_item["category"]
    )

    return {
        "message": "Expense added"
    }

@app.post("/income")
def create_income(income_item: dict):
    add_transaction(
        date=income_item["createdAt"],
        description="",
        amount=income_item["amount"],
        transaction_type="income",
        account_name="Personal",
        category_name=income_item["category"]
    )

    return {
        "message": "Income added"
    }

@app.get("/overview")
def get_overview():
    overview = load_overview_data()

    return overview

@app.get("/accounts")
def get_accounts():
    accounts = load_accounts()

    return accounts