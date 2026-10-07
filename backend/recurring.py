import sqlite3
from datetime import date
from calendar import monthrange
from backend.database import DB_PATH

def process_recurring_transactions():
    today = date.today()

    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            id,
            day_of_month,
            description,
            amount,
            type,
            account_id,
            category_id
        FROM recurring_transactions
        WHERE active = 1
        """
    )
    recurring_rows = cursor.fetchall()

    for row in recurring_rows:
        recurring_id=row[0]
        day_of_month=row[1]
        description=row[2]
        amount=row[3]
        transaction_type=row[4]
        account_id=row[5]
        category_id=row[6]

        days_in_month = monthrange(today.year, today.month)[1]
        due_day = min(day_of_month, days_in_month)
        due_date = date(today.year, today.month, due_day)

        if today < due_date:
            continue

        month_prefix = f"{today.year}-{today.month:02d}"

        cursor.execute(
            """
            SELECT id
            FROM transactions
            WHERE recurring_transaction_id = ?
            AND date LIKE ?
            """,
            (
                recurring_id, 
                month_prefix + "%"
            )
        )
        existing_transaction = cursor.fetchone()

        if existing_transaction:
            continue

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
                due_date.isoformat(),
                description,
                amount,
                transaction_type,
                account_id,
                category_id,
                recurring_id
            )
        )

    connection.commit()
    connection.close()

if __name__ == "__main__":
    process_recurring_transactions()