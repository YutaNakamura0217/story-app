import pytest
import uuid
from typing import List

from sqlalchemy.orm import Session

from app import crud
from app import models
from app import schemas
from app.models import Theme  # Explicit import for Theme model


def create_dummy_themes(db: Session, count: int = 1) -> List[models.Theme]:
    """Helper function to create dummy themes for testing."""
    themes = []
    for i in range(count):
        theme_name = f"Test Theme {uuid.uuid4()}"  # Ensure unique name
        theme_in = schemas.ThemeCreate(
            name=theme_name,
            description=f"Description for {theme_name}",
            icon_identifier="TestIcon",
            age_range_display="0-99",
            category="self",  # Assuming 'self' is a valid ThemeCategoryEnum value
            question_prompt=f"Question for {theme_name}?"
        )
        theme = crud.theme.create_theme(db=db, theme=theme_in)
        themes.append(theme)
    return themes


def test_create_book(db_session: Session):
    """
    Test creating a book with and without themes.
    """
    # 1. Create prerequisite dummy themes
    dummy_themes = create_dummy_themes(db_session, count=2)
    theme1_id = dummy_themes[0].id
    theme2_id = dummy_themes[1].id

    # 2. Prepare BookCreate schema
    book_in_data = {
        "title": "My Test Book",
        "author_name": "Test Author",
        "description": "A book for testing CRUD operations.",
        "long_description": "This is a longer description of the test book.",
        "reading_time_minutes": 15,
        "age_min": 5,
        "age_max": 8,
        "publisher": "Test Publisher",
        # "publish_date": "2023-01-01", # Date needs to be datetime.date object
        "is_premium": False,
        "is_free": True,
        "popularity_score": 100,
        "total_pages": 50,
        "theme_ids": [theme1_id, theme2_id]
    }
    # Pydantic model will handle date conversion if input is string,
    # but for direct schema creation, ensure types are correct or handle conversion.
    # For simplicity, we'll let BookCreate handle it if it can, or omit for now if problematic.
    # If publish_date is mandatory and needs specific type, adjust accordingly.
    # For now, assuming it's optional or string is fine for the schema.
    if "publish_date" in schemas.BookCreate.model_fields:
        book_in_data["publish_date"] = "2023-01-01"

    book_in = schemas.BookCreate(**book_in_data)

    # 3. Call the CRUD function to create the book
    created_book = crud.book.create_book(db=db_session, book=book_in)

    # 4. Assertions for the created book
    assert created_book is not None
    assert created_book.id is not None
    assert created_book.title == book_in.title
    assert created_book.author_name == book_in.author_name
    assert created_book.description == book_in.description
    assert created_book.total_pages == book_in.total_pages
    assert len(created_book.book_themes) == len(book_in.theme_ids)

    # 5. Verify themes are linked correctly
    linked_theme_ids_in_db = sorted(
        [bt.theme_id for bt in created_book.book_themes])
    expected_theme_ids = sorted(book_in.theme_ids)
    assert linked_theme_ids_in_db == expected_theme_ids

    # 6. Verify the book in the database directly
    db_book = db_session.query(models.Book).filter(
        models.Book.id == created_book.id).first()
    assert db_book is not None
    assert db_book.title == book_in.title

    # Test creating a book without themes
    book_in_no_themes_data = {
        "title": "Book Without Themes",
        "author_name": "Another Author",
        "total_pages": 30,
        # Add other required fields from BookCreate schema
        "description": "A simple book.",
        "is_premium": False,
        "is_free": True,
    }
    if "publish_date" in schemas.BookCreate.model_fields:
        book_in_no_themes_data["publish_date"] = "2024-01-01"

    book_in_no_themes = schemas.BookCreate(**book_in_no_themes_data)
    created_book_no_themes = crud.book.create_book(
        db=db_session, book=book_in_no_themes)

    assert created_book_no_themes is not None
    assert created_book_no_themes.id is not None
    assert created_book_no_themes.title == book_in_no_themes.title
    assert len(created_book_no_themes.book_themes) == 0


