import type { ResolvedDjsConfig } from "@/lib/helpers/defineConfig";
import { initCommandHandler } from "./commands/commandsHandler";
import { initComponentsHandler } from "./components";
import { initDbEventHandler } from "./db/dbEventsHandler";
import { initEventHandler } from "./events/eventsHandler";

export const initHandlers = async (config: ResolvedDjsConfig) => {
  if (config.handlers.commands) await initCommandHandler();
  if (config.handlers.events) await initEventHandler();
  if (config.handlers.databaseEvents) await initDbEventHandler();
  if (config.handlers.components) await initComponentsHandler();
};
