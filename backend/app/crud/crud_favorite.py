import uuid
from typing import List, Optional

from sqlalchemy.orm import Session, joinedload

from .. import models, schemas


def get_favorite(db: Session, user_id: uuid.UUID, book_id: uuid.UUID) -> Optional[models.UserFavorite]:
    return db.query(models.UserFavorite).filter(
        models.UserFavorite.user_id == user_id,
        models.UserFavorite.book_id == book_id
    ).first()


def add_favorite(db: Session, user_id: uuid.UUID, book_id: uuid.UUID) -> Optional[models.UserFavorite]:
    # Check if already favorited
    db_favorite = get_favorite(db, user_id=user_id, book_id=book_id)
    if db_favorite:
        return db_favorite  # Or raise an exception/return None if it should not exist

    db_favorite = models.UserFavorite(user_id=user_id, book_id=book_id)
    db.add(db_favorite)
    # db.commit() # Removed
    db.flush()
    db.refresh(db_favorite)
    return db_favorite


def remove_favorite(db: Session, user_id: uuid.UUID, book_id: uuid.UUID) -> Optional[models.UserFavorite]:
    db_favorite = get_favorite(db, user_id=user_id, book_id=book_id)
    if db_favorite:
        db.delete(db_favorite)
        # db.commit() # Removed
        db.flush()
        return db_favorite
    return None  # Or raise an exception if it's expected to exist


def get_user_favorites(db: Session, user_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[models.Book]:
    # The plan expects a list of BookRead objects.
    # So we query UserFavorite, join with Book, and return the Book objects.
    # The route handler will then convert these Book models to BookRead schemas.
    query = db.query(models.Book).join(models.UserFavorite).filter(
        models.UserFavorite.user_id == user_id
    ).options(
        # Eager load themes for each book, as BookRead schema includes themes
        joinedload(models.Book.book_themes).joinedload(models.BookTheme.theme)
    ).order_by(models.UserFavorite.favorited_at.desc()).offset(skip).limit(limit)

    return query.all()
