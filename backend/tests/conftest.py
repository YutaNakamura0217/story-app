import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

# Adjust the import path if your Base and SessionLocal are located elsewhere
# Assuming pytest is run from the 'backend' directory, 'app' is a top-level package.
# APP_DB_URL is already test-aware
from app.db import Base, DATABASE_URL as APP_DB_URL
# Ensure all models are imported for Base.metadata
from app.models import *

# Alembic imports for managing schema (optional, can use Base.metadata.create_all for simplicity)
# from alembic.config import Config
# from alembic import command

# Use the DATABASE_URL from db.py which is already configured to use TEST_DATABASE_URL
# when TESTING=true (set by pytest.ini)
TEST_SQLALCHEMY_DATABASE_URL = APP_DB_URL


@pytest.fixture(scope="session")
def db_engine():
    """
    Fixture to create a test database engine.
    It uses the TEST_SQLALCHEMY_DATABASE_URL.
    The schema (tables) will be created and dropped per test function
    by the db_session fixture.
    """
    engine = create_engine(TEST_SQLALCHEMY_DATABASE_URL,
                           echo=False, future=True)
    yield engine
    engine.dispose()


@pytest.fixture(scope="function")
def db_session(db_engine) -> Generator[Session, None, None]:
    """
    Fixture to provide a database session with a clean schema for each test.
    Creates all tables before the test and drops them afterwards.
    """
    # Create a new SessionLocal factory bound to the test engine
    TestSessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=db_engine, future=True)

    # Create all tables
    # This ensures a clean schema for each test.
    # For more complex scenarios or if you want to test migrations themselves,
    # you might integrate Alembic here to run migrations up to head.
    Base.metadata.create_all(bind=db_engine)

    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Drop all tables to ensure isolation between tests
        Base.metadata.drop_all(bind=db_engine)

# If you prefer to use Alembic to manage the test schema:
# @pytest.fixture(scope="session")
# def apply_migrations(db_engine):
#     """
#     Applies Alembic migrations to the test database at the start of the session.
#     """
#     alembic_cfg = Config("alembic.ini") # Assumes alembic.ini is in the root
#     # Point Alembic to the test database
#     # The env.py should already be configured to use TEST_DATABASE_URL via TESTING env var
#
#     # Ensure alembic.ini's sqlalchemy.url is also overridden or ignored if env.py handles it
#     # Forcing it here might be an option if env.py isn't fully overriding
#     # alembic_cfg.set_main_option("sqlalchemy.url", TEST_SQLALCHEMY_DATABASE_URL)
#
#     command.upgrade(alembic_cfg, "head")
#     yield
#     # Optionally, downgrade to base after tests if needed, or just drop tables
#     # command.downgrade(alembic_cfg, "base")


# Example of a fixture that depends on migrations (if using the Alembic approach)
# @pytest.fixture(scope="function")
# def db_session_with_migrations(db_engine, apply_migrations) -> Generator[Session, None, None]:
#     TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=db_engine, future=True)
#     db = TestSessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
#         # Clean up data, but tables remain as migrations handled schema
#         for table in reversed(Base.metadata.sorted_tables):
#             db.execute(table.delete())
#         db.commit()
