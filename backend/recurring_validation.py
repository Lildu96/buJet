from fastapi import HTTPException

def validate_recurring_day(recurring: bool, day_of_month: int | None):
    if not recurring:
        return

    if type(day_of_month) is not int or day_of_month < 1 or day_of_month > 31:
        raise HTTPException(status_code=422, detail="Please enter a valid payment date between 1 and 31")