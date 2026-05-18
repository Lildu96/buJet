import json

with open("data/library.json", "r") as file:
    library = json.load(file)
    categories = library["categories"]

def clear_console():
    print("\033[H\033[2J", end="")
    print("\033[H\033[3J", end="")
    print("\033c", end="")

def parse_money(user_input):
    return float(user_input)

def format_money(amount):
    return f"£{amount:.2f}"

def add_expense(expenses, amount, categories, category_choice, description):
    category_choice = int(category_choice) - 1
    chosen_category = categories[category_choice]

    expenses.append({"description": description, "category": chosen_category, "amount": amount})
    print(f"Added expense: {description}, Category: {chosen_category} Amount: {format_money(amount)}")

def get_category_totals(expenses):
    category_totals = {}
    
    for expense in expenses:
        category = expense["category"]
        total = expense["amount"]

        if category in category_totals:
            category_totals[category] += total
        else:
            category_totals[category] = total
    
    return category_totals

def get_total_expenses(expenses):
    total = 0
    for expense in expenses:
        total += expense["amount"]
    return total

def get_balance(budget, expenses):
    return budget - get_total_expenses(expenses)

def show_budget_details(budget, expenses):

    category_totals = get_category_totals(expenses)

    print(f"Total Budget: {format_money(budget)}")
    print()
    print("Expenses:")
    for category, total in category_totals.items():
        print (f"- {category}: {format_money(total)}")

    print()
    print(f"Total Spend: {format_money(get_total_expenses(expenses))}")
    print(f"Remaining Budget: {format_money(get_balance(budget, expenses))}")
    print()

def load_budget_data(filepath):
    try:
        with open(filepath, 'r') as file:
            data = json.load(file)
            return data["budget"], data["expenses"]
    except (FileNotFoundError, json.JSONDecodeError):
        return 0, []
    
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
    
def main():
    print("Welcome to the Budget App")
    filepath = 'data/budget_data.json'
    budget, expenses = load_budget_data(filepath)
    if budget == 0:
        budget = parse_money(input("Please enter your initial budget: £"))
    input("Press Enter to continue...")


    while True:
        clear_console()
        print("\nWhat would you like to do?")
        print("1. Add an expense")
        print("2. Show budget details")
        print("3. Exit")
        print("4. Reset budget data")
        choice = input("Enter your choice: ")

        if choice == "1":
            clear_console()
            amount = parse_money(input("Enter expense amount: £"))
            description = input("Description: " )
            for i, category in enumerate(categories):
                print(f"{i + 1}. {category}")
            category_choice = (input("Choose a category: "))
            add_expense(expenses, amount, categories, category_choice, description)
        elif choice == "2":
            clear_console()
            show_budget_details(budget, expenses)
            input("Press Enter to continue...")
        elif choice == "3":
            clear_console()
            save_budget_details(filepath, budget, expenses)
            print("Exiting Budget App. CIAO!")
            break
        elif choice == "4":
            clear_console()
            budget, expenses = reset_budget_data(filepath)
            print("Your budget and expenses have been reset")
            budget = parse_money(input("Please enter your initial budget: £"))
        else:
            clear_console()
            print("Invalid choice, please choose again.")
            input("Press Enter to continue...")

if __name__ == "__main__":
    main()