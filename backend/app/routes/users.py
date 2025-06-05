from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import schemas, models
from backend.app.crud import crud_user
from backend.app.core.security import get_current_user
from backend.app.db import get_db

router = APIRouter()


@router.get("/me", response_model=schemas.UserRead)
def read_current_user(current_user: models.User = Depends(get_current_user)) -> schemas.UserRead:
    """Return the current authenticated user."""
    return current_user


@router.put("/me", response_model=schemas.UserRead)
def update_current_user(
    user_in: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserRead:
    updated_user = crud_user.update_user(db, db_user=current_user, user_in=user_in)
    db.commit()
    db.refresh(updated_user)
    return updated_user


@router.get("/me/settings", response_model=schemas.UserSettingsRead)
def read_user_settings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserSettingsRead:
    settings = crud_user.get_user_settings(db, user_id=current_user.id)
    if not settings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings not found")
    return settings


@router.put("/me/settings", response_model=schemas.UserSettingsRead)
def update_user_settings(
    settings_in: schemas.UserSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserSettingsRead:
    db_settings = crud_user.get_user_settings(db, user_id=current_user.id)
    if not db_settings:
        db_settings = models.UserSettings(user_id=current_user.id)
        db.add(db_settings)
        db.flush()
    updated = crud_user.update_user_settings(
        db, db_user_settings=db_settings, settings_in=settings_in
    )
    db.commit()
    db.refresh(updated)
    return updated


@router.put("/me/change-email", response_model=schemas.Msg)
def change_email(
    email_in: schemas.UserEmailUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.Msg:
    if crud_user.get_user_by_email(db, email_in.new_email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use")
    current_user.email = email_in.new_email
    db.add(current_user)
    db.commit()
    return {"message": "Email updated"}


@router.put("/me/change-password", response_model=schemas.Msg)
def change_password(
    pw_update: schemas.UserPasswordUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> schemas.Msg:
    if not crud_user.verify_password(pw_update.current_password, current_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect current password")
    current_user.hashed_password = crud_user.get_password_hash(pw_update.new_password)
    db.add(current_user)
    db.commit()
    return {"message": "Password changed successfully"}

# Endpoints for /users will be defined here (e.g., favorites)