def test_get_book(db_session: Session):
    """
    Test retrieving a book by its ID.
    """
    # 1. Create a book to retrieve
    book_in_data = {
        "title": "Gettable Book",
        "author_name": "Getter Author",
        "description": "A book to test the get_book function.",
        "total_pages": 75,
    }
    if "publish_date" in schemas.BookCreate.model_fields:
        book_in_data["publish_date"] = "2023-02-01"

    book_to_create = schemas.BookCreate(**book_in_data)
    created_book = crud.book.create_book(db=db_session, book=book_to_create)
    assert created_book is not None

    # 2. Retrieve the book by its ID
    retrieved_book = crud.book.get_book(db=db_session, book_id=created_book.id)

    # 3. Assertions for the retrieved book
    assert retrieved_book is not None
    assert retrieved_book.id == created_book.id
    assert retrieved_book.title == created_book.title
    assert retrieved_book.author_name == created_book.author_name
    # The get_book function in crud_book.py loads themes, pages, and toc_items
    # We can assert these are present if they were created or if the relationships are empty
    assert hasattr(retrieved_book, 'book_themes')
    assert hasattr(retrieved_book, 'book_pages')
    assert hasattr(retrieved_book, 'book_toc_items')

    # 4. Test retrieving a non-existent book
    non_existent_uuid = uuid.uuid4()
    non_existent_book = crud.book.get_book(
        db=db_session, book_id=non_existent_uuid)
    assert non_existent_book is None


def test_get_books(db_session: Session):
    """
    Test retrieving a list of books with pagination and filtering.
    """
    # 1. Create some dummy themes and books
    theme1 = create_dummy_themes(db_session, count=1)[0]
    theme2 = create_dummy_themes(db_session, count=1)[0]

    books_data = [
        {"title": "Book Alpha", "author_name": "Author A",
            "total_pages": 10, "theme_ids": [theme1.id]},
        {"title": "Book Beta", "author_name": "Author B",
            "total_pages": 20},  # No theme
        {"title": "Book Gamma", "author_name": "Author C",
            "total_pages": 30, "theme_ids": [theme2.id]},
        {"title": "Book Delta", "author_name": "Author D",
            "total_pages": 40, "theme_ids": [theme1.id, theme2.id]},
        {"title": "Book Epsilon", "author_name": "Author E",
            "total_pages": 50, "theme_ids": [theme1.id]},
    ]

    created_books = []
    for data in books_data:
        book_create_data = data.copy()
        if "publish_date" not in book_create_data and "publish_date" in schemas.BookCreate.model_fields:
            # Default date for simplicity
            book_create_data["publish_date"] = "2023-03-01"
        book_in = schemas.BookCreate(**book_create_data)
        created_books.append(crud.book.create_book(
            db=db_session, book=book_in))

    # 2. Test basic retrieval (all books, default limit)
    all_books = crud.book.get_books(db=db_session)
    assert len(all_books) == len(created_books)
    # Verify titles to ensure order or content (order is not guaranteed by default in get_books)
    retrieved_titles = sorted([b.title for b in all_books])
    expected_titles = sorted([b.title for b in created_books])
    assert retrieved_titles == expected_titles

    # 3. Test pagination (skip and limit)
    # Get first 2 books
    paginated_books_1 = crud.book.get_books(db=db_session, skip=0, limit=2)
    assert len(paginated_books_1) == 2
    # Get next 2 books
    paginated_books_2 = crud.book.get_books(db=db_session, skip=2, limit=2)
    assert len(paginated_books_2) == 2
    # Get remaining books (should be 1)
    paginated_books_3 = crud.book.get_books(db=db_session, skip=4, limit=2)
    assert len(paginated_books_3) == 1
    # Ensure no overlap and all books covered (simple check by combining titles)
    combined_paginated_titles = sorted([b.title for b in paginated_books_1] +
                                       [b.title for b in paginated_books_2] +
                                       [b.title for b in paginated_books_3])
    assert combined_paginated_titles == expected_titles

    # 4. Test filtering by theme_id
    # Books with theme1
    books_with_theme1 = crud.book.get_books(db=db_session, theme_id=theme1.id)
    expected_theme1_titles = sorted([
        books_data[0]["title"], books_data[3]["title"], books_data[4]["title"]
    ])
    retrieved_theme1_titles = sorted([b.title for b in books_with_theme1])
    assert len(books_with_theme1) == 3
    assert retrieved_theme1_titles == expected_theme1_titles

    # Books with theme2
    books_with_theme2 = crud.book.get_books(db=db_session, theme_id=theme2.id)
    expected_theme2_titles = sorted([
        books_data[2]["title"], books_data[3]["title"]
    ])
    retrieved_theme2_titles = sorted([b.title for b in books_with_theme2])
    assert len(books_with_theme2) == 2
    assert retrieved_theme2_titles == expected_theme2_titles

    # Test with a theme that has no books (create a new theme for this)
    theme_no_books = create_dummy_themes(db_session, count=1)[0]
    books_with_no_book_theme = crud.book.get_books(
        db=db_session, theme_id=theme_no_books.id)
    assert len(books_with_no_book_theme) == 0


