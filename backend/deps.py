from database import SessionLocal
from auth import get_current_user  # single source of truth
from sqlalchemy.orm import Session


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# get_current_user is imported from auth.py — no duplication
__all__ = ["get_db", "get_current_user"]
