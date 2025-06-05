# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env` file with the API base URL:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
   You can also set `GEMINI_API_KEY` here if needed.
3. Run the app:
   `npm run dev`
