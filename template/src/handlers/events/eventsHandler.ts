import path from "node:path";
import { config } from "@config";
import { client } from "@/lib/discord";
import type { defineEvent } from "@/lib/helpers/defineEvents";
import { Console } from "@/lib/logger";

type EventDefinition = ReturnType<typeof defineEvent>;

const events = new Map<string, EventDefinition>();

export const loadEventFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/events/**/*.djs.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".djs.ts");
    const event: EventDefinition = await import(path.resolve(file));

    if (!event.config || !event.run)
      throw new Error(`Event file ${fileName} must export both 'config' and 'run'.`);

    if (!event.config.on)
      throw new Error(`Event file ${fileName} is missing 'on' (which event to listen for).`);

    if (!event.config.name)
      throw new Error(`Event file ${fileName} is missing name (must be unique).`);

    if (!event.config.description)
      throw new Error(`Event file ${fileName} is missing description.`);

    if (events.has(event.config.name))
      throw new Error(`Duplicate Event name: '${event.config.name}' (in ${fileName})`);

    events.set(event.config.name, event);
  }
};

const attachEventListener = () => {
  for (const event of events.values()) {
    client[event.config.once ? "once" : "on"](event.config.on, (...args) => event.run(...args));
  }
  Console.Log(`Registered ${events.size} Discord Event(s)`);
};

export const initEventHandler = async () => {
  await loadEventFiles();
  attachEventListener();
};
