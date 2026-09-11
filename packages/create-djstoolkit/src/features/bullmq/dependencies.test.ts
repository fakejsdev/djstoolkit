import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { dependencies } from "./dependencies";

const TEMPLATE_PKG_PATH = join(
  import.meta.dir,
  "../../../../../template/features/bullmq/package.json",
);

describe("(Dependencies) BullMQ Dependencies Match", () => {
  test("dependencies.ts must match template package.json", async () => {
    const pkg = await Bun.file(TEMPLATE_PKG_PATH).json();

    for (const [name, version] of Object.entries(dependencies)) {
      expect(pkg.dependencies?.[name]).toBe(version);
    }
  });
});
