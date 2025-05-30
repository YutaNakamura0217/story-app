import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas
from datetime import datetime

# Import helpers from other test files
from tests.crud.test_crud_user import create_db_user
# Re-using book creation helper
from tests.crud.test_crud_review import create_db_book_for_review


def test_create_favorite(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_fav_create_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_fav_create_book")

    # Act
    created_favorite = crud.favorite.add_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)

    # Assert
    assert created_favorite is not None
    assert created_favorite.user_id == db_user.id
    assert created_favorite.book_id == db_book.id
    assert isinstance(created_favorite.favorited_at, datetime)

    # Verify in DB
    db_fav_verify = db_session.query(models.UserFavorite).filter(
        models.UserFavorite.user_id == db_user.id,
        models.UserFavorite.book_id == db_book.id
    ).first()
    assert db_fav_verify is not None
    assert db_fav_verify.user_id == db_user.id
    assert db_fav_verify.book_id == db_book.id

    # Test creating a duplicate favorite (should likely be handled by DB constraint or CRUD logic)
    # Depending on crud.favorite.add_favorite implementation, it might return existing or raise error.
    # For now, assume it might return the existing one or None if it fails due to constraint.
    duplicate_favorite = crud.favorite.add_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)
    if duplicate_favorite is not None:  # If it doesn't raise an error and returns something
        assert duplicate_favorite.user_id == db_user.id
        assert duplicate_favorite.book_id == db_book.id
    # Or, if it's expected to raise an IntegrityError, test for that (requires pytest.raises)
    # with pytest.raises(IntegrityError): # Or whatever specific error
    #     crud.favorite.add_favorite(db=db_session, user_id=db_user.id, book_id=db_book.id)
    #     db_session.commit() # commit to trigger constraint usually


def test_get_favorite(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_fav_get_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_fav_get_book")
    crud.favorite.add_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)

    # Act
    retrieved_favorite = crud.favorite.get_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)

    # Assert
    assert retrieved_favorite is not None
    assert retrieved_favorite.user_id == db_user.id
    assert retrieved_favorite.book_id == db_book.id

    # Test non-existent favorite
    other_book = create_db_book_for_review(
        db=db_session, title_suffix="_fav_get_other_book")
    non_existent_favorite = crud.favorite.get_favorite(
        db=db_session, user_id=db_user.id, book_id=other_book.id)
    assert non_existent_favorite is None


def test_get_favorites_by_user(db_session: Session):
    # Arrange
    db_user1 = create_db_user(db=db_session, email_suffix="_fav_list_user1")
    db_user2 = create_db_user(db=db_session, email_suffix="_fav_list_user2")
    db_book1 = create_db_book_for_review(
        db=db_session, title_suffix="_fav_list_book1")
    db_book2 = create_db_book_for_review(
        db=db_session, title_suffix="_fav_list_book2")
    db_book3 = create_db_book_for_review(
        db=db_session, title_suffix="_fav_list_book3")

    crud.favorite.add_favorite(
        db=db_session, user_id=db_user1.id, book_id=db_book1.id)
    crud.favorite.add_favorite(
        db=db_session, user_id=db_user1.id, book_id=db_book2.id)
    crud.favorite.add_favorite(
        db=db_session, user_id=db_user2.id, book_id=db_book1.id)

    # Act
    favorites_user1 = crud.favorite.get_user_favorites(  # Corrected function name
        db=db_session, user_id=db_user1.id, skip=0, limit=10)
    favorites_user2_limit1 = crud.favorite.get_user_favorites(  # Corrected function name
        db=db_session, user_id=db_user2.id, skip=0, limit=1)

    # Assert
    assert len(favorites_user1) == 2
    # Corrected: Book object's PK is 'id'
    fav_book_ids_user1 = sorted([fav.id for fav in favorites_user1])
    assert db_book1.id in fav_book_ids_user1
    assert db_book2.id in fav_book_ids_user1

    assert len(favorites_user2_limit1) == 1
    # Corrected: Book object's PK is 'id'
    assert favorites_user2_limit1[0].id == db_book1.id

    # Test for user with no favorites
    db_user_no_favs = create_db_user(
        db=db_session, email_suffix="_fav_list_user_no_favs")
    no_favorites = crud.favorite.get_user_favorites(  # Corrected function name
        db=db_session, user_id=db_user_no_favs.id)
    assert len(no_favorites) == 0


def test_delete_favorite(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_fav_delete_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_fav_delete_book")
    created_favorite = crud.favorite.add_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)
    assert created_favorite is not None  # Ensure it was created

    # Act
    deleted_favorite = crud.favorite.remove_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)

    # Assert
    assert deleted_favorite is not None
    assert deleted_favorite.user_id == db_user.id
    assert deleted_favorite.book_id == db_book.id

    # Verify in DB
    db_fav_verify = crud.favorite.get_favorite(
        db=db_session, user_id=db_user.id, book_id=db_book.id)
    assert db_fav_verify is None

    # Test deleting non-existent favorite
    other_book = create_db_book_for_review(
        db=db_session, title_suffix="_fav_delete_other_book")
    delete_non_existent = crud.favorite.remove_favorite(
        db=db_session, user_id=db_user.id, book_id=other_book.id)
    assert delete_non_existent is None
