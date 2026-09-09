import { join } from "node:path";
import { log, spinner } from "@clack/prompts";
import type { getAnswers } from "../prompts";
import { copyTemplate } from "./copyTemplate";
import { mergeBullmqConfig } from "./generate/config";
import { generateHandlersFile } from "./generate/handlers";
import { gitInit } from "./gitInit";
import { installDeps } from "./installDeps";
import { mergeDockerCompose } from "./merge/dockerCompose";
import { mergeEnv } from "./merge/env";
import { mergeGitignore } from "./merge/gitignore";
import { mergeGlobalsDts } from "./merge/globalsDts";
import { mergePackageJson } from "./merge/packageJson";

export type Answers = Awaited<ReturnType<typeof getAnswers>>;

const merge = async (targetDir: string, answers: Answers) => {
  await mergeGitignore(targetDir, answers.features);
  await mergeEnv(targetDir, answers.features);
  await mergePackageJson(targetDir, targetDir, answers.features);
  await mergeGlobalsDts(targetDir, answers.features);

  if (answers.features.includes("bullmq")) await mergeBullmqConfig(targetDir);

  await mergeDockerCompose(targetDir, answers.features, {
    bullmq: answers.bullmqHosting,
    db: answers.dbHosting,
  });
};

export const scaffold = async (answers: Answers) => {
  const { name: targetDir, features, gitInit: aGitInit, installDeps: aInstallDeps } = answers;

  log.step("Copying template files...");
  copyTemplate(targetDir, features);

  log.step("Merging configuration files...");
  await merge(targetDir, answers);

  log.step("Generating handlers file...");
  await Bun.write(join(targetDir, "src/handlers/index.ts"), generateHandlersFile(features));

  if (aInstallDeps) {
    const s = spinner();
    s.start("Installing dependencies...");
    await installDeps(targetDir);
    s.stop("Installed successfully!");
  }

  if (aGitInit) {
    log.step("Initializing Git reposistory...");
    await gitInit(targetDir);
  }

  log.success("Done!");
};
