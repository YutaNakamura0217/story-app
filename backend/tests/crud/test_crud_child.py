import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas

# Import helper from user tests to create prerequisite user data
from tests.crud.test_crud_user import create_db_user

# Helper function to create child data for tests


def create_dummy_child_data(name_suffix: str = "", age: int = 5) -> schemas.ChildCreate:
    return schemas.ChildCreate(
        name=f"Test Child {name_suffix}".strip(),
        age=age,
        avatar_url=f"https://example.com/child_avatar_{name_suffix.lower()}.png",
        interests=["drawing", "books"]
    )

# Helper function to create a child directly in the DB for prerequisite data


def create_db_child(db: Session, user_id: uuid.UUID, name_suffix: str = "", age: int = 5) -> models.Child:
    child_in = create_dummy_child_data(name_suffix=name_suffix, age=age)
    db_child = models.Child(**child_in.model_dump(), user_id=user_id)
    db.add(db_child)
    db.commit()
    db.refresh(db_child)
    return db_child


def test_create_child(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_child_create_user")
    child_in_data = create_dummy_child_data(name_suffix="_create")

    # Act
    created_child = crud.child.create_child(
        db=db_session, child=child_in_data, user_id=db_user.id)

    # Assert
    assert created_child is not None
    assert created_child.name == child_in_data.name
    assert created_child.age == child_in_data.age
    assert created_child.user_id == db_user.id
    assert created_child.interests == ["drawing", "books"]

    # Verify in DB
    db_child_verify = db_session.query(models.Child).filter(
        models.Child.id == created_child.id).first()
    assert db_child_verify is not None
    assert db_child_verify.name == child_in_data.name
    assert db_child_verify.user_id == db_user.id


def test_get_child_by_id(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_child_getbyid_user")
    created_child = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_getbyid")

    # Act
    retrieved_child = crud.child.get_child(
        db=db_session, child_id=created_child.id, user_id=db_user.id)

    # Assert
    assert retrieved_child is not None
    assert retrieved_child.id == created_child.id
    assert retrieved_child.name == created_child.name
    assert retrieved_child.user_id == db_user.id

    # Test non-existent child
    non_existent_child = crud.child.get_child(
        db=db_session, child_id=uuid.uuid4(), user_id=db_user.id)
    assert non_existent_child is None

    # Test getting child for a different user (should not be found or authorized)
    other_user = create_db_user(
        db=db_session, email_suffix="_child_getbyid_other_user")
    child_for_other_user = crud.child.get_child(
        db=db_session, child_id=created_child.id, user_id=other_user.id)
    assert child_for_other_user is None  # Assuming get_child filters by user_id


def test_get_children_by_user(db_session: Session):
    # Arrange
    db_user1 = create_db_user(db=db_session, email_suffix="_children_user1")
    db_user2 = create_db_user(db=db_session, email_suffix="_children_user2")

    child1_user1 = create_db_child(
        db=db_session, user_id=db_user1.id, name_suffix="_c1u1")
    child2_user1 = create_db_child(
        db=db_session, user_id=db_user1.id, name_suffix="_c2u1")
    child1_user2 = create_db_child(
        db=db_session, user_id=db_user2.id, name_suffix="_c1u2")

    # Act
    children_user1 = crud.child.get_children_by_user(
        db=db_session, user_id=db_user1.id, skip=0, limit=10)
    children_user2_skip1 = crud.child.get_children_by_user(
        # Assuming user2 has only 1 child
        db=db_session, user_id=db_user2.id, skip=1, limit=10)

    # Assert
    assert len(children_user1) == 2
    child_ids_user1 = [c.id for c in children_user1]
    assert child1_user1.id in child_ids_user1
    assert child2_user1.id in child_ids_user1

    # User2 has 1 child, skipping 1 should yield 0
    assert len(children_user2_skip1) == 0

    children_user2_all = crud.child.get_children_by_user(
        db=db_session, user_id=db_user2.id, skip=0, limit=10)
    assert len(children_user2_all) == 1
    assert children_user2_all[0].id == child1_user2.id


def test_update_child(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_child_update_user")
    child_to_update = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_update")

    update_data = schemas.ChildUpdate(
        name="Updated Child Name",
        age=7,
        interests=["reading", "coding"]
    )

    # Act
    updated_child = crud.child.update_child(
        db=db_session, db_child=child_to_update, child_in=update_data)

    # Assert
    assert updated_child is not None
    assert updated_child.id == child_to_update.id
    assert updated_child.name == "Updated Child Name"
    assert updated_child.age == 7
    assert updated_child.interests == ["reading", "coding"]
    assert updated_child.user_id == db_user.id

    # Verify in DB
    db_child_verify = db_session.query(models.Child).filter(
        models.Child.id == child_to_update.id).first()
    assert db_child_verify.name == "Updated Child Name"
    assert db_child_verify.age == 7
    assert db_child_verify.interests == ["reading", "coding"]


def test_delete_child(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_child_delete_user")
    child_to_delete = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_delete")
    child_id_to_delete = child_to_delete.id

    # Act
    db_child_to_delete = crud.child.get_child(
        db=db_session, child_id=child_id_to_delete, user_id=db_user.id)
    deleted_child = None
    if db_child_to_delete:
        deleted_child = crud.child.delete_child(
            db=db_session, db_child=db_child_to_delete)

    # Assert
    assert deleted_child is not None
    assert deleted_child.id == child_id_to_delete

    # Verify in DB
    db_child_verify = db_session.query(models.Child).filter(
        models.Child.id == child_id_to_delete).first()
    assert db_child_verify is None

    # Try deleting non-existent child
    non_existent_child_obj = crud.child.get_child(
        db=db_session, child_id=uuid.uuid4(), user_id=db_user.id)
    delete_non_existent_result = None
    if non_existent_child_obj:  # Should be None
        delete_non_existent_result = crud.child.delete_child(
            db=db_session, db_child=non_existent_child_obj)
    assert delete_non_existent_result is None

    # Try deleting child of another user (should not be found by get_child for other_user)
    other_user = create_db_user(
        db=db_session, email_suffix="_child_delete_other_user")
    child_of_original_user_again = create_db_child(  # Recreate a child for original user to test deletion attempt by other_user
        db=db_session, user_id=db_user.id, name_suffix="_delete_recreate_for_other_user_test")

    child_to_delete_by_other_user = crud.child.get_child(
        db=db_session, child_id=child_of_original_user_again.id, user_id=other_user.id)
    delete_wrong_user_result = None
    if child_to_delete_by_other_user:  # This should be None as child belongs to db_user
        delete_wrong_user_result = crud.child.delete_child(
            db=db_session, db_child=child_to_delete_by_other_user)
    assert delete_wrong_user_result is None

    # Verify it wasn't deleted by the wrong user
    still_exists = db_session.query(models.Child).filter(
        models.Child.id == child_of_original_user_again.id).first()
    assert still_exists is not None
