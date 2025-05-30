import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.crud.crud_user import get_password_hash, verify_password  # Corrected import

# Helper function to create user data for tests


def create_dummy_user_data(name_suffix: str = "", email_suffix: str = "") -> schemas.UserCreate:
    return schemas.UserCreate(
        name=f"Test User {name_suffix}".strip(),
        email=f"testuser{email_suffix}@example.com",
        password="testpassword123"
    )

# Helper function to create a user directly in the DB for prerequisite data


def create_db_user(db: Session, name_suffix: str = "", email_suffix: str = "") -> models.User:
    user_in_schema = create_dummy_user_data(
        name_suffix=name_suffix, email_suffix=email_suffix)
    # Use the CRUD function to ensure all related objects (like UserSettings) are created
    created_user = crud.user.create_user(db=db, user=user_in_schema)
    return created_user


def test_create_user(db_session: Session):
    # Arrange
    user_in_data = create_dummy_user_data(email_suffix="_create")

    # Act
    created_user = crud.user.create_user(db=db_session, user=user_in_data)

    # Assert
    assert created_user is not None
    assert created_user.email == user_in_data.email
    assert created_user.name == user_in_data.name
    assert hasattr(created_user, "hashed_password")
    # Ensure password is hashed
    assert created_user.hashed_password != user_in_data.password
    assert verify_password(user_in_data.password, created_user.hashed_password)

    # Verify in DB
    db_user = db_session.query(models.User).filter(
        models.User.id == created_user.id).first()
    assert db_user is not None
    assert db_user.email == user_in_data.email

    # Verify UserSettings are created by default
    db_user_settings = db_session.query(models.UserSettings).filter(
        models.UserSettings.user_id == created_user.id).first()
    assert db_user_settings is not None
    assert db_user_settings.notify_new_recommendations is True  # Default value check


def test_get_user_by_id(db_session: Session):
    # Arrange
    user_in_data = create_dummy_user_data(email_suffix="_getbyid")
    created_user = crud.user.create_user(db=db_session, user=user_in_data)

    # Act
    retrieved_user = crud.user.get_user(db=db_session, user_id=created_user.id)

    # Assert
    assert retrieved_user is not None
    assert retrieved_user.id == created_user.id
    assert retrieved_user.email == created_user.email

    # Test non-existent user
    non_existent_user = crud.user.get_user(db=db_session, user_id=uuid.uuid4())
    assert non_existent_user is None


def test_get_user_by_email(db_session: Session):
    # Arrange
    user_in_data = create_dummy_user_data(email_suffix="_getbyemail")
    created_user = crud.user.create_user(db=db_session, user=user_in_data)

    # Act
    retrieved_user = crud.user.get_user_by_email(
        db=db_session, email=created_user.email)

    # Assert
    assert retrieved_user is not None
    assert retrieved_user.id == created_user.id
    assert retrieved_user.email == created_user.email

    # Test non-existent email
    non_existent_user = crud.user.get_user_by_email(
        db=db_session, email="nonexistent@example.com")
    assert non_existent_user is None

# def test_get_users(db_session: Session):
#     # crud_user.py does not have get_users function
#     # Arrange
#     user1 = crud.user.create_user(
#         db=db_session, user=create_dummy_user_data(email_suffix="_list1"))
#     user2 = crud.user.create_user(
#         db=db_session, user=create_dummy_user_data(email_suffix="_list2"))
#
#     # Act
#     # users_skip0_limit10 = crud.user.get_users(db=db_session, skip=0, limit=10) # This function does not exist
#     # users_skip1_limit1 = crud.user.get_users(db=db_session, skip=1, limit=1)  # This function does not exist
#     users_skip0_limit10 = [] # Placeholder
#     users_skip1_limit1 = []  # Placeholder
#
#
#     # Assert
#     # assert len(users_skip0_limit10) >= 2
#     # user_ids_skip0_limit10 = [u.id for u in users_skip0_limit10]
#     # assert user1.id in user_ids_skip0_limit10
#     # assert user2.id in user_ids_skip0_limit10
#
#     # assert len(users_skip1_limit1) == 1
#     # all_users_sorted = sorted(
#     #     [user1, user2], key=lambda u: u.id)
#     # if len(all_users_sorted) > 1 and users_skip1_limit1:
#     #     assert users_skip1_limit1[0].id == all_users_sorted[1].id
#     pass


