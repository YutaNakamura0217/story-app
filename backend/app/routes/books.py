from typing import Optional
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from sqlalchemy.orm import Session

from backend.app import schemas
from backend.app.crud import crud_book
from backend.app.core.security import get_current_user
from backend.app import models
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


@router.post("/", response_model=schemas.BookRead)
def create_book(
    book_in: schemas.BookCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.BookRead:
    new_book = crud_book.create_book(db, book_in)
    db.commit()
    db.refresh(new_book)
    return new_book


@router.put("/{book_id}", response_model=schemas.BookRead)
def update_book(
    book_id: uuid.UUID,
    book_in: schemas.BookUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.BookRead:
    db_book = crud_book.get_book(db, book_id=book_id)
    if not db_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    updated = crud_book.update_book(db, db_book=db_book, book_in=book_in)
    db.commit()
    db.refresh(updated)
    return updated


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(
    book_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    db_book = crud_book.get_book(db, book_id=book_id)
    if not db_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    crud_book.delete_book(db, db_book=db_book)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/{book_id}/pages", response_model=schemas.BookPageRead)
def create_book_page(
    book_id: uuid.UUID,
    page_in: schemas.BookPageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.BookPageRead:
    page = crud_book.create_book_page(db, page=page_in, book_id=book_id)
    db.commit()
    db.refresh(page)
    return page


@router.put("/{book_id}/pages/{page_id}", response_model=schemas.BookPageRead)
def update_book_page(
    book_id: uuid.UUID,
    page_id: uuid.UUID,
    page_in: schemas.BookPageUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.BookPageRead:
    db_page = crud_book.get_book_page(db, page_id=page_id, book_id=book_id)
    if not db_page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")
    updated = crud_book.update_book_page(db, db_page=db_page, page_in=page_in)
    db.commit()
    db.refresh(updated)
    return updated


@router.delete("/{book_id}/pages/{page_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book_page(
    book_id: uuid.UUID,
    page_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    db_page = crud_book.get_book_page(db, page_id=page_id, book_id=book_id)
    if not db_page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")
    crud_book.delete_book_page(db, db_page=db_page)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/{book_id}/toc", response_model=schemas.BookTocItemRead)
def create_toc_item(
    book_id: uuid.UUID,
    toc_in: schemas.BookTocItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.BookTocItemRead:
    toc = crud_book.create_book_toc_item(db, toc_item=toc_in, book_id=book_id)
    db.commit()
    db.refresh(toc)
    return toc


@router.put("/{book_id}/toc/{toc_id}", response_model=schemas.BookTocItemRead)
def update_toc_item(
    book_id: uuid.UUID,
    toc_id: uuid.UUID,
    toc_in: schemas.BookTocItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.BookTocItemRead:
    db_item = crud_book.get_book_toc_item(db, toc_item_id=toc_id, book_id=book_id)
    if not db_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TOC item not found")
    updated = crud_book.update_book_toc_item(db, db_toc_item=db_item, toc_item_in=toc_in)
    db.commit()
    db.refresh(updated)
    return updated


@router.delete("/{book_id}/toc/{toc_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_toc_item(
    book_id: uuid.UUID,
    toc_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    db_item = crud_book.get_book_toc_item(db, toc_item_id=toc_id, book_id=book_id)
    if not db_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TOC item not found")
    crud_book.delete_book_toc_item(db, db_toc_item=db_item)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
