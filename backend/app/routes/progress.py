from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
import uuid
from typing import Optional

from backend.app import schemas, models
from backend.app.core.security import get_current_user
from backend.app.crud import crud_progress
from backend.app.db import get_db

router = APIRouter()


@router.get("/users/me/books/{book_id}/progress", response_model=schemas.UserBookProgressRead)
def read_progress(
    book_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserBookProgressRead:
    progress = crud_progress.get_or_create_progress(db, user_id=current_user.id, book_id=book_id)
    db.commit()
    db.refresh(progress)
    return progress


@router.put("/users/me/books/{book_id}/progress", response_model=schemas.UserBookProgressRead)
def update_progress(
    book_id: uuid.UUID,
    progress_in: schemas.BookProgressUpdatePage,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserBookProgressRead:
    progress = crud_progress.get_or_create_progress(db, user_id=current_user.id, book_id=book_id)
    progress = crud_progress.update_progress_page(db, db_progress=progress, current_page=progress_in.current_page)
    db.commit()
    db.refresh(progress)
    return progress


@router.post("/users/me/books/{book_id}/bookmarks", response_model=schemas.UserBookBookmarkRead)
def add_bookmark(
    book_id: uuid.UUID,
    bookmark_in: schemas.UserBookBookmarkCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserBookBookmarkRead:
    progress = crud_progress.get_or_create_progress(db, user_id=current_user.id, book_id=book_id)
    bm = crud_progress.create_bookmark(db, progress_id=progress.id, page_number=bookmark_in.page_number)
    db.commit()
    db.refresh(bm)
    return bm


@router.delete("/users/me/books/{book_id}/bookmarks/{page_number}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bookmark(
    book_id: uuid.UUID,
    page_number: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    progress = crud_progress.get_progress(db, user_id=current_user.id, book_id=book_id)
    if not progress:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Progress not found")
    bm = crud_progress.get_bookmark_by_page(db, progress_id=progress.id, page_number=page_number)
    if not bm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bookmark not found")
    crud_progress.delete_bookmark(db, db_bookmark=bm)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/users/me/books/{book_id}/notes", response_model=schemas.UserBookNoteRead)
def add_note(
    book_id: uuid.UUID,
    note_in: schemas.UserBookNoteCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserBookNoteRead:
    progress = crud_progress.get_or_create_progress(db, user_id=current_user.id, book_id=book_id)
    note = crud_progress.create_note(db, progress_id=progress.id, page_number=note_in.page_number, text=note_in.text)
    db.commit()
    db.refresh(note)
    return note


@router.delete("/users/me/books/{book_id}/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(
    book_id: uuid.UUID,
    note_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Response:
    progress = crud_progress.get_progress(db, user_id=current_user.id, book_id=book_id)
    if not progress:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Progress not found")
    note = crud_progress.get_note(db, note_id=note_id)
    if not note or note.progress_id != progress.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    crud_progress.delete_note(db, db_note=note)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
