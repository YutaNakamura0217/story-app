# バックエンド実装計画 - 哲学絵本プラットフォーム

## 1. はじめに

このドキュメントは、「哲学絵本プラットフォーム」のバックエンド実装手順をまとめたものです。
ユーザーからの指示に基づき、書籍の質問機能とディスカッション機能は今回の実装範囲から除外します。

## 2. 実装方針

-   **フレームワーク**: FastAPI
-   **データベース**: PostgreSQL
-   **認証**: JWT

## 3. データベーススキーマセットアップ

`backend_design.md` に基づき、以下のテーブルを作成します。質問およびディスカッション関連のテーブルは除外します。

1.  **`users` テーブル**: ユーザー情報
    -   `user_tier_enum` 型も作成
2.  **`children` テーブル**: 子供の情報
3.  **`themes` テーブル**: 哲学テーマ
    -   `theme_category_enum` 型も作成
4.  **`books` テーブル**: 書籍情報
5.  **`book_themes` テーブル**: 書籍とテーマの関連 (中間テーブル)
6.  **`book_pages` テーブル**: 書籍のページ情報
    -   `question_id` カラムは作成しますが、当面は利用しません (NULL許容)。
7.  **`book_toc_items` テーブル**: 書籍の目次情報
8.  **`reviews` テーブル**: 書籍レビュー
9.  **`user_favorites` テーブル**: ユーザーのお気に入り書籍
10. **`user_book_progress` テーブル**: ユーザーの読書進捗
11. **`user_book_bookmarks` テーブル**: ユーザーのブックマーク
12. **`user_book_notes` テーブル**: ユーザーのメモ
13. **`learning_activities` テーブル**: 学習アクティビティ履歴
    -   `activity_type_enum` 型も作成
14. **`user_settings` テーブル**: ユーザー設定

**除外するテーブル:**
-   `questions`
-   `book_questions`
-   `user_answers`
-   `discussions`
-   `discussion_posts`

## 4. APIエンドポイント実装

FastAPIルーターを使用してモジュールごとに実装を進めます。各エンドポイントは `backend_design.md` の仕様に基づきます。

### 4.1. 認証 (`/auth`)

-   **対象ファイル**: `backend/app/routes/auth.py`, `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_user.py` (新規作成または既存のものを利用)
-   **エンドポイント**:
    -   `POST /auth/register`: 新規ユーザー登録
        -   Schemas: `UserCreate`, `UserRead`, `Token`
        -   Models: `User`
        -   レスポンス例 (JSON):
            ```json
            {
              "user": {
                "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "name": "Taro Yamada",
                "email": "taro@example.com",
                "avatar_url": "https://example.com/avatar.png",
                "tier": "Free"
              },
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "token_type": "bearer"
            }
            ```
    -   `POST /auth/login`: ログイン
        -   Schemas: `Token`, `UserRead` (FastAPIの `OAuth2PasswordRequestForm` を利用)
        -   Models: `User`
        -   レスポンス例 (JSON):
            ```json
            {
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "token_type": "bearer",
              "user": {
                "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "name": "Taro Yamada",
                "email": "taro@example.com",
                "avatar_url": "https://example.com/avatar.png",
                "tier": "Free"
              }
            }
            ```
    -   `POST /auth/request-password-reset`: パスワードリセット申請
        -   Schemas: `Msg` (汎用メッセージスキーマ)
        -   レスポンス例 (JSON):
            ```json
            {
              "message": "Password reset email sent."
            }
            ```
    -   `POST /auth/reset-password`: パスワードリセット実行
        -   Schemas: `Msg`
        -   レスポンス例 (JSON):
            ```json
            {
              "message": "Password reset successfully."
            }
            ```

### 4.2. ユーザー (`/users`)

