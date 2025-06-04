
# API Endpoints and Database Schema for Philosophy Picture Book Platform

## 1. Introduction

This document outlines the proposed API endpoints and PostgreSQL database schema to support the frontend functionalities of the Philosophy Picture Book Platform. The backend is intended to be built with FastAPI and PostgreSQL.

## 2. Database Schema

We'll use UUIDs for primary keys and `snake_case` for table and column names. Timestamps will use `TIMESTAMP WITH TIME ZONE`.

### 2.1. `users` Table
Stores user information.

```sql
CREATE TYPE user_tier_enum AS ENUM ('Free', 'Premium', 'Creator', 'Admin');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    avatar_url TEXT,
    tier user_tier_enum DEFAULT 'Free',
    introduction TEXT, -- For profile settings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2. `children` Table
Stores information about children linked to a parent user.

```sql
CREATE TABLE children (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 18),
    avatar_url TEXT,
    interests TEXT[], -- Array of strings for interests
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_children_user_id ON children(user_id);
```

### 2.3. `themes` Table
Stores philosophical themes.

```sql
CREATE TYPE theme_category_enum AS ENUM ('self', 'others', 'world', 'thinking');

CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_identifier VARCHAR(100), -- e.g., 'SparklesIcon', frontend will map to component
    age_range_display VARCHAR(50), -- e.g., "4-6歳"
    category theme_category_enum NOT NULL,
    cover_image_url TEXT,
    question_prompt TEXT, -- The "問いかけ" for the theme card
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.4. `books` Table
Stores book information.

```sql
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    author_name VARCHAR(255),
    cover_url TEXT,
    description TEXT,
    long_description TEXT,
    reading_time_minutes INTEGER, -- Instead of "10分"
    age_min INTEGER,
    age_max INTEGER,
    publisher VARCHAR(255),
    publish_date DATE,
    is_premium BOOLEAN DEFAULT FALSE,
    is_free BOOLEAN DEFAULT FALSE,
    popularity_score INTEGER DEFAULT 0,
    total_pages INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_books_title ON books(title);
```

### 2.5. `book_themes` (Junction Table)
Links books to themes (many-to-many). Replaces `tags` array on books for better relational structure.

```sql
CREATE TABLE book_themes (
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, theme_id)
);
```

### 2.6. `book_pages` Table
Stores individual pages of a book for the reading view.

```sql
CREATE TABLE book_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    audio_url TEXT,
    question_id UUID REFERENCES questions(id) ON DELETE SET NULL, -- Link to a philosophical question
    UNIQUE (book_id, page_number)
);
CREATE INDEX idx_book_pages_book_id ON book_pages(book_id);
```

### 2.7. `book_toc_items` Table
Table of Contents items for a book.

```sql
CREATE TABLE book_toc_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    page_number INTEGER NOT NULL
);
CREATE INDEX idx_book_toc_items_book_id ON book_toc_items(book_id);
```

### 2.8. `questions` Table
Stores philosophical questions.

```sql
CREATE TYPE question_type_enum AS ENUM ('MultipleChoice', 'OpenEnded');
CREATE TYPE question_difficulty_enum AS ENUM ('Easy', 'Hard');
-- Category can be a more structured enum or a simple text field based on your design.
-- For example:
CREATE TYPE question_category_enum AS ENUM ('Thinking', 'Philosophy', 'Creative', 'Relationship');


CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    type question_type_enum NOT NULL,
    difficulty question_difficulty_enum NOT NULL,
    category question_category_enum, -- From your detailed design
    -- options TEXT[], -- For MultipleChoice, or use a separate options table if options need more structure
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
*(Note: If question options are complex or need IDs, a separate `question_options` table would be better than `TEXT[]`.)*

### 2.9. `book_questions` (Junction Table)
Links questions to specific books (many-to-many).

```sql
CREATE TABLE book_questions (
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, question_id)
);
```

### 2.10. `user_answers` Table
Stores user's answers to questions.

```sql
-- For different answer types, consider a flexible JSONB column or separate tables
-- For simplicity, a text field is shown here, but this might need expansion
CREATE TYPE answer_type_enum AS ENUM ('text', 'drawing_url', 'audio_url', 'choice');

