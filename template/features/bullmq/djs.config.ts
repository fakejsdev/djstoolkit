import type { DjsConfig } from "@/lib/helpers/defineConfig";

export const bullmqConfig: DjsConfig["bullmq"] = {
  hostname: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
  queueName: "default",
};
