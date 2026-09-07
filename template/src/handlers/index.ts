import { config } from "@config";
import { initCommandHandler } from "./commands/commandsHandler";
import { initComponentsHandler } from "./components";
import { initDbEventHandler } from "./db/dbEventsHandler";
import { initEventHandler } from "./events/eventsHandler";
import { initWorkerHandler } from "./workers/workerHandler";

export const initHandlers = async () => {
  if (config.handlers.commands) await initCommandHandler();
  if (config.handlers.events) await initEventHandler();
  if (config.handlers.components) await initComponentsHandler();
  if (config.handlers.databaseEvents) await initDbEventHandler();
  if (config.handlers.workers) await initWorkerHandler();
};
