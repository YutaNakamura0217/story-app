import uuid
from typing import Optional, List

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


def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[models.User]:
    """Retrieve a list of users with pagination."""
    return db.query(models.User).offset(skip).limit(limit).all()


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
    db.flush()  # Flush to get db_user.id
    db.refresh(db_user)

    # Create default user settings
    db_user_settings = models.UserSettings(user_id=db_user.id)
    db.add(db_user_settings)
    db.flush()  # Flush UserSettings changes
    db.refresh(db_user_settings)
    # Refresh user to ensure user_settings relationship is populated
    # This refresh might be redundant if the relationship is well-defined
    db.refresh(db_user)
    # and UserSettings creation doesn't alter User in a way that needs another refresh.
    # However, keeping it for safety unless proven unnecessary.

    return db_user


def update_user(db: Session, db_user: models.User, user_in: schemas.UserUpdate) -> models.User:
    update_data = user_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)

    db.add(db_user)  # or db.merge(db_user)
    # db.commit() # Removed
    db.flush()
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
    update_data = settings_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user_settings, field, value)

    db.add(db_user_settings)  # or db.merge(db_user_settings)
    # db.commit() # Removed
    db.flush()
    db.refresh(db_user_settings)
    return db_user_settings
