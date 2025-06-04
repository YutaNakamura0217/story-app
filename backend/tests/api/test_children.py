from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from backend.app.core.config import settings
from backend.tests.api.test_users import get_auth_headers
from backend.tests.crud.test_crud_child import create_dummy_child_data


def test_child_crud(client: TestClient, db_session: Session) -> None:
    email = "childapi@example.com"
    password = "ChildAPI123"
    name = "Child API"
    headers = get_auth_headers(client, email, password, name)

    # Create child
    child_data = create_dummy_child_data("api")
    resp = client.post(
        f"{settings.API_V1_STR}/users/me/children",
        json=child_data.model_dump(),
        headers=headers,
    )
    assert resp.status_code == 201
    created = resp.json()
    child_id = created["id"]
    assert created["name"] == child_data.name

    # List children
    resp = client.get(f"{settings.API_V1_STR}/users/me/children", headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert any(c["id"] == child_id for c in data)

    # Update child
    resp = client.put(
        f"{settings.API_V1_STR}/users/me/children/{child_id}",
        json={"age": 8},
        headers=headers,
    )
    assert resp.status_code == 200
    assert resp.json()["age"] == 8

    # Delete child
    resp = client.delete(
        f"{settings.API_V1_STR}/users/me/children/{child_id}", headers=headers
    )
    assert resp.status_code == 204

    # Ensure deleted
    resp = client.get(
        f"{settings.API_V1_STR}/users/me/children/{child_id}", headers=headers
    )
    assert resp.status_code == 404
