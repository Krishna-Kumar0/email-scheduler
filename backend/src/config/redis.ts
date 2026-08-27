import Redis from "ioredis";
import { env } from "./env.js";

// Singleton Redis connection — shared across the application.
// BullMQ and any other consumers should import this instance.
let redis: Redis;

function createRedisClient(): Redis {
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null, // Required by BullMQ
    enableReadyCheck: false,
    lazyConnect: true,
  });

  client.on("connect", () => {
    console.log("✅ Redis connected");
  });

  client.on("error", (err: Error) => {
    console.error("❌ Redis connection error:", err.message);
  });

  client.on("close", () => {
    console.warn("⚠️  Redis connection closed");
  });

  return client;
}

if (!redis!) {
  redis = createRedisClient();
}

export { redis };
