import { join } from "node:path";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

export const mergeBullmqConfig = async (targetDir: string, features: Feature[]) => {
  if (!features.includes("bullmq")) return;

  const configPath = join(targetDir, "djs.config.ts");
  const content = await Bun.file(configPath).text();
  const fragment = await Bun.file(
    join(TEMPLATE_DIR, "features/bullmq/djs.config.ts.fragment"),
  ).text();

  await Bun.write(configPath, content.replace(/\}\);\s*$/, `${fragment}});\n`));
};
