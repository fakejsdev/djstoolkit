import { join } from "node:path";
import { TEMPLATE_DIR } from "../copyTemplate";

export const mergeBullmqConfig = async (targetDir: string) => {
  const configPath = join(targetDir, "djs.config.ts");
  const content = await Bun.file(configPath).text();
  const fragment = await Bun.file(
    join(TEMPLATE_DIR, "features/bullmq/djs.config.ts.fragment"),
  ).text();

  await Bun.write(configPath, content.replace(/\}\);\s*$/, `${fragment}});\n`));
};
