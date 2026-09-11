import { join } from "node:path";

export const appendGlobalsDts = async (targetDir: string, fragmentPath: string) => {
  const targetPath = join(targetDir, "globals.d.ts");
  const target = await Bun.file(targetPath).text();
  const fragment = await Bun.file(fragmentPath).text();

  const declareGlobalBlock = fragment.replace(/^export\s*{\s*};?\s*/m, "").trim();

  await Bun.write(targetPath, `${target}\n${declareGlobalBlock}\n`);
};
