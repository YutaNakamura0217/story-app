from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.tests.api.test_users import get_auth_headers
from backend.tests.crud.test_crud_book import create_dummy_book_for_related_tests


def test_add_and_list_favorites(client: TestClient, db_session: Session) -> None:
    email = "favuser@example.com"
    password = "FavPass123"
    name = "Fav User"
    headers = get_auth_headers(client, email, password, name)

    book = create_dummy_book_for_related_tests(db_session, title_suffix="_fav")
    db_session.commit()

    resp = client.post(
        f"{settings.API_V1_STR}/users/me/favorites/{book.id}", headers=headers
    )
    assert resp.status_code == 200
    assert resp.json()["message"] == "Book added to favorites"

    list_resp = client.get(
        f"{settings.API_V1_STR}/users/me/favorites", headers=headers
    )
    assert list_resp.status_code == 200
    data = list_resp.json()
    assert len(data) == 1
    assert data[0]["id"] == str(book.id)


def test_remove_favorite(client: TestClient, db_session: Session) -> None:
    email = "favdel@example.com"
    password = "FavDel123"
    name = "Fav Del"
    headers = get_auth_headers(client, email, password, name)

    book = create_dummy_book_for_related_tests(db_session, title_suffix="_del")
    db_session.commit()

    client.post(
        f"{settings.API_V1_STR}/users/me/favorites/{book.id}", headers=headers
    )
    del_resp = client.delete(
        f"{settings.API_V1_STR}/users/me/favorites/{book.id}", headers=headers
    )
    assert del_resp.status_code == 204

    list_resp = client.get(
        f"{settings.API_V1_STR}/users/me/favorites", headers=headers
    )
    assert list_resp.status_code == 200
    assert list_resp.json() == []
