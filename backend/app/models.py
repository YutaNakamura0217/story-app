import uuid
import enum
from datetime import datetime, date

from sqlalchemy import func, TIMESTAMP, TEXT, String, Integer, Date as SQLDate, ForeignKey, Boolean, Enum as SQLAlchemyEnum
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base  # Import Base from db.py

# Python Enums corresponding to SQL ENUM types


class UserTierEnum(str, enum.Enum):
    FREE = "Free"
    PREMIUM = "Premium"
    CREATOR = "Creator"
    ADMIN = "Admin"


class ThemeCategoryEnum(str, enum.Enum):
    SELF = "self"
    OTHERS = "others"
    WORLD = "world"
    THINKING = "thinking"


class ActivityTypeEnum(str, enum.Enum):
    BOOK_READ_COMPLETED = "book_read_completed"
    QUESTION_ANSWERED = "question_answered"
    BADGE_EARNED = "badge_earned"
    NOTE_TAKEN = "note_taken"
    DISCUSSION_POSTED = "discussion_posted"


class User(Base):
    __tablename__ = 'users'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(TEXT, nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(TEXT)
    tier: Mapped[UserTierEnum] = mapped_column(SQLAlchemyEnum(
        UserTierEnum, name="user_tier_enum"), default=UserTierEnum.FREE)
    introduction: Mapped[str | None] = mapped_column(TEXT)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    children: Mapped[list["Child"]] = relationship(
        "Child", back_populates="user", cascade="all, delete-orphan")
    reviews: Mapped[list["Review"]] = relationship(
        "Review", back_populates="user", cascade="all, delete-orphan")
    user_favorites: Mapped[list["UserFavorite"]] = relationship(
        "UserFavorite", back_populates="user", cascade="all, delete-orphan")
    user_book_progress: Mapped[list["UserBookProgress"]] = relationship(
        "UserBookProgress", back_populates="user", cascade="all, delete-orphan")
    learning_activities: Mapped[list["LearningActivity"]] = relationship(
        "LearningActivity", back_populates="user", cascade="all, delete-orphan")
    user_settings: Mapped["UserSettings"] = relationship(
        "UserSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")  # One-to-one

    def __repr__(self) -> str:
        return f"<User(id={self.id!r}, name={self.name!r}, email={self.email!r})>"


class Child(Base):
    __tablename__ = 'children'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('users.id', ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    # CHECK constraint handled by DB
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(TEXT)
    interests: Mapped[list[str] | None] = mapped_column(ARRAY(TEXT))
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship("User", back_populates="children")
    user_book_progress: Mapped[list["UserBookProgress"]] = relationship(
        "UserBookProgress", back_populates="child", cascade="all, delete-orphan")
    learning_activities: Mapped[list["LearningActivity"]] = relationship(
        "LearningActivity", back_populates="child", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Child(id={self.id!r}, name={self.name!r}, user_id={self.user_id!r})>"


class Theme(Base):
    __tablename__ = 'themes'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(TEXT)
    icon_identifier: Mapped[str | None] = mapped_column(String(100))
    age_range_display: Mapped[str | None] = mapped_column(String(50))
    category: Mapped[ThemeCategoryEnum] = mapped_column(SQLAlchemyEnum(
        ThemeCategoryEnum, name="theme_category_enum"), nullable=False)
    cover_image_url: Mapped[str | None] = mapped_column(TEXT)
    question_prompt: Mapped[str | None] = mapped_column(TEXT)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    book_themes: Mapped[list["BookTheme"]] = relationship(
        "BookTheme", back_populates="theme", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Theme(id={self.id!r}, name={self.name!r})>"


class Book(Base):
    __tablename__ = 'books'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    author_name: Mapped[str | None] = mapped_column(String(255))
    cover_url: Mapped[str | None] = mapped_column(TEXT)
    description: Mapped[str | None] = mapped_column(TEXT)
    long_description: Mapped[str | None] = mapped_column(TEXT)
    reading_time_minutes: Mapped[int | None] = mapped_column(Integer)
    age_min: Mapped[int | None] = mapped_column(Integer)
    age_max: Mapped[int | None] = mapped_column(Integer)
    publisher: Mapped[str | None] = mapped_column(String(255))
    publish_date: Mapped[date | None] = mapped_column(SQLDate)
    is_premium: Mapped[bool] = mapped_column(Boolean, default=False)
    is_free: Mapped[bool] = mapped_column(Boolean, default=False)
    popularity_score: Mapped[int] = mapped_column(Integer, default=0)
    total_pages: Mapped[int | None] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    reviews: Mapped[list["Review"]] = relationship(
        "Review", back_populates="book", cascade="all, delete-orphan")
    book_themes: Mapped[list["BookTheme"]] = relationship(
        "BookTheme", back_populates="book", cascade="all, delete-orphan")
    user_favorites: Mapped[list["UserFavorite"]] = relationship(
        "UserFavorite", back_populates="book", cascade="all, delete-orphan")
    book_pages: Mapped[list["BookPage"]] = relationship(
        "BookPage", back_populates="book", cascade="all, delete-orphan", order_by="BookPage.page_number")
    book_toc_items: Mapped[list["BookTocItem"]] = relationship(
        "BookTocItem", back_populates="book", cascade="all, delete-orphan", order_by="BookTocItem.page_number")
    user_book_progress: Mapped[list["UserBookProgress"]] = relationship(
        "UserBookProgress", back_populates="book", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Book(id={self.id!r}, title={self.title!r})>"


class BookTheme(Base):
    __tablename__ = 'book_themes'

    book_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(
        'books.id', ondelete="CASCADE"), primary_key=True)
    theme_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(
        'themes.id', ondelete="CASCADE"), primary_key=True)
    # created_at is not in the SQL schema for this table, but often good to have.
    # For now, sticking to the provided SQL schema.

    book: Mapped["Book"] = relationship("Book", back_populates="book_themes")
    theme: Mapped["Theme"] = relationship(
        "Theme", back_populates="book_themes")

    def __repr__(self) -> str:
        return f"<BookTheme(book_id={self.book_id!r}, theme_id={self.theme_id!r})>"


class BookPage(Base):
    __tablename__ = 'book_pages'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id', ondelete="CASCADE"))
    page_number: Mapped[int] = mapped_column(Integer, nullable=False)
    image_url: Mapped[str] = mapped_column(TEXT, nullable=False)
    audio_url: Mapped[str | None] = mapped_column(TEXT)
    question_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True))  # No FK as questions table is excluded

    book: Mapped["Book"] = relationship("Book", back_populates="book_pages")

    def __repr__(self) -> str:
        return f"<BookPage(id={self.id!r}, book_id={self.book_id!r}, page_number={self.page_number!r})>"


class BookTocItem(Base):
    __tablename__ = 'book_toc_items'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id', ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    page_number: Mapped[int] = mapped_column(Integer, nullable=False)

    book: Mapped["Book"] = relationship(
        "Book", back_populates="book_toc_items")

    def __repr__(self) -> str:
        return f"<BookTocItem(id={self.id!r}, book_id={self.book_id!r}, title={self.title!r})>"


class Review(Base):
    __tablename__ = 'reviews'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('users.id', ondelete="CASCADE"))
    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id', ondelete="CASCADE"))
    rating: Mapped[int] = mapped_column(
        Integer, nullable=False)  # CHECK constraint handled by DB
    text: Mapped[str | None] = mapped_column(TEXT)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship("User", back_populates="reviews")
    book: Mapped["Book"] = relationship("Book", back_populates="reviews")

    def __repr__(self) -> str:
        return f"<Review(id={self.id!r}, book_id={self.book_id!r}, user_id={self.user_id!r}, rating={self.rating!r})>"


