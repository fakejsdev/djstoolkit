import { $ } from "bun";

export const installDeps = async (targetDir: string) => {
  await $`bun install`.cwd(targetDir).quiet();
};
