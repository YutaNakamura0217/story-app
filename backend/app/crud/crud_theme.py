import uuid
from typing import List, Optional

from sqlalchemy.orm import Session, joinedload, Query
from sqlalchemy import func

from .. import models, schemas


def create_theme(db: Session, theme: schemas.ThemeCreate) -> models.Theme:
    db_theme = models.Theme(**theme.model_dump())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme


def get_theme(db: Session, theme_id: uuid.UUID) -> Optional[models.Theme]:
    # Cast is not strictly necessary for comparison with UUID in filter,
    # but can be explicit if issues arise with specific DB drivers.
    # query = db.query(models.Theme).filter(models.Theme.id == theme_id)
    # For ThemeRead, we might need book_count. If so, this needs adjustment.
    # The plan for GET /themes/{theme_id}/books implies theme details are simple.
    # The plan for GET /themes (list) shows book_count.
    # Let's assume get_theme by ID doesn't need book_count for now,
    # or it's handled at the route level if needed.
    return db.query(models.Theme).filter(models.Theme.id == theme_id).first()


def get_themes(db: Session, skip: int = 0, limit: int = 100) -> List[models.Theme]:
    # Query to get themes and their associated book counts
    # This approach uses a subquery to count books per theme.
    # An alternative is a left join and group by, but this can be cleaner.

    # Subquery to count books for each theme
    # book_count_subquery = (
    #     db.query(models.BookTheme.theme_id, func.count(models.BookTheme.book_id).label("book_count"))
    #     .group_by(models.BookTheme.theme_id)
    #     .subquery()
    # )

    # query = (
    #     db.query(
    #         models.Theme,
    #         func.coalesce(book_count_subquery.c.book_count, 0).label("book_count")
    #     )
    #     .outerjoin(book_count_subquery, models.Theme.id == book_count_subquery.c.theme_id)
    #     .order_by(models.Theme.name) # Or some other default order
    #     .offset(skip)
    #     .limit(limit)
    # )
    # results = query.all()
    # themes_with_count = []
    # for theme, count in results:
    #     theme.book_count = count # Attach the count to the model instance (if schema supports it)
    #     themes_with_count.append(theme)
    # return themes_with_count

    # Simpler approach for now, calculate book_count on the fly if needed by schema,
    # or rely on relationship counts if performance allows for smaller datasets.
    # For larger datasets, the subquery/join approach is better.
    # The Pydantic schema ThemeRead has book_count, so it needs to be populated.

    results = db.query(models.Theme).order_by(
        models.Theme.name).offset(skip).limit(limit).all()

    # Populate book_count. This will cause N+1 queries if not careful.
    # A more optimized way is to use a relationship loader or a specific query.
    # For now, let's do it directly for simplicity, assuming the number of themes isn't huge.
    # This is not ideal for performance.
    # A better way:
    # themes = db.query(models.Theme).options(joinedload(models.Theme.book_themes)).order_by(models.Theme.name).offset(skip).limit(limit).all()
    # for theme in themes:
    #     theme.book_count = len(theme.book_themes) # This relies on the relationship being loaded
    # return themes
    # The above is better. Let's use that.

    themes = db.query(models.Theme).options(
        # This will load all book_themes for each theme
        joinedload(models.Theme.book_themes)
    ).order_by(models.Theme.name).offset(skip).limit(limit).all()

    # The ThemeRead schema expects book_count. We can't directly assign to theme.book_count
    # if the model doesn't have it. The schema will handle it if orm_mode=True and
    # there's a way to derive it.
    # Let's assume the route will construct ThemeRead and calculate book_count there from len(theme.book_themes)
    # So, this CRUD function just returns the models.
    return themes


def update_theme(db: Session, db_theme: models.Theme, theme_in: schemas.ThemeUpdate) -> models.Theme:
    update_data = theme_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_theme, field, value)

    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme


def delete_theme(db: Session, db_theme: models.Theme) -> models.Theme:
    # Consider what happens to BookTheme entries (CASCADE should handle it based on model)
    db.delete(db_theme)
    db.commit()
    return db_theme