-   **対象ファイル**: `backend/app/routes/users.py`, `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_user.py`
-   **エンドポイント**:
    -   `GET /users/me`: 現在のユーザー情報取得
        -   Schemas: `UserRead`
        -   Models: `User`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
              "name": "Taro Yamada",
              "email": "taro@example.com",
              "avatar_url": "https://example.com/avatar.png",
              "tier": "Free",
              "introduction": "Hello, I am Taro.",
              "created_at": "2023-01-01T10:00:00Z",
              "updated_at": "2023-01-10T12:00:00Z"
            }
            ```
    -   `PUT /users/me`: ユーザー情報更新
        -   Schemas: `UserUpdate`, `UserRead`
        -   Models: `User`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
              "name": "Taro Yamada Updated",
              "email": "taro@example.com",
              "avatar_url": "https://example.com/new_avatar.png",
              "tier": "Free",
              "introduction": "Updated introduction.",
              "created_at": "2023-01-01T10:00:00Z",
              "updated_at": "2023-01-15T14:30:00Z"
            }
            ```
    -   `PUT /users/me/change-email`: メールアドレス変更 (今回は簡略化し、パスワード確認なしで直接変更)
        -   Schemas: `UserEmailUpdate`, `Msg`
        -   Models: `User`
        -   レスポンス例 (JSON):
            ```json
            {
              "message": "Email change request processed."
            }
            ```
    -   `PUT /users/me/change-password`: パスワード変更
        -   Schemas: `UserPasswordUpdate`, `Msg`
        -   Models: `User`
        -   レスポンス例 (JSON):
            ```json
            {
              "message": "Password changed successfully."
            }
            ```
    -   `GET /users/me/settings`: ユーザー設定取得
        -   Schemas: `UserSettingsRead`
        -   Models: `UserSettings`
        -   レスポンス例 (JSON):
            ```json
            {
              "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
              "notify_new_recommendations": true,
              "notify_child_progress_updates": true,
              "notify_platform_announcements": false,
              "notify_weekly_summary": true,
              "updated_at": "2023-01-10T11:00:00Z"
            }
            ```
    -   `PUT /users/me/settings`: ユーザー設定更新
        -   Schemas: `UserSettingsUpdate`, `UserSettingsRead`
        -   Models: `UserSettings`
        -   レスポンス例 (JSON):
            ```json
            {
              "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
              "notify_new_recommendations": false,
              "notify_child_progress_updates": true,
              "notify_platform_announcements": true,
              "notify_weekly_summary": false,
              "updated_at": "2023-01-16T09:00:00Z"
            }
            ```
    -   `GET /users/me/subscription`: (モックまたは固定値で対応)
        -   レスポンス例 (JSON):
            ```json
            {
              "plan_name": "Premium",
              "price": 980,
              "currency": "JPY",
              "renewal_date": "2024-06-28",
              "features": ["All books access", "Offline reading", "Parental controls"]
            }
            ```
    -   `GET /users/me/billing-history`: (モックまたは固定値で対応)
        -   レスポンス例 (JSON):
            ```json
            {
              "items": [
                {
                  "id": "billing_hist_1",
                  "date": "2023-05-28",
                  "description": "Monthly Subscription - Premium Plan",
                  "amount": 980,
                  "currency": "JPY",
                  "status": "Paid"
                }
              ],
              "total": 1,
              "page": 1,
              "limit": 10,
              "pages": 1
            }
            ```

### 4.3. 子供 (`/users/me/children`)

