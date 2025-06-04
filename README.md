# Philosophy Picture Book Platform

This repository hosts a FastAPI backend and a Next.js frontend.  The backend lives in the `backend/` directory.

## Backend Setup and Launch

Execute the following steps from the project root unless otherwise noted.

1. Install PostgreSQL (Ubuntu example):
   ```bash
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Prepare `backend/.env` with database URLs and a `SECRET_KEY` as described in `HOW_TO_RUN_TESTS.md`.
5. Start the API server from the `backend` directory:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

See `HOW_TO_RUN_TESTS.md` for information on running the automated tests.
