import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

export const mergeText = async (
  sourceFileName: string,
  targetFileName: string,
  targetDir: string,
  features: Feature[],
) => {
  const parts = [await Bun.file(join(TEMPLATE_DIR, "core", sourceFileName)).text()];

  if (features.includes("db")) {
    const path = join(TEMPLATE_DIR, "features/database", sourceFileName);
    if (existsSync(path)) parts.push(await Bun.file(path).text());
  }
  if (features.includes("bullmq")) {
    const path = join(TEMPLATE_DIR, "features/bullmq", sourceFileName);
    if (existsSync(path)) parts.push(await Bun.file(path).text());
  }

  await Bun.write(join(targetDir, targetFileName), parts.join("\n"));
};
