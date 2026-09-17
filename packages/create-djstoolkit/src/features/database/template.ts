import { cpSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";

export const copyDbTemplate = (targetDir: string) => {
  const templateDir = join(TEMPLATE_DIR, "examples", "example-db");

  cpSync(join(templateDir, "db"), join(targetDir, "db"), { recursive: true, force: true });
  cpSync(join(templateDir, "src"), join(targetDir, "src"), { recursive: true, force: true });
};
