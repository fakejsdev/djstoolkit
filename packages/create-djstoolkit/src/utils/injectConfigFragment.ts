import { join } from "node:path";

export const injectConfigFragment = async (
  targetDir: string,
  key: string,
  fragmentPath: string,
) => {
  const configPath = join(targetDir, "djs.config.ts");
  const content = await Bun.file(configPath).text();
  const fragment = await Bun.file(fragmentPath).text();

  const objectLiteral = fragment
    .replace(/^import .+;\n/gm, "")
    .replace(/^export const \w+(?::[^=]+)?\s*=\s*/m, "")
    .replace(/;\s*$/, "")
    .trim();

  const merged = content.replace(/\}\);\s*$/, `  ${key}: ${objectLiteral},\n});\n`);
  await Bun.write(configPath, merged);
};
