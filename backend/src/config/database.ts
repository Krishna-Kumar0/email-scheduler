import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

// Singleton pattern — reuse the same client across the application.
// In development, attach to global to prevent hot-reload from creating
// too many Prisma connections.
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"],
  });
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = global.__prisma;
}

export { prisma };
