import uuid
from typing import List, Optional

from sqlalchemy.orm import Session
from sqlalchemy import desc

from .. import models, schemas


def create_learning_activity(
    db: Session,
    # user_id and child_id are in this schema
    activity: schemas.LearningActivityCreate,
) -> models.LearningActivity:
    db_activity = models.LearningActivity(
        user_id=activity.user_id,  # Ensure these are passed correctly
        child_id=activity.child_id,
        activity_type=activity.activity_type,
        description=activity.description,
        related_entity_id=activity.related_entity_id,
        related_link=activity.related_link
    )
    db.add(db_activity)
    # db.commit() # Removed
    db.flush()
    db.refresh(db_activity)
    return db_activity


def get_learning_activity(db: Session, activity_id: uuid.UUID) -> Optional[models.LearningActivity]:
    return db.query(models.LearningActivity).filter(models.LearningActivity.id == activity_id).first()


def get_learning_activities_by_user(
    db: Session,
    user_id: uuid.UUID,
    child_id: Optional[uuid.UUID] = None,  # Filter by child if provided
    skip: int = 0,
    limit: int = 10  # As per plan example
) -> List[models.LearningActivity]:
    query = db.query(models.LearningActivity).filter(
        models.LearningActivity.user_id == user_id)

    if child_id:
        query = query.filter(models.LearningActivity.child_id == child_id)

    return query.order_by(desc(models.LearningActivity.created_at)).offset(skip).limit(limit).all()
