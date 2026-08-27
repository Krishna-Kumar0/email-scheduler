import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

export const env = {
  PORT: parseInt(optionalEnv("PORT", "5000"), 10),
  NODE_ENV: optionalEnv("NODE_ENV", "development"),

  DATABASE_URL: optionalEnv("DATABASE_URL", ""),

  REDIS_URL: optionalEnv("REDIS_URL", "redis://localhost:6379"),

  GOOGLE_CLIENT_ID: optionalEnv("GOOGLE_CLIENT_ID", ""),
  GOOGLE_CLIENT_SECRET: optionalEnv("GOOGLE_CLIENT_SECRET", ""),
  GOOGLE_CALLBACK_URL: optionalEnv("GOOGLE_CALLBACK_URL", ""),

  ETHEREAL_HOST: optionalEnv("ETHEREAL_HOST", ""),
  ETHEREAL_PORT: parseInt(optionalEnv("ETHEREAL_PORT", "587"), 10),
  ETHEREAL_USER: optionalEnv("ETHEREAL_USER", ""),
  ETHEREAL_PASSWORD: optionalEnv("ETHEREAL_PASSWORD", ""),

  MAX_EMAILS_PER_HOUR: parseInt(optionalEnv("MAX_EMAILS_PER_HOUR", "100"), 10),
  EMAIL_MIN_DELAY_MS: parseInt(optionalEnv("EMAIL_MIN_DELAY_MS", "1000"), 10),
  WORKER_CONCURRENCY: parseInt(optionalEnv("WORKER_CONCURRENCY", "5"), 10),
} as const;