-   **対象ファイル**: `backend/app/routes/children.py` (新規作成), `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_child.py` (新規作成)
-   **エンドポイント**:
    -   `GET /users/me/children`: 子供リスト取得
        -   Schemas: `ChildRead` (List)
        -   Models: `Child`
        -   レスポンス例 (JSON):
            ```json
            [
              {
                "id": "child_uuid_1",
                "user_id": "user_uuid_parent",
                "name": "Hanako Yamada",
                "age": 5,
                "avatar_url": "https://example.com/hanako.png",
                "interests": ["drawing", "animals"],
                "created_at": "2023-02-01T10:00:00Z",
                "updated_at": "2023-02-01T10:00:00Z"
              },
              {
                "id": "child_uuid_2",
                "user_id": "user_uuid_parent",
                "name": "Jiro Yamada",
                "age": 7,
                "avatar_url": "https://example.com/jiro.png",
                "interests": ["dinosaurs", "space"],
                "created_at": "2023-03-01T11:00:00Z",
                "updated_at": "2023-03-01T11:00:00Z"
              }
            ]
            ```
    -   `POST /users/me/children`: 子供追加
        -   Schemas: `ChildCreate`, `ChildRead`
        -   Models: `Child`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "child_uuid_new",
              "user_id": "user_uuid_parent",
              "name": "Saburo Yamada",
              "age": 3,
              "avatar_url": "https://example.com/saburo.png",
              "interests": ["cars"],
              "created_at": "2023-05-29T08:00:00Z",
              "updated_at": "2023-05-29T08:00:00Z"
            }
            ```
    -   `GET /users/me/children/{child_id}`: 特定の子供の情報取得
        -   Schemas: `ChildRead`
        -   Models: `Child`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "child_uuid_1",
              "user_id": "user_uuid_parent",
              "name": "Hanako Yamada",
              "age": 5,
              "avatar_url": "https://example.com/hanako.png",
              "interests": ["drawing", "animals"],
              "created_at": "2023-02-01T10:00:00Z",
              "updated_at": "2023-02-01T10:00:00Z"
              // Potentially extended progress details here
            }
            ```
    -   `PUT /users/me/children/{child_id}`: 子供情報更新
        -   Schemas: `ChildUpdate`, `ChildRead`
        -   Models: `Child`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "child_uuid_1",
              "user_id": "user_uuid_parent",
              "name": "Hanako Yamada (Updated)",
              "age": 6,
              "avatar_url": "https://example.com/hanako_new.png",
              "interests": ["drawing", "animals", "singing"],
              "created_at": "2023-02-01T10:00:00Z",
              "updated_at": "2023-05-29T09:00:00Z"
            }
            ```
    -   `DELETE /users/me/children/{child_id}`: 子供削除
        -   Response: HTTP 204 (No Content)

### 4.4. 書籍 (`/books`)

-   **対象ファイル**: `backend/app/routes/books.py`, `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_book.py` (新規作成または既存のものを利用)
-   **エンドポイント**:
    -   `GET /books`: 書籍リスト取得 (フィルタリング、ソート、ページネーション対応)
        -   Schemas: `BookRead`, `PaginatedResponse[BookRead]`
        -   Models: `Book`, `Theme`, `BookTheme`
        -   レスポンス例 (JSON):
            ```json
            {
              "items": [
                {
                  "id": "book_uuid_1",
                  "title": "The Little Philosopher",
                  "author_name": "Jane Doe",
                  "cover_url": "https://example.com/book1_cover.png",
                  "description": "A short story about thinking.",
                  "age_min": 4,
                  "age_max": 6,
                  "is_premium": false,
                  "is_free": true,
                  "themes": [
                    { "id": "theme_uuid_self", "name": "じぶんのこと" }
                  ]
                }
              ],
              "total": 1,
              "page": 1,
              "limit": 10,
              "pages": 1
            }
            ```
    -   `GET /books/{book_id}`: 特定の書籍情報取得
        -   Schemas: `BookDetailRead` (ページ、目次、レビュー情報を含む)
        -   Models: `Book`, `BookPage`, `BookTocItem`, `Review`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "book_uuid_1",
              "title": "The Little Philosopher",
              "author_name": "Jane Doe",
              "cover_url": "https://example.com/book1_cover.png",
              "description": "A short story about thinking.",
              "long_description": "A longer description of the book...",
              "reading_time_minutes": 10,
              "age_min": 4,
              "age_max": 6,
              "publisher": "Wonder Books",
              "publish_date": "2023-01-15",
              "is_premium": false,
              "is_free": true,
              "popularity_score": 150,
              "total_pages": 24,
              "themes": [
                { "id": "theme_uuid_self", "name": "じぶんのこと", "description": "..." }
              ],
              "pages": [
                { "id": "page_uuid_1", "book_id": "book_uuid_1", "page_number": 1, "image_url": "https://example.com/page1.png", "audio_url": null }
              ],
              "toc": [
                { "id": "toc_uuid_1", "book_id": "book_uuid_1", "title": "Chapter 1", "page_number": 1 }
              ],
              "reviews_summary": { "average_rating": 4.5, "total_reviews": 10 },
              "related_books": [ /* Similar BookRead structure */ ]
            }
            ```
    -   `GET /books/{book_id}/pages`: 書籍ページリスト取得
        -   Schemas: `BookPageRead` (List)
        -   Models: `BookPage`
        -   レスポンス例 (JSON):
            ```json
            [
              {
                "id": "page_uuid_1",
                "book_id": "book_uuid_1",
                "page_number": 1,
                "image_url": "https://example.com/page1.png",
                "audio_url": null,
                "question_id": null
              },
              {
                "id": "page_uuid_2",
                "book_id": "book_uuid_1",
                "page_number": 2,
                "image_url": "https://example.com/page2.png",
                "audio_url": "https://example.com/page2.mp3",
                "question_id": null
              }
            ]
            ```
    -   **除外**: `GET /books/{book_id}/questions`

### 4.5. テーマ (`/themes`)

