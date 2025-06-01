from __future__ import annotations  # 3.7–3.9 互換のため（任意）
from typing import Generator
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import (
    declarative_base,
    sessionmaker,
    Session,
)

from backend.app.core.config import settings

# Determine if running in test mode
TESTING_MODE = settings.TESTING

if TESTING_MODE:
    CURRENT_DATABASE_URL = settings.TEST_DATABASE_URL
    if not CURRENT_DATABASE_URL:
        raise ValueError(
            "TEST_DATABASE_URL not set in .env file or environment for testing mode")
    # Ensure the test URL uses psycopg2 driver if not specified, or adjust as needed
    # This logic might be better placed in config.py if complex validation/transformation is needed
    if "postgresql://" in CURRENT_DATABASE_URL and "psycopg2" not in CURRENT_DATABASE_URL:
        CURRENT_DATABASE_URL = CURRENT_DATABASE_URL.replace(
            "postgresql://", "postgresql+psycopg2://")
else:
    CURRENT_DATABASE_URL = settings.DATABASE_URL
    if not CURRENT_DATABASE_URL:
        # This case should ideally not happen if config.py has a default or .env provides it
        raise ValueError(
            "DATABASE_URL not set in .env file or environment for non-testing mode")


engine = create_engine(
    CURRENT_DATABASE_URL,
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
