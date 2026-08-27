import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const isProduction = env.NODE_ENV === "production";

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} — ${err.message}`);
  if (!isProduction) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status: "error",
    message: err.isOperational ? err.message : "Internal server error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