def test_update_user(db_session: Session):
    # Arrange
    user_to_update = crud.user.create_user(
        db=db_session, user=create_dummy_user_data(email_suffix="_update"))
    update_data = schemas.UserUpdate(
        name="Updated Name",
        introduction="This is an updated introduction."
    )

    # Act
    updated_user = crud.user.update_user(
        db=db_session, db_user=user_to_update, user_in=update_data)

    # Assert
    assert updated_user is not None
    assert updated_user.id == user_to_update.id
    assert updated_user.name == "Updated Name"
    assert updated_user.introduction == "This is an updated introduction."
    # Email should not change with this schema
    assert updated_user.email == user_to_update.email

    # Verify in DB
    db_user = db_session.query(models.User).filter(
        models.User.id == user_to_update.id).first()
    assert db_user.name == "Updated Name"
    assert db_user.introduction == "This is an updated introduction."

# def test_delete_user(db_session: Session):
#     # crud_user.py does not have delete_user function
#     # Arrange
#     user_to_delete = crud.user.create_user(
#         db=db_session, user=create_dummy_user_data(email_suffix="_delete"))
#     user_id_to_delete = user_to_delete.id
#
#     # Act
#     # deleted_user = crud.user.delete_user(db=db_session, user_id=user_id_to_delete) # This function does not exist
#     deleted_user = user_to_delete # Placeholder
#
#     # Assert
#     assert deleted_user is not None
#     assert deleted_user.id == user_id_to_delete
#
#     # Verify in DB
#     # db_user = db_session.query(models.User).filter(models.User.id == user_id_to_delete).first()
#     # assert db_user is None
#
#     # db_user_settings = db_session.query(models.UserSettings).filter(models.UserSettings.user_id == user_id_to_delete).first()
#     # assert db_user_settings is None
#     pass

# Tests for UserSettings

# test_create_user_settings is removed as UserSettings are created with User.


def test_get_user_settings(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_settings_get")
    # UserSettings are created by default when a user is created.

    # Act
    retrieved_settings = crud.user.get_user_settings(
        db=db_session, user_id=db_user.id)

    # Assert
    assert retrieved_settings is not None
    assert retrieved_settings.user_id == db_user.id
    # Check default values if applicable
    assert retrieved_settings.notify_new_recommendations is True  # Default from User model

    # Test non-existent user settings (should return None or raise error depending on crud impl)
    non_existent_settings = crud.user.get_user_settings(
        db=db_session, user_id=uuid.uuid4())
    assert non_existent_settings is None


def test_update_user_settings(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_settings_update")
    db_user_settings = crud.user.get_user_settings(
        db=db_session, user_id=db_user.id)
    assert db_user_settings is not None  # Ensure settings exist

    settings_update_data = schemas.UserSettingsUpdate(
        notify_platform_announcements=True,
        notify_weekly_summary=False
    )

    # Act
    updated_settings = crud.user.update_user_settings(
        db=db_session, db_user_settings=db_user_settings, settings_in=settings_update_data)

    # Assert
    assert updated_settings is not None
    assert updated_settings.user_id == db_user.id
    assert updated_settings.notify_platform_announcements is True
    assert updated_settings.notify_weekly_summary is False
    # Should retain previous value if not updated
    assert updated_settings.notify_new_recommendations is True

    # Verify in DB
    db_settings_verify = db_session.query(models.UserSettings).filter(
        models.UserSettings.user_id == db_user.id).first()
    assert db_settings_verify.notify_platform_announcements is True
    assert db_settings_verify.notify_weekly_summary is False