-   **対象ファイル**: `backend/app/routes/themes.py` (新規作成), `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_theme.py` (新規作成)
-   **エンドポイント**:
    -   `GET /themes`: テーマリスト取得
        -   Schemas: `ThemeRead` (List, `bookCount` を含む)
        -   Models: `Theme`, `BookTheme`
        -   レスポンス例 (JSON):
            ```json
            [
              {
                "id": "theme_uuid_self",
                "name": "じぶんのこと",
                "description": "自分自身について考えるテーマです。",
                "icon_identifier": "UserCircleIcon",
                "age_range_display": "4-7歳",
                "category": "self",
                "cover_image_url": "https://example.com/theme_self.png",
                "question_prompt": "わたしってどんなひと？",
                "book_count": 15
              },
              {
                "id": "theme_uuid_others",
                "name": "ともだちのこと",
                "description": "他者との関係について考えるテーマです。",
                "icon_identifier": "UsersIcon",
                "age_range_display": "5-8歳",
                "category": "others",
                "cover_image_url": "https://example.com/theme_others.png",
                "question_prompt": "ともだちってなんだろう？",
                "book_count": 12
              }
            ]
            ```
    -   `GET /themes/{theme_id}/books`: 特定テーマの書籍リスト取得
        -   Schemas: `BookRead`, `PaginatedResponse[BookRead]`
        -   Models: `Book`, `Theme`, `BookTheme`
        -   レスポンス例 (JSON):
            ```json
            {
              "items": [
                {
                  "id": "book_uuid_1",
                  "title": "The Little Philosopher",
                  "author_name": "Jane Doe",
                  "cover_url": "https://example.com/book1_cover.png",
                  "description": "A short story about thinking.",
                  "age_min": 4,
                  "age_max": 6,
                  "is_premium": false,
                  "is_free": true,
                  "themes": [ { "id": "theme_uuid_self", "name": "じぶんのこと" } ]
                }
                // ... more books related to the theme
              ],
              "total": 5, // Total books for this theme
              "page": 1,
              "limit": 10,
              "pages": 1
            }
            ```

### 4.6. レビュー (`/books/{book_id}/reviews`, `/reviews/{review_id}`)

-   **対象ファイル**: `backend/app/routes/reviews.py`, `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_review.py` (新規作成または既存のものを利用)
-   **エンドポイント**:
    -   `GET /books/{book_id}/reviews`: 特定書籍のレビューリスト取得
        -   Schemas: `ReviewRead`, `PaginatedResponse[ReviewRead]`
        -   Models: `Review`
        -   レスポンス例 (JSON):
            ```json
            {
              "items": [
                {
                  "id": "review_uuid_1",
                  "user_id": "user_uuid_reviewer",
                  "book_id": "book_uuid_1",
                  "rating": 5,
                  "text": "とても素晴らしい本でした！考えさせられます。",
                  "created_at": "2023-04-01T15:00:00Z",
                  "updated_at": "2023-04-01T15:00:00Z",
                  "user": { "id": "user_uuid_reviewer", "name": "Reviewer Name" }
                }
              ],
              "total": 1,
              "page": 1,
              "limit": 5,
              "pages": 1
            }
            ```
    -   `POST /books/{book_id}/reviews`: レビュー追加
        -   Schemas: `ReviewCreate`, `ReviewRead`
        -   Models: `Review`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "review_uuid_new",
              "user_id": "current_user_uuid",
              "book_id": "book_uuid_1",
              "rating": 4,
              "text": "子供と一緒に読みました。良い議論ができました。",
              "created_at": "2023-05-29T10:00:00Z",
              "updated_at": "2023-05-29T10:00:00Z",
              "user": { "id": "current_user_uuid", "name": "Current User Name" }
            }
            ```
    -   `PUT /reviews/{review_id}`: レビュー更新
        -   Schemas: `ReviewUpdate`, `ReviewRead`
        -   Models: `Review`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "review_uuid_1",
              "user_id": "current_user_uuid", // Assuming user owns this review
              "book_id": "book_uuid_1",
              "rating": 5,
              "text": "更新されたレビューです。やはり素晴らしい！",
              "created_at": "2023-04-01T15:00:00Z",
              "updated_at": "2023-05-29T11:00:00Z",
              "user": { "id": "current_user_uuid", "name": "Current User Name" }
            }
            ```
    -   `DELETE /reviews/{review_id}`: レビュー削除
        -   Response: HTTP 204 (No Content)

### 4.7. お気に入り (`/users/me/favorites`)

