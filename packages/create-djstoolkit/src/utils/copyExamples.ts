import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Feature } from "@/features/registry";
import { TEMPLATE_DIR } from "./copyTemplate";

const EXAMPLE_MAP: Record<string, string> = {
  core: "example-core",
  db: "example-db",
  bullmq: "example-bullmq",
};

export const copyExamples = (targetDir: string, features: Feature[]) => {
  const toInstall = ["core", ...features];

  for (const key of toInstall) {
    const exampleDir = join(TEMPLATE_DIR, "examples", EXAMPLE_MAP[key] ?? key);
    if (!existsSync(exampleDir)) continue;
    cpSync(exampleDir, join(targetDir, "src", "modules", EXAMPLE_MAP[key] ?? key), {
      recursive: true,
    });
  }
};
