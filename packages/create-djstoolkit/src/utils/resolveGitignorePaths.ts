import { existsSync } from "node:fs";
import { join } from "node:path";

export const resolveGitignorePath = (dir: string): string | null => {
  for (const name of [".gitignore", "gitignore"]) {
    const path = join(dir, name);
    if (existsSync(path)) return path;
  }
  return null;
};