def test_update_book(db_session: Session):
    """
    Test updating an existing book's attributes and theme associations.
    """
    # 1. Create initial themes and a book
    theme1 = create_dummy_themes(db_session, count=1)[0]
    theme2 = create_dummy_themes(db_session, count=1)[0]
    theme3 = create_dummy_themes(db_session, count=1)[0]  # For adding later

    initial_book_data = {
        "title": "Original Title",
        "author_name": "Original Author",
        "description": "Original description.",
        "total_pages": 100,
        "theme_ids": [theme1.id]
    }
    if "publish_date" in schemas.BookCreate.model_fields:
        initial_book_data["publish_date"] = "2023-04-01"

    book_to_update_schema = schemas.BookCreate(**initial_book_data)
    book_to_update = crud.book.create_book(
        db=db_session, book=book_to_update_schema)
    assert book_to_update is not None
    assert book_to_update.title == "Original Title"
    assert len(book_to_update.book_themes) == 1
    assert book_to_update.book_themes[0].theme_id == theme1.id

    # 2. Test updating basic attributes
    update_data_basic = {
        "title": "Updated Title",
        "description": "Updated description.",
        "total_pages": 150
    }
    book_update_schema_basic = schemas.BookUpdate(**update_data_basic)
    updated_book_basic = crud.book.update_book(
        db=db_session, db_book=book_to_update, book_in=book_update_schema_basic)

    assert updated_book_basic.title == "Updated Title"
    assert updated_book_basic.description == "Updated description."
    assert updated_book_basic.total_pages == 150
    assert updated_book_basic.author_name == "Original Author"  # Unchanged field

    # 3. Test updating themes: remove theme1, add theme2 and theme3
    update_data_themes = {
        "theme_ids": [theme2.id, theme3.id]
    }
    book_update_schema_themes = schemas.BookUpdate(**update_data_themes)
    # Fetch the book again to ensure we're updating the latest version
    book_to_update_again = crud.book.get_book(
        db=db_session, book_id=book_to_update.id)
    updated_book_themes = crud.book.update_book(
        db=db_session, db_book=book_to_update_again, book_in=book_update_schema_themes)

    assert len(updated_book_themes.book_themes) == 2
    updated_theme_ids = sorted(
        [bt.theme_id for bt in updated_book_themes.book_themes])
    expected_new_theme_ids = sorted([theme2.id, theme3.id])
    assert updated_theme_ids == expected_new_theme_ids
    # Ensure original title is still there from previous update
    assert updated_book_themes.title == "Updated Title"

    # 4. Test updating themes to an empty list (remove all themes)
    update_data_no_themes = {"theme_ids": []}
    book_update_schema_no_themes = schemas.BookUpdate(**update_data_no_themes)
    book_to_update_no_themes = crud.book.get_book(
        db=db_session, book_id=book_to_update.id)
    updated_book_no_themes = crud.book.update_book(
        db=db_session, db_book=book_to_update_no_themes, book_in=book_update_schema_no_themes)
    assert len(updated_book_no_themes.book_themes) == 0

    # 5. Test updating only themes, no other fields
    # First, add a theme back
    book_to_add_theme_back = crud.book.get_book(
        db=db_session, book_id=book_to_update.id)
    crud.book.update_book(db=db_session, db_book=book_to_add_theme_back,
                          book_in=schemas.BookUpdate(theme_ids=[theme1.id]))

    book_for_theme_only_update = crud.book.get_book(
        db=db_session, book_id=book_to_update.id)
    # Check it's still the updated title
    assert book_for_theme_only_update.title == "Updated Title"

    update_data_theme_only = {"theme_ids": [theme2.id]}
    book_update_schema_theme_only = schemas.BookUpdate(
        **update_data_theme_only)
    updated_book_theme_only = crud.book.update_book(
        db=db_session, db_book=book_for_theme_only_update, book_in=book_update_schema_theme_only)

    # Title should remain unchanged
    assert updated_book_theme_only.title == "Updated Title"
    assert len(updated_book_theme_only.book_themes) == 1
    assert updated_book_theme_only.book_themes[0].theme_id == theme2.id


