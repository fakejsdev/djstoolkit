import type { Job } from "bullmq";

export interface WorkerConfig {
  name: string;
  description: string;
}
export type WorkerRun = (job: Job) => unknown | Promise<unknown>;

export const defineWorker = (config: WorkerConfig, run: WorkerRun) => ({ config, run });
