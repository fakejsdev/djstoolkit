import { log } from "@clack/prompts";
import { $ } from "bun";

export const gitInit = async (targetDir: string) => {
  try {
    await $`git init`.cwd(targetDir).quiet();
  } catch (error) {
    log.warn(
      `Failed to initialize git repository: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
