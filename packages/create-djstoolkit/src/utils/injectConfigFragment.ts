import { join } from "node:path";

const indentLines = (text: string, spaces: number) =>
  text
    .split("\n")
    .map((line, i) => (i === 0 ? line : " ".repeat(spaces) + line))
    .join("\n");

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

  const indented = indentLines(objectLiteral, 2);
  const merged = content.replace(/\}\);\s*$/, `  ${key}: ${indented},\n});\n`);
  await Bun.write(configPath, merged);
};
