from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.tests.api.test_users import get_auth_headers

def test_progress_flow(client: TestClient, db_session: Session) -> None:
    email = "prog@example.com"
    password = "Pass1234"
    name = "Prog User"
    headers = get_auth_headers(client, email, password, name)

    # create a book via crud helper
    from backend.tests.crud.test_crud_review import create_db_book_for_review
    db_book = create_db_book_for_review(db=db_session, title_suffix="_api_prog")

    book_id = str(db_book.id)

    # get progress (should create)
    resp = client.get(f"{settings.API_V1_STR}/users/me/books/{book_id}/progress", headers=headers)
    assert resp.status_code == 200
    progress = resp.json()
    assert progress["current_page"] == 1

    # update page
    resp = client.put(
        f"{settings.API_V1_STR}/users/me/books/{book_id}/progress",
        json={"current_page": 2},
        headers=headers,
    )
    assert resp.status_code == 200
    assert resp.json()["current_page"] == 2

    # add bookmark
    resp = client.post(
        f"{settings.API_V1_STR}/users/me/books/{book_id}/bookmarks",
        json={"page_number": 2},
        headers=headers,
    )
    assert resp.status_code == 200

    # add note
    resp = client.post(
        f"{settings.API_V1_STR}/users/me/books/{book_id}/notes",
        json={"page_number": 2, "text": "note"},
        headers=headers,
    )
    assert resp.status_code == 200
    note_id = resp.json()["id"]

    # delete note
    resp = client.delete(
        f"{settings.API_V1_STR}/users/me/books/{book_id}/notes/{note_id}",
        headers=headers,
    )
    assert resp.status_code == 204
