import uuid
from typing import List, Optional

from sqlalchemy.orm import Session

from .. import models, schemas


def create_child(db: Session, child: schemas.ChildCreate, user_id: uuid.UUID) -> models.Child:
    db_child = models.Child(
        **child.dict(),
        user_id=user_id
    )
    db.add(db_child)
    db.commit()
    db.refresh(db_child)
    return db_child


def get_child(db: Session, child_id: uuid.UUID, user_id: uuid.UUID) -> Optional[models.Child]:
    return db.query(models.Child).filter(models.Child.id == child_id, models.Child.user_id == user_id).first()


def get_children_by_user(db: Session, user_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[models.Child]:
    return db.query(models.Child).filter(models.Child.user_id == user_id).offset(skip).limit(limit).all()


def update_child(db: Session, db_child: models.Child, child_in: schemas.ChildUpdate) -> models.Child:
    update_data = child_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_child, field, value)

    db.add(db_child)
    db.commit()
    db.refresh(db_child)
    return db_child


def delete_child(db: Session, db_child: models.Child) -> models.Child:
    db.delete(db_child)
    db.commit()
    return db_child
