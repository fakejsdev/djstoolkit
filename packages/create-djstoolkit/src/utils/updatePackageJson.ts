import { join } from "node:path";

export const updatePackageJson = async (
  targetDir: string,
  {
    dependencies,
    devDependencies,
    scripts,
  }: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    scripts?: Record<string, string>;
  },
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
  if (scripts) {
    pkg.scripts ??= {};
    Object.assign(pkg.scripts, scripts);
  }

  await Bun.write(pkgPath, JSON.stringify(pkg, null, 2));
};
