import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

export const mergeText = async (fileName: string, targetDir: string, features: Feature[]) => {
  const parts = [await Bun.file(join(TEMPLATE_DIR, "core", fileName)).text()];

  if (features.includes("db")) {
    const path = join(TEMPLATE_DIR, "features/database", fileName);
    if (existsSync(path)) parts.push(await Bun.file(path).text());
  }
  if (features.includes("bullmq")) {
    const path = join(TEMPLATE_DIR, "features/bullmq", fileName);
    if (existsSync(path)) parts.push(await Bun.file(path).text());
  }

  await Bun.write(join(targetDir, fileName), parts.join("\n"));
};
