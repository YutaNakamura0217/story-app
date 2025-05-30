import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas
from datetime import datetime

# Import helpers from other test files
from tests.crud.test_crud_user import create_db_user
from tests.crud.test_crud_child import create_db_child
# Re-using book creation helper
from tests.crud.test_crud_review import create_db_book_for_review

# --- UserBookProgress Tests ---


def test_create_user_book_progress_for_user(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_prog_user_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_prog_user_book")

    # Act
    # get_or_create_progress will set current_page to 1 by default
    created_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    # If a specific page is needed for creation assertion, update it after creation
    if created_progress.current_page != 5:  # Example target page
        created_progress = crud.progress.update_progress_page(
            db=db_session, db_progress=created_progress, current_page=5)

    # Assert
    assert created_progress is not None
    assert created_progress.user_id == db_user.id
    assert created_progress.book_id == db_book.id
    assert created_progress.child_id is None
    assert created_progress.current_page == 5  # Or 1 if not updated
    assert isinstance(created_progress.last_read_at, datetime)

    # Verify in DB
    db_progress_verify = db_session.query(models.UserBookProgress).filter(
        models.UserBookProgress.id == created_progress.id).first()
    assert db_progress_verify is not None
    assert db_progress_verify.current_page == 5  # Or 1


def test_create_user_book_progress_for_child(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_prog_child_user")
    db_child = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_prog_child")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_prog_child_book")

    # Act
    created_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id, child_id=db_child.id
    )
    if created_progress.current_page != 3:  # Example target page
        created_progress = crud.progress.update_progress_page(
            db=db_session, db_progress=created_progress, current_page=3)

    # Assert
    assert created_progress is not None
    assert created_progress.user_id == db_user.id
    assert created_progress.book_id == db_book.id
    assert created_progress.child_id == db_child.id
    assert created_progress.current_page == 3  # Or 1


def test_get_user_book_progress(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_prog_get_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_prog_get_book")
    # Use get_or_create_progress to ensure progress exists
    crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )

    # Act
    retrieved_progress = crud.progress.get_progress(  # Changed from get_user_book_progress
        db=db_session, user_id=db_user.id, book_id=db_book.id)

    # Assert
    assert retrieved_progress is not None
    assert retrieved_progress.user_id == db_user.id
    assert retrieved_progress.book_id == db_book.id

    # Test non-existent progress
    other_book = create_db_book_for_review(
        db=db_session, title_suffix="_prog_get_other_book")
    non_existent_progress = crud.progress.get_progress(
        db=db_session, user_id=db_user.id, book_id=other_book.id)
    assert non_existent_progress is None


