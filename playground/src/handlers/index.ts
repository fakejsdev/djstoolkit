import { initCommandHandler } from "./commands/commandsHandler";
import { initComponentsHandler } from "./components";
import { initEventHandler } from "./events/eventsHandler";
import { initRelayHandler } from "./relay/relayHandler";
import { initDbEventHandler } from "./db/dbEventsHandler";
import { initWorkerHandler } from "./workers/workerHandler";

export const initHandlers = async () => {
  await initWorkerHandler();
  await initDbEventHandler();
  await initRelayHandler();
  await initCommandHandler();
  await initEventHandler();
  await initComponentsHandler();
};
