from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.tests.api.test_users import get_auth_headers


def test_refresh_token(client: TestClient, db_session: Session) -> None:
    email = "ref@example.com"
    password = "Pass1234"
    name = "Ref User"
    headers = get_auth_headers(client, email, password, name)

    resp = client.post(f"{settings.API_V1_STR}/auth/refresh", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["token_type"] == "bearer"
    assert "access_token" in data
