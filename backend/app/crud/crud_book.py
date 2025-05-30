import uuid
from typing import List, Optional

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc, asc

from .. import models, schemas


# Book CRUD operations
def create_book(db: Session, book: schemas.BookCreate) -> models.Book:
    db_book = models.Book(
        title=book.title,
        author_name=book.author_name,
        cover_url=book.cover_url,
        description=book.description,
        long_description=book.long_description,
        reading_time_minutes=book.reading_time_minutes,
        age_min=book.age_min,
        age_max=book.age_max,
        publisher=book.publisher,
        publish_date=book.publish_date,
        is_premium=book.is_premium,
        is_free=book.is_free,
        popularity_score=book.popularity_score,
        total_pages=book.total_pages
    )
    db.add(db_book)
    db.commit()  # Commit to get db_book.id

    if book.theme_ids:
        for theme_id in book.theme_ids:
            db_book_theme = models.BookTheme(
                book_id=db_book.id, theme_id=theme_id)
            db.add(db_book_theme)
        db.commit()

    db.refresh(db_book)
    return db_book


def get_book(db: Session, book_id: uuid.UUID) -> Optional[models.Book]:
    return db.query(models.Book).options(
        joinedload(models.Book.book_themes).joinedload(models.BookTheme.theme),
        joinedload(models.Book.book_pages),
        joinedload(models.Book.book_toc_items),
        # joinedload(models.Book.reviews) # Reviews might be paginated separately
    ).filter(models.Book.id == book_id).first()


def get_books(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    theme_id: Optional[uuid.UUID] = None,
    # TODO: Add more filters and sorting options as per plan
    # sort_by: Optional[str] = None,
    # is_free: Optional[bool] = None,
    # age_min: Optional[int] = None,
    # age_max: Optional[int] = None,
) -> List[models.Book]:
    query = db.query(models.Book).options(
        joinedload(models.Book.book_themes).joinedload(models.BookTheme.theme)
    )
    if theme_id:
        query = query.join(models.BookTheme).filter(
            models.BookTheme.theme_id == theme_id)

    # Add other filters here based on parameters

    # Add sorting here based on sort_by parameter

    return query.offset(skip).limit(limit).all()


def update_book(db: Session, db_book: models.Book, book_in: schemas.BookUpdate) -> models.Book:
    update_data = book_in.model_dump(exclude_unset=True)

    if "theme_ids" in update_data:
        theme_ids = update_data.pop("theme_ids")
        # Remove existing themes not in the new list
        current_theme_links = db.query(models.BookTheme).filter(
            models.BookTheme.book_id == db_book.id).all()
        for link in current_theme_links:
            if link.theme_id not in theme_ids:
                db.delete(link)

        # Add new themes
        existing_theme_ids = {link.theme_id for link in current_theme_links}
        for theme_id in theme_ids:
            if theme_id not in existing_theme_ids:
                db_book_theme = models.BookTheme(
                    book_id=db_book.id, theme_id=theme_id)
                db.add(db_book_theme)

    for field, value in update_data.items():
        setattr(db_book, field, value)

    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def delete_book(db: Session, db_book: models.Book) -> models.Book:
    db.delete(db_book)
    db.commit()
    return db_book


# BookPage CRUD operations
def create_book_page(db: Session, page: schemas.BookPageCreate, book_id: uuid.UUID) -> models.BookPage:
    # book_id is already in page schema (schemas.BookPageCreate)
    # Ensure the book_id in the page schema matches the book_id parameter for consistency, if desired.
    # For now, we assume page.book_id is correctly set by the caller (e.g., test or route).
    # If page.book_id might differ from the book_id param, you might want to prioritize one or raise an error.
    # page_dict = page.dict() # Pydantic v1
    page_dict = page.model_dump()  # Pydantic v2
    # If the `book_id` parameter to this function is the source of truth,
    # ensure it's used, overriding or setting what's in page_dict.
    # page_dict['book_id'] = book_id # This would ensure the param `book_id` is used.
    # However, since BookPageCreate schema requires book_id, it should already be in page_dict.
    # The original error was `got multiple values for keyword argument 'book_id'`,
    # so we remove the explicit `book_id=book_id` from the constructor call.
    db_page = models.BookPage(**page_dict)
    db.add(db_page)
    db.commit()
    db.refresh(db_page)
    return db_page


def get_book_page(db: Session, page_id: uuid.UUID, book_id: uuid.UUID) -> Optional[models.BookPage]:
    return db.query(models.BookPage).filter(models.BookPage.id == page_id, models.BookPage.book_id == book_id).first()


def get_book_pages_by_book(db: Session, book_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[models.BookPage]:
    return db.query(models.BookPage).filter(models.BookPage.book_id == book_id).order_by(models.BookPage.page_number).offset(skip).limit(limit).all()


def update_book_page(db: Session, db_page: models.BookPage, page_in: schemas.BookPageUpdate) -> models.BookPage:
    update_data = page_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_page, field, value)
    db.add(db_page)
    db.commit()
    db.refresh(db_page)
    return db_page


def delete_book_page(db: Session, db_page: models.BookPage) -> models.BookPage:
    db.delete(db_page)
    db.commit()
    return db_page


# BookTocItem CRUD operations
def create_book_toc_item(db: Session, toc_item: schemas.BookTocItemCreate, book_id: uuid.UUID) -> models.BookTocItem:
    # Similar to BookPageCreate, BookTocItemCreate schema includes book_id.
    # We'll use model_dump() and assume book_id from the schema is the one to use.
    # The explicit book_id parameter to this function could be used for validation if needed.
    toc_item_data = toc_item.model_dump()
    # Ensure the book_id from the parameter is used if it's the source of truth,
    # or validate that toc_item_data['book_id'] matches the book_id parameter.
    # For now, assuming toc_item_data['book_id'] is correct as per schema.
    # If the function's book_id param should override:
    # toc_item_data['book_id'] = book_id
    db_toc_item = models.BookTocItem(**toc_item_data)
    db.add(db_toc_item)
    db.commit()
    db.refresh(db_toc_item)
    return db_toc_item


def get_book_toc_item(db: Session, toc_item_id: uuid.UUID, book_id: uuid.UUID) -> Optional[models.BookTocItem]:
    return db.query(models.BookTocItem).filter(models.BookTocItem.id == toc_item_id, models.BookTocItem.book_id == book_id).first()


def get_book_toc_items_by_book(db: Session, book_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[models.BookTocItem]:
    return db.query(models.BookTocItem).filter(models.BookTocItem.book_id == book_id).order_by(models.BookTocItem.page_number).offset(skip).limit(limit).all()


def update_book_toc_item(db: Session, db_toc_item: models.BookTocItem, toc_item_in: schemas.BookTocItemUpdate) -> models.BookTocItem:
    update_data = toc_item_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_toc_item, field, value)
    db.add(db_toc_item)
    db.commit()
    db.refresh(db_toc_item)
    return db_toc_item


def delete_book_toc_item(db: Session, db_toc_item: models.BookTocItem) -> models.BookTocItem:
    db.delete(db_toc_item)
    db.commit()
    return db_toc_item
