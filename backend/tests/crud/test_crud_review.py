import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas
from typing import List

# Import helpers from other test files
from tests.crud.test_crud_user import create_db_user
# To create themes for books
from tests.crud.test_crud_book import create_dummy_themes

# Helper function to create book data for review tests


def create_dummy_book_data_for_review(db_session: Session, title_suffix: str = "") -> schemas.BookCreate:
    # Create a theme if none exist or use an existing one
    themes = crud.theme.get_themes(db=db_session, limit=1)
    if not themes:
        theme = create_dummy_themes(db_session, count=1)[0]
    else:
        theme = themes[0]

    return schemas.BookCreate(
        title=f"Test Book for Review {title_suffix}".strip(),
        author_name="Review Test Author",
        description="A book specifically for testing reviews.",
        total_pages=20,
        theme_ids=[theme.id],  # Link to at least one theme
        publish_date="2023-07-01"  # Ensure all required fields are present
    )

# Helper function to create a book directly in the DB for prerequisite data


def create_db_book_for_review(db: Session, title_suffix: str = "") -> models.Book:
    book_in = create_dummy_book_data_for_review(
        db_session=db, title_suffix=title_suffix)
    # Ensure all required fields for BookCreate are present
    # For example, if is_premium or is_free are required and not in book_in, add them.
    # book_in.is_free = True # Example if needed
    db_book = crud.book.create_book(db=db, book=book_in)
    return db_book

# Helper function to create review data for tests


def create_dummy_review_data(rating: int = 5, text: str = "Great book!") -> schemas.ReviewCreate:
    return schemas.ReviewCreate(
        rating=rating,
        text=text
    )


