import sqlite3
import json
from pathlib import Path

LIBRARY_PATH = Path(__file__).parent.parent / "shared" / "data" / "library.json"

DB_PATH = Path(__file__).parent / "data" / "budget.db"

def load_library():
    with open(LIBRARY_PATH, "r") as file:
        return json.load(file)

def init_budget_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            description TEXT,
            amount REAL NOT NULL,
            type TEXT NOT NULL,
            account_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            recurring_transaction_id INTEGER,
            FOREIGN KEY (recurring_transaction_id) REFERENCES recurring_transactions(id),
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recurring_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day_of_month NOT NULL,
            description TEXT,
            amount REAL NOT NULL,
            type TEXT NOT NULL,
            account_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    """)

    default_accounts = ["Personal", "Budget", "Jet"]

    for account in default_accounts:
        cursor.execute(
            "INSERT OR IGNORE INTO accounts (name) VALUES (?)",
            (account,)
        )

    with open(LIBRARY_PATH, "r") as file:
        library =json.load(file)

    categories = set(library["expenseCategories"] + library["incomeCategories"])

    for category in categories:
        cursor.execute(
            "INSERT OR IGNORE INTO categories (name) VALUES (?)",
            (category,)
        )

    connection.commit()
    connection.close()

def add_transaction(date, description, amount, transaction_type, account_name, category_name, recurring_transaction_id=None):
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id FROM accounts WHERE name = ?",
        (account_name,)
    )
    account = cursor.fetchone()
    account_id = account[0]
    
    cursor.execute(
        "SELECT id FROM categories WHERE name = ?",
        (category_name,)
    )
    categories = cursor.fetchone()
    category_id = categories[0]

    cursor.execute(
        """
        INSERT INTO transactions (
            date,
            description,
            amount,
            type,
            account_id,
            category_id,
            recurring_transaction_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            date,
            description,
            amount,
            transaction_type,
            account_id,
            category_id,
            recurring_transaction_id
        )
    )

    connection.commit()
    connection.close()

def add_recurring_transaction(day_of_month, description, amount, transaction_type, account_name, category_name):
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id FROM accounts WHERE name = ?",
        (account_name,)
    )
    account = cursor.fetchone()
    account_id = account[0]
    
    cursor.execute(
        "SELECT id FROM categories WHERE name = ?",
        (category_name,)
    )
    categories = cursor.fetchone()
    category_id = categories[0]

    cursor.execute(
        """
        INSERT INTO recurring_transactions (
            day_of_month,
            description,
            amount,
            type,
            account_id,
            category_id
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            day_of_month,
            description,
            amount,
            transaction_type,
            account_id,
            category_id
        )
    )

    recurring_id = cursor.lastrowid

    connection.commit()
    connection.close()

    return recurring_id



def reset_budget_data():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM transactions;"
    )

    connection.commit()
    connection.close()

def load_accounts():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id, name FROM accounts",
    )

    accounts = cursor.fetchall()

    formatted_accounts = []

    for account in accounts:
        account_data = {
            "id": account[0],
            "name": account[1],
        }
        formatted_accounts.append(account_data)

    connection.close()
    return formatted_accounts

def load_overview_data():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    account_names = [ "Budget", "Personal", "Jet" ]
    account_summaries = {}

    # Fetch and calculate remaining amount for all accounts
    for account_name in account_names:
        cursor.execute(
            "SELECT id FROM accounts WHERE name = ?",
            (account_name,)
        )
        account = cursor.fetchone()
        account_id = account[0]

        cursor.execute(
            "SELECT SUM(amount) FROM transactions WHERE type = 'income' AND account_id = ?",
            (account_id,)
        )
        income = cursor.fetchone()[0] or 0

        cursor.execute(
            "SELECT SUM(amount) FROM transactions WHERE type ='expense' AND account_id = ?",
            (account_id,)
        )
        expense = cursor.fetchone()[0] or 0

        remaining = income - expense

        account_summaries[account_name.lower()] = { 
            "income": income,
            "expense": expense,
            "remaining":  remaining
        }
    
    connection.close()

    return {
        "accounts": account_summaries,
    }
