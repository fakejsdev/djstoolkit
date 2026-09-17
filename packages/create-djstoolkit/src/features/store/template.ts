import { cpSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";

export const copyStoreTemplate = (targetDir: string) => {
  const templateDir = join(TEMPLATE_DIR, "examples", "example-store");

  cpSync(join(templateDir, "src"), join(targetDir, "src"), { recursive: true, force: true });
};
