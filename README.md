# Job Tracker

## Overview

Job Tracker is a full-stack web application for managing job applications. It includes authentication, a kanban job board, analytics for application progress, and a profile page for user details.

## Live Demo

- Frontend: `https://jolly-island-0b465a000.7.azurestaticapps.net`
- Backend: `https://jobtacker-bcfthvbrbqbkcgay.australiasoutheast-01.azurewebsites.net`

## Features

- JWT authentication
- Sign up, sign in, and sign out
- Kanban board with 5 statuses:
  - `Saved`
  - `Applied`
  - `Interview`
  - `Rejected`
  - `Offer`
- Analytics page with job status distribution and recent activity
- Profile page with editable user details

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Axios
- `@dnd-kit/core`
- `@mui/x-charts`

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB Atlas
- JWT authentication

### Deployment

- Azure Static Web Apps
- Azure App Service

## Project Structure

```text
Job-Tracker/
├── frontend/                # React + Vite client
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   └── types/
│   └── public/
├── backend/                 # Express + MongoDB API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
└── .github/workflows/       # Azure deployment workflows
```

## Getting Started

### Prerequisites

### 1. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Configure environment variables

Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:5001
```

Create `backend/.env`:

```env
PORT=5001
MONGO_DB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRY=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Start the backend

For local development:

```bash
cd backend
npx tsx src/server.ts
```

For a production-style local run:

```bash
cd backend
npm run build
npm start
```

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

### 5. Available API routes

#### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

#### User

- `GET /api/user`
- `PUT /api/user`

#### Jobs

- `GET /api/job`
- `POST /api/job`
- `PUT /api/job/:id`
- `DELETE /api/job/:id`

## Deployment

### Frontend

The frontend is deployed with Azure Static Web Apps.

Important points:

- React Router uses `BrowserRouter`, so SPA fallback must be configured with `staticwebapp.config.json`.
- The Azure Static Web Apps GitHub workflow should inject `VITE_BASE_URL` during the build step.

### Backend

The backend is deployed with Azure App Service.

Required environment variables:

```env
MONGO_DB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRY=7d
CLIENT_URL=https://<your-frontend-domain>
```

Deployment notes:

- The backend should listen on `0.0.0.0` in production.
- Azure App Service must run the compiled backend with `npm start`.
