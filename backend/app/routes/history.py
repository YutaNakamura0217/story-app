from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
import uuid
from typing import Optional

from backend.app import schemas, models
from backend.app.core.security import get_current_user
from backend.app.crud import crud_history
from backend.app.db import get_db

router = APIRouter()


@router.get("/users/me/learning-history", response_model=list[schemas.LearningActivityRead])
def get_learning_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    child_id: Optional[uuid.UUID] = Query(None),
    skip: int = 0,
    limit: int = 10,
) -> list[schemas.LearningActivityRead]:
    return crud_history.get_learning_activities_by_user(
        db, user_id=current_user.id, child_id=child_id, skip=skip, limit=limit
    )
