import { initCommandHandler } from "./commands/commandsHandler";
import { initComponentsHandler } from "./components";
import { initEventHandler } from "./events/eventsHandler";

export const initHandlers = async () => {
  await initCommandHandler();
  await initEventHandler();
  await initComponentsHandler();
};
