import { config } from "@config";
import { type Job, type JobsOptions, Queue } from "bullmq";
import type { JobRegistry } from "@/lib/bullmq/jobs";

type EnqueueJobReturnType<K extends keyof JobRegistry> = Promise<
  Job<JobRegistry[K], unknown, string>
>;

export const queue = new Queue(config.bullmq?.queueName ?? "DJSTOOLKIT_WORK_QUEUE", {
  connection: {
    host: config.bullmq?.hostname,
    port: config.bullmq?.port,
  },
});

/**
 * Enqueues a background job into the BullMQ queue with type-safety.
 *
 * @template K - The registered job name from `JobRegistry`
 * @param name - The name of the job to execute
 * @param data - The required payload for the specified job
 * @param opts - Optional BullMQ job options (e.g. `delay`, `attempts`)
 * @returns The created BullMQ Job instance
 *
 * @example
 * ```ts
 * await enqueueJob(
 *   "send-reminder",
 *   { channelId: "123", reminder: "Meeting in 5 mins" },
 *   { delay: 5000 }
 * );
 * ```
 */
export const enqueueJob = async <K extends keyof JobRegistry>(
  name: K,
  data: JobRegistry[K],
  opts: JobsOptions,
): EnqueueJobReturnType<K> => await queue.add(name, data, opts);