CREATE TABLE user_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE, -- Nullable if parent answers
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    answer_type answer_type_enum NOT NULL DEFAULT 'text',
    answer_content TEXT, -- For text, or URL for drawing/audio, or chosen option for choice
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_answers_user_id ON user_answers(user_id);
CREATE INDEX idx_user_answers_child_id ON user_answers(child_id);
```

### 2.11. `reviews` Table
Stores book reviews by users.

```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, book_id) -- Assuming one review per user per book
);
CREATE INDEX idx_reviews_book_id ON reviews(book_id);
```

### 2.12. `discussions` Table
Stores discussion topics related to books.

```sql
CREATE TABLE discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_post_preview TEXT, -- For summary
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_discussions_book_id ON discussions(book_id);
```

### 2.13. `discussion_posts` Table
Stores posts within a discussion.

```sql
CREATE TABLE discussion_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_discussion_posts_discussion_id ON discussion_posts(discussion_id);
```
*(Note: To get `participantCount` for `DiscussionSummary`, you'd query `discussion_posts` for distinct users or maintain a counter on the `discussions` table, updated by triggers/application logic.)*

### 2.14. `user_favorites` Table
Stores user's favorite books (many-to-many).

```sql
CREATE TABLE user_favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, book_id)
);
```

### 2.15. `user_book_progress` Table
Tracks reading progress, bookmarks, and notes for a user (or child) per book.

```sql
CREATE TABLE user_book_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE, -- Nullable if for parent directly
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    current_page INTEGER DEFAULT 1,
    -- bookmarks INTEGER[], -- Array of page numbers. Alternative: separate bookmarks table
    -- notes JSONB, -- e.g., {"page_number": "note_text"}. Alternative: separate notes table
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, child_id, book_id),
    UNIQUE (user_id, book_id) WHERE child_id IS NULL -- Ensure uniqueness if child_id is null
);

CREATE TABLE user_book_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    progress_id UUID NOT NULL REFERENCES user_book_progress(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(progress_id, page_number)
);

