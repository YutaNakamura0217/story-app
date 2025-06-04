from fastapi.testclient import TestClient
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from backend.app.core.config import settings


def get_auth_headers(client: TestClient, email: str, password: str, name: str) -> dict:
    client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={"email": email, "password": password, "name": name},
    )
    resp = client.post(
        f"{settings.API_V1_STR}/auth/login",
        data={"username": email, "password": password},
    )
    token = resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_get_and_update_me(client: TestClient, db_session: Session) -> None:
    email = "user_me@example.com"
    password = "Secure123!"
    name = "User Me"
    headers = get_auth_headers(client, email, password, name)

    response = client.get(f"{settings.API_V1_STR}/users/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == email

    update_resp = client.put(
        f"{settings.API_V1_STR}/users/me",
        json={"name": "Updated"},
        headers=headers,
    )
    assert update_resp.status_code == 200
    assert update_resp.json()["name"] == "Updated"
