import { cpSync } from "node:fs";
import { join } from "node:path";
import type { Answers } from "@/prompts";
import { addPackageDependency } from "@/utils/addPackageDependency";
import { appendGlobalsDts } from "@/utils/appendGlobalsDts";
import { appendEnvExample, appendGitignore } from "@/utils/appendToFile";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";
import { mergeDockerComposeService } from "@/utils/mergeDockerComposeService";
import { dependencies, devDependencies } from "./dependencies";

export const installDatabase = async (targetDir: string, answers: Answers) => {
  const featureDir = join(TEMPLATE_DIR, "features", "database");

  cpSync(join(featureDir, "src"), join(targetDir, "src"), { recursive: true });
  cpSync(join(featureDir, "db"), join(targetDir, "db"), { recursive: true });
  cpSync(join(featureDir, "prisma.config.ts"), join(targetDir, "prisma.config.ts"));

  await addPackageDependency(targetDir, dependencies, devDependencies);
  await appendEnvExample(targetDir, join(featureDir, ".env.example"));
  await appendGlobalsDts(targetDir, join(featureDir, "database.d.ts"));
  await appendGitignore(targetDir, join(featureDir, ".gitignore"));

  if (answers.dbHosting === "docker") {
    await mergeDockerComposeService(targetDir, join(featureDir, "docker-compose.services.yml"));
  }
};