def test_create_review(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_review_create_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_review_create_book")
    review_in_data = create_dummy_review_data(
        rating=4, text="Very insightful.")

    # Act
    created_review = crud.review.create_review(
        db=db_session, review=review_in_data, book_id=db_book.id, user_id=db_user.id
    )

    # Assert
    assert created_review is not None
    assert created_review.rating == review_in_data.rating
    assert created_review.text == review_in_data.text
    assert created_review.book_id == db_book.id
    assert created_review.user_id == db_user.id

    # Verify in DB
    db_review_verify = db_session.query(models.Review).filter(
        models.Review.id == created_review.id).first()
    assert db_review_verify is not None
    assert db_review_verify.rating == review_in_data.rating
    assert db_review_verify.user_id == db_user.id


def test_get_review_by_id(db_session: Session):
    # Arrange
    db_user = create_db_user(
        db=db_session, email_suffix="_review_getbyid_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_review_getbyid_book")
    review_in = create_dummy_review_data()
    created_review = crud.review.create_review(
        db=db_session, review=review_in, book_id=db_book.id, user_id=db_user.id
    )

    # Act
    retrieved_review = crud.review.get_review(
        db=db_session, review_id=created_review.id)

    # Assert
    assert retrieved_review is not None
    assert retrieved_review.id == created_review.id
    assert retrieved_review.text == review_in.text

    # Test non-existent review
    non_existent_review = crud.review.get_review(
        db=db_session, review_id=uuid.uuid4())
    assert non_existent_review is None


def test_get_reviews_by_book(db_session: Session):
    # Arrange
    db_user1 = create_db_user(db=db_session, email_suffix="_review_book_user1")
    db_user2 = create_db_user(db=db_session, email_suffix="_review_book_user2")
    db_book1 = create_db_book_for_review(
        db=db_session, title_suffix="_review_book1")
    db_book2 = create_db_book_for_review(
        db=db_session, title_suffix="_review_book2")

    review1_book1 = crud.review.create_review(db=db_session, review=create_dummy_review_data(
        rating=5), book_id=db_book1.id, user_id=db_user1.id)
    review2_book1 = crud.review.create_review(db=db_session, review=create_dummy_review_data(
        rating=3), book_id=db_book1.id, user_id=db_user2.id)
    review1_book2 = crud.review.create_review(db=db_session, review=create_dummy_review_data(
        rating=4), book_id=db_book2.id, user_id=db_user1.id)

    # Act
    reviews_for_book1 = crud.review.get_reviews_by_book(
        db=db_session, book_id=db_book1.id, skip=0, limit=10)
    reviews_for_book2_limit1 = crud.review.get_reviews_by_book(
        db=db_session, book_id=db_book2.id, skip=0, limit=1)

    # Assert
    assert len(reviews_for_book1) == 2
    review_ids_book1 = [r.id for r in reviews_for_book1]
    assert review1_book1.id in review_ids_book1
    assert review2_book1.id in review_ids_book1

    assert len(reviews_for_book2_limit1) == 1
    assert reviews_for_book2_limit1[0].id == review1_book2.id


def test_get_reviews_by_user(db_session: Session):
    # Arrange
    db_user1 = create_db_user(db=db_session, email_suffix="_review_user_user1")
    db_user2 = create_db_user(db=db_session, email_suffix="_review_user_user2")
    db_book1 = create_db_book_for_review(
        db=db_session, title_suffix="_review_user_book1")
    db_book2 = create_db_book_for_review(
        db=db_session, title_suffix="_review_user_book2")

    review1_user1 = crud.review.create_review(db=db_session, review=create_dummy_review_data(
        text="User1 Review1"), book_id=db_book1.id, user_id=db_user1.id)
    review2_user1 = crud.review.create_review(db=db_session, review=create_dummy_review_data(
        text="User1 Review2"), book_id=db_book2.id, user_id=db_user1.id)
    review1_user2 = crud.review.create_review(db=db_session, review=create_dummy_review_data(
        text="User2 Review1"), book_id=db_book1.id, user_id=db_user2.id)

    # Act
    reviews_for_user1 = crud.review.get_reviews_by_user(
        db=db_session, user_id=db_user1.id, skip=0, limit=10)
    reviews_for_user2_limit1 = crud.review.get_reviews_by_user(
        db=db_session, user_id=db_user2.id, skip=0, limit=1)

    # Assert
    assert len(reviews_for_user1) == 2
    review_ids_user1 = [r.id for r in reviews_for_user1]
    assert review1_user1.id in review_ids_user1
    assert review2_user1.id in review_ids_user1

    assert len(reviews_for_user2_limit1) == 1
    assert reviews_for_user2_limit1[0].id == review1_user2.id


def test_update_review(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_review_update_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_review_update_book")
    review_to_update = crud.review.create_review(
        db=db_session, review=create_dummy_review_data(rating=3, text="Initial review"), book_id=db_book.id, user_id=db_user.id
    )
    update_data = schemas.ReviewUpdate(
        rating=5, text="This is an updated review.")

    # Act
    updated_review = crud.review.update_review(
        db=db_session, db_review=review_to_update, review_in=update_data)

    # Assert
    assert updated_review is not None
    assert updated_review.id == review_to_update.id
    assert updated_review.rating == 5
    assert updated_review.text == "This is an updated review."
    assert updated_review.user_id == db_user.id  # Should not change
    assert updated_review.book_id == db_book.id  # Should not change

    # Verify in DB
    db_review_verify = db_session.query(models.Review).filter(
        models.Review.id == review_to_update.id).first()
    assert db_review_verify.rating == 5
    assert db_review_verify.text == "This is an updated review."


def test_delete_review(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_review_delete_user")
    db_book = create_db_book_for_review(
        db=db_session, title_suffix="_review_delete_book")
    review_to_delete = crud.review.create_review(
        db=db_session, review=create_dummy_review_data(), book_id=db_book.id, user_id=db_user.id
    )
    review_id_to_delete = review_to_delete.id

    # Act
    db_review_to_delete = crud.review.get_review(
        db=db_session, review_id=review_id_to_delete)
    deleted_review_obj = None
    if db_review_to_delete and db_review_to_delete.user_id == db_user.id:  # Ensure user owns the review
        deleted_review_obj = crud.review.delete_review(
            db=db_session, db_review=db_review_to_delete)

    # Assert
    assert deleted_review_obj is not None
    assert deleted_review_obj.id == review_id_to_delete

    # Verify in DB
    db_review_verify = db_session.query(models.Review).filter(
        models.Review.id == review_id_to_delete).first()
    assert db_review_verify is None

    # Test deleting non-existent review
    non_existent_review_obj = crud.review.get_review(
        db=db_session, review_id=uuid.uuid4())
    delete_non_existent_result = None
    if non_existent_review_obj:
        delete_non_existent_result = crud.review.delete_review(
            db=db_session, db_review=non_existent_review_obj)
    assert delete_non_existent_result is None

    # Test attempting to delete another user's review (should not be allowed by get_review or similar logic if user_id was checked)
    # For this specific delete_review, it only takes db_review.
    # The protection for "user can only delete their own" would typically be in the API layer
    # or if delete_review took user_id and checked ownership.
    # Here, we just test that if we somehow got another user's review object, it would be deleted.
    # A more robust test for ownership would be at the API level or by modifying delete_review signature.
    other_user = create_db_user(
        db=db_session, email_suffix="_review_delete_other_user")
    # Create a review by original user again
    review_for_original_user_again = crud.review.create_review(
        db=db_session, review=create_dummy_review_data(text="Another review by original user"), book_id=db_book.id, user_id=db_user.id
    )
    # Try to get this review as if we are 'other_user' (this would fail if get_review checked user_id, but it doesn't)
    # Then try to delete it. This specific CRUD function doesn't check user_id for deletion.
    # So, if an attacker could pass a valid review object, it would be deleted.
    # This highlights a potential security consideration for the API layer.

    # For the purpose of testing this CRUD function as is:
    # If we get the review object (regardless of user), delete_review should delete it.
    review_obj_to_delete_by_anyone = crud.review.get_review(
        db=db_session, review_id=review_for_original_user_again.id)
    if review_obj_to_delete_by_anyone:
        crud.review.delete_review(
            db=db_session, db_review=review_obj_to_delete_by_anyone)
        still_exists_check = crud.review.get_review(
            db=db_session, review_id=review_for_original_user_again.id)
        assert still_exists_check is None
