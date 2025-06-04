from typing import Optional
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from backend.app import schemas
from backend.app.crud import crud_book
from backend.app.db import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.BookRead])
def list_books(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1),
    theme_id: Optional[uuid.UUID] = Query(None),
) -> list[schemas.BookRead]:
    """Retrieve books with optional filtering."""
    books = crud_book.get_books(db, skip=skip, limit=limit, theme_id=theme_id)
    return books


@router.get("/{book_id}", response_model=schemas.BookRead)
def get_book(book_id: uuid.UUID, db: Session = Depends(get_db)) -> schemas.BookRead:
    """Retrieve a single book by ID."""
    book = crud_book.get_book(db, book_id=book_id)
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return book


@router.get("/{book_id}/pages", response_model=list[schemas.BookPageRead])
def get_book_pages(
    book_id: uuid.UUID,
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1),
) -> list[schemas.BookPageRead]:
    """Retrieve book pages."""
    pages = crud_book.get_book_pages_by_book(db, book_id=book_id, skip=skip, limit=limit)
    return pages
