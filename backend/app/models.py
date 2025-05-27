import uuid
from datetime import datetime

from sqlalchemy import func, TIMESTAMP, TEXT, String, Integer, Date, ForeignKey
# If using PostgreSQL, otherwise use sqlalchemy.UUID
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    """
    SQLAlchemy のベースクラス。
    モデルはこのクラスを継承して定義する。
    """

    pass


class User(Base):
    """
    ユーザー情報を格納するテーブルモデル。
    """
    __tablename__ = 'users'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    username: Mapped[str] = mapped_column(TEXT, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(TEXT, unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(TEXT, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id!r}, username={self.username!r}, email={self.email!r})>"

    reviews: Mapped[list["Review"]] = relationship(
        "Review", back_populates="user")
    favorites: Mapped[list["Favorite"]] = relationship(
        "Favorite", back_populates="user")


class Book(Base):
    """
    書籍情報を格納するテーブルモデル。
    """
    __tablename__ = 'books'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(TEXT, nullable=False)
    image_url: Mapped[str | None] = mapped_column(TEXT)
    author: Mapped[str | None] = mapped_column(TEXT)
    description: Mapped[str | None] = mapped_column(TEXT)
    age_range: Mapped[str | None] = mapped_column(TEXT)
    publisher: Mapped[str | None] = mapped_column(TEXT)
    publish_date: Mapped[datetime | None] = mapped_column(Date)
    language: Mapped[str | None] = mapped_column(TEXT)
    pages: Mapped[int | None] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    reviews: Mapped[list["Review"]] = relationship(
        "Review", back_populates="book")
    # categories relationship defined via BookCategory
    book_categories: Mapped[list["BookCategory"]] = relationship(
        "BookCategory", back_populates="book")
    favorites: Mapped[list["Favorite"]] = relationship(
        "Favorite", back_populates="book")

    def __repr__(self) -> str:
        return f"<Book(id={self.id!r}, title={self.title!r})>"


class Category(Base):
    """
    カテゴリ情報を格納するテーブルモデル。
    """
    __tablename__ = 'categories'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(TEXT, unique=True, nullable=False)
    icon: Mapped[str | None] = mapped_column(TEXT)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    # books relationship defined via BookCategory
    book_categories: Mapped[list["BookCategory"]] = relationship(
        "BookCategory", back_populates="category")

    def __repr__(self) -> str:
        return f"<Category(id={self.id!r}, name={self.name!r})>"


class BookCategory(Base):
    """
    書籍とカテゴリの中間テーブルモデル。
    """
    __tablename__ = 'book_categories'

    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id'), primary_key=True
    )
    category_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('categories.id'), primary_key=True
    )
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )

    book: Mapped["Book"] = relationship(
        "Book", back_populates="book_categories")
    category: Mapped["Category"] = relationship(
        "Category", back_populates="book_categories")

    def __repr__(self) -> str:
        return f"<BookCategory(book_id={self.book_id!r}, category_id={self.category_id!r})>"


class Review(Base):
    """
    レビュー情報を格納するテーブルモデル。
    """
    __tablename__ = 'reviews'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id'), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    review_date: Mapped[datetime] = mapped_column(
        # design doc says TIMESTAMP, implies default now
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    # Assuming 1-5 validation is at app level
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    text: Mapped[str] = mapped_column(TEXT, nullable=False)
    likes: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    dislikes: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now()
    )

    user: Mapped["User"] = relationship("User", back_populates="reviews")
    book: Mapped["Book"] = relationship("Book", back_populates="reviews")

    def __repr__(self) -> str:
        return f"<Review(id={self.id!r}, book_id={self.book_id!r}, user_id={self.user_id!r}, rating={self.rating!r})>"


class Favorite(Base):
    """
    お気に入り情報を格納する中間テーブルモデル。
    """
    __tablename__ = 'favorites'

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('users.id'), primary_key=True
    )
    book_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('books.id'), primary_key=True
    )
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )

    user: Mapped["User"] = relationship("User", back_populates="favorites")
    book: Mapped["Book"] = relationship("Book", back_populates="favorites")

    def __repr__(self) -> str:
        return f"<Favorite(user_id={self.user_id!r}, book_id={self.book_id!r})>"
