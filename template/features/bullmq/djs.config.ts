import type { DjsConfig } from "@/lib/helpers/defineConfig";

export const bullmqConfig: DjsConfig["bullmq"] = {
  hostname: process.env.REDIS_HOSTNAME ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
  queueName: "DJSTOOLKIT_WORK_QUEUE",
};
