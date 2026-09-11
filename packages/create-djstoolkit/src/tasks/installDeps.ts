import { log } from "@clack/prompts";
import { $ } from "bun";

export const installDeps = async (targetDir: string) => {
  try {
    await $`bun install`.cwd(targetDir).quiet();
  } catch (error) {
    log.warn(
      `Failed to install dependencies: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
