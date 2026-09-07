import path from "node:path";
import { config } from "@config";
import type { defineDbEvent } from "@/lib/helpers/defineDbEvent";
import { Console } from "@/lib/logger";
import { dbEmitter } from "@/lib/prisma";

type DbEventDefinition = ReturnType<typeof defineDbEvent>;

const events = new Map<string, DbEventDefinition>();

const loadEventFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/events/*.db.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".db.ts");
    const event: DbEventDefinition = await import(path.resolve(file));

    if (!event.config || !event.run)
      throw new Error(`Database Event file ${fileName} must export both 'config' and 'run'.`);

    if (!event.config.on)
      throw new Error(
        `Database Event file ${fileName} is missing 'on' (which event to listen for).`,
      );

    if (!event.config.name)
      throw new Error(`Database Event file ${fileName} is missing name (must be unique).`);

    if (!event.config.description)
      throw new Error(`Database Event file ${fileName} is missing description.`);

    if (events.has(event.config.name))
      throw new Error(`Duplicate Database Event name: '${event.config.name}' (in ${fileName})`);

    events.set(event.config.name, event);
  }
};

const attachEventListener = () => {
  for (const event of events.values()) {
    dbEmitter.on(event.config.on, async (payload) => {
      try {
        await event.run(payload);
      } catch (e) {
        await config.onError?.(e, { source: "dbEvent", name: event.config.name });
      }
    });
  }
  Console.Log(`[Database Events] Registered ${events.size} Database Event(s)`);
};

export const initDbEventHandler = async () => {
  await loadEventFiles();
  attachEventListener();
};
