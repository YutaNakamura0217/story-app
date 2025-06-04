from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid

from backend.app import schemas, models
from backend.app.crud import crud_child
from backend.app.core.security import get_current_user
from backend.app.db import get_db

router = APIRouter()


@router.get("/users/me/children", response_model=list[schemas.ChildRead])
def list_children(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> list[schemas.ChildRead]:
    children = crud_child.get_children_by_user(
        db, user_id=current_user.id, skip=skip, limit=limit
    )
    return children


@router.post("/users/me/children", response_model=schemas.ChildRead, status_code=status.HTTP_201_CREATED)
def create_child(
    child_in: schemas.ChildCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.ChildRead:
    child = crud_child.create_child(db, child=child_in, user_id=current_user.id)
    db.commit()
    db.refresh(child)
    return child


@router.get("/users/me/children/{child_id}", response_model=schemas.ChildRead)
def read_child(
    child_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.ChildRead:
    child = crud_child.get_child(db, child_id=child_id, user_id=current_user.id)
    if not child:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Child not found")
    return child


@router.put("/users/me/children/{child_id}", response_model=schemas.ChildRead)
def update_child(
    child_id: uuid.UUID,
    child_in: schemas.ChildUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.ChildRead:
    db_child = crud_child.get_child(db, child_id=child_id, user_id=current_user.id)
    if not db_child:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Child not found")
    updated_child = crud_child.update_child(db, db_child=db_child, child_in=child_in)
    db.commit()
    db.refresh(updated_child)
    return updated_child


@router.delete("/users/me/children/{child_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_child(
    child_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> None:
    db_child = crud_child.get_child(db, child_id=child_id, user_id=current_user.id)
    if not db_child:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Child not found")
    crud_child.delete_child(db, db_child=db_child)
    db.commit()
    return None
