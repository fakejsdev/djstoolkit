import { join } from "node:path";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

const indent = (text: string, spaces: number) =>
  text
    .trim()
    .split("\n")
    .map((line) => " ".repeat(spaces) + line.trim())
    .join("\n");

export const mergeGlobalsDts = async (targetDir: string, features: Feature[]) => {
  const dtsPath = join(targetDir, "globals.d.ts");
  let content = await Bun.file(dtsPath).text();

  if (features.includes("db")) {
    const fragment = await Bun.file(
      join(TEMPLATE_DIR, "features/database/database.d.ts.fragment"),
    ).text();
    content = content.replace(/\}\s*\}\s*$/, `${indent(fragment, 4)}\n  }\n}\n`);
  }

  if (features.includes("bullmq")) {
    const fragment = await Bun.file(
      join(TEMPLATE_DIR, "features/bullmq/bullmq.d.ts.fragment"),
    ).text();
    content = content.replace(/\}\s*\}\s*$/, `${indent(fragment, 4)}\n  }\n}\n`);
  }

  await Bun.write(dtsPath, content);
};
