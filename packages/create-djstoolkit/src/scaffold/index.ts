import { join } from "node:path";
import { log, tasks } from "@clack/prompts";
import type { getAnswers } from "../prompts";
import { copyTemplate } from "./copyTemplate";
import { mergeBullmqConfig } from "./generate/config";
import { generateHandlersFile } from "./generate/handlers";
import { gitInit } from "./gitInit";
import { installDeps } from "./installDeps";
import { mergeDockerCompose } from "./merge/dockerCompose";
import { mergeEnv } from "./merge/env";
import { mergeGitignore } from "./merge/gitignore";
import { mergePackageJson } from "./merge/packageJson";

export type Answers = Awaited<ReturnType<typeof getAnswers>>;

const merge = async (targetDir: string, answers: Answers) => {
  await mergeGitignore(targetDir, answers.features);
  await mergeEnv(targetDir, answers.features);
  await mergePackageJson(targetDir, targetDir, answers.features);

  if (answers.features.includes("bullmq")) await mergeBullmqConfig(targetDir);

  await mergeDockerCompose(targetDir, answers.features, {
    bullmq: answers.bullmqHosting,
    db: answers.dbHosting,
  });
};

export const scaffold = async (answers: Answers) => {
  const { name: targetDir, features, gitInit: aGitInit, installDeps: aInstallDeps } = answers;

  await tasks([
    {
      title: "Copying template files",
      task: () => copyTemplate(targetDir, features),
    },
    {
      title: "Merging config files",
      task: async () => await merge(targetDir, answers),
    },
    {
      title: "Generating handlers file",
      task: async () =>
        await Bun.write(join(targetDir, "src/handlers/index.ts"), generateHandlersFile(features)),
    },
  ]);

  if (aInstallDeps) {
    log.info("Installing dependencies...");
    await installDeps(targetDir);
    log.info("Done!");
  }

  if (aGitInit) await gitInit(targetDir);
};
