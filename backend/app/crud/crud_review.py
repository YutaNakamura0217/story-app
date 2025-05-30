import uuid
from typing import List, Optional

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, desc

from .. import models, schemas


def create_review(db: Session, review: schemas.ReviewCreate, book_id: uuid.UUID, user_id: uuid.UUID) -> models.Review:
    db_review = models.Review(
        **review.dict(),
        book_id=book_id,
        user_id=user_id
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


def get_review(db: Session, review_id: uuid.UUID) -> Optional[models.Review]:
    return db.query(models.Review).options(
        joinedload(models.Review.user)  # To populate user info for ReviewRead
    ).filter(models.Review.id == review_id).first()


def get_reviews_by_book(
    db: Session,
    book_id: uuid.UUID,
    skip: int = 0,
    limit: int = 5  # As per plan example
) -> List[models.Review]:
    return db.query(models.Review).options(
        joinedload(models.Review.user)  # To populate user info for ReviewRead
    ).filter(models.Review.book_id == book_id).order_by(desc(models.Review.created_at)).offset(skip).limit(limit).all()


def get_reviews_by_user(
    db: Session,
    user_id: uuid.UUID,
    skip: int = 0,
    limit: int = 100
) -> List[models.Review]:
    return db.query(models.Review).options(
        joinedload(models.Review.user)  # To populate user info for ReviewRead
    ).filter(models.Review.user_id == user_id).order_by(desc(models.Review.created_at)).offset(skip).limit(limit).all()


def update_review(db: Session, db_review: models.Review, review_in: schemas.ReviewUpdate) -> models.Review:
    update_data = review_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_review, field, value)

    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


def delete_review(db: Session, db_review: models.Review) -> models.Review:
    db.delete(db_review)
    db.commit()
    return db_review


def get_review_summary_by_book(db: Session, book_id: uuid.UUID) -> schemas.ReviewSummary:
    summary_query = db.query(
        func.avg(models.Review.rating).label("average_rating"),
        func.count(models.Review.id).label("total_reviews")
    ).filter(models.Review.book_id == book_id).first()

    avg_rating = summary_query.average_rating if summary_query.average_rating is not None else 0.0
    total_reviews = summary_query.total_reviews if summary_query.total_reviews is not None else 0

    return schemas.ReviewSummary(
        average_rating=float(avg_rating),
        total_reviews=int(total_reviews)
    )