def test_delete_book(db_session: Session):
    """
    Test deleting a book and its associated theme links.
    """
    # 1. Create a theme and a book with this theme
    theme1 = create_dummy_themes(db_session, count=1)[0]
    book_data = {
        "title": "Book to Delete",
        "author_name": "Deleter Author",
        "total_pages": 10,
        "theme_ids": [theme1.id]
    }
    if "publish_date" in schemas.BookCreate.model_fields:
        book_data["publish_date"] = "2023-05-01"

    book_to_delete_schema = schemas.BookCreate(**book_data)
    book_to_delete = crud.book.create_book(
        db=db_session, book=book_to_delete_schema)
    assert book_to_delete is not None
    book_id_to_delete = book_to_delete.id

    # Verify BookTheme link exists
    initial_theme_links = db_session.query(models.BookTheme).filter(
        models.BookTheme.book_id == book_id_to_delete).all()
    assert len(initial_theme_links) == 1

    # 2. Delete the book
    deleted_book_obj = crud.book.delete_book(
        db=db_session, db_book=book_to_delete)
    assert deleted_book_obj is not None  # delete_book returns the deleted object
    assert deleted_book_obj.id == book_id_to_delete

    # 3. Verify the book is no longer in the database
    retrieved_book_after_delete = crud.book.get_book(
        db=db_session, book_id=book_id_to_delete)
    assert retrieved_book_after_delete is None

    # 4. Verify associated BookTheme links are also deleted (due to cascade)
    theme_links_after_delete = db_session.query(models.BookTheme).filter(
        models.BookTheme.book_id == book_id_to_delete).all()
    assert len(theme_links_after_delete) == 0

    # 5. Test deleting a non-existent book (or rather, trying to delete something already deleted)
    # crud.book.delete_book expects a model instance. If we try to fetch it again, it's None.
    # So, this specific scenario (deleting a non-existent book by ID) is not directly testable
    # with the current delete_book signature without first fetching.
    # If delete_book took an ID, we could test it.
    # For now, we've tested that after deletion, it's gone.


# Helper function to create a book for BookPage and BookTocItem tests
def create_dummy_book_for_related_tests(db_session: Session, title_suffix: str = "") -> models.Book:
    book_data = {
        "title": f"Book for Related Tests{title_suffix}",
        "author_name": "Related Author",
        "total_pages": 10  # This might be relevant for page numbers
    }
    if "publish_date" in schemas.BookCreate.model_fields:
        book_data["publish_date"] = "2023-06-01"
    book_schema = schemas.BookCreate(**book_data)
    return crud.book.create_book(db=db_session, book=book_schema)


# --- BookPage CRUD Tests ---

