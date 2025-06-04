from fastapi import APIRouter, Depends, Query
import uuid
from sqlalchemy.orm import Session

from backend.app import schemas
from backend.app.crud import crud_theme, crud_book
from backend.app.db import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.ThemeRead])
def list_themes(db: Session = Depends(get_db), skip: int = 0, limit: int = 100) -> list[schemas.ThemeRead]:
    themes = crud_theme.get_themes(db, skip=skip, limit=limit)
    result = []
    for theme in themes:
        book_count = len(theme.book_themes)
        result.append(schemas.ThemeRead.model_validate(
            theme, context={"book_count": book_count}))
    return result


@router.get("/{theme_id}/books", response_model=list[schemas.BookRead])
def books_by_theme(
    theme_id: uuid.UUID,
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1)
) -> list[schemas.BookRead]:
    books = crud_book.get_books(db, skip=skip, limit=limit, theme_id=theme_id)
    return books
