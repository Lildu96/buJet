import os

def is_development():
    return os.getenv("APP_ENV") == "development"