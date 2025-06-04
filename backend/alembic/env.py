from backend.app.db import Base, CURRENT_DATABASE_URL as APP_CONFIGURED_DATABASE_URL
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# Import Base from your application's database setup
# Import all models here to ensure they are registered with Base.metadata
# This assumes your models are in backend.app.models and define __all__ or are explicitly imported
import backend.app.models  # noqa

target_metadata = Base.metadata

# Override sqlalchemy.url from alembic.ini with the one determined by db.py (which is test-aware)
# This ensures Alembic targets the same database as the application based on the TESTING env var.
if APP_CONFIGURED_DATABASE_URL:
    config.set_main_option("sqlalchemy.url", APP_CONFIGURED_DATABASE_URL)
else:
    # This case should ideally not happen if db.py is correctly setting DATABASE_URL
    # and .env has the necessary fallbacks or direct values.
    # For safety, you might log a warning or raise an error if needed.
    # Or raise an error: raise ValueError("Database URL for Alembic could not be determined.")
    pass


# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
