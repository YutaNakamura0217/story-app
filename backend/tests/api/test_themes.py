from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from backend.app.core.config import settings
from backend.tests.crud.test_crud_theme import create_db_theme
from backend.tests.crud.test_crud_book import create_dummy_book_for_related_tests
from backend.app import crud, schemas


def test_list_themes(client: TestClient, db_session: Session) -> None:
    theme = create_db_theme(db_session, name_suffix="API")
    book = create_dummy_book_for_related_tests(db_session, title_suffix="API")
    # Link book to theme
    crud.book.update_book(
        db_session,
        db_book=book,
        book_in=schemas.BookUpdate(theme_ids=[theme.id])
    )
    db_session.commit()

    response = client.get(f"{settings.API_V1_STR}/themes")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    # Find our theme and check book_count
    found = next((t for t in data if t["id"] == str(theme.id)), None)
    assert found is not None
    assert found["book_count"] == 1
