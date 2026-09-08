import path from "node:path";
import { config } from "@config";
import type { defineDbEvent } from "@/lib/helpers/defineDbEvent";
import { Console } from "@/lib/logger";
import { dbEmitter } from "@/lib/prisma";

type DbEventDefinition = ReturnType<typeof defineDbEvent>;

const dbEvents = new Map<string, DbEventDefinition>();

const loadEventFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/events/*.db.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".db.ts");
    const dbEvent: DbEventDefinition = await import(path.resolve(file));

    if (!dbEvent.config || !dbEvent.run)
      throw new Error(`Database Event file ${fileName} must export both 'config' and 'run'.`);

    if (!dbEvent.config.on)
      throw new Error(
        `Database Event file ${fileName} is missing 'on' (which event to listen for).`,
      );

    if (!dbEvent.config.name)
      throw new Error(`Database Event file ${fileName} is missing name (must be unique).`);

    if (!dbEvent.config.description)
      throw new Error(`Database Event file ${fileName} is missing description.`);

    if (dbEvents.has(dbEvent.config.name))
      throw new Error(`Duplicate Database Event name: '${dbEvent.config.name}' (in ${fileName})`);

    dbEvents.set(dbEvent.config.name, dbEvent);
  }
};

const attachEventListener = () => {
  for (const event of dbEvents.values()) {
    dbEmitter.on(event.config.on, async (payload) => {
      try {
        await event.run(payload);
      } catch (e) {
        await config.onError?.(e, { source: "dbEvent", name: event.config.name });
      }
    });
  }
  Console.Log(`[Database Events] Registered ${dbEvents.size} Database Event(s)`);
};

export const initDbEventHandler = async () => {
  await loadEventFiles();
  attachEventListener();
};
