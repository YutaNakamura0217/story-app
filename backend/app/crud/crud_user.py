import uuid
from typing import Optional

from sqlalchemy.orm import Session
from passlib.context import CryptContext  # For password hashing

from .. import models, schemas

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# User CRUD operations
def get_user(db: Session, user_id: uuid.UUID) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        avatar_url=user.avatar_url,
        introduction=user.introduction,
        # tier will default to FREE as per model definition
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Create default user settings
    db_user_settings = models.UserSettings(user_id=db_user.id)
    db.add(db_user_settings)
    db.commit()
    # db.refresh(db_user_settings) # Not strictly necessary to refresh settings here
    # db.refresh(db_user) # Refresh user again to get user_settings relationship populated if needed immediately

    return db_user


def update_user(db: Session, db_user: models.User, user_in: schemas.UserUpdate) -> models.User:
    update_data = user_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# UserSettings CRUD operations


def get_user_settings(db: Session, user_id: uuid.UUID) -> Optional[models.UserSettings]:
    return db.query(models.UserSettings).filter(models.UserSettings.user_id == user_id).first()


def update_user_settings(
    db: Session,
    db_user_settings: models.UserSettings,
    settings_in: schemas.UserSettingsUpdate
) -> models.UserSettings:
    update_data = settings_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user_settings, field, value)

    db.add(db_user_settings)
    db.commit()
    db.refresh(db_user_settings)
    return db_user_settings
