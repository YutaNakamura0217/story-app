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

## 5. 実装ステップ (詳細計画)

環境構築、基本的なCRUD関数およびその単体テストは完了済みであるとの前提に基づき、以下のステップで実装を進めます。

### フェーズ1: 基盤整備と認証機能の実装

1.  **モデルとスキーマの最終確認 (推奨)**
    *   `backend/app/models.py` (SQLAlchemyモデル) と `backend/app/schemas.py` (Pydanticスキーマ) が、`backend_design.md` および本ドキュメントの「3. データベーススキーマセットアップ」セクションのスコープ内定義（質問・ディスカッション関連を除く）と完全に一致し、実装済みのCRUD関数と整合性が取れていることを確認します。
    *   特に、リレーションシップ定義、型ヒント、Enum型などが正しく設定されているかレビューします。

2.  **データベースマイグレーションの確認・実行**
    *   Alembicによるマイグレーション設定が完了していることを確認します。
    *   現在の `models.py` の状態を反映したマイグレーションファイルが存在し、データベーススキーマが最新であることを確認します。必要であれば、新しいマイグレーションファイルを作成し、実行します (`alembic revision -m "update_schema_for_api_endpoints"` や `alembic upgrade head` など)。
    *   本ドキュメントの「3. データベーススキーマセットアップ」にリストされているテーブル（除外テーブルを除く）がすべて作成されるようにします。

3.  **認証機能 (`/auth`) の実装**
    *   **対象ファイル**: `backend/app/routes/auth.py`, `backend/app/core/security.py` (新規または既存), `backend/app/crud/crud_user.py` (既存利用)
    *   **エンドポイント** (本ドキュメント 4.1節参照):
        *   `POST /auth/register`
        *   `POST /auth/login`
        *   `POST /auth/request-password-reset`
        *   `POST /auth/reset-password`
    *   **実装内容**:
        *   パスワードのハッシュ化と検証ロジック。
        *   JWTアクセストークンの生成とデコード処理。
        *   FastAPIの `OAuth2PasswordBearer` と `Security` を利用した依存性注入 (`get_current_active_user`など)。
    *   **テスト**: これらの認証エンドポイントに対する結合テストを作成します。

### フェーズ2: 主要なドメインのAPIエンドポイント実装

以下の各機能について、本ドキュメントの4.2節以降を参考に、ルーターとエンドポイントを実装し、それぞれ結合テストを作成します。CRUD関数は既に存在するため、エンドポイントは主にこれらのCRUD関数を呼び出し、適切なPydanticスキーマでレスポンスを返す形になります。

4.  **ユーザー機能 (`/users`) の実装**
    *   **対象ファイル**: `backend/app/routes/users.py`
    *   **エンドポイント** (本ドキュメント 4.2節参照):
        *   `GET /users/me`
        *   `PUT /users/me`
        *   `PUT /users/me/change-email`
        *   `PUT /users/me/change-password`
        *   `GET /users/me/settings`
        *   `PUT /users/me/settings`
        *   `GET /users/me/subscription` (モック対応)
        *   `GET /users/me/billing-history` (モック対応)
    *   **依存関係**: 認証機能。

5.  **子供機能 (`/users/me/children`) の実装**
    *   **対象ファイル**: `backend/app/routes/children.py` (必要に応じて新規作成)
    *   **エンドポイント** (本ドキュメント 4.3節参照):
        *   `GET /users/me/children`
        *   `POST /users/me/children`
        *   `GET /users/me/children/{child_id}`
        *   `PUT /users/me/children/{child_id}`
        *   `DELETE /users/me/children/{child_id}`

6.  **テーマ機能 (`/themes`) の実装**
    *   **対象ファイル**: `backend/app/routes/themes.py` (必要に応じて新規作成)
    *   **エンドポイント** (本ドキュメント 4.5節参照):
        *   `GET /themes` (関連書籍数 `book_count` の集計が必要)
        *   `GET /themes/{theme_id}/books` (書籍リストのフィルタリング)

7.  **書籍機能 (`/books`) の実装**
    *   **対象ファイル**: `backend/app/routes/books.py`
    *   **エンドポイント** (本ドキュメント 4.4節参照):
        *   `GET /books` (フィルタリング、ソート、ページネーション)
        *   `GET /books/{book_id}` (関連情報: `BookPage`, `BookTocItem`, `Review`概要などを含む `BookDetailRead` スキーマのレスポンス。`crud_book.py` でのデータ集約ロジックの拡充が必要になる場合があります)
        *   `GET /books/{book_id}/pages`
    *   **注意点**: `GET /books/{book_id}` は複数のテーブルから情報を集約する必要があるため、`crud_book.py` の既存関数を拡張するか、サービスクラスを導入してロジックを整理することを検討してください。

