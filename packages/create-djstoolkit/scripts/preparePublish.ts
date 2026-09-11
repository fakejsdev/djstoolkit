import { cpSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const TEMPLATE_SRC = join(import.meta.dir, "../../../template");
const TEMPLATE_DEST = join(import.meta.dir, "../src/template");

const renameGitignoreFiles = (dir: string) => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) renameGitignoreFiles(path);
    else if (entry === ".gitignore") renameSync(path, join(dir, "gitignore"));
  }
};

rmSync(TEMPLATE_DEST, { recursive: true, force: true });
cpSync(TEMPLATE_SRC, TEMPLATE_DEST, { recursive: true });
renameGitignoreFiles(TEMPLATE_DEST);