-   **対象ファイル**: `backend/app/routes/favorites.py` (新規作成), `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_favorite.py` (新規作成)
-   **エンドポイント**:
    -   `GET /users/me/favorites`: お気に入り書籍リスト取得
        -   Schemas: `BookRead` (List)
        -   Models: `UserFavorite`, `Book`
        -   レスポンス例 (JSON):
            ```json
            [
              {
                "id": "book_uuid_1",
                "title": "The Little Philosopher",
                "author_name": "Jane Doe",
                "cover_url": "https://example.com/book1_cover.png",
                "description": "A short story about thinking.",
                "age_min": 4,
                "age_max": 6,
                "is_premium": false,
                "is_free": true,
                "themes": [ { "id": "theme_uuid_self", "name": "じぶんのこと" } ]
              },
              {
                "id": "book_uuid_2",
                "title": "Another Great Book",
                "author_name": "John Smith",
                "cover_url": "https://example.com/book2_cover.png",
                "description": "Exploring the world.",
                "age_min": 5,
                "age_max": 8,
                "is_premium": true,
                "is_free": false,
                "themes": [ { "id": "theme_uuid_world", "name": "せかいのこと" } ]
              }
            ]
            ```
    -   `POST /users/me/favorites/{book_id}`: お気に入り追加
        -   Schemas: `Msg`
        -   Models: `UserFavorite`
        -   レスポンス例 (JSON):
            ```json
            {
              "message": "Book added to favorites"
            }
            ```
    -   `DELETE /users/me/favorites/{book_id}`: お気に入り削除
        -   Response: HTTP 204 (No Content)

### 4.8. 読書進捗 (`/users/me/books/{book_id}/progress, ...`)

