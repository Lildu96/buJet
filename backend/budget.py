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

def add_transaction(date, description, amount, transaction_type, account_name, category_name):
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
            category_id
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            date,
            description,
            amount,
            transaction_type,
            account_id,
            category_id
        )
    )

    connection.commit()
    connection.close()

def reset_budget_data():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM transactions;"
    )

    connection.commit()
    connection.close()