import json

filepath = "data/budget.json"

def save_budget_details(filepath, budget, expenses):
    data = {
        'budget': budget,
        'expenses': expenses
    }
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def load_budget_data(filepath):
    try:
        with open(filepath, 'r') as file:
            data = json.load(file)
            return data["budget"], data["expenses"]
    except (FileNotFoundError, json.JSONDecodeError):
        return 0, []
    
def add_expense(filepath, expense):
    budget, expenses = load_budget_data(filepath)

    expenses.append(expense)

    save_budget_details(filepath, budget, expenses)

    return budget, expenses

def reset_budget_data(filepath):
    save_budget_details(filepath, 0, [])
    return 0, []