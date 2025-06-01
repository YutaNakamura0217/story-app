from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from backend.app.core.config import settings
from backend.app import schemas

# Test user data
test_user_email = "testuser@example.com"
test_user_password = "SecurePassword123"
test_user_name = "Test User"


def test_user_registration(client: TestClient, db_session: Session) -> None:
    """
    Test user registration endpoint.
    """
    unique_registration_email = "testregister2@example.com"
    response = client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={
            "email": unique_registration_email,
            "password": test_user_password,
            "name": "Test Register User"
            # avatar_url and introduction are optional
        },
    )
    # Based on auth.py, should be 200 if Token schema is used
    if response.status_code != 200:
        print("Registration failed with status:", response.status_code)
        try:
            print("Response JSON:", response.json())
        except Exception as e:
            print("Response text (not JSON):", response.text)
            print("Error decoding JSON:", e)
    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert "access_token" in data
    assert data["user"]["email"] == unique_registration_email
    assert data["user"]["name"] == "Test Register User"
    assert "id" in data["user"]
    assert "tier" in data["user"]  # Default tier should be assigned

    # Verify token data if possible (optional, requires token decoding logic for test)


def test_register_existing_user(client: TestClient, db_session: Session) -> None:
    """
    Test attempting to register a user with an email that already exists.
    """
    # First, register a user
    client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={
            "email": "existinguser@example.com",
            "password": test_user_password,
            "name": "Existing User"
        },
    )
    # Attempt to register again with the same email
    response = client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={
            "email": "existinguser@example.com",
            "password": "anotherpassword",
            "name": "Another Name"
        },
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Email already registered"


def test_user_login(client: TestClient, db_session: Session) -> None:
    """
    Test user login endpoint with correct credentials.
    """
    # Register user first
    client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={
            "email": test_user_email,
            "password": test_user_password,
            "name": test_user_name
        },
    )

    login_response = client.post(
        f"{settings.API_V1_STR}/auth/login",
        # OAuth2PasswordRequestForm uses form data
        data={"username": test_user_email, "password": test_user_password},
    )
    assert login_response.status_code == 200
    data = login_response.json()
    assert data["token_type"] == "bearer"
    assert "access_token" in data
    assert data["user"]["email"] == test_user_email
    assert data["user"]["name"] == test_user_name


def test_login_incorrect_password(client: TestClient, db_session: Session) -> None:
    """
    Test user login with incorrect password.
    """
    # Register user
    client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={
            "email": "loginfail@example.com",
            "password": test_user_password,
            "name": "Login Fail User"
        },
    )

    response = client.post(
        f"{settings.API_V1_STR}/auth/login",
        data={"username": "loginfail@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    data = response.json()
    assert data["detail"] == "Incorrect email or password"


def test_login_non_existent_user(client: TestClient, db_session: Session) -> None:
    """
    Test user login with a non-existent email.
    """
    response = client.post(
        f"{settings.API_V1_STR}/auth/login",
        data={"username": "nosuchuser@example.com", "password": "anypassword"},
    )
    # Or 404 depending on how you want to reveal info
    assert response.status_code == 401
    # Current auth.py returns 401 for both cases
    data = response.json()
    assert data["detail"] == "Incorrect email or password"

# Placeholder tests for password reset functionality (mocked endpoints)
# These will need to be updated when the actual logic is implemented.


def test_request_password_reset_existing_user(client: TestClient, db_session: Session) -> None:
    """Test requesting password reset for an existing user (mocked)."""
    # Register user
    client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={"email": "resetpass@example.com",
              "password": "password123", "name": "Reset Pass"}
    )
    response = client.post(
        f"{settings.API_V1_STR}/auth/request-password-reset",
        json={"email": "resetpass@example.com"}
    )
    assert response.status_code == 200
    assert response.json() == {
        "message": "Password reset email sent (mocked)."}


def test_request_password_reset_non_existing_user(client: TestClient, db_session: Session) -> None:
    """Test requesting password reset for a non-existing user (mocked)."""
    response = client.post(
        f"{settings.API_V1_STR}/auth/request-password-reset",
        json={"email": "nonexisting@example.com"}
    )
    assert response.status_code == 404  # As per current auth.py implementation
    assert response.json()[
        "detail"] == "The user with this email does not exist in the system."


def test_reset_password(client: TestClient, db_session: Session) -> None:
    """Test resetting password (mocked)."""
    response = client.post(
        f"{settings.API_V1_STR}/auth/reset-password",
        json={"token": "fake-reset-token",
              "new_password": "newSecurePassword123"}
    )
    assert response.status_code == 200
    assert response.json() == {
        "message": "Password reset successfully (mocked)."}
