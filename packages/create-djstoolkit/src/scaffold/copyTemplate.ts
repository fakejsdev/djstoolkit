import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Feature } from "../prompts";

const DEV_TEMPLATE_DIR = join(import.meta.dir, "../../../../template");
const PROD_TEMPLATE_DIR = join(import.meta.dir, "../template");

export const TEMPLATE_DIR = existsSync(DEV_TEMPLATE_DIR) ? DEV_TEMPLATE_DIR : PROD_TEMPLATE_DIR;

const isTemplateFragment = (src: string) =>
  src.endsWith("docker-compose.services.yml") ||
  src.endsWith(".d.ts.fragment") ||
  src.endsWith(".env.example") ||
  src.endsWith(".config.ts.fragment") ||
  src.endsWith(".gitignore");

export const copyTemplate = (targetDir: string, features: Feature[]) => {
  cpSync(join(TEMPLATE_DIR, "core"), targetDir, { recursive: true });

  if (features.includes("db")) {
    cpSync(join(TEMPLATE_DIR, "features/database"), targetDir, {
      recursive: true,
      filter: (src) => !isTemplateFragment(src),
    });
  }

  if (features.includes("bullmq")) {
    cpSync(join(TEMPLATE_DIR, "features/bullmq"), targetDir, {
      recursive: true,
      filter: (src) => !isTemplateFragment(src),
    });
  }
};
