import type { Job } from "bullmq";
import type { JobRegistry } from "@/lib/bullmq/jobs";

export interface WorkerConfig<K extends keyof JobRegistry> {
  name: K;
  description: string;
}
export type WorkerRun<K extends keyof JobRegistry> = (
  job: Job<JobRegistry[K]>,
) => unknown | Promise<unknown>;

export interface WorkerDefinition<K extends keyof JobRegistry = keyof JobRegistry> {
  config: WorkerConfig<K>;
  run: WorkerRun<K>;
}

/**
 * Defines a type-safe BullMQ worker for processing background jobs.
 *
 * @template K - The registered job name from `JobRegistry`
 * @param config - The worker configuration containing job `name` and `description`
 * @param run - The handler function executed when a job is picked up by the worker
 * @returns An object containing `config` and `run` exported for the worker loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineWorker(
 *   {
 *     name: "send-reminder",
 *     description: "Sends a delayed reminder message",
 *   },
 *   async (job) => {
 *     console.log("Processing reminder for channel:", job.data.channelId);
 *   },
 * );
 * ```
 */
export const defineWorker = <K extends keyof JobRegistry>(
  config: WorkerConfig<K>,
  run: WorkerRun<K>,
): WorkerDefinition<K> => ({ config, run });
