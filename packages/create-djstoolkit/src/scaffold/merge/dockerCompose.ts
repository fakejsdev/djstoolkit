import { join } from "node:path";
import { parse, stringify } from "yaml";
import type { Feature } from "../../prompts";
import { TEMPLATE_DIR } from "../copyTemplate";

interface ComposeFragment {
  services?: Record<string, unknown>;
  volumes?: Record<string, unknown>;
}

export const mergeDockerCompose = async (
  targetDir: string,
  features: Feature[],
  hosting: { db?: string; bullmq?: string },
) => {
  const usesDocker = hosting.db === "docker" || hosting.bullmq === "docker";
  if (!usesDocker) return;

  const services: Record<string, unknown> = {};
  const volumes: Record<string, unknown> = {};

  if (features.includes("db") && hosting.db === "docker") {
    const fragment = parse(
      await Bun.file(join(TEMPLATE_DIR, "features/database/docker-compose.services.yml")).text(),
    ) as ComposeFragment;
    Object.assign(services, fragment.services);
    Object.assign(volumes, fragment.volumes);
  }

  if (features.includes("bullmq") && hosting.bullmq === "docker") {
    const fragment = parse(
      await Bun.file(join(TEMPLATE_DIR, "features/bullmq/docker-compose.services.yml")).text(),
    ) as ComposeFragment;
    Object.assign(services, fragment.services);
    Object.assign(volumes, fragment.volumes);
  }

  await Bun.write(join(targetDir, "docker-compose.yml"), stringify({ services, volumes }));
};
