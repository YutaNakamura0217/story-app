# ローカルでのテスト実行方法

このリポジトリのバックエンドには `pytest` を用いた単体テストが含まれています。
以下の手順で環境を準備し、テストを実行できます。

## 1. 事前準備

### Python 環境
Python 3.11 以上を推奨します。仮想環境の作成例:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 依存関係のインストール
使用する主要ライブラリは FastAPI、SQLAlchemy、pytest 等です。
requirements ファイルは用意していないため、以下のコマンド例を参考に必要なパッケージをインストールしてください:

```bash
pip install fastapi "uvicorn[standard]" sqlalchemy psycopg2-binary \
    pydantic passlib[bcrypt] python-jose[cryptography] \
    pytest pytest-cov pytest-asyncio httpx
```

## 2. テスト用データベース
テストでは PostgreSQL を使用します。SQLite では一部の型が対応せずエラーになるためです。

1. PostgreSQL でテスト用データベースを用意します。
2. `backend/.env` ファイル（無ければ作成）に `TEST_DATABASE_URL` を設定します。例:

```bash
TEST_DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/story_app_test
```

3. 追加で `SECRET_KEY` などを .env に定義しておくとテストが動作しやすくなります。

## 3. テストの実行

テストは `backend` ディレクトリで実行します。ディレクトリを移動して `pytest` を実行してください。

```bash
cd backend
pytest
```

`pytest` コマンドを実行すると、`backend/tests` 以下のテストが自動的に収集されます。  
テスト内容の詳細やフィクスチャの解説は `backend/tests/TESTING_GUIDE.md` を参照してください。