8.  **レビュー機能 (`/books/{book_id}/reviews`, `/reviews/{review_id}`) の実装**
    *   **対象ファイル**: `backend/app/routes/reviews.py`
    *   **エンドポイント** (本ドキュメント 4.6節参照):
        *   `GET /books/{book_id}/reviews`
        *   `POST /books/{book_id}/reviews`
        *   `PUT /reviews/{review_id}`
        *   `DELETE /reviews/{review_id}`

9.  **お気に入り機能 (`/users/me/favorites`) の実装**
    *   **対象ファイル**: `backend/app/routes/favorites.py` (必要に応じて新規作成)
    *   **エンドポイント** (本ドキュメント 4.7節参照):
        *   `GET /users/me/favorites`
        *   `POST /users/me/favorites/{book_id}`
        *   `DELETE /users/me/favorites/{book_id}`

10. **読書進捗機能 (`/users/me/books/{book_id}/progress, ...`) の実装**
    *   **対象ファイル**: `backend/app/routes/progress.py` (必要に応じて新規作成)
    *   **エンドポイント** (本ドキュメント 4.8節参照):
        *   `GET /users/me/books/{book_id}/progress` (ブックマーク、メモも含む)
        *   `PUT /users/me/books/{book_id}/progress` (現在ページ更新)
        *   `POST /users/me/books/{book_id}/bookmarks`
        *   `DELETE /users/me/books/{book_id}/bookmarks/{page_number}`
        *   `POST /users/me/books/{book_id}/notes`
        *   `DELETE /users/me/books/{book_id}/notes/{note_id}`

11. **学習履歴機能 (`/users/me/learning-history`) の実装**
    *   **対象ファイル**: `backend/app/routes/history.py` (必要に応じて新規作成)
    *   **エンドポイント** (本ドキュメント 4.9節参照):
        *   `GET /users/me/learning-history`

### フェーズ3: 仕上げ

12. **結合テストの網羅性向上**
    *   すべてのエンドポイントに対して、正常系・異常系（バリデーションエラー、認証エラー、権限エラー、リソース未発見など）のテストケースを作成します。
    *   `.clinerules/backend.md` に記載されているテスト作成時の注意点を参考に、質の高いテストを作成します。

13. **APIドキュメントの整備**
    *   FastAPIが自動生成するSwagger UI (`/docs`) および ReDoc (`/redoc`) を確認します。
    *   Pydanticスキーマやエンドポイントの `description` などを追記し、ドキュメントの可読性を向上させます。

14. **エラーハンドリングの統一**
    *   FastAPIの例外ハンドラを用いて、API全体で一貫したエラーレスポンス形式（例: `{ "detail": "Error message" }`）となるようにします。

## 6. フロントエンドとの連携及び一般的な注意点

-   **フロントエンドとの連携**:
    -   `frontend_design.md` を参照し、特に各ページで必要とされるデータの構造や、エンドポイントのレスポンス形式がフロントエンドの期待と一致するように注意して実装を進めてください。
    -   例えば、書籍詳細ページでは多くの関連情報が一度に必要となるため、バックエンドの `/books/{book_id}` エンドポイントはこれらの情報を効率的に提供できるように設計する必要があります。

-   **進め方**:
    -   上記のフェーズとステップに沿って、一つずつ機能を実装し、テストしていくことをお勧めします。特に認証機能は多くの機能の基盤となるため、最初に取り組むのが良いでしょう。

-   **非同期処理**:
    -   データベースアクセスなどI/Oバウンドな処理は非同期 (`async/await`) で実装します。これはFastAPIの標準的な使い方であり、パフォーマンス向上のために重要です。

この計画に基づき、段階的にバックエンド機能を追加していきます。
現在は以下のルーターが実装済みです: ユーザー認証、テーマ一覧、書籍参照、
お気に入り操作、そして子供管理。残る機能は下記のとおりです。

## 7. 現状の不足点まとめ


以前は多くのルートが未実装でしたが、現在は下記のエンドポイントを追加しました。

- `/users/me/change-email` と `/users/me/change-password` によるメール・パスワード変更
- `/books` の作成・更新・削除およびページ・目次管理
- `/books/{book_id}/reviews` と `/reviews/{review_id}` のレビュー操作
- `/users/me/books/{book_id}/progress` 以下の読書進捗・ブックマーク・メモ管理
- `/users/me/learning-history` の学習履歴取得

これらはすべて `get_current_user` 依存性でJWTを検証し、認証ユーザーのみが操作できます。
