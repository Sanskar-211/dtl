# Attendance Tracker Dashboard

Attendance Tracker is a full-stack web application , fully responsive, fully dynamic built on top of javascript.It can be used for students to track their college attendance and visualize the data in the form of charts.

## What This Project Does

- Helps students track subject-wise attendance from a single dashboard.
- Lets users create and manage subjects for a semester.
- Supports building and updating a weekly timetable with day/time slots.
- Displays today's lectures so attendance can be marked quickly.
- Records attendance status (`present`, `absent`, `NA`) for each lecture.
- Provides attendance insights and visual stats per subject.

## Project Structure

- `frontend/` - React frontend application.
- `backend/` - Node.js/Express backend API.

## Tech Stack

- **Frontend:** React, Vite, Material UI, Axios, Recharts
- **Backend:** Node.js, Express, Sequelize
- **Database:** SQLite
- **API Style:** REST API over HTTP

## Open Source Libraries Used

### Frontend

- `react` - UI library for building components.
- `react-dom` - DOM renderer for React.
- `vite` - Fast development server and build tool.
- `@vitejs/plugin-react` - React support for Vite.
- `@mui/material` - Material Design component library.
- `@mui/icons-material` - Material icon set for UI.
- `@emotion/react` - Styling engine used by MUI.
- `@emotion/styled` - Styled API used with Emotion/MUI.
- `axios` - HTTP client for backend API requests.
- `recharts` - Charts for attendance visualization.

### Backend

- `express` - Web server and routing framework.
- `sequelize` - ORM for database models and queries.
- `sqlite3` - SQLite driver for local database storage.
- `cors` - Enables cross-origin requests.
- `body-parser` - Parses incoming request bodies.

## How To Run Locally

### 1) Start Backend

```bash
cd attendance-tracker-backend
npm install
npm start
```

Backend runs at `http://localhost:3001`.

### 2) Start Frontend

```bash
cd attendance-tracker-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.


