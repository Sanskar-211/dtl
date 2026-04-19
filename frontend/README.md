# Attendance Tracker Frontend

This is the frontend for the College Attendance Tracker. Built with React, Vite, Material-UI, and Axios.

## Features
- Add and list subjects
- Set and view weekly timetable
- Mark attendance for today's lectures
- View attendance stats per subject

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:5173` by default.

3. **Backend:**
   Make sure the backend is running at `http://localhost:3001` (default).

## Project Structure
- `src/components/` — React components
- `src/api/api.js` — Axios API utility
- `App.js` — Main app with navigation

## Notes
- Uses Material-UI for a clean, responsive UI
- API requests are proxied to the backend via Vite config 