import { config } from "@config";
import { type JobsOptions, Queue } from "bullmq";

export const queue = new Queue("DJSTOOLKIT_WORK_QUEUE", {
  connection: {
    host: config.redis?.hostname,
    port: config.redis?.port,
  },
});

export const enqueueJob = async (name: string, data: unknown, opts: JobsOptions) =>
  await queue.add(name, data, opts);
