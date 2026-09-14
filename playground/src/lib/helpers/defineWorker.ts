import type { Job } from "bullmq";
import type { JobRegistry } from "@/lib/bullmq/jobs";

export interface WorkerConfig<K extends keyof JobRegistry> {
  name: K;
  description: string;
}

export type WorkerRun<K extends keyof JobRegistry> = (
  job: Job<JobRegistry[K]>,
) => unknown | Promise<unknown>;

export const defineWorker = <K extends keyof JobRegistry>(
  config: WorkerConfig<K>,
  run: WorkerRun<K>,
) => ({ config, run });
