import { $ } from "bun";

export const gitInit = async (targetDir: string) => {
  await $`git init`.cwd(targetDir).quiet();
};
