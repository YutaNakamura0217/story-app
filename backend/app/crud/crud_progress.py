import uuid
from typing import List, Optional
from datetime import datetime, timezone  # Added timezone

from sqlalchemy.orm import Session, joinedload

from .. import models, schemas


# UserBookProgress CRUD
def get_progress(db: Session, user_id: uuid.UUID, book_id: uuid.UUID, child_id: Optional[uuid.UUID] = None) -> Optional[models.UserBookProgress]:
    query = db.query(models.UserBookProgress).filter(
        models.UserBookProgress.user_id == user_id,
        models.UserBookProgress.book_id == book_id
    )
    if child_id:
        query = query.filter(models.UserBookProgress.child_id == child_id)
    else:
        query = query.filter(models.UserBookProgress.child_id.is_(None))

    return query.options(
        joinedload(models.UserBookProgress.bookmarks),
        joinedload(models.UserBookProgress.notes)
    ).first()


def get_or_create_progress(db: Session, user_id: uuid.UUID, book_id: uuid.UUID, child_id: Optional[uuid.UUID] = None) -> models.UserBookProgress:
    db_progress = get_progress(
        db, user_id=user_id, book_id=book_id, child_id=child_id)

    if not db_progress:
        db_progress = models.UserBookProgress(
            user_id=user_id,
            book_id=book_id,
            child_id=child_id,
            current_page=1,  # Default starting page
            last_read_at=datetime.now(timezone.utc)
        )
        db.add(db_progress)
        db.commit()
        db.refresh(db_progress)
        # Need to reload relationships if they are accessed immediately after creation
        db.refresh(db_progress, attribute_names=['bookmarks', 'notes'])
    return db_progress


def update_progress_page(db: Session, db_progress: models.UserBookProgress, current_page: int) -> models.UserBookProgress:
    db_progress.current_page = current_page
    db_progress.last_read_at = datetime.now(
        timezone.utc)  # Update last_read_at timestamp
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress


# UserBookBookmark CRUD
def create_bookmark(db: Session, progress_id: uuid.UUID, page_number: int) -> models.UserBookBookmark:
    # Check if bookmark already exists for this page
    existing_bookmark = get_bookmark_by_page(db, progress_id, page_number)
    if existing_bookmark:
        return existing_bookmark

    db_bookmark = models.UserBookBookmark(
        progress_id=progress_id, page_number=page_number)
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)
    return db_bookmark


def get_bookmark_by_page(db: Session, progress_id: uuid.UUID, page_number: int) -> Optional[models.UserBookBookmark]:
    return db.query(models.UserBookBookmark).filter(
        models.UserBookBookmark.progress_id == progress_id,
        models.UserBookBookmark.page_number == page_number
    ).first()


def get_bookmark_by_id(db: Session, bookmark_id: uuid.UUID) -> Optional[models.UserBookBookmark]:
    return db.query(models.UserBookBookmark).filter(models.UserBookBookmark.id == bookmark_id).first()


def delete_bookmark(db: Session, db_bookmark: models.UserBookBookmark) -> models.UserBookBookmark:
    db.delete(db_bookmark)
    db.commit()
    return db_bookmark


def get_bookmarks_by_progress(db: Session, progress_id: uuid.UUID) -> List[models.UserBookBookmark]:
    return db.query(models.UserBookBookmark).filter(models.UserBookBookmark.progress_id == progress_id).order_by(models.UserBookBookmark.page_number).all()


# UserBookNote CRUD
def create_note(db: Session, progress_id: uuid.UUID, page_number: int, text: str) -> models.UserBookNote:
    db_note = models.UserBookNote(
        progress_id=progress_id, page_number=page_number, text=text)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


def get_note(db: Session, note_id: uuid.UUID) -> Optional[models.UserBookNote]:
    return db.query(models.UserBookNote).filter(models.UserBookNote.id == note_id).first()


def update_note(db: Session, db_note: models.UserBookNote, text: str) -> models.UserBookNote:
    db_note.text = text
    db_note.updated_at = datetime.now(timezone.utc)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


def delete_note(db: Session, db_note: models.UserBookNote) -> models.UserBookNote:
    db.delete(db_note)
    db.commit()
    return db_note


def get_notes_by_progress(db: Session, progress_id: uuid.UUID) -> List[models.UserBookNote]:
    return db.query(models.UserBookNote).filter(models.UserBookNote.progress_id == progress_id).order_by(models.UserBookNote.page_number, models.UserBookNote.created_at).all()
