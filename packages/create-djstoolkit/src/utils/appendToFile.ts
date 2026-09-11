import { join } from "node:path";
import { resolveGitignorePath } from "./resolveGitignorePaths";

const appendToFile = async (targetPath: string, fragmentPath: string) => {
  const existing = await Bun.file(targetPath).text();
  const addition = await Bun.file(fragmentPath).text();
  await Bun.write(targetPath, `${existing}\n${addition}`);
};

export const appendEnvExample = (targetDir: string, fragmentPath: string) =>
  appendToFile(join(targetDir, ".env.example"), fragmentPath);

export const appendGitignore = (targetDir: string, featureDir: string) => {
  const sourcePath = resolveGitignorePath(featureDir);
  if (!sourcePath) return;
  return appendToFile(join(targetDir, ".gitignore"), sourcePath);
};
