import { cpSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";

export const installStore = async (targetDir: string) => {
  const featureDir = join(TEMPLATE_DIR, "features", "store");

  cpSync(join(featureDir, "src"), join(targetDir, "src"), { recursive: true });
};