CREATE TABLE user_book_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    progress_id UUID NOT NULL REFERENCES user_book_progress(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

```

### 2.16. `learning_activities` Table
Stores user/child learning activities for the history timeline.

```sql
CREATE TYPE activity_type_enum AS ENUM ('book_read_completed', 'question_answered', 'badge_earned', 'note_taken', 'discussion_posted');

CREATE TABLE learning_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE, -- Nullable if parent activity
    activity_type activity_type_enum NOT NULL,
    description TEXT NOT NULL,
    related_entity_id UUID, -- e.g., book_id, question_id, discussion_id
    related_link TEXT, -- e.g., /books/book_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_learning_activities_user_id_child_id ON learning_activities(user_id, child_id);
```

### 2.17. `user_settings` Table
Stores various user-specific settings (e.g., notifications).

```sql
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    notify_new_recommendations BOOLEAN DEFAULT TRUE,
    notify_child_progress_updates BOOLEAN DEFAULT TRUE,
    notify_platform_announcements BOOLEAN DEFAULT FALSE,
    notify_weekly_summary BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
*(Subscription/Plan information might be in a separate `subscriptions` table if it's complex, or could be a field in `users` if simple.)*

## 3. API Endpoints (FastAPI)

All endpoints are prefixed with `/api/v1`.
Authentication: Assumes JWT-based authentication. Endpoints marked "Protected" require a valid JWT.

### 3.1. Authentication

*   **`POST /auth/register`**
    *   Description: Register a new user.
    *   Auth: Public.
    *   Request Body: `{ name, email, password, user_type ('parent'|'teacher'), children_info? (if parent) }`
    *   Response Body (Success 201): `{ user: { id, name, email, avatar_url, tier }, access_token, token_type }`
    *   Response Body (Error 400, 409): `{ detail: "Error message" }`
*   **`POST /auth/login`**
    *   Description: Log in an existing user.
    *   Auth: Public.
    *   Request Body: `{ username (email), password }` (OAuth2PasswordRequestForm from FastAPI)
    *   Response Body (Success 200): `{ access_token, token_type, user: { id, name, email, avatar_url, tier } }`
    *   Response Body (Error 400, 401): `{ detail: "Error message" }`
*   **`POST /auth/logout`** (Conceptually, frontend handles token deletion)
    *   Description: Log out user (if backend session/token invalidation is needed).
    *   Auth: Protected.
    *   Response Body (Success 200): `{ message: "Logged out successfully" }`
*   **`POST /auth/request-password-reset`**
    *   Description: Request a password reset email.
    *   Auth: Public.
    *   Request Body: `{ email }`
    *   Response Body (Success 200): `{ message: "Password reset email sent." }`
*   **`POST /auth/reset-password`**
    *   Description: Reset password using a token from email.
    *   Auth: Public (token validated by backend).
    *   Request Body: `{ token, new_password }`
    *   Response Body (Success 200): `{ message: "Password reset successfully." }`

### 3.2. Users (Current User / Profile)

*   **`GET /users/me`**
    *   Description: Get current authenticated user's profile.
    *   Auth: Protected.
    *   Response Body (Success 200): `User` object.
*   **`PUT /users/me`**
    *   Description: Update current authenticated user's profile (name, avatar, introduction).
    *   Auth: Protected.
    *   Request Body: `{ name?, avatar_file?, introduction? }` (avatar_file as `UploadFile`)
    *   Response Body (Success 200): Updated `User` object.
*   **`PUT /users/me/change-email`**
    *   Description: Change user's email (might involve verification).
    *   Auth: Protected.
    *   Request Body: `{ new_email, password (current for verification) }`
    *   Response Body (Success 200): `{ message: "Email change request processed." }`
*   **`PUT /users/me/change-password`** (Used in Account Settings)
    *   Description: Change user's password.
    *   Auth: Protected.
    *   Request Body: `{ current_password, new_password }`
    *   Response Body (Success 200): `{ message: "Password changed successfully." }`
*   **`GET /users/me/settings`**
    *   Description: Get user's notification and other account settings.
    *   Auth: Protected.
    *   Response Body (Success 200): `{ notify_new_recommendations, ... }`
*   **`PUT /users/me/settings`**
    *   Description: Update user's notification and other account settings.
    *   Auth: Protected.
    *   Request Body: `{ notify_new_recommendations?, ... }`
    *   Response Body (Success 200): Updated settings object.
*   **`GET /users/me/subscription`**
    *   Description: Get user's current subscription plan.
    *   Auth: Protected.
    *   Response Body (Success 200): `{ plan_name, price, renewal_date, features }`
*   **`GET /users/me/billing-history`**
    *   Description: Get user's billing history.
    *   Auth: Protected.
    *   Query Params: `?page=1&limit=10`
    *   Response Body (Success 200): Paginated list of billing items.


### 3.3. Children (Managed by authenticated user)

*   **`GET /users/me/children`**
    *   Description: Get list of children for the current user.
    *   Auth: Protected.
    *   Response Body (Success 200): `Child[]`
*   **`POST /users/me/children`**
    *   Description: Add a new child for the current user.
    *   Auth: Protected.
    *   Request Body: `{ name, age, avatar_url?, interests? }`
    *   Response Body (Success 201): Created `Child` object.
*   **`GET /users/me/children/:child_id`**
    *   Description: Get details of a specific child.
    *   Auth: Protected.
    *   Response Body (Success 200): `Child` object with extended progress details.
*   **`PUT /users/me/children/:child_id`**
    *   Description: Update details of a specific child.
    *   Auth: Protected.
    *   Request Body: `{ name?, age?, avatar_url?, interests? }`
    *   Response Body (Success 200): Updated `Child` object.
*   **`DELETE /users/me/children/:child_id`**
    *   Description: Delete a specific child.
    *   Auth: Protected.
    *   Response Body (Success 204): No content.

### 3.4. Books

*   **`GET /books`**
    *   Description: Get a list of all books with filtering, sorting, and pagination.
    *   Auth: Public.
    *   Query Params: `?search_query=&theme_id=&min_age=&max_age=&type=&sort_by=&page=&limit=`
    *   Response Body (Success 200): `{ items: Book[], total: number, page: number, limit: number, pages: number }`
*   **`GET /books/:book_id`**
    *   Description: Get details of a specific book.
    *   Auth: Public (or Protected if some details are user-specific).
    *   Response Body (Success 200): `Book` object (including pages, TOC, related questions, reviews etc.).
*   **`GET /books/:book_id/pages`** (Helper for ReadingPage if not bundled with book detail)
    *   Description: Get all page items for a specific book.
    *   Auth: Protected (if book is not free).
    *   Response Body (Success 200): `BookPageItem[]`
*   **`GET /books/:book_id/questions`**
    *   Description: Get philosophical questions related to a specific book.
    *   Auth: Public.
    *   Response Body (Success 200): `PhilosophyQuestionItem[]`

### 3.5. Themes

*   **`GET /themes`**
    *   Description: Get a list of all philosophical themes.
    *   Auth: Public.
    *   Query Params: `?category=` (e.g., 'self', 'others')
    *   Response Body (Success 200): `PhilosophyTheme[]` (with `bookCount` aggregated).
*   **`GET /themes/:theme_id/books`**
    *   Description: Get books related to a specific theme (similar to `/books` but pre-filtered by theme).
    *   Auth: Public.
    *   Query Params: `?search_query=&min_age=&max_age=&type=&sort_by=&page=&limit=`
    *   Response Body (Success 200): `{ items: Book[], total: number, ... }`

### 3.6. Reviews (Nested under Books)

*   **`GET /books/:book_id/reviews`**
    *   Description: Get reviews for a specific book.
    *   Auth: Public.
    *   Query Params: `?page=1&limit=5&sort_by=date_desc`
    *   Response Body (Success 200): Paginated list of `Review` objects.
*   **`POST /books/:book_id/reviews`**
    *   Description: Add a review for a specific book.
    *   Auth: Protected.
    *   Request Body: `{ rating, text }`
    *   Response Body (Success 201): Created `Review` object.
*   **`PUT /reviews/:review_id`** (User can only edit their own)
    *   Description: Update a review.
    *   Auth: Protected.
    *   Request Body: `{ rating?, text? }`
    *   Response Body (Success 200): Updated `Review` object.
*   **`DELETE /reviews/:review_id`** (User can only delete their own)
    *   Description: Delete a review.
    *   Auth: Protected.
    *   Response Body (Success 204): No content.

### 3.7. Discussions & Posts (Nested under Books)

*   **`GET /books/:book_id/discussions`**
    *   Description: Get discussion summaries for a specific book.
    *   Auth: Protected.
    *   Query Params: `?page=1&limit=10&sort_by=last_activity_desc`
    *   Response Body (Success 200): Paginated list of `DiscussionSummary` objects (with aggregated `participantCount`).
*   **`POST /books/:book_id/discussions`**
    *   Description: Start a new discussion for a book.
    *   Auth: Protected.
    *   Request Body: `{ title, initial_message_text }`
    *   Response Body (Success 201): Created `DiscussionSummary` object (and its first `DiscussionPost`).
*   **`GET /discussions/:discussion_id/posts`**
    *   Description: Get all posts for a specific discussion.
    *   Auth: Protected.
    *   Query Params: `?page=1&limit=20&sort_by=created_at_asc`
    *   Response Body (Success 200): Paginated list of `DiscussionPost` objects.
*   **`POST /discussions/:discussion_id/posts`**
    *   Description: Add a new post to a discussion.
    *   Auth: Protected.
    *   Request Body: `{ text }`
    *   Response Body (Success 201): Created `DiscussionPost` object.

### 3.8. Favorites (User-specific)

*   **`GET /users/me/favorites`**
    *   Description: Get the current user's favorite books.
    *   Auth: Protected.
    *   Query Params: (for filtering/sorting favorites if needed, similar to `/books`)
    *   Response Body (Success 200): List of `Book` objects.
*   **`POST /users/me/favorites/:book_id`**
    *   Description: Add a book to favorites.
    *   Auth: Protected.
    *   Response Body (Success 200 or 201): `{ message: "Book added to favorites" }`
*   **`DELETE /users/me/favorites/:book_id`**
    *   Description: Remove a book from favorites.
    *   Auth: Protected.
    *   Response Body (Success 204): No content.

### 3.9. Reading Progress & Interactions (User-specific, per book)

*   **`GET /users/me/books/:book_id/progress`**
    *   Description: Get reading progress, bookmarks, and notes for a user and book.
    *   Auth: Protected.
    *   Response Body (Success 200): `{ current_page, bookmarks: ReadingPageBookmark[], notes: ReadingPageNote[] }`
*   **`PUT /users/me/books/:book_id/progress`**
    *   Description: Update current page for a book.
    *   Auth: Protected.
    *   Request Body: `{ current_page: number }`
    *   Response Body (Success 200): Updated progress object.
*   **`POST /users/me/books/:book_id/bookmarks`**
    *   Description: Add a bookmark.
    *   Auth: Protected.
    *   Request Body: `{ page_number: number }`
    *   Response Body (Success 201): Created bookmark object or updated list.
*   **`DELETE /users/me/books/:book_id/bookmarks/:page_number`**
    *   Description: Remove a bookmark.
    *   Auth: Protected.
    *   Response Body (Success 204): No content.
*   **`POST /users/me/books/:book_id/notes`**
    *   Description: Add a note for a specific page.
    *   Auth: Protected.
    *   Request Body: `{ page_number: number, text: string }`
    *   Response Body (Success 201): Created `ReadingPageNote` object.
*   **`DELETE /users/me/books/:book_id/notes/:note_id`** (or by page_number and timestamp)
    *   Description: Delete a note.
    *   Auth: Protected.
    *   Response Body (Success 204): No content.

### 3.10. Question Answering

*   **`POST /users/me/answers`**
    *   Description: Submit an answer to a philosophical question.
    *   Auth: Protected.
    *   Request Body: `{ book_id, question_id, child_id?, answer_type, answer_content }`
    *   Response Body (Success 201): Created `UserAnswer` object.
*   **`GET /users/me/answers?question_id=:question_id&book_id=:book_id`**
    *   Description: Get user's past answers for a specific question/book.
    *   Auth: Protected.
    *   Response Body (Success 200): `UserAnswer[]`

### 3.11. Learning History (User-specific)

*   **`GET /users/me/learning-history`**
    *   Description: Get learning activities for the user and their children.
    *   Auth: Protected.
    *   Query Params: `?child_id=&date_from=&date_to=&page=&limit=`
    *   Response Body (Success 200): Paginated list of `LearningActivity` objects.

## 4. Further Considerations

*   **Error Handling**: Consistent error response format (e.g., `{ "detail": "Error message" }`).
*   **Data Validation**: Use Pydantic models in FastAPI for request/response validation.
*   **File Uploads**: For avatars, book covers (if managed by backend), drawing answers - FastAPI's `UploadFile`.
*   **Background Tasks**: For sending emails (password reset, notifications).
*   **Creator/Admin Endpoints**: Separate set of endpoints for content management (books, themes, questions) and user administration if needed. These are not detailed here but would follow similar REST principles.
*   **Real-time Features**: For discussions, if real-time updates are desired, WebSockets would be needed in addition to these REST endpoints.
*   **Search**: The `/books?search_query=` is a basic search. More advanced search might use a dedicated search engine (e.g., Elasticsearch) and its own API.

This document provides a foundational structure. Specific details for each endpoint (e.g., exact Pydantic models for request/response) would be further defined during backend development.

## 5. 未実装機能の概要

2024年5月時点のリポジトリを確認したところ、下記のAPIルートはまだ実装されていませ
ん。モデルやCRUD処理は存在しますが、FastAPI ルーターが用意されておらずフロントエ
ンドから利用できない状態です。

- `/users` 以下のプロフィール更新、設定変更、メール・パスワード変更
- `/users/me/children` に関するCRUD
- `/themes` の取得・一覧
- `/books` の作成・更新・削除、ページ／TOC 管理
- `/books/{id}/reviews` や `/reviews/{id}` のレビュー操作
- `/users/me/favorites` などお気に入り管理
- `/users/me/books/{book_id}/progress` など読書進捗・ブックマーク・メモ関連
- `/users/me/learning-history` の学習履歴取得
- JWT検証用依存関数 (`get_current_user`) をはじめとした認証ミドルウェア

これらのエンドポイントを追加することで、設計ドキュメントで想定した全機能を利用で
きるようになります。
