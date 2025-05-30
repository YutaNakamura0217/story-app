import pytest
import uuid
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.models import ThemeCategoryEnum  # Import enum for direct use

# Helper function to create theme data for tests


def create_dummy_theme_data(name_suffix: str = "", category: ThemeCategoryEnum = ThemeCategoryEnum.SELF) -> schemas.ThemeCreate:
    return schemas.ThemeCreate(
        name=f"Test Theme {name_suffix}".strip(),
        description=f"Description for Test Theme {name_suffix}".strip(),
        icon_identifier="SparklesIcon",
        age_range_display="3-5歳",
        category=category,
        cover_image_url=f"https://example.com/theme_cover_{name_suffix.lower()}.png",
        question_prompt=f"What is Test Theme {name_suffix}?"
    )

# Helper function to create a theme directly in the DB for prerequisite data


def create_db_theme(db: Session, name_suffix: str = "", category: ThemeCategoryEnum = ThemeCategoryEnum.SELF) -> models.Theme:
    theme_in = create_dummy_theme_data(
        name_suffix=name_suffix, category=category)
    db_theme = models.Theme(**theme_in.model_dump())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme


def test_create_theme(db_session: Session):
    # Arrange
    theme_in_data = create_dummy_theme_data(name_suffix="_create")

    # Act
    created_theme = crud.theme.create_theme(db=db_session, theme=theme_in_data)

    # Assert
    assert created_theme is not None
    assert created_theme.name == theme_in_data.name
    assert created_theme.description == theme_in_data.description
    assert created_theme.category == theme_in_data.category

    # Verify in DB
    db_theme = db_session.query(models.Theme).filter(
        models.Theme.id == created_theme.id).first()
    assert db_theme is not None
    assert db_theme.name == theme_in_data.name


def test_get_theme_by_id(db_session: Session):
    # Arrange
    created_theme = create_db_theme(db=db_session, name_suffix="_getbyid")

    # Act
    retrieved_theme = crud.theme.get_theme(
        db=db_session, theme_id=created_theme.id)

    # Assert
    assert retrieved_theme is not None
    assert retrieved_theme.id == created_theme.id
    assert retrieved_theme.name == created_theme.name

    # Test non-existent theme
    non_existent_theme = crud.theme.get_theme(
        db=db_session, theme_id=uuid.uuid4())
    assert non_existent_theme is None


# def test_get_theme_by_name(db_session: Session):
#     # crud_theme.py does not have get_theme_by_name function
#     # Arrange
#     created_theme = create_db_theme(db=db_session, name_suffix="_getbyname")
#
#     # Act
#     # retrieved_theme = crud.theme.get_theme_by_name(
#     #     db=db_session, name=created_theme.name)
#     retrieved_theme = None # Placeholder
#
#     # Assert
#     # assert retrieved_theme is not None
#     # assert retrieved_theme.id == created_theme.id
#     # assert retrieved_theme.name == created_theme.name
#
#     # Test non-existent name
#     # non_existent_theme = crud.theme.get_theme_by_name(
#     #     db=db_session, name="NonExistent Theme Name")
#     # assert non_existent_theme is None
#     pass


def test_get_themes(db_session: Session):
    # Arrange
    theme1 = create_db_theme(
        db=db_session, name_suffix="_list1", category=ThemeCategoryEnum.SELF)
    theme2 = create_db_theme(
        db=db_session, name_suffix="_list2", category=ThemeCategoryEnum.OTHERS)

    # Act
    themes_all = crud.theme.get_themes(db=db_session, skip=0, limit=10)
    # crud.theme.get_themes does not support category filtering directly
    # To test category filtering, we would need to filter the results manually
    # or modify the get_themes CRUD function.
    # For now, we test retrieval of all and pagination.

    # themes_category_self = crud.theme.get_themes(
    #     db=db_session, category=ThemeCategoryEnum.SELF, skip=0, limit=10) # This will cause TypeError

    # Manual filtering for assertion purposes:
    all_themes_from_db = crud.theme.get_themes(
        db=db_session, limit=100)  # Get all to filter
    themes_category_self_manual = [
        t for t in all_themes_from_db if t.category == ThemeCategoryEnum.SELF]

    themes_skip1_limit1 = crud.theme.get_themes(db=db_session, skip=1, limit=1)

    # Assert
    assert len(themes_all) >= 2
    theme_ids_all = [t.id for t in themes_all]
    assert theme1.id in theme_ids_all
    assert theme2.id in theme_ids_all

    assert len(themes_category_self_manual) >= 1
    assert all(
        t.category == ThemeCategoryEnum.SELF for t in themes_category_self_manual)
    assert theme1.id in [t.id for t in themes_category_self_manual]
    # Ensure theme2 (OTHERS category) is not in the SELF list
    if theme2.category != ThemeCategoryEnum.SELF:
        assert theme2.id not in [t.id for t in themes_category_self_manual]

    assert len(themes_skip1_limit1) == 1
    # Since the order is by name, and we don't know the exact order of theme1 and theme2 by name without checking,
    # we can assert that the skipped theme is one of the two created, and not the other.
    # Or, more simply, ensure that the result of skip=1, limit=1 is one of the created themes.
    # And that it's different from the first theme if we were to sort them by name.
    all_created_themes_sorted_by_name = sorted(
        [theme1, theme2], key=lambda t: t.name)
    if len(all_created_themes_sorted_by_name) > 1:
        # The themes_skip1_limit1 should contain the second theme when ordered by name
        assert themes_skip1_limit1[0].id == all_created_themes_sorted_by_name[1].id


def test_update_theme(db_session: Session):
    # Arrange
    theme_to_update = create_db_theme(db=db_session, name_suffix="_update")
    update_data = schemas.ThemeUpdate(
        name="Updated Theme Name",
        description="This is an updated theme description.",
        category=ThemeCategoryEnum.WORLD
    )

    # Act
    updated_theme = crud.theme.update_theme(
        db=db_session, db_theme=theme_to_update, theme_in=update_data)

    # Assert
    assert updated_theme is not None
    assert updated_theme.id == theme_to_update.id
    assert updated_theme.name == "Updated Theme Name"
    assert updated_theme.description == "This is an updated theme description."
    assert updated_theme.category == ThemeCategoryEnum.WORLD

    # Verify in DB
    db_theme = db_session.query(models.Theme).filter(
        models.Theme.id == theme_to_update.id).first()
    assert db_theme.name == "Updated Theme Name"
    assert db_theme.description == "This is an updated theme description."
    assert db_theme.category == ThemeCategoryEnum.WORLD


def test_delete_theme(db_session: Session):
    # Arrange
    theme_to_delete = create_db_theme(db=db_session, name_suffix="_delete")
    theme_id_to_delete = theme_to_delete.id

    # Act
    db_theme_to_delete = crud.theme.get_theme(
        db=db_session, theme_id=theme_id_to_delete)
    deleted_theme_obj = None
    if db_theme_to_delete:
        deleted_theme_obj = crud.theme.delete_theme(
            db=db_session, db_theme=db_theme_to_delete)

    # Assert
    assert deleted_theme_obj is not None
    assert deleted_theme_obj.id == theme_id_to_delete

    # Verify in DB
    db_theme = db_session.query(models.Theme).filter(
        models.Theme.id == theme_id_to_delete).first()
    assert db_theme is None