def test_update_user_book_progress(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_prog_update_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_prog_update_book")
    progress_to_update = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    # Ensure it starts at a different page if needed for the test
    if progress_to_update.current_page == 15:
        crud.progress.update_progress_page(
            db=db_session, db_progress=progress_to_update, current_page=10)
        progress_to_update = crud.progress.get_progress(
            db=db_session, user_id=db_user.id, book_id=db_book.id)

    # Act
    updated_progress = crud.progress.update_progress_page(
        db=db_session, db_progress=progress_to_update, current_page=15
    )

    # Assert
    assert updated_progress is not None
    assert updated_progress.current_page == 15
    assert updated_progress.id == progress_to_update.id  # Ensure it's the same record

# --- UserBookBookmark Tests ---


def create_dummy_bookmark_data(page_number: int = 1) -> schemas.UserBookBookmarkCreate:
    return schemas.UserBookBookmarkCreate(page_number=page_number)


def test_create_bookmark(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_bm_create_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_bm_create_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    bookmark_in_data = create_dummy_bookmark_data(page_number=5)

    # Act
    created_bookmark = crud.progress.create_bookmark(
        db=db_session, progress_id=db_progress.id, page_number=bookmark_in_data.page_number)

    # Assert
    assert created_bookmark is not None
    assert created_bookmark.progress_id == db_progress.id
    assert created_bookmark.page_number == 5
    assert isinstance(created_bookmark.created_at, datetime)


def test_get_bookmarks_by_progress(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_bm_list_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_bm_list_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    bm1 = crud.progress.create_bookmark(
        db=db_session, progress_id=db_progress.id, page_number=3)
    bm2 = crud.progress.create_bookmark(
        db=db_session, progress_id=db_progress.id, page_number=7)

    # Act
    bookmarks = crud.progress.get_bookmarks_by_progress(
        db=db_session, progress_id=db_progress.id)

    # Assert
    assert len(bookmarks) == 2
    page_numbers = sorted([b.page_number for b in bookmarks])
    assert page_numbers == [3, 7]


def test_delete_bookmark(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_bm_delete_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_bm_delete_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    bookmark_to_delete = crud.progress.create_bookmark(
        db=db_session, progress_id=db_progress.id, page_number=10)

    # Act
    # delete_bookmark in crud takes db_bookmark object, so get it first
    db_bookmark_to_delete = crud.progress.get_bookmark_by_page(
        db=db_session, progress_id=db_progress.id, page_number=10)
    deleted_bookmark_obj = None
    if db_bookmark_to_delete:
        deleted_bookmark_obj = crud.progress.delete_bookmark(
            db=db_session, db_bookmark=db_bookmark_to_delete)

    # Assert
    assert deleted_bookmark_obj is not None
    assert deleted_bookmark_obj.id == bookmark_to_delete.id

    # Verify in DB
    remaining_bookmarks = crud.progress.get_bookmarks_by_progress(
        db=db_session, progress_id=db_progress.id)
    assert not any(b.page_number == 10 for b in remaining_bookmarks)

    # Test deleting non-existent bookmark
    non_existent_db_bookmark = crud.progress.get_bookmark_by_page(
        db=db_session, progress_id=db_progress.id, page_number=99)
    delete_non_existent_result = None
    if non_existent_db_bookmark:
        delete_non_existent_result = crud.progress.delete_bookmark(
            db=db_session, db_bookmark=non_existent_db_bookmark)
    assert delete_non_existent_result is None

# --- UserBookNote Tests ---


def create_dummy_note_data(page_number: int = 1, text: str = "Test note") -> schemas.UserBookNoteCreate:
    return schemas.UserBookNoteCreate(page_number=page_number, text=text)


def test_create_note(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_note_create_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_note_create_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    note_in_data = create_dummy_note_data(
        page_number=2, text="An interesting point.")

    # Act
    created_note = crud.progress.create_note(
        db=db_session, progress_id=db_progress.id, page_number=note_in_data.page_number, text=note_in_data.text)

    # Assert
    assert created_note is not None
    assert created_note.progress_id == db_progress.id
    assert created_note.page_number == 2
    assert created_note.text == "An interesting point."
    assert isinstance(created_note.created_at, datetime)
    assert isinstance(created_note.updated_at, datetime)


def test_get_notes_by_progress(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_note_list_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_note_list_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    note1 = crud.progress.create_note(
        db=db_session, progress_id=db_progress.id, page_number=4, text="Note 1")
    note2 = crud.progress.create_note(
        db=db_session, progress_id=db_progress.id, page_number=8, text="Note 2")

    # Act
    notes = crud.progress.get_notes_by_progress(
        db=db_session, progress_id=db_progress.id)

    # Assert
    assert len(notes) == 2
    texts = sorted([n.text for n in notes])
    assert texts == ["Note 1", "Note 2"]


def test_update_note(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_note_update_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_note_update_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    note_to_update = crud.progress.create_note(
        db=db_session, progress_id=db_progress.id, page_number=1, text="Original Note")
    update_data_text = "Updated Note Text"

    # Act
    updated_note = crud.progress.update_note(
        db=db_session, db_note=note_to_update, text=update_data_text)

    # Assert
    assert updated_note is not None
    assert updated_note.id == note_to_update.id
    assert updated_note.text == "Updated Note Text"
    # updated_at should change or be same
    assert updated_note.updated_at >= note_to_update.created_at


def test_delete_note(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_note_delete_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_note_delete_book")
    db_progress = crud.progress.get_or_create_progress(
        db=db_session, user_id=db_user.id, book_id=db_book.id
    )
    note_to_delete = crud.progress.create_note(
        db=db_session, progress_id=db_progress.id, page_number=1, text="To delete")
    note_id_to_delete = note_to_delete.id

    # Act
    # delete_note in crud takes db_note object
    db_note_to_delete = crud.progress.get_note(
        db=db_session, note_id=note_id_to_delete)
    deleted_note_obj = None
    if db_note_to_delete:
        deleted_note_obj = crud.progress.delete_note(
            db=db_session, db_note=db_note_to_delete)

    # Assert
    assert deleted_note_obj is not None
    assert deleted_note_obj.id == note_id_to_delete

    # Verify in DB
    db_note_verify = db_session.query(models.UserBookNote).filter(
        models.UserBookNote.id == note_id_to_delete).first()
    assert db_note_verify is None

    # Test deleting non-existent note
    non_existent_db_note = crud.progress.get_note(
        db=db_session, note_id=uuid.uuid4())
    delete_non_existent_result = None
    if non_existent_db_note:
        delete_non_existent_result = crud.progress.delete_note(
            db=db_session, db_note=non_existent_db_note)
    assert delete_non_existent_result is None
