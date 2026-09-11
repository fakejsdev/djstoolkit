import { cpSync } from "node:fs";
import { join } from "node:path";
import type { Answers } from "@/prompts";
import { appendGlobalsDts } from "@/utils/appendGlobalsDts";
import { appendEnvExample, appendGitignore } from "@/utils/appendToFile";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";
import { mergeDockerComposeService } from "@/utils/mergeDockerComposeService";
import { updatePackageJson } from "@/utils/updatePackageJson";
import { dependencies, devDependencies, scripts } from "./dependencies";

export const installDatabase = async (targetDir: string, answers: Answers) => {
  const featureDir = join(TEMPLATE_DIR, "features", "database");

  cpSync(join(featureDir, "src"), join(targetDir, "src"), { recursive: true });
  cpSync(join(featureDir, "db"), join(targetDir, "db"), { recursive: true });
  cpSync(join(featureDir, "prisma.config.ts"), join(targetDir, "prisma.config.ts"));

  await updatePackageJson(targetDir, { dependencies, devDependencies, scripts });
  await appendEnvExample(targetDir, join(featureDir, ".env.example"));
  await appendGlobalsDts(targetDir, join(featureDir, "database.d.ts"));
  await appendGitignore(targetDir, featureDir);

  if (answers.dbHosting === "docker") {
    await mergeDockerComposeService(targetDir, join(featureDir, "docker-compose.services.yml"));
  }
};
