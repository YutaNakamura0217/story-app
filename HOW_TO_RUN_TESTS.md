# ローカルでのテスト実行方法

このリポジトリのバックエンドには `pytest` を用いた単体テストが含まれています。
以下の手順で環境を準備し、テストを実行できます。

## 1. 事前準備

### PostgreSQL のインストール
Ubuntu 系の場合は次のようにインストールします:

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### Python 環境
Python 3.11 以上を推奨します。仮想環境の作成例:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 依存関係のインストール
リポジトリのルートに `requirements.txt` を追加しました。仮想環境を有効化した状態で次を実行してください:

```bash
pip install -r requirements.txt
```

## 2. テスト用データベース
テストでは PostgreSQL を使用します。SQLite では一部の型が対応せずエラーになるためです。

1. PostgreSQL でテスト用データベースを用意します。
2. `backend/.env` ファイル（無ければ作成）に以下のような内容を記載します。

```bash
TEST_DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/story_app_test
# 実行用データベースを使う場合は DATABASE_URL も設定します
# DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/story_app
SECRET_KEY=your_secret_key
```

3. 必要に応じてその他の設定値も .env に追記してください。

## 3. テストの実行

テスト用の `.env` は `backend/.env` に配置します。`backend/app/core/config.py` が
自動的にこのファイルを読み込むため、`pytest` をどのディレクトリから実行しても設定が適用されます。

テストは `backend` ディレクトリで実行するのが簡単ですが、プロジェクトルートからでも `TESTING=true` を指定して実行できます。

```bash
cd backend
pytest
```

または

```bash
TESTING=true pytest -q backend
```

`pytest` コマンドを実行すると、`backend/tests` 以下のテストが自動的に収集されます。  
テスト内容の詳細やフィクスチャの解説は `backend/tests/TESTING_GUIDE.md` を参照してください。
