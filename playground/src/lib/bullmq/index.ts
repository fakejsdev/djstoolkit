import { config } from "@config";
import { type JobsOptions, Queue } from "bullmq";

export const queue = new Queue(config.bullmq?.queueName ?? "DJSTOOLKIT_WORK_QUEUE", {
  connection: {
    host: config.bullmq?.hostname,
    port: config.bullmq?.port,
  },
});

export const enqueueJob = async (name: string, data: unknown, opts: JobsOptions) =>
  await queue.add(name, data, opts);
