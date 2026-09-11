import { join } from "node:path";

export const addPackageDependency = async (
  targetDir: string,
  dependencies?: Record<string, string>,
  devDependencies?: Record<string, string>,
) => {
  const pkgPath = join(targetDir, "package.json");
  const pkg = await Bun.file(pkgPath).json();

  if (dependencies) {
    pkg.dependencies ??= {};
    Object.assign(pkg.dependencies, dependencies);
  }

  if (devDependencies) {
    pkg.devDependencies ??= {};
    Object.assign(pkg.devDependencies, devDependencies);
  }

  await Bun.write(pkgPath, JSON.stringify(pkg, null, 2));
};
