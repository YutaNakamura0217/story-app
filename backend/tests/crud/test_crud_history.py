import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.models import ActivityTypeEnum  # For direct use of enum
from datetime import datetime
from typing import Optional  # Added for Optional type hint

# Import helpers from other test files
from tests.crud.test_crud_user import create_db_user
# For child-related activities
from tests.crud.test_crud_child import create_db_child

# Helper function to create learning activity data for tests


def create_dummy_learning_activity_data(
    user_id: uuid.UUID,  # user_id is now part of the data
    child_id: Optional[uuid.UUID] = None,  # child_id is now part of the data
    activity_type: ActivityTypeEnum = ActivityTypeEnum.BOOK_READ_COMPLETED,
    description: str = "Completed a book.",
    related_entity_id: Optional[uuid.UUID] = None  # Made Optional
) -> schemas.LearningActivityCreate:
    actual_related_entity_id = related_entity_id if related_entity_id else uuid.uuid4()
    return schemas.LearningActivityCreate(
        user_id=user_id,
        child_id=child_id,
        activity_type=activity_type,
        description=description,
        related_entity_id=actual_related_entity_id,
        related_link=f"/some/link/{actual_related_entity_id}"
    )


def test_create_learning_activity_for_user(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_hist_user_user")
    activity_in_data = create_dummy_learning_activity_data(
        user_id=db_user.id,  # Pass user_id to helper
        description="User read a book")

    # Act
    created_activity = crud.history.create_learning_activity(
        db=db_session, activity=activity_in_data  # Pass schema object directly
    )

    # Assert
    assert created_activity is not None
    assert created_activity.user_id == db_user.id
    assert created_activity.child_id is None
    assert created_activity.description == activity_in_data.description
    assert created_activity.activity_type == activity_in_data.activity_type
    assert isinstance(created_activity.created_at, datetime)

    # Verify in DB
    db_activity_verify = db_session.query(models.LearningActivity).filter(
        models.LearningActivity.id == created_activity.id).first()
    assert db_activity_verify is not None
    assert db_activity_verify.user_id == db_user.id
    assert db_activity_verify.child_id is None


def test_create_learning_activity_for_child(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_hist_child_user")
    db_child = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_hist_child")
    activity_in_data = create_dummy_learning_activity_data(
        user_id=db_user.id,  # Pass user_id
        child_id=db_child.id,  # Pass child_id
        activity_type=ActivityTypeEnum.QUESTION_ANSWERED,
        description="Child answered a question."
    )

    # Act
    created_activity = crud.history.create_learning_activity(
        db=db_session, activity=activity_in_data  # Pass schema object directly
    )

    # Assert
    assert created_activity is not None
    assert created_activity.user_id == db_user.id
    assert created_activity.child_id == db_child.id
    assert created_activity.description == activity_in_data.description

    # Verify in DB
    db_activity_verify = db_session.query(models.LearningActivity).filter(
        models.LearningActivity.id == created_activity.id).first()
    assert db_activity_verify is not None
    assert db_activity_verify.child_id == db_child.id


def test_get_learning_activities_by_user(db_session: Session):
    # Arrange
    db_user1 = create_db_user(db=db_session, email_suffix="_hist_list_user1")
    db_user2 = create_db_user(db=db_session, email_suffix="_hist_list_user2")

    act1_user1 = crud.history.create_learning_activity(
        db=db_session, activity=create_dummy_learning_activity_data(user_id=db_user1.id, description="U1Act1"))
    act2_user1 = crud.history.create_learning_activity(
        db=db_session, activity=create_dummy_learning_activity_data(user_id=db_user1.id, description="U1Act2"))
    act1_user2 = crud.history.create_learning_activity(
        db=db_session, activity=create_dummy_learning_activity_data(user_id=db_user2.id, description="U2Act1"))

    # Act
    # crud_history.py has get_learning_activities_by_user, not get_learning_activities
    activities_user1 = crud.history.get_learning_activities_by_user(
        db=db_session, user_id=db_user1.id, skip=0, limit=10)
    activities_user2_limit1 = crud.history.get_learning_activities_by_user(
        db=db_session, user_id=db_user2.id, skip=0, limit=1)

    # Assert
    assert len(activities_user1) == 2
    # Sort by ID for consistent comparison
    activity_ids_user1 = sorted([act.id for act in activities_user1])
    expected_ids_user1 = sorted([act1_user1.id, act2_user1.id])
    assert activity_ids_user1 == expected_ids_user1

    assert len(activities_user2_limit1) == 1
    assert activities_user2_limit1[0].id == act1_user2.id


def test_get_learning_activities_by_child(db_session: Session):
    # Arrange
    db_user = create_db_user(
        db=db_session, email_suffix="_hist_childlist_user")
    db_child1 = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_hist_child1")
    db_child2 = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_hist_child2")

    act1_child1 = crud.history.create_learning_activity(db=db_session, activity=create_dummy_learning_activity_data(
        user_id=db_user.id, child_id=db_child1.id, description="C1Act1"))
    act2_child1 = crud.history.create_learning_activity(db=db_session, activity=create_dummy_learning_activity_data(
        user_id=db_user.id, child_id=db_child1.id, description="C1Act2"))
    act1_child2 = crud.history.create_learning_activity(db=db_session, activity=create_dummy_learning_activity_data(
        user_id=db_user.id, child_id=db_child2.id, description="C2Act1"))

    # Act
    activities_child1 = crud.history.get_learning_activities_by_user(  # Corrected function name
        db=db_session, user_id=db_user.id, child_id=db_child1.id, skip=0, limit=10)
    activities_child2_limit1 = crud.history.get_learning_activities_by_user(  # Corrected function name
        db=db_session, user_id=db_user.id, child_id=db_child2.id, skip=0, limit=1)

    # Assert
    assert len(activities_child1) == 2
    activity_ids_child1 = sorted([act.id for act in activities_child1])
    expected_ids_child1 = sorted([act1_child1.id, act2_child1.id])
    assert activity_ids_child1 == expected_ids_child1

    assert len(activities_child2_limit1) == 1
    assert activities_child2_limit1[0].id == act1_child2.id


def test_get_learning_activities_all_for_user_including_children(db_session: Session):
    # Arrange
    db_user = create_db_user(db=db_session, email_suffix="_hist_all_user")
    db_child = create_db_child(
        db=db_session, user_id=db_user.id, name_suffix="_hist_all_child")

    user_activity = crud.history.create_learning_activity(
        db=db_session, activity=create_dummy_learning_activity_data(user_id=db_user.id, description="UserOnlyActivity"))
    child_activity = crud.history.create_learning_activity(db=db_session, activity=create_dummy_learning_activity_data(
        user_id=db_user.id, child_id=db_child.id, description="ChildActivity"))

    # Act
    # get_learning_activities_by_user with child_id=None should fetch all for the user (including children's if designed that way)
    # crud_history.py's get_learning_activities_by_user filters by child_id if provided, otherwise only user_id.
    # So, to get all (user + child), we'd need two calls or a modified CRUD.
    # For this test, let's test that get_learning_activities_by_user with no child_id gets user-only activities.

    user_only_activities = crud.history.get_learning_activities_by_user(
        db=db_session, user_id=db_user.id, skip=0, limit=10)  # child_id is None by default

    # Assert
    # This should only fetch activities where child_id IS NULL for this user.
    assert len(user_only_activities) >= 1
    user_activity_ids = [act.id for act in user_only_activities]
    assert user_activity.id in user_activity_ids
    # crud_history.get_learning_activities_by_user without child_id currently returns all activities for the user,
    # including those associated with children. So, child_activity.id should be present.
    assert child_activity.id in user_activity_ids

    # To test fetching all (user + specific child), we already have test_get_learning_activities_by_child
    # To test fetching all (user + all children), the CRUD function would need modification or multiple calls.