class UserFavorite(Base):
    __tablename__ = 'user_favorites'

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(
        'users.id', ondelete="CASCADE"), primary_key=True)
    book_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(
        'books.id', ondelete="CASCADE"), primary_key=True)
    favorited_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())

    user: Mapped["User"] = relationship(
        "User", back_populates="user_favorites")
    book: Mapped["Book"] = relationship(
        "Book", back_populates="user_favorites")

    def __repr__(self) -> str:
        return f"<UserFavorite(user_id={self.user_id!r}, book_id={self.book_id!r})>"


class UserBookProgress(Base):
    __tablename__ = 'user_book_progress'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('users.id', ondelete="CASCADE"))
    child_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey('children.id', ondelete="CASCADE"))
    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id', ondelete="CASCADE"))
    current_page: Mapped[int] = mapped_column(Integer, default=1)
    last_read_at: Mapped[datetime] = mapped_column(TIMESTAMP(
        # onupdate for last_read_at
        timezone=True), server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship(
        "User", back_populates="user_book_progress")
    child: Mapped["Child | None"] = relationship(
        "Child", back_populates="user_book_progress")
    book: Mapped["Book"] = relationship(
        "Book", back_populates="user_book_progress")

    bookmarks: Mapped[list["UserBookBookmark"]] = relationship(
        "UserBookBookmark", back_populates="progress", cascade="all, delete-orphan")
    notes: Mapped[list["UserBookNote"]] = relationship(
        "UserBookNote", back_populates="progress", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<UserBookProgress(id={self.id!r}, user_id={self.user_id!r}, book_id={self.book_id!r})>"


class UserBookBookmark(Base):
    __tablename__ = 'user_book_bookmarks'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    progress_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('user_book_progress.id', ondelete="CASCADE"))
    page_number: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())

    progress: Mapped["UserBookProgress"] = relationship(
        "UserBookProgress", back_populates="bookmarks")

    def __repr__(self) -> str:
        return f"<UserBookBookmark(id={self.id!r}, progress_id={self.progress_id!r}, page_number={self.page_number!r})>"


