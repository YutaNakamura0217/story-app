# Backend CRUD Operations Testing Guide

This document provides instructions and guidelines for writing unit tests for the backend CRUD (Create, Read, Update, Delete) operations in this project. We have already set up the testing environment and created tests for `crud_book.py` as an example.

## 1. Test Environment Setup

The testing environment uses `pytest` and is configured as follows:

### 1.1. Required Libraries
Ensure the following Python libraries are installed in your virtual environment:
- `pytest`
- `pytest-cov` (for test coverage)
- `pytest-asyncio` (if any async code needs testing)
- `psycopg2-binary` (for PostgreSQL connection)
- `passlib[bcrypt]` (for password hashing in user-related tests)
- `httpx` (useful for future API/integration tests)

You can install them via pip:
```bash
pip install -r ../../requirements.txt
```

### 1.2. Test Database Configuration
- A separate PostgreSQL database is used for testing to avoid affecting development data.
- The connection URL for the test database is specified in `backend/.env` as `TEST_DATABASE_URL`.
  Example: `TEST_DATABASE_URL=postgresql://user:password@host:port/your_test_db_name`
- `backend/app/db.py` has been modified to use `TEST_DATABASE_URL` when the `TESTING` environment variable is set to `true`.
- Alembic's configuration (`backend/alembic/env.py`) has also been updated to target the test database when `TESTING=true`.

### 1.3. Pytest Configuration (`backend/pytest.ini`)
This file configures `pytest`:
```ini
[pytest]
env =
    TESTING=true  # Automatically sets TESTING=true for test runs
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = --cov=app --cov-report=term-missing # Enables coverage for the 'app' directory
```

### 1.4. Core Test Fixtures (`backend/tests/conftest.py`)
This file provides shared fixtures for tests:
- **`db_engine` (session-scoped)**: Creates a SQLAlchemy engine for the test database.
- **`db_session` (function-scoped)**:
    - Provides a SQLAlchemy `Session` to each test function.
    - Creates all database tables (`Base.metadata.create_all()`) before each test.
    - Drops all database tables (`Base.metadata.drop_all()`) after each test to ensure test isolation.

## 2. Writing Unit Tests for CRUD Modules

Follow the pattern established in `backend/tests/crud/test_crud_book.py`.

### 2.1. Directory Structure
- Place test files in `backend/tests/crud/`.
- Name test files like `test_<module_name>.py` (e.g., `test_crud_user.py` for `app/crud/crud_user.py`).

### 2.2. Test Function Structure
- Import necessary modules: `pytest`, `uuid`, `Session` from `sqlalchemy.orm`, and your application's `crud`, `models`, and `schemas` from the `app` package (e.g., `from app import crud`).
- Define test functions starting with `test_` (e.g., `def test_create_user(db_session: Session):`).
- Use the `db_session` fixture provided by `conftest.py` as an argument to your test functions.

### 2.3. General Testing Pattern for a CRUD Function (e.g., `create_item`)
1.  **Arrange**:
    *   Prepare any prerequisite data (e.g., create a dummy user if creating an item that belongs to a user). Use helper functions for this if it's repetitive.
    *   Create an instance of the Pydantic schema for creation (e.g., `schemas.ItemCreate(...)`).
2.  **Act**:
    *   Call the CRUD function (e.g., `created_item = crud.item.create_item(db=db_session, item=item_in_schema, ...)`).
3.  **Assert**:
    *   Check that the returned object is not `None`.
    *   Verify that its attributes match the input data.
    *   Query the database directly using `db_session` to confirm the item was saved correctly.
    *   Check for any side effects (e.g., if creating a user also creates default settings).

### 2.4. Operations to Test for Each Model
For each model managed by a CRUD module, aim to test:
- **Create**: Creating a new item, including any relationships.
- **Get (Single)**: Retrieving an existing item by ID; attempting to retrieve a non-existent item.
- **Get (List/Multiple)**: Retrieving a list of items, including pagination (skip, limit) and any filtering options.
- **Update**: Updating various fields of an item, including relationships.
- **Delete**: Deleting an item and verifying it's removed. Check for cascade deletes if applicable (e.g., deleting a book should delete its associated `BookTheme` links).

### 2.5. Example (from `test_crud_book.py` for `create_book`)
```python
# In tests/crud/test_crud_book.py
from app import crud, models, schemas # (and other necessary imports)

# (Helper function create_dummy_themes might be defined above)

def test_create_book(db_session: Session):
    # 1. Arrange: Create prerequisite dummy themes
    dummy_themes = create_dummy_themes(db_session, count=1)
    theme1_id = dummy_themes[0].id

    # Prepare BookCreate schema
    book_in_data = {
        "title": "My Test Book",
        "author_name": "Test Author",
        "total_pages": 50,
        "theme_ids": [theme1_id]
        # ... other necessary fields
    }
    if "publish_date" in schemas.BookCreate.model_fields: # Pydantic V2
        book_in_data["publish_date"] = "2023-01-01"
    book_in = schemas.BookCreate(**book_in_data)

    # 2. Act: Call the CRUD function
    created_book = crud.book.create_book(db=db_session, book=book_in)

    # 3. Assert: Check results
    assert created_book is not None
    assert created_book.title == book_in.title
    assert len(created_book.book_themes) == 1
    # ... more assertions
```

## 3. Running Tests
- **Important**: Ensure your current working directory is `backend` before running tests.
  ```bash
  # Example:
  cd path/to/your/project/story-app/backend
  ```
- Run pytest:
  ```bash
  pytest
  ```
- Pytest will automatically discover and run tests from this `backend` directory, looking into its `tests` subdirectory. This is crucial for correct import path resolution and configuration loading.
- Coverage reports will be printed to the console.

## 4. CRUD Modules Remaining to Test
The following CRUD modules in `backend/app/crud/` still require unit tests:
- `crud_child.py`
- `crud_favorite.py`
- `crud_history.py`
- `crud_progress.py` (covers UserBookProgress, UserBookBookmark, UserBookNote)
- `crud_review.py`
- `crud_theme.py`
- `crud_user.py` (covers User, UserSettings)

## 5. Further Testing Considerations
- **Integration Tests**: After unit tests, consider writing integration tests (in `backend/tests/api/`) that test the API endpoints. These use FastAPI's `TestClient`.
- **Pydantic Warnings**: Some Pydantic V2 warnings related to `ConfigDict` and `Field(example=...)` in `schemas.py` were addressed. If more appear, they should be updated following Pydantic V2 guidelines.
- **Edge Cases**: Always consider testing edge cases (e.g., empty inputs where allowed, invalid inputs if not caught by Pydantic, large inputs, concurrency if applicable).

This guide should help in creating comprehensive tests for the remaining CRUD modules.
