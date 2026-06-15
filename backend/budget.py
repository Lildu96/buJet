import json

filepath = "data/budget.json"

def save_budget_details(filepath, income_data, expense_data):
    data = {
        'income': income_data,
        'expenses': expense_data
    }
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def load_budget_data(filepath):
    try:
        with open(filepath, 'r') as file:
            data = json.load(file)
            return data["income"], data["expenses"]
    except (FileNotFoundError, json.JSONDecodeError):
        return [], []
    
def add_income(filepath, income_data):
    income, expenses = load_budget_data(filepath)

    income.append(income_data)

    save_budget_details(filepath, income, expenses)

    return income, expenses
    
def add_expense(filepath, expense_data):
    income, expenses = load_budget_data(filepath)

    expenses.append(expense_data)

    save_budget_details(filepath, income, expenses)

    return income, expenses

def reset_budget_data(filepath):
    save_budget_details(filepath, [], [])
    return [], []