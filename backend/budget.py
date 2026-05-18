import json

filepath = "data/budget.json"

def save_budget_details(filepath, budget, expenses):
    data = {
        'budget': budget,
        'expenses': expenses
    }
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def reset_budget_data(filepath):
    save_budget_details(filepath, 0, [])
    return 0, []