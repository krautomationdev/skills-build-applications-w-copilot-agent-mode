# OctoFit Tracker

This repository contains the OctoFit Tracker modern multi-tier application.

## Architecture

- `frontend/` — React 19 application powered by Vite
- `backend/` — Node.js + Express + TypeScript API
- MongoDB data storage on `27017`

## Ports

- Frontend: `5173`
- Backend: `8000`
- MongoDB: `27017`

## Setup

Install dependencies for both tiers:

```bash
npm install --prefix octofit-tracker/backend
npm install --prefix octofit-tracker/frontend
```

## Run locally

Start the backend:

```bash
npm run dev --prefix octofit-tracker/backend
```

Start the frontend:

```bash
npm run dev --prefix octofit-tracker/frontend
```

## Build

Build both tiers for production:

```bash
npm run build --prefix octofit-tracker/backend
npm run build --prefix octofit-tracker/frontend
```

## Validation

Validate the backend and database setup:

```bash
# Start the backend in the backend folder
npm run dev --prefix octofit-tracker/backend
```

In a separate terminal:

```bash
curl http://localhost:8000/
curl http://localhost:8000/api/users
```

Verify the database is populated and connected:

```bash
npm run seed --prefix octofit-tracker/backend
```

## Notes

- The frontend uses React 19, Vite, React Router, and Bootstrap.
- The backend uses Express, TypeScript, and Mongoose.
- MongoDB should be available at `mongodb://localhost:27017`.
