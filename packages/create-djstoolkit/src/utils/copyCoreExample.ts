import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_DIR } from "./copyTemplate";

export const copyCoreExample = (targetDir: string) => {
  const exampleDir = join(TEMPLATE_DIR, "examples", "example-core");
  if (!existsSync(exampleDir)) return;

  const exampleSrcDir = join(exampleDir, "src");
  const sourceDir = existsSync(exampleSrcDir) ? exampleSrcDir : exampleDir;

  cpSync(sourceDir, join(targetDir, "src", "modules", "example-core"), {
    recursive: true,
  });
};