class UserBookNote(Base):
    __tablename__ = 'user_book_notes'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    progress_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('user_book_progress.id', ondelete="CASCADE"))
    page_number: Mapped[int] = mapped_column(Integer, nullable=False)
    text: Mapped[str] = mapped_column(TEXT, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    progress: Mapped["UserBookProgress"] = relationship(
        "UserBookProgress", back_populates="notes")

    def __repr__(self) -> str:
        return f"<UserBookNote(id={self.id!r}, progress_id={self.progress_id!r}, page_number={self.page_number!r})>"


class LearningActivity(Base):
    __tablename__ = 'learning_activities'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('users.id', ondelete="CASCADE"))
    child_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey('children.id', ondelete="CASCADE"))
    activity_type: Mapped[ActivityTypeEnum] = mapped_column(
        SQLAlchemyEnum(ActivityTypeEnum, name="activity_type_enum"), nullable=False)
    description: Mapped[str] = mapped_column(TEXT, nullable=False)
    related_entity_id: Mapped[uuid.UUID |
                              None] = mapped_column(UUID(as_uuid=True))
    related_link: Mapped[str | None] = mapped_column(TEXT)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now())

    user: Mapped["User"] = relationship(
        "User", back_populates="learning_activities")
    child: Mapped["Child | None"] = relationship(
        "Child", back_populates="learning_activities")

    def __repr__(self) -> str:
        return f"<LearningActivity(id={self.id!r}, user_id={self.user_id!r}, type={self.activity_type!r})>"


class UserSettings(Base):
    __tablename__ = 'user_settings'

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(
        'users.id', ondelete="CASCADE"), primary_key=True)
    notify_new_recommendations: Mapped[bool] = mapped_column(
        Boolean, default=True)
    notify_child_progress_updates: Mapped[bool] = mapped_column(
        Boolean, default=True)
    notify_platform_announcements: Mapped[bool] = mapped_column(
        Boolean, default=False)
    notify_weekly_summary: Mapped[bool] = mapped_column(Boolean, default=True)
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship("User", back_populates="user_settings")

    def __repr__(self) -> str:
        return f"<UserSettings(user_id={self.user_id!r})>"
