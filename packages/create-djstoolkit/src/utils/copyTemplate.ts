import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import { resolveGitignorePath } from "./resolveGitignorePaths";

const DEV_TEMPLATE_PATH = join(import.meta.dir, "../../../../template");
const PROD_TEMPLATE_PATH = join(import.meta.dir, "../template");
export const TEMPLATE_DIR = existsSync(DEV_TEMPLATE_PATH) ? DEV_TEMPLATE_PATH : PROD_TEMPLATE_PATH;

const isExcluded = (src: string) => EXCLUDED_FILES.some((excluded) => src.includes(excluded));

const EXCLUDED_FILES = ["node_modules", ".gitignore", "gitignore"];

export const copyTemplate = (targetDir: string) => {
  cpSync(join(TEMPLATE_DIR, "core"), targetDir, {
    recursive: true,
    filter: (src) => !isExcluded(src),
  });

  const corePath = resolveGitignorePath(join(TEMPLATE_DIR, "core"));
  if (corePath) cpSync(corePath, join(targetDir, ".gitignore"));
};
