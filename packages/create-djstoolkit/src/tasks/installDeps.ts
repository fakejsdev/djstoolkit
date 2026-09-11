import { log } from "@clack/prompts";
import { $ } from "bun";

export const installDeps = async (targetDir: string): Promise<boolean> => {
  try {
    await $`bun install`.cwd(targetDir).quiet();
    return true;
  } catch (error) {
    log.warn(
      `Failed to install dependencies: ${error instanceof Error ? error.message : String(error)}`,
    );
    return false;
  }
};
