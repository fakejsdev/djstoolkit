import { join } from "node:path";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

export const mergePackageJson = async (targetDir: string, name: string, features: Feature[]) => {
  const pkgPath = join(targetDir, "package.json");
  const pkg = await Bun.file(pkgPath).json();

  pkg.name = name;
  pkg.dependencies ??= {};
  pkg.devDependencies ??= {};

  if (features.includes("db")) {
    const fragment = await Bun.file(
      join(TEMPLATE_DIR, "features/database/package.json.fragment"),
    ).json();
    Object.assign(pkg.dependencies, fragment.dependencies);
    Object.assign(pkg.devDependencies, fragment.devDependencies);
  }

  if (features.includes("bullmq")) {
    const fragment = await Bun.file(
      join(TEMPLATE_DIR, "features/bullmq/package.json.fragment"),
    ).json();
    Object.assign(pkg.dependencies, fragment.dependencies);
  }

  await Bun.write(pkgPath, JSON.stringify(pkg, null, 2));
};
