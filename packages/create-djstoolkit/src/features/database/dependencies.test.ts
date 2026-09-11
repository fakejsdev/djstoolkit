import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { dependencies, devDependencies } from "./dependencies";

const TEMPLATE_PKG_PATH = join(
  import.meta.dir,
  "../../../../../template/features/database/package.json",
);

describe("(Dependencies) Database Dependencies Match", () => {
  test("dependencies.ts must match template package.json", async () => {
    const pkg = await Bun.file(TEMPLATE_PKG_PATH).json();

    for (const [name, version] of Object.entries(dependencies)) {
      expect(pkg.dependencies?.[name]).toBe(version);
    }

    for (const [name, version] of Object.entries(devDependencies)) {
      expect(pkg.devDependencies?.[name]).toBe(version);
    }
  });
});
