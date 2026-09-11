import { cpSync } from "node:fs";
import { join } from "node:path";
import type { Answers } from "@/prompts";
import { appendGlobalsDts } from "@/utils/appendGlobalsDts";
import { appendEnvExample } from "@/utils/appendToFile";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";
import { injectConfigFragment } from "@/utils/injectConfigFragment";
import { mergeDockerComposeService } from "@/utils/mergeDockerComposeService";
import { registerHandler } from "@/utils/registerHandler";
import { updatePackageJson } from "@/utils/updatePackageJson";
import { dependencies } from "./dependencies";

export const installBullmq = async (targetDir: string, answers: Answers) => {
  const featureDir = join(TEMPLATE_DIR, "features", "bullmq");

  cpSync(join(featureDir, "src"), join(targetDir, "src"), { recursive: true });

  await registerHandler(targetDir, "initWorkerHandler", "./workers/workerHandler");
  await updatePackageJson(targetDir, { dependencies });
  await appendEnvExample(targetDir, join(featureDir, ".env.example"));
  await appendGlobalsDts(targetDir, join(featureDir, "bullmq.d.ts"));
  await injectConfigFragment(targetDir, "bullmq", join(featureDir, "djs.config.ts"));

  if (answers.bullmqHosting === "docker") {
    await mergeDockerComposeService(targetDir, join(featureDir, "docker-compose.services.yml"));
  }
};