def test_create_book_page(db_session: Session):
    book = create_dummy_book_for_related_tests(db_session)
    page_data = schemas.BookPageCreate(
        book_id=book.id,  # Added book_id
        page_number=1,
        image_url="http://example.com/page1.jpg",
        audio_url="http://example.com/page1.mp3"
    )
    page = crud.book.create_book_page(
        db=db_session, page=page_data, book_id=book.id)
    assert page is not None
    assert page.book_id == book.id
    assert page.page_number == 1
    assert page.image_url == "http://example.com/page1.jpg"


def test_get_book_page(db_session: Session):
    book = create_dummy_book_for_related_tests(db_session)
    page_data = schemas.BookPageCreate(
        book_id=book.id,  # Added book_id
        page_number=1, image_url="http://example.com/page1.jpg")
    created_page = crud.book.create_book_page(
        db=db_session, page=page_data, book_id=book.id)

    retrieved_page = crud.book.get_book_page(
        db=db_session, page_id=created_page.id, book_id=book.id)
    assert retrieved_page is not None
    assert retrieved_page.id == created_page.id
    assert retrieved_page.page_number == 1

    # Test getting non-existent page
    non_existent_page_id = uuid.uuid4()
    assert crud.book.get_book_page(
        db=db_session, page_id=non_existent_page_id, book_id=book.id) is None
    # Test getting page for wrong book_id
    wrong_book_id = uuid.uuid4()  # Assume this book doesn't exist or is different
    assert crud.book.get_book_page(
        db=db_session, page_id=created_page.id, book_id=wrong_book_id) is None


def test_get_book_pages_by_book(db_session: Session):
    book = create_dummy_book_for_related_tests(db_session)
    crud.book.create_book_page(db=db_session, page=schemas.BookPageCreate(
        book_id=book.id,  # Added book_id
        page_number=1, image_url="p1"), book_id=book.id)
    crud.book.create_book_page(db=db_session, page=schemas.BookPageCreate(
        book_id=book.id,  # Added book_id
        page_number=2, image_url="p2"), book_id=book.id)

    pages = crud.book.get_book_pages_by_book(db=db_session, book_id=book.id)
    assert len(pages) == 2
    assert pages[0].page_number == 1
    assert pages[1].page_number == 2  # Assumes order_by page_number

    # Test pagination
    limited_pages = crud.book.get_book_pages_by_book(
        db=db_session, book_id=book.id, limit=1)
    assert len(limited_pages) == 1
    skipped_pages = crud.book.get_book_pages_by_book(
        db=db_session, book_id=book.id, skip=1, limit=1)
    assert len(skipped_pages) == 1
    assert skipped_pages[0].page_number == 2


def test_update_book_page(db_session: Session):
    book = create_dummy_book_for_related_tests(db_session)
    page_data = schemas.BookPageCreate(
        book_id=book.id,  # Added book_id
        page_number=1, image_url="original.jpg")
    page_to_update = crud.book.create_book_page(
        db=db_session, page=page_data, book_id=book.id)

    update_schema = schemas.BookPageUpdate(
        image_url="updated.jpg", page_number=2)
    updated_page = crud.book.update_book_page(
        db=db_session, db_page=page_to_update, page_in=update_schema)

    assert updated_page.image_url == "updated.jpg"
    assert updated_page.page_number == 2


def test_delete_book_page(db_session: Session):
    book = create_dummy_book_for_related_tests(db_session)
    page_data = schemas.BookPageCreate(
        book_id=book.id,  # Added book_id
        page_number=1, image_url="to_delete.jpg")
    page_to_delete = crud.book.create_book_page(
        db=db_session, page=page_data, book_id=book.id)
    page_id_to_delete = page_to_delete.id

    crud.book.delete_book_page(db=db_session, db_page=page_to_delete)

    deleted_page_retrieved = crud.book.get_book_page(
        db=db_session, page_id=page_id_to_delete, book_id=book.id)
    assert deleted_page_retrieved is None


# --- BookTocItem CRUD Tests ---

