from fastapi import APIRouter, Depends, HTTPException, status, Response
from uuid import UUID
from sqlalchemy.orm import Session

from backend.app import schemas, models
from backend.app.core.security import get_current_user
from backend.app.crud import crud_review
from backend.app.db import get_db

router = APIRouter()


@router.get("/books/{book_id}/reviews", response_model=list[schemas.ReviewRead])
def list_reviews(
    book_id: UUID,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 5,
) -> list[schemas.ReviewRead]:
    return crud_review.get_reviews_by_book(db, book_id=book_id, skip=skip, limit=limit)


@router.post("/books/{book_id}/reviews", response_model=schemas.ReviewRead)
def create_review(
    book_id: UUID,
    review_in: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.ReviewRead:
    review = crud_review.create_review(db, review=review_in, book_id=book_id, user_id=current_user.id)
    db.commit()
    db.refresh(review)
    return review


@router.get("/reviews/{review_id}", response_model=schemas.ReviewRead)
def get_review(review_id: UUID, db: Session = Depends(get_db)) -> schemas.ReviewRead:
    db_rev = crud_review.get_review(db, review_id=review_id)
    if not db_rev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    return db_rev


@router.put("/reviews/{review_id}", response_model=schemas.ReviewRead)
def update_review(
    review_id: UUID,
    review_in: schemas.ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.ReviewRead:
    db_rev = crud_review.get_review(db, review_id=review_id)
    if not db_rev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    if db_rev.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
    updated = crud_review.update_review(db, db_review=db_rev, review_in=review_in)
    db.commit()
    db.refresh(updated)
    return updated


@router.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(
    review_id: UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    db_rev = crud_review.get_review(db, review_id=review_id)
    if not db_rev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    if db_rev.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
    crud_review.delete_review(db, db_review=db_rev)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
