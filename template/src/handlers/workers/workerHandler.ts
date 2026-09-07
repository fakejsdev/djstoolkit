import path from "node:path";
import { config } from "@config";
import { Worker } from "bullmq";
import type { defineWorker } from "@/lib/helpers/defineWorker";
import { Console } from "@/lib/logger";

type WorkerDefinition = ReturnType<typeof defineWorker>;

const workers = new Map<string, WorkerDefinition>();

const loadWorkerFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/workers/**/*.worker.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".worker.ts");
    const worker: WorkerDefinition = await import(path.resolve(file));

    if (!worker.config || !worker.run)
      throw new Error(`Worker file ${fileName} must export both 'config' and 'run'.`);

    if (!worker.config.name)
      throw new Error(`Worker file ${fileName} is missing name (must be unique).`);

    if (!worker.config.description)
      throw new Error(`Worker file ${fileName} is missing description.`);

    if (workers.has(worker.config.name))
      throw new Error(`Duplicate Worker name: '${worker.config.name}' (in ${fileName})`);

    workers.set(worker.config.name, worker);
  }
};

const attachWorker = () => {
  const worker = new Worker(
    "DJSTOOLKIT_WORK_QUEUE",
    async (job) => {
      const definition = workers.get(job.name);

      if (!definition) {
        throw new Error(`No worker registered for job name: '${job.name}'`);
      }

      return definition.run(job);
    },
    {
      connection: {
        host: config.bullmq?.hostname,
        port: config.bullmq?.port,
      },
    },
  );

  worker.on("completed", (job) => {
    Console.Log(`[Workers] Job completed: ${job.name} (${job.id})`);
  });

  worker.on("failed", (job, err) => {
    Console.Error(`[Workers] Job failed: ${job?.name} (${job?.id})`, err);
  });
};

export const initWorkerHandler = async () => {
  await loadWorkerFiles();
  attachWorker();
};