-   **対象ファイル**: `backend/app/routes/progress.py` (新規作成), `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_progress.py` (新規作成)
-   **エンドポイント**:
    -   `GET /users/me/books/{book_id}/progress`: 読書進捗取得
        -   Schemas: `BookProgressRead` (current_page, bookmarks, notes を含む)
        -   Models: `UserBookProgress`, `UserBookBookmark`, `UserBookNote`
        -   レスポンス例 (JSON):
            ```json
            {
              "current_page": 5,
              "bookmarks": [
                { "id": "bookmark_uuid_1", "progress_id": "progress_uuid", "page_number": 3, "created_at": "2023-05-28T10:00:00Z" },
                { "id": "bookmark_uuid_2", "progress_id": "progress_uuid", "page_number": 10, "created_at": "2023-05-28T11:00:00Z" }
              ],
              "notes": [
                { "id": "note_uuid_1", "progress_id": "progress_uuid", "page_number": 2, "text": "This page was interesting.", "created_at": "2023-05-28T09:00:00Z", "updated_at": "2023-05-28T09:00:00Z" }
              ],
              "last_read_at": "2023-05-29T12:00:00Z"
            }
            ```
    -   `PUT /users/me/books/{book_id}/progress`: 現在ページ更新
        -   Schemas: `BookProgressUpdatePage`, `BookProgressRead`
        -   Models: `UserBookProgress`
        -   レスポンス例 (JSON):
            ```json
            {
              "current_page": 6, // Updated current page
              "bookmarks": [
                { "id": "bookmark_uuid_1", "progress_id": "progress_uuid", "page_number": 3, "created_at": "2023-05-28T10:00:00Z" },
                { "id": "bookmark_uuid_2", "progress_id": "progress_uuid", "page_number": 10, "created_at": "2023-05-28T11:00:00Z" }
              ],
              "notes": [
                { "id": "note_uuid_1", "progress_id": "progress_uuid", "page_number": 2, "text": "This page was interesting.", "created_at": "2023-05-28T09:00:00Z", "updated_at": "2023-05-28T09:00:00Z" }
              ],
              "last_read_at": "2023-05-29T13:00:00Z" // Updated last_read_at
            }
            ```
    -   `POST /users/me/books/{book_id}/bookmarks`: ブックマーク追加
        -   Schemas: `BookmarkCreate`, `BookmarkRead`
        -   Models: `UserBookBookmark`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "bookmark_uuid_new",
              "progress_id": "progress_uuid",
              "page_number": 7,
              "created_at": "2023-05-29T14:00:00Z"
            }
            ```
    -   `DELETE /users/me/books/{book_id}/bookmarks/{page_number}`: ブックマーク削除
        -   Response: HTTP 204 (No Content)
    -   `POST /users/me/books/{book_id}/notes`: メモ追加
        -   Schemas: `NoteCreate`, `NoteRead`
        -   Models: `UserBookNote`
        -   レスポンス例 (JSON):
            ```json
            {
              "id": "note_uuid_new",
              "progress_id": "progress_uuid",
              "page_number": 5,
              "text": "A new note on page 5.",
              "created_at": "2023-05-29T15:00:00Z",
              "updated_at": "2023-05-29T15:00:00Z"
            }
            ```
    -   `DELETE /users/me/books/{book_id}/notes/{note_id}`: メモ削除
        -   Response: HTTP 204 (No Content)

### 4.9. 学習履歴 (`/users/me/learning-history`)

-   **対象ファイル**: `backend/app/routes/history.py` (新規作成), `backend/app/schemas.py`, `backend/app/models.py`, `backend/app/crud/crud_history.py` (新規作成)
-   **エンドポイント**:
    -   `GET /users/me/learning-history`: 学習履歴取得
        -   Schemas: `LearningActivityRead`, `PaginatedResponse[LearningActivityRead]`
        -   Models: `LearningActivity`
        -   レスポンス例 (JSON):
            ```json
            {
              "items": [
                {
                  "id": "activity_uuid_1",
                  "user_id": "user_uuid",
                  "child_id": "child_uuid_1", // Can be null if parent activity
                  "activity_type": "book_read_completed",
                  "description": "「The Little Philosopher」を読み終えました。",
                  "related_entity_id": "book_uuid_1",
                  "related_link": "/books/book_uuid_1",
                  "created_at": "2023-05-29T16:00:00Z"
                },
                {
                  "id": "activity_uuid_2",
                  "user_id": "user_uuid",
                  "child_id": null,
                  "activity_type": "note_taken",
                  "description": "「Another Great Book」のページ5にメモを追加しました。",
                  "related_entity_id": "book_uuid_2", // Could be note_id or book_id
                  "related_link": "/books/book_uuid_2/read", // Or link to the note
                  "created_at": "2023-05-28T15:00:00Z"
                }
              ],
              "total": 2,
              "page": 1,
              "limit": 10,
              "pages": 1
            }
            ```

### 4.10. 除外するエンドポイント群

-   質問関連 (`GET /books/{book_id}/questions`, `POST /users/me/answers`, `GET /users/me/answers`)
-   ディスカッション関連 (`GET /books/{book_id}/discussions`, `POST /books/{book_id}/discussions`, `GET /discussions/{discussion_id}/posts`, `POST /discussions/{discussion_id}/posts`)

## 5. 実装ステップの提案

1.  **環境構築**:
    -   FastAPIプロジェクトの基本設定、PostgreSQLデータベースの準備、`.env` ファイルの設定は完了済み。
2.  **データベースマイグレーション**:
    -   Alembicなどのマイグレーションツールを導入。
    -   上記「3. データベーススキーマセットアップ」で定義したテーブル構造に基づき、マイグレーションファイルを作成・実行。
3.  **基本モデルとスキーマ定義**:
    -   `backend/app/models.py` にSQLAlchemyモデルを定義します。既存の `models.py` の記述スタイル（`Mapped`、`mapped_column` の使用、型ヒント、リレーションシップ定義、`__repr__`メソッドなど）を踏襲してください。
    -   `backend/app/schemas.py` にPydanticスキーマを定義します。
4.  **CRUD操作の実装**:
    -   各モデルに対する基本的なCRUD操作関数を `backend/app/crud/` ディレクトリ以下に作成。
5.  **認証機能の実装**:
    -   `auth.py` ルーターと関連処理を実装。トークン生成、パスワードハッシュ化など。
6.  **各機能ごとのルーターとエンドポイント実装**:
    -   上記「4. APIエンドポイント実装」の各セクション（Users, Children, Booksなど）ごとに、ルーターファイルを作成し、エンドポイントを実装。
    -   各エンドポイントでCRUD関数を呼び出し、適切なスキーマでレスポンスを返す。
    -   依存性注入 (`Depends`) を活用して、DBセッションや現在のユーザー情報を取得。
7.  **テスト**:
    -   ユニットテストと結合テストを作成し、各エンドポイントの動作を確認。
8.  **ドキュメント**:
    -   FastAPIが自動生成するSwagger UI (`/docs`) および ReDoc (`/redoc`) を確認し、必要に応じてスキーマの説明などを充実させる。

## 6. その他

-   エラーハンドリング: FastAPIの例外ハンドラを用いて、一貫したエラーレスポンス形式を定義する。
-   非同期処理: データベースアクセスなどI/Oバウンドな処理は非同期 (`async/await`) で実装する。

この計画に基づき、段階的にバックエンド機能を追加していきます。
