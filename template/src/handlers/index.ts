import type { ResolvedDjsConfig } from "@/lib/helpers/defineConfig";
import { initCommandHandler } from "./commands/commandsHandler";
import { initEventHandler } from "./events/eventsHandler";

export const initHandlers = async (config: ResolvedDjsConfig) => {
  if (config.handlers.commands) await initCommandHandler();
  if (config.handlers.events) await initEventHandler();
};