def test_create_book_toc_item(db_session: Session):
    book = create_dummy_book_for_related_tests(
        db_session, title_suffix=" For TOC")
    toc_item_data = schemas.BookTocItemCreate(
        book_id=book.id,
        title="Chapter 1: The Beginning",
        page_number=1
    )
    toc_item = crud.book.create_book_toc_item(
        db=db_session, toc_item=toc_item_data, book_id=book.id)
    assert toc_item is not None
    assert toc_item.book_id == book.id
    assert toc_item.title == "Chapter 1: The Beginning"
    assert toc_item.page_number == 1


def test_get_book_toc_item(db_session: Session):
    book = create_dummy_book_for_related_tests(
        db_session, title_suffix=" For TOC Get")
    toc_data = schemas.BookTocItemCreate(
        book_id=book.id, title="Test Chapter", page_number=5)
    created_toc = crud.book.create_book_toc_item(
        db=db_session, toc_item=toc_data, book_id=book.id)

    retrieved_toc = crud.book.get_book_toc_item(
        db=db_session, toc_item_id=created_toc.id, book_id=book.id)
    assert retrieved_toc is not None
    assert retrieved_toc.id == created_toc.id
    assert retrieved_toc.title == "Test Chapter"

    # Test getting non-existent toc_item
    non_existent_toc_id = uuid.uuid4()
    assert crud.book.get_book_toc_item(
        db=db_session, toc_item_id=non_existent_toc_id, book_id=book.id) is None
    # Test getting toc_item for wrong book_id
    wrong_book_id = uuid.uuid4()
    assert crud.book.get_book_toc_item(
        db=db_session, toc_item_id=created_toc.id, book_id=wrong_book_id) is None


def test_get_book_toc_items_by_book(db_session: Session):
    book = create_dummy_book_for_related_tests(
        db_session, title_suffix=" For TOC List")
    crud.book.create_book_toc_item(db=db_session, toc_item=schemas.BookTocItemCreate(
        book_id=book.id, title="Ch1", page_number=1), book_id=book.id)
    crud.book.create_book_toc_item(db=db_session, toc_item=schemas.BookTocItemCreate(
        book_id=book.id, title="Ch2", page_number=10), book_id=book.id)

    toc_items = crud.book.get_book_toc_items_by_book(
        db=db_session, book_id=book.id)
    assert len(toc_items) == 2
    assert toc_items[0].title == "Ch1"
    assert toc_items[1].title == "Ch2"  # Assumes order_by page_number

    # Test pagination
    limited_items = crud.book.get_book_toc_items_by_book(
        db=db_session, book_id=book.id, limit=1)
    assert len(limited_items) == 1
    skipped_items = crud.book.get_book_toc_items_by_book(
        db=db_session, book_id=book.id, skip=1, limit=1)
    assert len(skipped_items) == 1
    assert skipped_items[0].title == "Ch2"


def test_update_book_toc_item(db_session: Session):
    book = create_dummy_book_for_related_tests(
        db_session, title_suffix=" For TOC Update")
    toc_data = schemas.BookTocItemCreate(
        book_id=book.id, title="Original TOC Title", page_number=3)
    toc_to_update = crud.book.create_book_toc_item(
        db=db_session, toc_item=toc_data, book_id=book.id)

    update_schema = schemas.BookTocItemUpdate(
        title="Updated TOC Title", page_number=4)
    updated_toc = crud.book.update_book_toc_item(
        db=db_session, db_toc_item=toc_to_update, toc_item_in=update_schema)

    assert updated_toc.title == "Updated TOC Title"
    assert updated_toc.page_number == 4


def test_delete_book_toc_item(db_session: Session):
    book = create_dummy_book_for_related_tests(
        db_session, title_suffix=" For TOC Delete")
    toc_data = schemas.BookTocItemCreate(
        book_id=book.id, title="TOC to Delete", page_number=7)
    toc_to_delete = crud.book.create_book_toc_item(
        db=db_session, toc_item=toc_data, book_id=book.id)
    toc_id_to_delete = toc_to_delete.id

    crud.book.delete_book_toc_item(db=db_session, db_toc_item=toc_to_delete)

    deleted_toc_retrieved = crud.book.get_book_toc_item(
        db=db_session, toc_item_id=toc_id_to_delete, book_id=book.id)
    assert deleted_toc_retrieved is None
