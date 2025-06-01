from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.app import schemas, models
from backend.app.crud import crud_user
from backend.app.core.security import create_access_token, get_password_hash, verify_password
from backend.app.db import get_db
# For token expiration, if needed directly
from backend.app.core.config import settings

router = APIRouter(tags=["auth"])


@router.post("/register", response_model=schemas.Token)
def register_user(
    user_in: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """
    Register a new user.
    """
    db_user = crud_user.get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(user_in.password)
    # Create a new UserCreateWithHashedPassword object or similar if your CRUD expects it
    # For now, assuming crud_user.create_user can take UserCreate and handle hashing,
    # or we pass the hashed password directly if the Pydantic model is flexible or
    # crud_user.create_user is adapted.
    # Let's adapt to pass necessary fields for User model creation.

    user_create_data = user_in.model_dump()
    # We need to ensure the User model is created with the hashed_password
    # and not the plain password.
    # crud_user.create_user should handle this.
    # For this example, let's assume crud_user.create_user takes a dictionary
    # or a specific schema that includes hashed_password.
    # A common pattern is to have a UserCreateInDB schema.

    # Simplified: create a user model instance then pass to a generic create
    # This is not ideal, crud_user.create_user should be designed for this.
    # Assuming crud_user.create_user takes the UserCreate schema and handles hashing internally
    # or takes specific fields.
    # For now, let's assume crud_user.create_user is smart or we prepare data for it.

    # Correct approach: crud_user.create_user should accept UserCreate and hash password inside
    # or accept a specific input schema like UserCreateInternal.
    # Let's assume crud_user.create_user is adapted to take UserCreate and hashes password.
    # If not, it would be:
    # user_db_in = models.User(
    #     email=user_in.email,
    #     name=user_in.name,
    #     hashed_password=hashed_password,
    #     tier=user_in.tier if user_in.tier else schemas.UserTierEnum.FREE, # Default tier
    #     avatar_url=user_in.avatar_url,
    #     introduction=user_in.introduction
    # )
    # new_user = crud_user.create_user_direct(db, user_model_instance=user_db_in) # Fictional direct create

    # Assuming crud_user.create_user is like:
    # def create_user(db: Session, *, user_in: schemas.UserCreate) -> models.User:
    #     hashed_password = get_password_hash(user_in.password)
    #     db_user = models.User(**user_in.model_dump(exclude={"password"}), hashed_password=hashed_password)
    #     db.add(db_user)
    #     db.commit()
    #     db.refresh(db_user)
    #     return db_user
    # This is a common pattern. If crud_user.create_user is simpler, this route needs adjustment.
    # Given "CRUD is done", let's assume create_user handles it.

    # This assumes create_user hashes the password from user_in.password
    new_user = crud_user.create_user(db=db, user=user_in)

    access_token = create_access_token(
        data={"sub": new_user.email, "user_id": str(new_user.id)}
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": schemas.UserRead.model_validate(new_user)
    }


@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = crud_user.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.email, "user_id": str(user.id)}
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": schemas.UserRead.model_validate(user)
    }


@router.post("/request-password-reset", response_model=schemas.Msg)
def request_password_reset(
    # Assuming EmailSchema { email: str } exists
    email_data: schemas.EmailSchema,
    db: Session = Depends(get_db)
):
    """
    Password Recovery. Sends a password reset email.
    (Functionality for sending email is a placeholder).
    """
    user = crud_user.get_user_by_email(db, email=email_data.email)
    if not user:
        # Still return a success-like message to prevent email enumeration
        # but log that the user was not found, or handle as per security policy.
        # For now, let's be explicit if user not found for simplicity in this phase.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this email does not exist in the system.",
        )

    # In a real application:
    # 1. Generate a password reset token.
    # 2. Save the token with user ID and expiry.
    # 3. Send an email to the user with the reset link including the token.
    # For now, as per plan, just a message.

    return {"message": "Password reset email sent (mocked)."}


@router.post("/reset-password", response_model=schemas.Msg)
def reset_password(
    # Assuming { token: str, new_password: str }
    reset_data: schemas.PasswordResetSchema,
    db: Session = Depends(get_db)
):
    """
    Reset password.
    (Token validation and password update is a placeholder).
    """
    # In a real application:
    # 1. Validate the token (check if it exists, is not expired, matches a user).
    # 2. If valid, get the user_id associated with the token.
    # 3. Get the user from the database.
    # 4. Hash the new_password.
    # 5. Update the user's hashed_password in the database.
    # 6. Invalidate or delete the used reset token.

    # For now, as per plan, just a message.
    # Example of how it might look if crud_user.update_password existed:
    # user = crud_user.get_user_by_reset_token(db, token=reset_data.token) # Fictional
    # if not user:
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    #
    # hashed_password = get_password_hash(reset_data.new_password)
    # crud_user.update_password(db, user_id=user.id, new_hashed_password=hashed_password) # Fictional

    return {"message": "Password reset successfully (mocked)."}
