from app.db import get_db  # Import the original get_db dependency
from app.main import app  # Import your FastAPI app
from fastapi.testclient import TestClient
from app.models import *
from app.db import Base  # We still need Base for metadata
from app.core.config import settings
from typing import Generator
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
import pytest


# Adjust the import path if your Base and SessionLocal are located elsewhere
# Assuming pytest is run from 'backend/', so 'app' is the path.
# Ensure all models are imported for Base.metadata

# Alembic imports for managing schema (optional, can use Base.metadata.create_all for simplicity)
# from alembic.config import Config
# from alembic import command

# FastAPI TestClient

# Determine the Test Database URL from settings
if not settings.TESTING:
    # This should not happen if pytest.ini sets TESTING=true via env var for settings
    # Or if settings.TESTING is directly True for test environment
    # For safety, one might raise an error or log if settings.TESTING is not True here.
    # However, pytest.ini should ensure settings.TESTING is True.
    pass

if not settings.TEST_DATABASE_URL:
    raise ValueError(
        "TEST_DATABASE_URL must be set in .env file or environment for testing.")

TEST_SQLALCHEMY_DATABASE_URL = settings.TEST_DATABASE_URL
# Ensure the test URL uses psycopg2 driver if not specified, similar to db.py
if "postgresql://" in TEST_SQLALCHEMY_DATABASE_URL and "psycopg2" not in TEST_SQLALCHEMY_DATABASE_URL:
    TEST_SQLALCHEMY_DATABASE_URL = TEST_SQLALCHEMY_DATABASE_URL.replace(
        "postgresql://", "postgresql+psycopg2://")


@pytest.fixture(scope="session")
def db_engine():
    """
    Fixture to create a test database engine.
    It uses the TEST_SQLALCHEMY_DATABASE_URL.
    It also ensures all tables are dropped and recreated at the start of the session
    to guarantee a clean state for the entire test run, in addition to per-function cleanup.
    """
    engine = create_engine(TEST_SQLALCHEMY_DATABASE_URL,
                           echo=False, future=True)

    # Force close any existing connections, then drop and recreate tables
    # This is a more aggressive cleanup for the start of the session.
    engine.dispose()  # Close all connections in the connection pool
    with engine.connect() as connection:
        # For PostgreSQL, you might need to terminate active connections to the database
        # if drop_all fails. This is an advanced step not typically needed.
        # For now, let's assume dispose() + drop_all() is enough.
        pass  # Ensure engine is active for metadata operations

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    yield engine

    engine.dispose()  # Clean up connections at the very end


@pytest.fixture(scope="function")
def db_session(db_engine) -> Generator[Session, None, None]:
    """
    Fixture to provide a database session with a clean schema for each test.
    Creates all tables before the test and drops them afterwards.
    """
    # The db_engine fixture (session-scoped) now handles initial table creation.
    # This function-scoped fixture will provide a session within a single transaction
    # that is rolled back at the end of the test.
    connection = db_engine.connect()
    transaction = connection.begin()
    db = Session(bind=connection, future=True)

    try:
        yield db
    finally:
        db.close()  # Close the session first.
        transaction.rollback()  # Rollback the transaction.
        connection.close()  # Close the connection.


@pytest.fixture(scope="function")
def client(db_session: Session) -> Generator[TestClient, None, None]:
    """
    Fixture to provide a FastAPI TestClient that uses the test database session.
    Overrides the get_db dependency for the app.
    """
    def override_get_db() -> Generator[Session, None, None]:
        try:
            yield db_session
        finally:
            # The db_session fixture itself handles close/rollback/commit
            pass

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c

    # Clean up dependency override after test
    app.dependency_overrides.clear()


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
