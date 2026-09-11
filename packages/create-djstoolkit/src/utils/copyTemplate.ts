import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const DEV_TEMPLATE_PATH = join(import.meta.dir, "../../../../template");
const PROD_TEMPLATE_PATH = join(import.meta.dir, "../template");
export const TEMPLATE_DIR = existsSync(DEV_TEMPLATE_PATH) ? DEV_TEMPLATE_PATH : PROD_TEMPLATE_PATH;

export const EXCLUDED_FILES = ["node_modules"];
const isExcluded = (src: string) => EXCLUDED_FILES.some((excluded) => src.includes(excluded));

export const copyTemplate = (targetDir: string) => {
  cpSync(join(TEMPLATE_DIR, "core"), targetDir, {
    recursive: true,
    filter: (src) => !isExcluded(src),
  });
};
