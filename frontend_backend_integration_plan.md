# Frontend-Backend Integration Plan

This document outlines how to connect the existing React frontend with the FastAPI backend.

## 1. Overview
- **Backend**: FastAPI application located in `backend/` with routers for auth, books, themes, reviews, favorites, children, progress, user settings, and learning history.
- **Database**: PostgreSQL. Connection settings are loaded from environment variables in `backend/.env`.
- **Frontend**: React + Vite project located in `frontend/`. Books, themes and authentication now call the FastAPI backend. Other features still rely on mock data and localStorage for now.

## 2. Environment Setup
1. Install PostgreSQL and create two databases: one for development and one for tests.
2. Create `backend/.env` with at least the following:
   ```bash
   DATABASE_URL=postgresql+psycopg2://<user>:<password>@localhost:5432/story_app_dev
   TEST_DATABASE_URL=postgresql+psycopg2://<user>:<password>@localhost:5432/story_app_test
   SECRET_KEY=changeme
   ```
3. Install Python dependencies and start the API:
   ```bash
   pip install -r requirements.txt
   cd backend
   uvicorn app.main:app --reload
   ```
4. In another terminal, install frontend dependencies and run the React app:
   ```bash
   cd frontend
   npm install
   # create .env with the API base URL
   echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > .env
   npm run dev
   ```

## 3. API Client Layer
Create a small API client in the frontend (e.g., `frontend/api.ts`) that wraps `fetch`/`httpx` calls.
- Store the API base URL in an environment variable (e.g., `VITE_API_BASE_URL`).
- Attach the JWT token from `localStorage` on authenticated requests.
- Handle JSON parsing and error cases consistently.

Example skeleton:
```ts
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('authToken');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
```

## 4. Authentication Flow
- Update `useAuth` to call `/api/v1/auth/login` and `/api/v1/auth/register`.
- Store the returned `access_token` in `localStorage` and include it in subsequent API calls.
- Provide logout by removing the token and clearing user state.

## 5. Replacing Mock Data
Gradually swap each feature to use the backend:
1. **Books and Themes**
   - Replace `MOCK_BOOKS` and `MOCK_THEMES` with API calls to `/api/v1/books` and `/api/v1/themes`.
   - Update detail pages to fetch `/api/v1/books/{id}` and `/api/v1/themes/{id}/books`.
2. **Favorites**
   - Replace `useFavorites` local storage logic with calls to `/api/v1/users/me/favorites`.
3. **Children Management**
   - Replace mock children data with `/api/v1/users/me/children` CRUD endpoints.
4. **Reviews**
   - Use `/api/v1/books/{book_id}/reviews` and `/api/v1/reviews/{id}` for CRUD operations.
5. **Reading Progress**
   - Replace bookmark and note logic with `/api/v1/users/me/books/{book_id}/progress` and related endpoints.
6. **Learning History & Settings**
   - Fetch from `/api/v1/users/me/learning-history` and `/api/v1/users/me/settings`.

Integration can proceed page by page to minimize breakage.

## 6. Development Tips
- Use Axios or native `fetch`; the example above uses `fetch`.
- Keep type definitions (`frontend/types.ts`) in sync with backend schemas.
- During early integration you can seed the database with sample data using SQL scripts or the backend CRUD operations.
- Write small utility hooks (`useBooks`, `useThemes`, etc.) that encapsulate API calls and caching logic.

## 7. Testing
- Backend unit tests are located in `backend/tests/`. Run with `pytest` once the database URLs are configured.
- Frontend can use React Testing Library or similar if needed.

This plan should help transition from mock data to live API communication and ensure both sides work together smoothly.

## 8. Current Status
- Implemented `api` helper and hooks (`useBooks`, `useThemes`) for making authenticated requests.
- Updated `useAuth` to perform real login against the backend.
- Books list and theme book pages now load data from the FastAPI API.

## 9. Remaining Tasks
- Migrate favorites, children management, reviews, reading progress, and settings pages to use API endpoints.
- Add user registration and token refresh handling.
- Write frontend tests where appropriate.
