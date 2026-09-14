import { cpSync } from "node:fs";
import { join } from "node:path";
import { TEMPLATE_DIR } from "@/utils/copyTemplate";
import { registerHandler } from "@/utils/registerHandler";

export const installRelay = async (targetDir: string) => {
  const featureDir = join(TEMPLATE_DIR, "features", "relay");

  cpSync(join(featureDir, "src"), join(targetDir, "src"), { recursive: true });
  await registerHandler(targetDir, "initRelayHandler", "./relay/relayHandler");
};
