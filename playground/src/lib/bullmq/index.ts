import { config } from "@config";
import { type JobsOptions, Queue } from "bullmq";
import type { JobRegistry } from "@/lib/bullmq/jobs";

export const queue = new Queue(config.bullmq?.queueName ?? "DJSTOOLKIT_WORK_QUEUE", {
  connection: {
    host: config.bullmq?.hostname,
    port: config.bullmq?.port,
  },
});

export const enqueueJob = async <K extends keyof JobRegistry>(
  name: K,
  data: JobRegistry[K],
  opts: JobsOptions,
) => await queue.add(name, data, opts);
