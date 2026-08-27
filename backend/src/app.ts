import express, { Application } from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app: Application = express();

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  })
);

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/health", healthRouter);

// ── 404 handler (must be after all routes) ───────────────────────────────────
app.use(notFoundHandler);

// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

export default app;
