import path from "node:path";
import { config } from "@config";
import type { RelayDefinition } from "@/lib/helpers/defineRelay";
import { Console } from "@/lib/logger";
import { relay } from "@/lib/relay";

let registeredCount = 0;

const loadRelayFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/events/**/*.relay.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".relay.ts");
    const relayFile: RelayDefinition = await import(path.resolve(file));

    if (!relayFile.config || !relayFile.run)
      throw new Error(`Relay file ${fileName} must export both 'config' and 'run'.`);

    if (!relayFile.config.on)
      throw new Error(`Relay file ${fileName} is missing 'on' (event name).`);

    if (!relayFile.config.name) throw new Error(`Relay file ${fileName} is missing name.`);

    if (!relayFile.config.description)
      throw new Error(`Relay file ${fileName} is missing description.`);

    relay.on(relayFile.config.on, async (payload) => {
      try {
        await relayFile.run(payload);
      } catch (error) {
        Console.Error(`[Relay] Error in ${fileName}:`, error);
        config.onError?.(error as Error, { source: "relay", name: fileName });
      }
    });

    registeredCount++;
  }
};

export const initRelayHandler = async () => {
  await loadRelayFiles();
  Console.Log(`[Relay] Subscribed to ${registeredCount} internal event(s)`);
};
