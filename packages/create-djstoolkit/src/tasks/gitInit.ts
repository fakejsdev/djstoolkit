import { log } from "@clack/prompts";
import { $ } from "bun";

export const gitInit = async (targetDir: string): Promise<boolean> => {
  try {
    await $`git init`.cwd(targetDir).quiet();
    return true;
  } catch (error) {
    log.warn(
      `Failed to initialize git repository: ${error instanceof Error ? error.message : String(error)}`,
    );
    return false;
  }
};
