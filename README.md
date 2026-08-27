# ReachInbox Email Scheduler

A production-grade **Email Job Scheduler** built as an SDE Intern assignment.

> **Current Status: Stage 1 — Project Foundation & Backend Scaffolding**
> BullMQ workers, email sending, Google OAuth, rate limiting, and the full dashboard will be added in later stages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend runtime | Node.js (ESM) |
| Backend language | TypeScript (strict mode) |
| Backend framework | Express.js |
| Database | PostgreSQL via **Prisma ORM** |
| Queue / Workers | BullMQ *(Stage 2+)* |
| In-memory store | Redis (ioredis) |
| Email sending | Nodemailer + Ethereal SMTP *(Stage 2+)* |
| Authentication | Google OAuth 2.0 *(Stage 2+)* |
| Frontend | React + TypeScript (Vite) |
| Frontend styles | Tailwind CSS v4 |

### Why Prisma?
Prisma was chosen over raw `pg` or `knex` because it provides:
- A declarative schema file (`prisma/schema.prisma`) that is the single source of truth for the database shape.
- Auto-generated, type-safe client queries — no manual SQL for CRUD operations.
- Built-in migration tooling (`prisma migrate dev`) that tracks schema changes in version control.
- Excellent TypeScript integration with zero boilerplate.

---

## Architecture

```
/
├── backend/
│   ├── src/
│   │   ├── config/        # env.ts · database.ts (Prisma) · redis.ts (ioredis)
│   │   ├── controllers/   # Request handlers (Stage 2+)
│   │   ├── routes/        # health.ts · (email routes Stage 2+)
│   │   ├── services/      # Business logic (Stage 2+)
│   │   ├── middleware/    # errorHandler.ts · notFound.ts
│   │   ├── models/        # (Stage 2+)
│   │   ├── queues/        # BullMQ queue definitions (Stage 2+)
│   │   ├── workers/       # BullMQ worker processors (Stage 2+)
│   │   ├── utils/         # Shared utilities (Stage 2+)
│   │   ├── app.ts         # Express app factory
│   │   └── server.ts      # HTTP server entry point
│   ├── prisma/
│   │   └── schema.prisma  # Database schema (models in Stage 2+)
│   ├── .env.example       # Environment variable template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx        # Landing page
│   │   └── index.css      # Tailwind CSS entry
│   └── vite.config.ts     # Vite + Tailwind + /api proxy
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (running locally or via Docker)
- Redis (running locally or via Docker)

### 1. Clone the repository

```bash
git clone <repo-url>
cd Email-Scheduler-demo
```

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
# Edit .env and fill in DATABASE_URL and REDIS_URL at minimum
```

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Generate Prisma client

```bash
cd backend
npm run prisma:generate
```

### 5. Run the backend

```bash
cd backend
npm run dev       # Development (tsx watch — no build step needed)
# or
npm run build && npm start  # Production
```

### 6. Run the frontend

```bash
cd frontend
npm run dev
```

---

## Verifying the API

Once the backend is running, visit or curl the health endpoint:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{ "status": "ok" }
```

---

## Environment Variables

See [`backend/.env.example`](./backend/.env.example) for the full list of required variables.

| Variable | Description |
|---|---|
| `PORT` | HTTP server port (default: 5000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `GOOGLE_CLIENT_ID/SECRET` | Google OAuth credentials *(Stage 2+)* |
| `ETHEREAL_*` | Ethereal SMTP credentials *(Stage 2+)* |
| `MAX_EMAILS_PER_HOUR` | Rate limit per account *(Stage 2+)* |

---

## Roadmap

- **Stage 1** ✅ — Project foundation, backend scaffolding, health endpoint, frontend scaffold
- **Stage 2** — Database schema, BullMQ queues, email scheduling API
- **Stage 3** — Google OAuth, Nodemailer + Ethereal SMTP, rate limiting
- **Stage 4** — CSV upload, dashboard UI, real-time status updates
