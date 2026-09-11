import { existsSync } from "node:fs";
import { join } from "node:path";
import { parse, stringify } from "yaml";

interface ComposeFile {
  services?: Record<string, unknown>;
  volumes?: Record<string, unknown>;
}

export const mergeDockerComposeService = async (targetDir: string, fragmentPath: string) => {
  const targetPath = join(targetDir, "docker-compose.services.yml");
  const fragment = parse(await Bun.file(fragmentPath).text()) as ComposeFile;

  const existing: ComposeFile = existsSync(targetPath)
    ? (parse(await Bun.file(targetPath).text()) as ComposeFile)
    : {};

  const services = { ...existing.services, ...fragment.services };
  const volumes = { ...existing.volumes, ...fragment.volumes };

  await Bun.write(targetPath, stringify({ services, volumes }));
};
