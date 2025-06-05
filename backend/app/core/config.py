from typing import Optional
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Philosophy Picture Book Platform API"
    API_V1_STR: str = "/api/v1"

    # Database settings
    # Loaded from .env
    DATABASE_URL: str = "postgresql+psycopg2://postgres:Yuki0217@localhost:5432/story_app_default_from_config"
    # Loaded from .env, used if TESTING=true
    TEST_DATABASE_URL: Optional[str] = None

    # JWT settings
    # Loaded from .env
    SECRET_KEY: str = "your_default_secret_key_here_please_change_in_env"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * \
        7  # 7 days, can be overridden by .env

    # Environment mode
    TESTING: bool = False  # Can be overridden by .env e.g. TESTING=true

    BASE_DIR: Path = Path(__file__).resolve().parents[2]

    model_config = SettingsConfigDict(
        # Load environment variables from backend/.env regardless of CWD
        env_file=BASE_DIR / ".env",
        extra='ignore',
        case_sensitive=False,
    )


settings = Settings()
