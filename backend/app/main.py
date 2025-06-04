from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from .db import get_db, engine, Base  # db.py から import
from . import models  # Import models to register them with Base
from .routes import auth, books, themes, reviews, users  # Import routers
from .core.config import settings  # Import settings for API_V1_STR

app = FastAPI(
    title="Story App API",
    description="API for managing books, themes, reviews, and user interactions.",
    version="0.1.0"
)

# Include routers
app.include_router(
    auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(
    books.router, prefix=f"{settings.API_V1_STR}/books", tags=["Books"])
app.include_router(
    themes.router, prefix=f"{settings.API_V1_STR}/themes", tags=["Themes"])
# Reviews endpoints define their own paths (e.g. /books/{book_id}/reviews),
# so we only prepend API_V1_STR here.
app.include_router(reviews.router, prefix=f"{settings.API_V1_STR}", tags=["Reviews"])
app.include_router(
    users.router, prefix=f"{settings.API_V1_STR}/users", tags=["Users"])


# ── 開発中だけ: 起動時にテーブル作成しておく ──


@app.on_event("startup")
def on_startup() -> None:
    # DB につながるか確認したいだけなら Ping だけでも OK
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            conn.commit()
    except Exception as e:
        # ログを残し、起動を失敗させる
        raise RuntimeError(f"💥  DB 接続に失敗しました: {e}") from e

    # モデルを自動で作る場合は下記を有効化
    # Base.metadata.create_all(bind=engine) # Managed by Alembic


# ───────────────────────────
# Existing endpoints below can be removed or commented out if no longer needed.
# For now, we will keep the startup event.
# ───────────────────────────
# @app.get("/ping-db", summary="DB 接続確認")
# def ping_db(db: Session = Depends(get_db)) -> dict[str, str]:
#     """
#     DB へ `SELECT 1` を実行し、結果が返れば OK。
#     例外が出れば FastAPI が自動的に 500 を返す。
#     """
#     db.execute(text("SELECT 1"))  # 何か 1 クエリ打つだけ
#     return {"status": "ok"}


# ───────────────────────────
# 2) サンプルモデルを使った接続確認（任意）
# ───────────────────────────
# もし `models.py` で Item モデルを定義している場合は:
# from .models import Item
#
# @app.post("/items")
# def create_item(name: str, db: Session = Depends(get_db)):
#     item = Item(name=name)
#     db.add(item)
#     db.commit()
#     db.refresh(item)
#     return item
