# Attendance Tracker Dashboard

Attendance Tracker is a full-stack web application , fully responsive, fully dynamic built on top of javascript.It can be used for students to track their college attendance and visualize the data in the form of charts.

## Project Website 's output pages  :
Subjects Page:

<img width="3877" height="928" alt="subjects_page" src="https://github.com/user-attachments/assets/00139356-a74f-4919-b0c9-60a4ba9e469c" />

Timetable Page:

<img width="3843" height="909" alt="timetable_page" src="https://github.com/user-attachments/assets/2aa71ef2-e4a0-4a56-a566-988e49911eea" />

Today 's lecture Page:

<img width="3855" height="905" alt="todays_lectures_page" src="https://github.com/user-attachments/assets/cd72b61e-46a4-4099-beb2-c36f3bebda7b" />

Stats Page:

<img width="3848" height="917" alt="stats_page" src="https://github.com/user-attachments/assets/48c648ca-af31-493a-a87f-f390c7345966" />


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


