import { join } from "node:path";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

export const mergeText = async (fileName: string, targetDir: string, features: Feature[]) => {
  const parts = [await Bun.file(join(TEMPLATE_DIR, "core", fileName)).text()];

  if (features.includes("db")) {
    parts.push(await Bun.file(join(TEMPLATE_DIR, "features/database", fileName)).text());
  }
  if (features.includes("bullmq")) {
    parts.push(await Bun.file(join(TEMPLATE_DIR, "features/bullmq", fileName)).text());
  }

  await Bun.write(join(targetDir, fileName), parts.join("\n"));
};
