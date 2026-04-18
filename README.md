# Attendance Tracker Dashboard

Attendance Tracker is a full-stack web application , fully responsive, fully dynamic built on top of javascript.It can be used for students to track their college attendance and visualize the data in the form of charts.

## Project Website 's output pages  :
Subjects Page:

<img width="1905" height="887" alt="Screenshot 2026-04-16 211831" src="https://github.com/user-attachments/assets/9225b75e-afff-4b6b-84cb-7717a4aca517" />
<img width="1907" height="910" alt="Screenshot 2026-04-18 145459" src="https://github.com/user-attachments/assets/d4f03063-6e83-4613-9530-77b946c5745a" />


Timetable Page:
<img width="1909" height="903" alt="Screenshot 2026-04-18 145518" src="https://github.com/user-attachments/assets/694f881d-cdc3-4a5d-84d7-de0d2274577e" />
<img width="1896" height="897" alt="Screenshot 2026-04-18 145532" src="https://github.com/user-attachments/assets/a50d6be6-9ada-41cc-a3ec-4e2ee5821d84" />

Today 's lecture Page:
<img width="1908" height="899" alt="Screenshot 2026-04-18 145547" src="https://github.com/user-attachments/assets/1eb577fb-56ed-4e6a-99ee-3e14f6535755" />
<img width="1915" height="896" alt="Screenshot 2026-04-18 145602" src="https://github.com/user-attachments/assets/cc84175b-4413-44d6-963a-ab46a50f3320" />

Stats Page:
<img width="1894" height="911" alt="Screenshot 2026-04-18 145627" src="https://github.com/user-attachments/assets/cb64506a-1b6c-4d90-b2fb-c2a424490a4a" />
<img width="1871" height="884" alt="Screenshot 2026-04-18 145639" src="https://github.com/user-attachments/assets/4264e512-3011-4d66-a382-70671c5bd657" />



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


