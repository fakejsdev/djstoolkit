import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_DIR } from "./copyTemplate";

export const copyCoreExample = (targetDir: string) => {
  const templateDir = join(TEMPLATE_DIR, "examples", "example-core");
  if (!existsSync(templateDir)) return;

  const exampleSrcDir = join(templateDir, "src");
  const sourceDir = existsSync(exampleSrcDir) ? exampleSrcDir : templateDir;

  cpSync(sourceDir, join(targetDir, "src"), {
    recursive: true,
  });
};
