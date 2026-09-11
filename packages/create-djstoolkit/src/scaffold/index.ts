import { log, spinner } from "@clack/prompts";
import { FEATURES } from "@/features/registry";
import type { Answers } from "@/prompts";
import { gitInit } from "@/tasks/gitInit";
import { installDeps } from "@/tasks/installDeps";
import { copyTemplate } from "@/utils/copyTemplate";
import { updatePackageJson } from "@/utils/updatePackageJson";

export const scaffold = async (answers: Answers) => {
  const targetDir = answers.name;

  log.step("Copying Core Features...");
  copyTemplate(targetDir);
  await updatePackageJson(targetDir, { name: answers.name });

  for (const feature of FEATURES.filter((f) => answers.features.includes(f.id))) {
    log.step(`Installing ${feature.label}...`);
    await feature.installer(targetDir, answers);
  }

  if (answers.dbHosting === "docker" || answers.bullmqHosting === "docker") {
    await updatePackageJson(targetDir, {
      scripts: {
        "services:up": "docker compose -f docker-compose.services.yml up -d",
        "services:down": "docker compose -f docker-compose.services.yml down",
        "services:reset": "docker compose -f docker-compose.services.yml down -v",
      },
    });
  }

  if (answers.installDependencies) {
    const s = spinner();
    s.start("Installing dependencies...");

    const success = await installDeps(targetDir);

    success
      ? s.stop("Dependencies Installed!")
      : s.error("Failed to install dependencies — run `bun install` manually.");
  }

  if (answers.gitInit) {
    const success = await gitInit(targetDir);
    if (success) log.step("Git repository initialized!");
  }

  log.success("🧩 Setup complete!");
};
