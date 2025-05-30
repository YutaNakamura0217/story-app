from __future__ import annotations  # 3.7–3.9 互換のため（任意）
from typing import Generator
from contextlib import contextmanager
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import (
    declarative_base,
    sessionmaker,
    Session,
)

load_dotenv()

# Determine if running in test mode
TESTING_MODE = os.getenv("TESTING", "false").lower() == "true"

if TESTING_MODE:
    DATABASE_URL = os.getenv("TEST_DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError(
            "TEST_DATABASE_URL not set in environment for testing mode")
    # Ensure the test URL uses psycopg2 driver if not specified, or adjust as needed
    if "postgresql://" in DATABASE_URL and "psycopg2" not in DATABASE_URL:
        DATABASE_URL = DATABASE_URL.replace(
            "postgresql://", "postgresql+psycopg2://")
else:
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        # Fallback if DATABASE_URL is not in .env for some reason (though it should be)
        DATABASE_URL = "postgresql+psycopg2://postgres:Yuki0217@localhost:5432/story_app"


engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    future=True,
)

SessionLocal: sessionmaker[Session] = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
    future=True,
)

Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI の Depends で呼ばれる DB セッション依存性
    1 リクエストにつき 1 セッションを生成し、
    処理完了後に commit / rollback / close を行う。
    """
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


@contextmanager
def session_scope() -> Generator[Session, None, None]:
    """
    例:
        with session_scope() as db:
            db.add(obj)
    処理成功で commit、例外時 rollback。
    """
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
