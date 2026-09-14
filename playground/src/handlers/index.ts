import { initCommandHandler } from "./commands/commandsHandler";
import { initComponentsHandler } from "./components";
import { initDbEventHandler } from "./db/dbEventsHandler";
import { initEventHandler } from "./events/eventsHandler";
import { initWorkerHandler } from "./workers/workerHandler";

export const initHandlers = async () => {
  await initWorkerHandler();
  await initDbEventHandler();
  await initCommandHandler();
  await initEventHandler();
  await initComponentsHandler();
};
