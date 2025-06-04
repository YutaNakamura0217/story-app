from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi import Response
import uuid

from backend.app import schemas, models
from backend.app.crud import crud_favorite, crud_book
from backend.app.core.security import get_current_user
from backend.app.db import get_db

router = APIRouter()


@router.get("/users/me/favorites", response_model=list[schemas.BookRead])
def list_favorites(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> list[schemas.BookRead]:
    books = crud_favorite.get_user_favorites(
        db, user_id=current_user.id, skip=skip, limit=limit
    )
    return books


@router.post("/users/me/favorites/{book_id}", response_model=schemas.Msg)
def add_favorite(
    book_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.Msg:
    db_book = crud_book.get_book(db, book_id=book_id)
    if not db_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")

    crud_favorite.add_favorite(db, user_id=current_user.id, book_id=book_id)
    db.commit()
    return {"message": "Book added to favorites"}


@router.delete("/users/me/favorites/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_favorite(
    book_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    fav = crud_favorite.remove_favorite(db, user_id=current_user.id, book_id=book_id)
    if not fav:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite not found")
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
